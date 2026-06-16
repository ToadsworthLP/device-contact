import {IScriptInstruction} from "./i-script-instruction.ts";
import {ExecutionContext} from "../execution-context.ts";

export class PauseInstruction implements IScriptInstruction {
    private readonly pauseInSeconds: number;

    constructor(pauseInSeconds: number) {
        this.pauseInSeconds = pauseInSeconds;
    }

    execute(context: ExecutionContext): void {
        context.sleepTimeInSeconds += this.pauseInSeconds;
    }
}