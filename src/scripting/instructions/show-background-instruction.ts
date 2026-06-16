import {IScriptInstruction} from "./i-script-instruction.ts";
import {ExecutionContext} from "../execution-context.ts";

export class ShowBackgroundInstruction implements IScriptInstruction {
    execute(context: ExecutionContext): void {
        context.renderer.showBackground();
    }
}