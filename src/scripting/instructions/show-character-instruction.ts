import {IScriptInstruction} from "./i-script-instruction.ts";
import {ExecutionContext} from "../execution-context.ts";

export class ShowCharacterInstruction implements IScriptInstruction {
    execute(context: ExecutionContext): void {
        if(context.defaultText.shownCharacters !== undefined) {
            context.defaultText.shownCharacters++;
        }
    }
}