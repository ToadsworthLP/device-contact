import {IScriptInstruction} from "./i-script-instruction.ts";
import {ExecutionContext} from "../execution-context.ts";

export class PagePauseInstruction implements IScriptInstruction {
    private static readonly pagePauseInSeconds: number = 1;

    execute(context: ExecutionContext): void {
        context.sleepTimeInSeconds += PagePauseInstruction.pagePauseInSeconds;
    }
}