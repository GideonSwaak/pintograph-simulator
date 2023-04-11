import * as Pintograph from "../libraries/pintograph.js";

export class LissajousCurves {
    mountPoint = { x: 400, y: 300 };
    hOscillator = { length: 500, angle: 0, speed: 0.6 };
    vOscillator = { length: 500, angle: -Math.PI / 2, speed: 0.5 };

    penSize = 1;
    penColor = "black";
    shadowBlur = 0;
    shadowColor = "black";
    scale(scaling) {
        this.mountPoint.x /= scaling;
        this.mountPoint.y /= scaling;
        this.hOscillator.length /= scaling;
        this.vOscillator.length /= scaling;
    }

    setMountPoint(x, y) {
        this.mountPoint = { x, y };
    }

    setHOscillator(length, angle, speed) {
        this.hOscillator = { length, angle, speed };
    }

    setVOscillator(length, angle, speed) {
        this.vOscillator = { length, angle, speed };
    }

    setPenSettings(penSize, penColor, shadowBlur, shadowColor) {
        this.penSize = penSize;
        this.penColor = penColor;
        this.shadowBlur = shadowBlur;
        this.shadowColor = shadowColor;
    }

    build(scene) {
        let mountPoint = new Pintograph.StaticMountPoint({ x: this.mountPoint.x, y: this.mountPoint.y});
        let hOscillator = new Pintograph.Oscillator(mountPoint, this.hOscillator.length, this.hOscillator.angle, this.hOscillator.speed);
        let vOscillator = new Pintograph.Oscillator(hOscillator.mountPoint, this.vOscillator.length, this.vOscillator.angle, this.vOscillator.speed);
        let pen = new Pintograph.Pen(vOscillator.mountPoint, this.penColor, {
            lineWidth: this.penSize,
            shadowBlur: this.shadowBlur,
            shadowColor: this.shadowColor
        });
    
        scene.objects.push(mountPoint);
        scene.objects.push(hOscillator);
        scene.objects.push(vOscillator);
        scene.pens.push(pen);
    }
}