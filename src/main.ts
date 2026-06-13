import {DeviceRendererFactory} from "./renderer/device-renderer-factory.ts";
import {TextAlignment} from "./renderer/text-alignment.ts";
import {TextStyle} from "./renderer/text-style.ts";

(async () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const renderer = await new DeviceRendererFactory().createPixiJsRenderer(canvas);
    
    renderer.showBackground();
    renderer.setText("ARE WE\nCONNECTED?");
    renderer.setTextStyle(TextStyle.Gaster);

    await timeout(5000);
    renderer.setText("No. We're not.")
    renderer.setTextAlignment(TextAlignment.TopLeft);
    renderer.setTextPosition(0.1, 0.1);
    renderer.setTextStyle(TextStyle.Normal);
    renderer.hideBackground();

    await timeout(5000);
    renderer.setText("HOW VERY\nUNFORTUNATE.");
    renderer.setTextAlignment(TextAlignment.Center);
    renderer.setTextPosition(0.5, 0.5);
    renderer.setTextStyle(TextStyle.Gaster);
    renderer.showBackground();
})();

async function timeout(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
