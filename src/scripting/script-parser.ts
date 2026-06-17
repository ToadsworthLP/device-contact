import {Script} from "./script.ts";
import {IScriptInstruction} from "./instructions/i-script-instruction.ts";
import {NopInstruction} from "./instructions/nop-instruction.ts";
import {SetTextInstruction} from "./instructions/set-text-instruction.ts";
import {ShowCharacterInstruction} from "./instructions/show-character-instruction.ts";
import {PagePauseInstruction} from "./instructions/page-pause-instruction.ts";
import {CharacterPauseInstruction} from "./instructions/character-pause-instruction.ts";
import {IScriptCommand} from "./commands/i-script-command.ts";
import {PauseCommand} from "./commands/pause-command.ts";
import {FadeOutCommand} from "./commands/fade-out-command.ts";
import {ShowBackgroundCommand} from "./commands/show-background-command.ts";
import {HideBackgroundCommand} from "./commands/hide-background-command.ts";

export class ScriptParser {
    private readonly commands: Map<string, IScriptCommand> = new Map<string, IScriptCommand>([
        ["Pause", new PauseCommand()],
        ["FadeOut", new FadeOutCommand()],
        ["ShowBackground", new ShowBackgroundCommand()],
        ["HideBackground", new HideBackgroundCommand()],
    ]);
    
    public parse(text: string): Script {
        const instructions: Array<IScriptInstruction> = [];
        
        let currentPageText = "";
        let currentPageSetTextInstructionIndex = undefined;
        let pageIndex = 0;
        for (let currentCharacterIndex = 0; currentCharacterIndex < text.length; currentCharacterIndex++) {
            const currentCharacter = text[currentCharacterIndex];
            
            if (currentCharacter === "[" && (currentCharacterIndex === 0 || (currentCharacterIndex !== 0 && text[currentCharacterIndex - 1] !== '\\'))) {
                // Commands
                let commandText = "";

                let commandCharacterIndex = 1;
                let firstSpaceIndex = undefined;
                while(currentCharacterIndex + commandCharacterIndex < text.length && text[currentCharacterIndex + commandCharacterIndex] !== ']') {
                    if(text[currentCharacterIndex + commandCharacterIndex] === ' ' && firstSpaceIndex === undefined) {
                        firstSpaceIndex = commandCharacterIndex - 1;
                    }

                    commandText += text[currentCharacterIndex + commandCharacterIndex];
                    commandCharacterIndex++;
                }

                const commandName = commandText.substring(0, firstSpaceIndex);
                const commandArgs = firstSpaceIndex === undefined ? [] : commandText.substring(firstSpaceIndex + 1).split(" ");
                
                const command = this.commands.get(commandName);
                if (command) {
                    const resultingInstructions = command.parse(commandArgs);
                    for (const instruction of resultingInstructions) {
                        instructions.push(instruction);
                    }
                }

                currentCharacterIndex += commandCharacterIndex;
            } else if (currentCharacter === "\n" && currentCharacterIndex + 1 < text.length && text[currentCharacterIndex + 1] === '\n') {
                instructions.push(new PagePauseInstruction());

                // Page break
                if(currentPageSetTextInstructionIndex !== undefined) {
                    instructions[currentPageSetTextInstructionIndex] = new SetTextInstruction(currentPageText);
                    currentPageText = "";
                    currentPageSetTextInstructionIndex = undefined;
                    pageIndex++;
                }
                
                currentCharacterIndex++;
            } else {
                // Normal text
                if(currentPageSetTextInstructionIndex === undefined) {
                    instructions.push(NopInstruction.instance);
                    currentPageSetTextInstructionIndex = instructions.length - 1;
                }
                
                currentPageText += currentCharacter;
                if(currentCharacter !== "\n") {
                    instructions.push(new ShowCharacterInstruction());
                    instructions.push(new CharacterPauseInstruction());
                }
            }
        }

        // End last page
        if(currentPageSetTextInstructionIndex !== undefined) {
            instructions[currentPageSetTextInstructionIndex] = new SetTextInstruction(currentPageText);
        }
        
        return new Script(instructions);
    }
}