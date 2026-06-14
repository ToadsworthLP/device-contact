import {IScriptInstruction} from "./instructions/i-script-instruction.ts";

export class Script {
    public readonly instructions: Array<IScriptInstruction>;
    
    constructor(instructions: Array<IScriptInstruction>) {
        this.instructions = instructions;
    }
}