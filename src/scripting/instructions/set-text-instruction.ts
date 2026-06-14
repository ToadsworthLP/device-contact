import {IScriptInstruction} from "./i-script-instruction.ts";
import {ScriptContext} from "../script-context.ts";

export class SetTextInstruction implements IScriptInstruction {
    private readonly text: string;
    
    constructor(text: string) {
        this.text = text;
    }

    execute(context: ScriptContext): void {
        context.defaultText.text = this.text;
        context.defaultText.shownCharacters = 0;
    }
}