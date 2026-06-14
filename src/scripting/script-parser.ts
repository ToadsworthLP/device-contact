import {Script} from "./script.ts";
import {IScriptInstruction} from "./instructions/i-script-instruction.ts";
import {NopInstruction} from "./instructions/nop-instruction.ts";
import {SetTextInstruction} from "./instructions/set-text-instruction.ts";
import {ShowCharacterInstruction} from "./instructions/show-character-instruction.ts";
import {SleepInstruction} from "./instructions/sleep-instruction.ts";

export class ScriptParser {
    public parse(text: string): Script {
        const instructions: Array<IScriptInstruction> = [];
        
        let currentPageText = "";
        let currentPageSetTextInstructionIndex = undefined;
        let pageIndex = 0;
        let pauseAfterCharacterInSeconds = 0.1;
        let pauseAfterPageInSeconds = 1;
        for (let currentCharacterIndex = 0; currentCharacterIndex < text.length; currentCharacterIndex++) {
            const currentCharacter = text[currentCharacterIndex];
            
            if (currentCharacter === "[" && currentCharacterIndex !== 0 && text[currentCharacterIndex - 1] !== '\\') {
                // Commands
                let command = "";

                let commandCharacterIndex = 1;
                let firstSpaceIndex = undefined;
                while(currentCharacterIndex + commandCharacterIndex < text.length && text[currentCharacterIndex + commandCharacterIndex] !== ']') {
                    if(text[currentCharacterIndex + commandCharacterIndex] === ' ' && firstSpaceIndex === undefined) firstSpaceIndex = commandCharacterIndex - 1;

                    command += text[currentCharacterIndex + commandCharacterIndex];
                    commandCharacterIndex++;
                }

                let commandName = command.substring(0, firstSpaceIndex);
                let commandArgs = firstSpaceIndex === undefined ? "" : command.substring(firstSpaceIndex + 1);
                
                // TODO implement command processing

                currentCharacterIndex += commandCharacterIndex;
            } else if (currentCharacter === "\n" && currentCharacterIndex + 1 < text.length && text[currentCharacterIndex + 1] === '\n') {
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
                    if(pageIndex !== 0) instructions.push(new SleepInstruction(pauseAfterPageInSeconds));
                    
                    instructions.push(NopInstruction.instance);
                    currentPageSetTextInstructionIndex = instructions.length - 1;
                }
                
                currentPageText += currentCharacter;
                instructions.push(new ShowCharacterInstruction());
                instructions.push(new SleepInstruction(pauseAfterCharacterInSeconds));
            }
        }

        // End last page
        if(currentPageSetTextInstructionIndex !== undefined) {
            instructions[currentPageSetTextInstructionIndex] = new SetTextInstruction(currentPageText);
        }
        
        return new Script(instructions);
    }
}