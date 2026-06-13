export class Color {
    public readonly red: number;
    public readonly green: number;
    public readonly blue: number;
    public readonly alpha: number;
    
    constructor(red: number, green: number, blue: number, alpha: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
    
    public toHexRgb(): string {
        return "#" + Color.componentToHex(this.red) + Color.componentToHex(this.green) + Color.componentToHex(this.blue);
    }

    public toHexRgba(): string {
        return "#" + Color.componentToHex(this.red) + Color.componentToHex(this.green) + Color.componentToHex(this.blue) + Color.componentToHex(this.alpha);
    }
    
    private static componentToHex(normalizedValue: number): string {
        const fullRangeValue = Math.round(normalizedValue * 255);
        const hex = fullRangeValue.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
}