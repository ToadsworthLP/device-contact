import {IScriptInstruction} from "./i-script-instruction.ts";
import {ExecutionContext} from "../execution-context.ts";

export class FadeTextInstruction implements IScriptInstruction {
    private readonly targetAlpha: number;
    private readonly durationInSeconds: number;

    constructor(targetAlpha: number, durationInSeconds: number) {
        this.targetAlpha = targetAlpha;
        this.durationInSeconds = durationInSeconds;
    }

    execute(context: ExecutionContext): void {
        context.defaultText.fade(this.targetAlpha, this.durationInSeconds);
    }
}