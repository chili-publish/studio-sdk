const child_process = require("child_process");

// read version property
const version = require("./common").getRootPackageVersion();

function runCommand(command, args, env = process.env) {
  const spawned = child_process.spawnSync(command, args, {
    env,
    stdio: "inherit",
  });

  if (spawned.error) {
    console.error(`Error running ${command}:`, spawned.error);
    process.exit(spawned.status);
  }

  if (spawned.status !== 0) {
    console.error(
      `Command ${command} exited with status code ${spawned.status}`
    );
    process.exit(spawned.status);
  }
}

// use default node to spawn a git command
console.info(`Adding all package.json files to git commit`);
runCommand("git", ["add", "**/**/package.json"]);

console.info(`Adding root package.json file to git commit`);
runCommand("git", ["add", "package.json"]);

// commit
console.info(`Committing changes to git`);
runCommand("git", [
  "commit",
  "-m",
  `CI: bumps version to ${version} [skip ci]`,
]);

// create tag
console.info(`Adding tag`);
runCommand("git", ["tag", `${version}`]);

const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY;

if (!token || !repository) {
  console.error(
    "GITHUB_TOKEN and GITHUB_REPOSITORY are required for authenticated git push"
  );
  process.exit(1);
}

const remote = `https://github.com/${repository}.git`;
const authorization = Buffer.from(`x-access-token:${token}`).toString("base64");
const gitAuthenticationEnv = {
  ...process.env,
  GIT_CONFIG_COUNT: "1",
  GIT_CONFIG_KEY_0: "http.https://github.com/.extraheader",
  GIT_CONFIG_VALUE_0: `AUTHORIZATION: basic ${authorization}`,
};

console.log(`::add-mask::${token}`);
console.log(`::add-mask::${authorization}`);

// publish tag
console.info(`Pushing tag to git`);
runCommand("git", ["push", remote, `${version}`], gitAuthenticationEnv);

console.info(`Pushing changes to git`);
runCommand("git", ["push", remote, "HEAD:main"], gitAuthenticationEnv);
