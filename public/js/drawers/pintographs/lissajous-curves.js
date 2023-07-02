import * as Pintograph from "../../../pintograph/dist/pintograph.js";

export const defaults = () => ({
    mountPoint: { x: 400, y: 300 },
    hOscillator: { length: 500, angle: 0, speed: 0.6 },
    vOscillator: { length: 500, angle: -Math.PI / 2, speed: 0.5 },
    penSettings: { color: "#000000", size: 1, shadowBlur: 0, shadowColor: "#000000" }
});

export class LissajousCurves {
    
    constructor({ mountPoint, hOscillator, vOscillator, penSettings } = defaults()) {
        if (mountPoint) this.mountPoint = mountPoint;
        if (hOscillator) this.hOscillator = hOscillator;
        if (vOscillator) this.vOscillator = vOscillator;
        if (penSettings) this.penSettings = penSettings;
    }

    scale(scaling) {
        this.mountPoint.x /= scaling;
        this.mountPoint.y /= scaling;
        this.hOscillator.length /= scaling;
        this.vOscillator.length /= scaling;
    }

    build(scene) {
        let mountPoint = new Pintograph.StaticMountPoint(this.mountPoint);
        let hOscillator = new Pintograph.Oscillator(mountPoint, this.hOscillator.length, this.hOscillator.angle, this.hOscillator.speed, this.penSettings.toolColor);
        let vOscillator = new Pintograph.Oscillator(hOscillator.mountPoint, this.vOscillator.length, this.vOscillator.angle, this.vOscillator.speed, this.penSettings.toolColor);
        let pen = new Pintograph.Pen(vOscillator.mountPoint, this.penSettings.color, {
            lineWidth: this.penSettings.size,
            shadowBlur: this.penSettings.shadowBlur,
            shadowColor: this.penSettings.shadowColor
        });

        scene.objects.push(mountPoint);
        scene.objects.push(hOscillator);
        scene.objects.push(vOscillator);
        scene.pens.push(pen);
    }
}