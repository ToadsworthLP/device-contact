import { ScriptContext } from "../script-context.ts";
import {IScriptInstruction} from "./i-script-instruction.ts";

export class NopInstruction implements IScriptInstruction {
    public static readonly instance: NopInstruction = new NopInstruction();
    
    // @ts-ignore
    execute(context: ScriptContext): void {
        
    }
}