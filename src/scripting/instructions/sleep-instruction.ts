import {IScriptInstruction} from "./i-script-instruction.ts";
import {ScriptContext} from "../script-context.ts";

export class SleepInstruction implements IScriptInstruction {
    private readonly durationInSeconds: number;
    
    constructor(durationInSeconds: number) {
        this.durationInSeconds = durationInSeconds;
    }

    execute(context: ScriptContext): void {
        context.sleepTimeInSeconds += this.durationInSeconds;
    }
}