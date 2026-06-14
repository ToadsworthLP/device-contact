import {DeviceRendererFactory} from "./renderer/device-renderer-factory.ts";
import {TextAlignment} from "./renderer/text-alignment.ts";
import {TextStyle} from "./renderer/text-style.ts";

(async () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const renderer = await new DeviceRendererFactory().createPixiJsRenderer(canvas);
    
    renderer.showBackground();
    const text = renderer.createText();
    
    text.applyStyle(TextStyle.Gaster);
    text.text = "ARE WE\nCONNECTED?";
    await timeout(5000);

    const text2 = renderer.createText();
    text2.text = "Test";
    text2.position = {x: canvas.width / 2, y: canvas.height / 4};

    renderer.hideBackground();
    text.applyStyle(TextStyle.Normal)
    text.alignment = TextAlignment.TopLeft;
    text.position = {x: 0, y: 0};
    text.text = "No. We're not.";
    await timeout(5000);

    renderer.showBackground();
    text.applyStyle(TextStyle.Gaster);
    text.alignment = TextAlignment.Center;
    text.position = {x: canvas.width / 2, y: canvas.height / 2};
    text.text = "HOW VERY\nUNFORTUNATE.";
    text.shownCharacters = 8;
    await timeout(1000);
    
    text.shownCharacters = undefined;
    await timeout(2000);
    
    text2.destroy();
})();

async function timeout(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
