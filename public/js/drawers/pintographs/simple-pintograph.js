import * as Pintograph from "/pintograph/dist/pintograph.js";

export const defaults = () => ({
    mountPoint1: { x: 200, y: 450 },
    mountPoint2: { x: 600, y: 450 },
    wheel1: { radius: 150, startAngle: 0, speed: 0.5 },
    wheel2: { radius: 100, startAngle: -Math.PI / 2, speed: 0.51 },
    armLength1: 300,
    armLength2: 350,
    flip: false,
    penSettings: { size: 1, color: "#000000", shadowBlur: 0, shadowColor: "#000000" }
})

export class SimplePintograph {

    constructor({ mountPoint1, mountPoint2, wheel1, wheel2, armLength1, armLength2, flip, penSettings} = defaults()) {
        this.mountPoint1 = mountPoint1;
        this.mountPoint2 = mountPoint2;
        this.wheel1 = wheel1;
        this.wheel2 = wheel2;
        this.armLength1 = armLength1;
        this.armLength2 = armLength2;
        this.flip = flip;
        this.penSettings = penSettings;
    }

    scale(scaling) {
        this.mountPoint1.x /= scaling;
        this.mountPoint1.y /= scaling;
        this.mountPoint2.x /= scaling;
        this.mountPoint2.y /= scaling;
        this.wheel1.radius /= scaling;
        this.wheel2.radius /= scaling;
        this.armLength1 /= scaling;
        this.armLength2 /= scaling;
    }

    build(scene) {
        let mountPoint1 = new Pintograph.StaticMountPoint(this.mountPoint1);
        let mountPoint2 = new Pintograph.StaticMountPoint(this.mountPoint2);
        let wheel1 = new Pintograph.Wheel(mountPoint1, this.wheel1.radius, this.wheel1.startAngle, this.wheel1.speed, this.penSettings.toolColor, s => s * 4);
        let wheel2 = new Pintograph.Wheel(mountPoint2, this.wheel2.radius, this.wheel2.startAngle, this.wheel2.speed, this.penSettings.toolColor);
        
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
        
        scene.objects.push(mountPoint1);
        scene.objects.push(mountPoint2);
        scene.objects.push(wheel1);
        scene.objects.push(wheel2);
        scene.objects.push(arm);
        scene.pens.push(pen);
    }

}