# Release Pipeline Sequence Diagram

## UAT Regular Release Flow

```plantuml
@startuml
actor User
participant "create-release.yml" as CreateRelease
participant "GitHub API" as GitHub
participant "deploy-release.yml" as DeployRelease
participant "detect-release-type" as Detect
participant "preflight" as Preflight
participant "publish" as Publish
participant "deploy-azure" as Azure
participant "notify" as Notify
participant "Microsoft Teams" as Teams

User -> CreateRelease: Manual trigger\n(environment: uat, release_type: regular,\nengine_version: optional)
CreateRelease -> CreateRelease: Find previous tag (latest PRD)\nBump version (1.3.0-alpha.0 → 1.3.0-rc.0)
alt Engine version provided
    CreateRelease -> CreateRelease: Update editor-engine.json
end
CreateRelease -> GitHub: Create tag & release (1.3.0-rc.0, prerelease)
CreateRelease -> Teams: Notify release created

note over DeployRelease: Tag push triggers deploy-release.yml

par
    DeployRelease -> Detect: Detect release type (UAT)
    DeployRelease -> Preflight: Run preflight checks
end

par
    DeployRelease -> Publish: Publish to GitHub Packages
    DeployRelease -> Azure: Deploy to Azure CDN
end

DeployRelease -> Notify: Send notification
Notify -> Teams: UAT Deployment Completed
@enduml
```

## UAT Hotfix Release Flow

```plantuml
@startuml
actor User
participant "create-release.yml" as CreateRelease
participant "GitHub API" as GitHub
participant "deploy-release.yml" as DeployRelease
participant "detect-release-type" as Detect
participant "preflight" as Preflight
participant "publish" as Publish
participant "deploy-azure" as Azure
participant "notify" as Notify
participant "Microsoft Teams" as Teams

User -> CreateRelease: Manual trigger\n(environment: uat, release_type: hotfix)
CreateRelease -> CreateRelease: Find previous tag (latest UAT)\nBump version (1.3.0-rc.0 → 1.3.0-rc.1)
CreateRelease -> GitHub: Create tag & release (prerelease)
CreateRelease -> Teams: Notify release created

note over DeployRelease: Tag push triggers deploy-release.yml

par
    DeployRelease -> Detect: Detect release type (UAT)
    DeployRelease -> Preflight: Run preflight checks
end

par
    DeployRelease -> Publish: Publish to GitHub Packages
    DeployRelease -> Azure: Deploy to Azure CDN
end

DeployRelease -> Notify: Send notification
Notify -> Teams: UAT Deployment Completed
@enduml
```

## PRD Regular Release Flow

```plantuml
@startuml
actor User
participant "create-release.yml" as CreateRelease
participant "GitHub API" as GitHub
participant "deploy-release.yml" as DeployRelease
participant "detect-release-type" as Detect
participant "preflight" as Preflight
participant "publish" as Publish
participant "deploy-azure" as Azure
participant "bump-main-version" as BumpVersion
participant "notify" as Notify
participant "Microsoft Teams" as Teams

User -> CreateRelease: Manual trigger\n(environment: prd, release_type: regular)
CreateRelease -> CreateRelease: Find base UAT tag\nCheckout UAT tag\nBump version (1.3.0-rc.2 → 1.3.0)
CreateRelease -> GitHub: Create tag & release (1.3.0, production)
CreateRelease -> Teams: Notify release created

note over DeployRelease: Tag push triggers deploy-release.yml

par
    DeployRelease -> Detect: Detect release type (PRD)
    DeployRelease -> Preflight: Run preflight checks
end

par
    DeployRelease -> Publish: Publish to NPM (public)
    DeployRelease -> Azure: Deploy to Azure CDN
end

DeployRelease -> BumpVersion: Bump main version\n(1.3.0 → 1.4.0-alpha.0)
BumpVersion -> GitHub: Commit and push to main

DeployRelease -> Notify: Send notification
Notify -> Teams: Production Deployment Completed
@enduml
```

## PRD Hotfix Release Flow

```plantuml
@startuml
actor User
participant "create-release.yml" as CreateRelease
participant "GitHub API" as GitHub
participant "deploy-release.yml" as DeployRelease
participant "detect-release-type" as Detect
participant "preflight" as Preflight
participant "publish" as Publish
participant "deploy-azure" as Azure
participant "notify" as Notify
participant "Microsoft Teams" as Teams

User -> CreateRelease: Manual trigger\n(environment: prd, release_type: hotfix)
CreateRelease -> CreateRelease: Find base UAT tag\nCheckout UAT tag\nBump version (1.2.3-rc.1 → 1.2.4)
CreateRelease -> GitHub: Create tag & release (1.2.4, production)
CreateRelease -> Teams: Notify release created

note over DeployRelease: Tag push triggers deploy-release.yml

par
    DeployRelease -> Detect: Detect release type (PRD)
    DeployRelease -> Preflight: Run preflight checks
end

par
    DeployRelease -> Publish: Publish to NPM (public)
    DeployRelease -> Azure: Deploy to Azure CDN
end

note over DeployRelease: Skip version bump (hotfix detected)
DeployRelease -> Notify: Send notification
Notify -> Teams: Production Deployment Completed
@enduml
```

## Key Points

1. **Create Release Workflow** (`create-release.yml`):

   - Manually triggered with inputs:
     - `environment`: uat or prd
     - `release_type`: regular or hotfix
     - `engine_version`: optional - engine version to use (e.g., 2.15.latest)
   - Determines previous tag based on environment and release type
   - For PRD: checks out UAT tag before version bump
   - **Only consumed for UAT regular releases**: If `engine_version` provided, updates `packages/sdk/editor-engine.json` before tag creation
   - Creates git tag and GitHub release
   - Sends create Github Release Teams notification

2. **Deploy Release Workflow** (`deploy-release.yml`):

   - Triggered automatically on tag push
   - `detect-release-type`: Identifies UAT vs PRD from tag format
   - `preflight`: Runs tests and linting
   - `publish`: Publishes to GitHub Packages (UAT) or NPM (PRD)
   - `deploy-azure`: Deploys to Azure CDN using service principal auth
   - `bump-main-version`: Only for PRD regular releases (skips hotfixes)
   - `notify`: Sends final Teams notification after successful deployment

3. **Version Bumping Logic**:

   - UAT Regular: Adds `-rc.0` to current version (minor already bumped)
   - UAT Hotfix: Increments prerelease number or patch+rc.0
   - PRD Regular and Hotfix: Strips `-rc.X` from UAT tag

4. **Post-Production Version Bump**:

   - Only runs for PRD regular releases (not hotfixes)
   - Bumps main branch to next minor version with `-alpha.0`
   - Preserves patch space for potential additional hotfixes
