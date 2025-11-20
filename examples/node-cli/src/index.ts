import SDK from "@chili-publish/studio-sdk";
import chalk from "chalk";
import { Command } from "commander";
const readline = require('readline');

// Improved parameter parsing with type inference
function parseParameters(fnStr: string): string[] {
  const paramMatch = fnStr.match(/\((.*?)\)/s);
  if (!paramMatch) return [];

  return paramMatch[1].split(',').map(p => {
    const param = p.replace(/\/\*.*?\*\//g, '') // Remove comments
      .trim()
      .replace(/\s*=\s*.*$/, ''); // Remove default values

    // Simple type inference from parameter name patterns
    const nameMatch = param.match(/^([^:]+)(?:\s*:\s*(\w+))?/);
    if (!nameMatch) return param;

    const [, name, type] = nameMatch;
    const typeHint = type || (
      name.toLowerCase().includes('str') ? 'str' :
        name.toLowerCase().includes('num') ? 'num' :
          name.toLowerCase().includes('bool') ? 'bool' : ''
    );

    return typeHint ? `${name}:${typeHint}` : name;
  });
}

// Updated suggestions logic
function getSuggestions(input: string, ctx: any): string[] {
  if (!input) return Object.keys(ctx);

  const parts = input.split('.');
  let current = ctx;

  // Traverse the context based on the input parts
  for (let i = 0; i < parts.length - 1; i++) {
    if (current && typeof current === 'object' && parts[i] in current) {
      current = current[parts[i]];
    } else {
      return [];
    }
  }

  const lastPart = parts[parts.length - 1];
  if (typeof current !== 'object') return [];

  // Filter keys case-insensitively and show only the next part
  return Object.keys(current)
    .filter(key => key.toLowerCase().startsWith(lastPart.toLowerCase()))
    .map(key => {
      const value = current[key];
      if (typeof value === 'function') {
        const params = parseParameters(value.toString());
        return `${key}(${params.join(', ')})`;
      }
      return key;
    })
    .sort((a, b) => a.localeCompare(b));
} 

class REPL {
  private input: string = '';
  private history: string[] = [];
  private historyIndex: number = -1;
  private rl: any;
  private context: any = undefined;
  private historyOutput: string[] = []; // New array to store output history
  private currentSuggestions: string[] = []; // Store current available suggestions
  private suggestionIndex: number = -1; // Track current suggestion when cycling
  private originalInput: string = ''; // Store the original input before tab completion

  constructor() { }

  // Updated render method
  render() {
    const inputRow = process.stdout.rows - 1; // Input always at the bottom row
    const suggestions = getSuggestions(this.input, this.context);
    let suggestionLines = [];

    // Build suggestion lines (unchanged logic)
    if (suggestions.length > 0) {
      const terminalWidth = process.stdout.columns;
      const maxLength = Math.max(...suggestions.map(s => s.length));
      const columnWidth = maxLength + 2;
      const columns = Math.floor(terminalWidth / columnWidth);
      const rowsNeeded = Math.ceil(suggestions.length / columns);
      for (let row = 0; row < rowsNeeded; row++) {
        let line = '';
        for (let col = 0; col < columns; col++) {
          const index = col * rowsNeeded + row;
          if (index < suggestions.length) {
            line += suggestions[index].padEnd(columnWidth);
          }
        }
        suggestionLines.push(line);
      }
    }

    const totalBottomLines = suggestionLines.length + 1; // Suggestions + input line
    const historyToShow = this.historyOutput.slice(- (process.stdout.rows - totalBottomLines));

    // Clear the entire screen
    process.stdout.write('\x1b[2J');
    readline.cursorTo(process.stdout, 0, 0);

    // Write output history
    historyToShow.forEach((line, index) => {
      readline.cursorTo(process.stdout, 0, index);
      process.stdout.write(line);
    });

    // Write suggestions
    suggestionLines.forEach((line, index) => {
      const row = process.stdout.rows - totalBottomLines + index;
      readline.cursorTo(process.stdout, 0, row);
      process.stdout.write(chalk.gray(line));
    });

    // Write input line
    readline.cursorTo(process.stdout, 0, inputRow);
    process.stdout.write('> ' + this.input);

    // Move cursor to end of input
    readline.cursorTo(process.stdout, 2 + this.input.length, inputRow);
  }

  // Updated evaluate method
  private async evaluate(input: string) {
    try {
      const fn = new Function(
        ...Object.keys(this.context),
        `return ${input};`
      );
      const result = await fn(...Object.values(this.context));
      this.historyOutput.push('Result: ' + JSON.stringify(result));
    } catch (e) {
      try {
        const fn = new Function(
          ...Object.keys(this.context),
          input
        );
        await fn(...Object.values(this.context));
        this.historyOutput.push('Executed');
      } catch (e2) {
        this.historyOutput.push('Error: ' + e2);
      }
    }
    // Note: No direct writing to stdout here; output is stored in historyOutput
  }

  // Updated start method with fixed tab completion
  async start(websocketUrl: string) {
    try {
      const sdk = new SDK({
        editorLink: websocketUrl
      });
      await sdk.loadEditor();
      this.context = { sdk };
      console.log(chalk.green('Editor loaded successfully'));
    } catch (e) {
      console.error(chalk.red('Error loading editor:'), e);
      process.exit(1);
    }

    // Switch to alternate screen buffer
    process.stdout.write('\x1b[?1049h');

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true
    });

    process.stdin.setRawMode(true);

    console.log('Type expressions or statements using the context (Ctrl+C to exit)');
    console.log('Available: sdk\n');

    this.render();

    process.stdin.on('data', async (key: Buffer) => {
      const str = key.toString();

      if (str === '\u0003') { // Ctrl+C
        // Switch back to main buffer before exiting
        process.stdout.write('\x1b[?1049l');
        this.rl.close();
        process.exit();
      }

      if (str === '\r') { // Enter
        if (this.input.trim()) {
          this.history.push(this.input);
          this.historyIndex = this.history.length;
          await this.evaluate(this.input);
          this.input = '';
          this.currentSuggestions = []; // Reset suggestions
          this.suggestionIndex = -1;
        }
      } else if (str === '\t') { // Tab key for completion
        // If this is the first tab press, store original input and get suggestions
        if (this.currentSuggestions.length === 0) {
          this.originalInput = this.input;
          this.currentSuggestions = getSuggestions(this.input, this.context);
          this.suggestionIndex = -1;
        }
        
        if (this.currentSuggestions.length > 0) {
          // Increment suggestion index
          this.suggestionIndex++;
          
          // If we've gone through all suggestions, cycle back to original input
          if (this.suggestionIndex >= this.currentSuggestions.length) {
            this.input = this.originalInput;
            this.suggestionIndex = -1;
            this.render();
            return;
          }
          
          // Get the selected suggestion
          const suggestion = this.currentSuggestions[this.suggestionIndex];
          
          // Complete with the current suggestion
          const parts = this.originalInput.split('.');
          const lastPart = parts.pop() || '';
          
          // Handle function suggestions differently
          if (suggestion.includes('(')) {
            // For functions, extract just the name part (without params)
            const funcName = suggestion.split('(')[0];
            parts.push(funcName + '()');
            
            // Set the input and render immediately
            this.input = parts.join('.');
            this.render();
            
            // Position cursor inside the parentheses after rendering
            readline.cursorTo(process.stdout, 2 + this.input.length - 1, process.stdout.rows - 1);
          } else {
            // For properties, add a dot if it's an object to continue chaining
            const suggestionBase = suggestion;
            let current = this.context;
            
            // Navigate to the parent object using original parts
            for (const part of parts) {
              if (current && typeof current === 'object' && part in current) {
                current = current[part];
              }
            }
            
            // Check if the completed item is an object that can be further accessed
            const completedItem = current?.[suggestionBase];
            const needsDot = completedItem && typeof completedItem === 'object';
            
            parts.push(suggestion + (needsDot ? '.' : ''));
            this.input = parts.join('.');
          }
        }
      } else if (str === '\u001b[A' || str === '\u001b[B') { // Up/Down arrows
        if (str === '\u001b[A') { // Up arrow
          if (this.historyIndex > 0) {
            this.historyIndex--;
            this.input = this.history[this.historyIndex];
          }
        } else if (str === '\u001b[B') { // Down arrow
          if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.input = this.history[this.historyIndex];
          } else {
            this.input = '';
            this.historyIndex = this.history.length;
          }
        }
        
        // Reset suggestions when navigating history
        this.currentSuggestions = [];
        this.suggestionIndex = -1;
        this.originalInput = '';
      } else if (str === '\b' || str === '\u007f') { // Backspace
        this.input = this.input.slice(0, -1);
        this.currentSuggestions = []; // Reset suggestions
        this.suggestionIndex = -1;
        this.originalInput = '';
      } else if (str.length === 1 && str >= ' ' && str <= '~') { // Printable chars
        this.input += str;
        this.currentSuggestions = []; // Reset suggestions
        this.suggestionIndex = -1;
        this.originalInput = '';
      }

      this.render();
    });
  }
}

