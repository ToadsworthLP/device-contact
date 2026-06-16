import {IScriptCommand} from "./i-script-command.ts";
import {IScriptInstruction} from "../instructions/i-script-instruction.ts";
import {ShowBackgroundInstruction} from "../instructions/show-background-instruction.ts";

export class ShowBackgroundCommand implements IScriptCommand {
    parse(_args: Array<string>): Array<IScriptInstruction> {
        return [new ShowBackgroundInstruction()]
    }
}