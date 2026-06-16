import {ExecutionContext} from "../execution-context.ts";
import {IScriptInstruction} from "./i-script-instruction.ts";

export class HideBackgroundInstruction implements IScriptInstruction {
    execute(context: ExecutionContext): void {
        context.renderer.hideBackground();
    }
}