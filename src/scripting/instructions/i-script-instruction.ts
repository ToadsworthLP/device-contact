import {ExecutionContext} from "../execution-context.ts";

export interface IScriptInstruction {
    execute(context: ExecutionContext): void;
}