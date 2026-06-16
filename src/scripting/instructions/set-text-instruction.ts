import {IScriptInstruction} from "./i-script-instruction.ts";
import {ExecutionContext} from "../execution-context.ts";

export class SetTextInstruction implements IScriptInstruction {
    private readonly text: string;
    
    constructor(text: string) {
        this.text = text;
    }

    execute(context: ExecutionContext): void {
        context.defaultText.text = this.text;
        context.defaultText.shownCharacters = 0;
        context.defaultText.fade(1, 0);
    }
}