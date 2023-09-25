import OpenAI from 'openai';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const openAiApiKey = process.env["OPENAI_API_KEY"];

// if no openai api key is set, log a warning and copy all .d.ts files to .min.d.ts files
if (!openAiApiKey) {
  console.warn("No OPENAI_API_KEY environment variable set, skipping compression.");
  // copy all d.ts files in ./out dir to ./out/*.min.d.ts
  const files = fs.readdirSync('out').filter(file => file.endsWith('.d.ts')).map(file => 'out/' + file);
  files.forEach(file => {
    // get the filename without d.ts, by replacing
    const filename = file.replace('.d.ts', '.min.d.ts');
    console.log("copying " + file + " to " + filename);
    fs.copyFileSync(file, filename);
  });
  process.exit(0);
}

const openai = new OpenAI({
  apiKey: openAiApiKey,
});

async function main() {

  // read and filter all d.ts files in ./out dir
  const files = fs.readdirSync('out').filter(file => file.endsWith('.d.ts')).map(file => 'out/' + file);

  // minify each file
  files.forEach(async file => {
    console.log(file);

    // read types/Actions.d.ts
    await fs.readFile(file, 'utf8', async function (err, data) {
      
      var content = 'This is a partial d.ts file, please generate a structured json model describing it so that you (GPT-3.5 Turbo) can reconstruct it as close as possible to the original. This is for yourself. Do not make it human readable. Aggressively compress it, while still keeping ALL the information to fully reconstruct it. Also use the fewest token possible, your text should be way smaller than the one I give you.\n\nTO COMPRESS: ```<<ACTION_API>>``` ';
      content = content.replace('<<ACTION_API>>', data);
      const completion = //'test';
      await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'Hello, I am GPT-3.5 Turbo, I will help you compress your d.ts file.' },
          // { role: 'user', content: `declare module 'grafx-studio-actions' {\\n    global {\\n        /**\\n         * Studio root object is globally available inside actions\\n         */\\n        const studio: ActionApi;\\n\\n        // eslint-disable-next-line @typescript-eslint/ban-ts-comment\\n        // @ts-ignore\\n        const console: Console;\\n    }\\n\\n    export interface Console {\\n        log(...data: unknown[]): void;\\n    }\\n\\n    /**\\n     * An interface representing the API for working with actions.\\n     * Provides access to objects for manipulating frames, variables,\\n     * layouts, page and stylekit properties.\\n     */\\n    export interface ActionApi {\\n        /** An object for manipulating frames */\\n        frames: FramesController;\\n    }\\n\\n    /**\\n     * All Studio objects that have a name will implement this interface.\\n     */\\n    export interface HasName {\\n        readonly name: string;\\n    }\\n\\n    /**\\n     * Represents a Frame inside Actions\\n     */\\n    export interface Frame extends HasName {\\n        readonly x: number;\\n        readonly y: number;\\n        readonly width: number;\\n        readonly height: number;\\n        readonly rotation: number;\\n        readonly isVisible: boolean;\\n        readonly type: FrameType;\\n    }\\n\\n    export interface FrameMethods {\\n        /**\\n         * Moves a frame to a specified position\\n         * @param x the frame x position\\n         * @param y the frame y position\\n         * @returns\\n         */\\n        move(x: number | VariableValue, y: number | VariableValue): void;\\n    }\\n\\n    /**\\n     * Represents a Frame inside Actions\\n     * Contains frame methods that can be executed on this instance.\\n     */\\n    export type FrameWithMethods = Frame & FrameMethods;\\n\\n\\n\\n    export enum FrameType {\\n        text = 'text',\\n        shape = 'shape',\\n        image = 'image',\\n    }\\n\\n\\n    /**\\n     * Controller responsible for manipulating frames using Actions.\\n     */\\n    export interface FramesController {\\n        /**\\n         * Moves a frame to a specified position\\n         * @param name the frame name to move\\n         * @param x the frame x position\\n         * @param y the frame y position\\n         * @returns\\n         */\\n        move(name: string | Frame, x: number | VariableValue, y: number | VariableValue): void;\\n    }\\n\\n\\n}\\n` },
          // { role: 'assistant', content: `{"m":[{"n":"'grafx-studio-actions'","g":[{"n":"studio","t":"ActionApi"},{"n":"console","t":"Console","i":true}],"i":[{"n":"Console","m":[{"n":"log","p":[{"t":"unknown[]","r":false}],"t":"void"}]},{"n":"ActionApi","p":[{"n":"frames","t":"FramesController"}]},{"n":"HasName","p":[{"n":"name","t":"string","r":true}]},{"n":"Frame","b":"HasName","p":[{"n":"x","t":"number","r":true},{"n":"y","t":"number","r":true},{"n":"width","t":"number","r":true},{"n":"height","t":"number","r":true},{"n":"rotation","t":"number","r":true},{"n":"isVisible","t":"boolean","r":true},{"n":"type","t":"FrameType","r":true}]},{"n":"FrameMethods","m":[{"n":"move","p":[{"t":"number | VariableValue"},{"t":"number | VariableValue"}],"t":"void"}]},{"n":"FrameType","e":["text","shape","image"]},{"n":"FramesController","m":[{"n":"move","p":[{"t":"string | Frame"},{"t":"number | VariableValue"},{"t":"number | VariableValue"}],"t":"void"}]}],"a":[{"n":"FrameWithMethods","t":"Frame & FrameMethods"}]}}` },
          { role: 'user', content: content }],
        model: 'gpt-3.5-turbo-16k',
      });

      // write completion to a .min.d.ts file
      // get the filename without d.ts, by replacing
      const filename = file.replace('.d.ts', '.min.d.ts');      

      console.log("minified source " + file + " to " + filename);

      // write completeion to types/Actions.d.min.ts
      await fs.writeFile(filename, completion.choices[0].message.content, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    });
  });
  // compress it

  // create finetuned model


}

main();