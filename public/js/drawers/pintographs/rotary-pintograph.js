import * as Pintograph from '/pintograph/dist/pintograph.js';

export const defaults = () => ({
    mountPoint: { x: 250, y: 250 },
    baseWheel1: { radius: 200, startAngle: 0, speed: 0.201 },
    baseWheel2: { radius: 200, startAngle: Math.PI / 6, speed: 0.201 },
    wheel1: { radius: 20, startAngle: -Math.PI, speed: 6 },
    wheel2: { radius: 40, startAngle: 0, speed: 2 },
    armLength1: 80,
    armLength2: 100,
    flip: true,
    penSettings: { color: "#000000", size: 1, shadowBlur: 0, shadowColor: "#000000" }
});

export class RotaryPintograph {

    constructor({ mountPoint, baseWheel1, baseWheel2, wheel1, wheel2, armLength1, armLength2, flip, penSettings } = defaults()) {
        this.mountPoint = mountPoint;
        this.baseWheel1 = baseWheel1;
        this.baseWheel2 = baseWheel2;
        this.wheel1 = wheel1;
        this.wheel2 = wheel2;
        this.armLength1 = armLength1;
        this.armLength2 = armLength2;
        this.flip = flip;
        this.penSettings = penSettings;
    }
    
    scale(scaling) {
        this.mountPoint.x /= scaling;
        this.mountPoint.y /= scaling;
        this.baseWheel1.radius /= scaling;
        this.baseWheel2.radius /= scaling;
        this.wheel1.radius /= scaling;
        this.wheel2.radius /= scaling;
        this.armLength1 /= scaling;
        this.armLength2 /= scaling;
    }

    build(scene) {
        let center = new Pintograph.StaticMountPoint(this.mountPoint);
        let baseWheel1 = new Pintograph.Wheel(center, this.baseWheel1.radius, this.baseWheel1.startAngle, this.baseWheel1.speed, this.penSettings.toolColor);
        let baseWheel2 = new Pintograph.Wheel(center, this.baseWheel2.radius, this.baseWheel2.startAngle, this.baseWheel2.speed, this.penSettings.toolColor);
        let wheel1 = new Pintograph.Wheel(baseWheel1.mountPoint, this.wheel1.radius, this.wheel1.startAngle, this.wheel1.speed, this.penSettings.toolColor);
        let wheel2 = new Pintograph.Wheel(baseWheel2.mountPoint, this.wheel2.radius, this.wheel2.startAngle, this.wheel2.speed, this.penSettings.toolColor);
    
        let arm = new Pintograph.VArm({
            mountedAt1: wheel1.mountPoint,
            mountedAt2: wheel2.mountPoint,
            length1: this.armLength1,
            length2: this.armLength2,
            flip: this.flip
        }, this.penSettings.toolColor);
    
        let pen = new Pintograph.Pen(arm.mountPoint, this.penSettings.color, {
            lineWidth: this.penSettings.size,
            shadowBlur: this.penSettings.shadowBlur,
            shadowColor: this.penSettings.shadowColor
        });
        
        scene.objects.push(center);
        scene.objects.push(baseWheel1);
        scene.objects.push(baseWheel2);
        scene.objects.push(wheel1);
        scene.objects.push(wheel2);
        scene.objects.push(arm);
        scene.pens.push(pen);
    }
}