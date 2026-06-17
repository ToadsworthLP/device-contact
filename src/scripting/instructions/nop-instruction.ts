import {IScriptInstruction} from "./i-script-instruction.ts";
import {ExecutionContext} from "../execution-context.ts";

export class NopInstruction implements IScriptInstruction {
    public static readonly instance: NopInstruction = new NopInstruction();
    
    // @ts-ignore
    execute(context: ExecutionContext): void {
        
    }
}