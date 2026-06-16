import {IScriptInstruction} from "../instructions/i-script-instruction.ts";

export interface IScriptCommand {
    parse(args: Array<string>): Array<IScriptInstruction>;
}