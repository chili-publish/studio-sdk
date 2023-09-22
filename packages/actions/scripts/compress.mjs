import OpenAI from 'openai';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

async function main() {

  // read types/Actions.d.ts
  await fs.readFile('src/Actions.d.ts', 'utf8', async function (err, data) {
    console.log(data);
    var content = 'This is a partial d.ts file, please generate a structured json model describing it so that you (GPT-3.5 Turbo) can reconstruct it as close as possible to the original. This is for yourself. Do not make it human readable. Aggressively compress it, while still keeping ALL the information to fully reconstruct it. Also use the fewest token possible, your text should be way smaller than the one I give you.\n\nTO COMPRESS: ```<<ACTION_API>>``` ';
    content = content.replace('<<ACTION_API>>', data);
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: content }],
      model: 'gpt-3.5-turbo-16k',
    });

    console.log(completion);

    // write completeion to types/Actions.d.min.ts
    await fs.writeFile('out/Actions.d.min.'+ new Date().getMilliseconds() +'.ts', completion.choices[0].message.content, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  });
  // compress it

  // create finetuned model


}

main();