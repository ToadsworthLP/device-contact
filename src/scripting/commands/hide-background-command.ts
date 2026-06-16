import {IScriptCommand} from "./i-script-command.ts";
import {IScriptInstruction} from "../instructions/i-script-instruction.ts";
import {HideBackgroundInstruction} from "../instructions/hide-background-instruction.ts";

export class HideBackgroundCommand implements IScriptCommand {
    parse(_args: Array<string>): Array<IScriptInstruction> {
        return [new HideBackgroundInstruction()]
    }
}