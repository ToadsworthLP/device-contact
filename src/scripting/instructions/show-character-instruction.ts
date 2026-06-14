import {IScriptInstruction} from "./i-script-instruction.ts";
import {ScriptContext} from "../script-context.ts";

export class ShowCharacterInstruction implements IScriptInstruction {
    execute(context: ScriptContext): void {
        if(context.defaultText.shownCharacters !== undefined) {
            context.defaultText.shownCharacters++;
        }
    }
}