// Setup CLI
const program = new Command();

program
  .name('studio-sdk-cli')
  .description('CLI to interact with CHILI GraFx Studio SDK')
  .version('1.0.0');

program
  .command('start')
  .description('Start an interactive REPL connected to a Studio WebSocket')
  .option('-w, --websocket <url>', 'WebSocket URL to connect to (e.g., ws://localhost:3001)')
  .argument('[websocketUrl]', 'WebSocket URL (alternative to -w option)')
  .action((websocketUrl, options) => {
    // Give priority to command-line argument, fall back to option
    const url = websocketUrl || options.websocket;
    
    if (!url) {
      console.error(chalk.red('Error: WebSocket URL must be provided via argument or -w option'));
      process.exit(1);
    }
    
    if (!url.startsWith('ws://') && !url.startsWith('wss://')) {
      console.error(chalk.red('Error: WebSocket URL must start with ws:// or wss://'));
      process.exit(1);
    }
    
    console.log(chalk.blue(`Connecting to ${url}...`));
    const repl = new REPL();
    repl.start(url);
  });

// Add examples to help text
program.addHelpText('after', `
Examples:
  $ studio-sdk-cli start ws://localhost:3001
  $ studio-sdk-cli start -w ws://localhost:3001
  $ studio-sdk-cli start --websocket wss://my-studio-instance.com/ws
`);

// Parse command line arguments
program.parse(process.argv);

// Show help if no commands provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}