import {DeviceRendererFactory} from "./renderer/device-renderer-factory.ts";
import {TextStyle} from "./renderer/text-style.ts";
import {ScriptParser} from "./scripting/script-parser.ts";
import {ExecutionContext} from "./scripting/execution-context.ts";

(async () => {
    const parser = new ScriptParser();
    const parsed = parser.parse("[HideBackground]FIRST LINE\nSECOND LINE[ShowBackground]\n\n[FadeOut]SECOND PAGE FIRST LINE\nSECOND PAGE SECOND LINE");
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
})();

async function timeout(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
