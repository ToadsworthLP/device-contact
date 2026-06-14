import {ScriptContext} from "../script-context.ts";

export interface IScriptInstruction {
    execute(context: ScriptContext): void;
}