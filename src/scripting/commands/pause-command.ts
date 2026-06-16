import {IScriptCommand} from "./i-script-command.ts";
import {IScriptInstruction} from "../instructions/i-script-instruction.ts";
import {PauseInstruction} from "../instructions/pause-instruction.ts";

export class PauseCommand implements IScriptCommand {
    parse(args: Array<string>): Array<IScriptInstruction> {
        const duration = parseInt(args[0]);
        if(isNaN(duration)) {
            return [];
        }
        
        return [new PauseInstruction(duration)];
    }
}