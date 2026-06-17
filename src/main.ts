import {DeviceRendererFactory} from "./renderer/device-renderer-factory.ts";
import {TextStyle} from "./renderer/text-style.ts";
import {ScriptParser} from "./scripting/script-parser.ts";
import {ExecutionContext} from "./scripting/execution-context.ts";
import {TextAlignment} from "./renderer/text-alignment.ts";

(async () => {
    const parser = new ScriptParser();
    const parsed = parser.parse("[HideBackground]ARE YOU\n[Pause 1]THERE?\n\n[FadeOut]ARE WE\n[Pause 1]CONNECTED?[Pause 1][FadeOut][ShowBackground]\n\n[Pause 1]IT HAS COME\nTO MY ATTENTION\n\n[FadeOut]THAT[Pause 1]\nTODAY[Pause 1]\nIS A\n\n[FadeOut]VERY,\nVERY,\nSPECIAL DAY.\n\n[FadeOut][Pause 1]LYNNIE.\n\n[FadeOut]IT IS MY HONOR\nTO COMMUNE WITH YOU.\n\n[FadeOut][Pause 2]ALTHOUGH IT IS TIME\nFOR ME TO DEPART,\n\n[FadeOut]I LOOK FORWARD\nTO OUR NEXT\n[Pause 0.5]CONNECTION.\n\n[FadeOut]GOODBYE.[Pause 2][FadeOut][Pause 1]");
    console.log(parsed);
    
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const renderer = await new DeviceRendererFactory().createPixiJsRenderer(canvas);
    
    renderer.showBackground();

    await timeout(1000);
    const text = renderer.createText();
    text.applyStyle(TextStyle.Gaster);

    const context = new ExecutionContext(renderer, text);
    for (const instruction of parsed.instructions) {
        instruction.execute(context);

        if(context.sleepTimeInSeconds > 0) {
            await timeout(context.sleepTimeInSeconds * 1000);
            context.sleepTimeInSeconds = 0;
        }
    }
    
    renderer.hideBackground();
    await timeout(1000);
    const endText = renderer.createText();
    endText.applyStyle(TextStyle.Normal);
    endText.alignment = TextAlignment.TopLeft;
    endText.position = {x: 250, y: 400};
    endText.text = "Happy birthday, Lynnie!";
    endText.fade(0, 0);
    await timeout(100);
    endText.fade(1, 1);
})();

async function timeout(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
