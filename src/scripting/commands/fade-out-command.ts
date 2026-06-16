import {IScriptCommand} from "./i-script-command.ts";
import {IScriptInstruction} from "../instructions/i-script-instruction.ts";
import {FadeTextInstruction} from "../instructions/fade-text-instruction.ts";
import {PauseInstruction} from "../instructions/pause-instruction.ts";

export class FadeOutCommand implements IScriptCommand {
    private static readonly durationInSeconds: number = 1;
    
    parse(_args: Array<string>): Array<IScriptInstruction> {
        return [new FadeTextInstruction(0, FadeOutCommand.durationInSeconds), new PauseInstruction(FadeOutCommand.durationInSeconds)]
    }
}