import {IScriptInstruction} from "./i-script-instruction.ts";
import {ExecutionContext} from "../execution-context.ts";

export class CharacterPauseInstruction implements IScriptInstruction {
    private static readonly characterPauseDurationInSeconds: number = 0.03333333333333333;
    private static readonly specialCharacterPauseMultipliers: Map<string, number> = new Map<string, number>([
        [".", 4],
        [",", 4],
        ["!", 4],
        ["?", 4],
        ["\n", 10],
    ]);

    execute(context: ExecutionContext): void {
        const currentCharacterIndex = context.defaultText.shownCharacters ?? context.defaultText.text.length;
        const currentCharacter = context.defaultText.text[currentCharacterIndex];
        const currentCharacterSpeedMultiplier = CharacterPauseInstruction.specialCharacterPauseMultipliers.get(currentCharacter);
        
        context.sleepTimeInSeconds += CharacterPauseInstruction.characterPauseDurationInSeconds * (currentCharacterSpeedMultiplier ?? 1) * (1 / context.typewriterSpeedMultiplier);
    }
}