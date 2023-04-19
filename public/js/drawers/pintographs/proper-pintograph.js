import * as Pintograph from "../../libraries/pintograph.js";

export const defaults = () => ({
    mountPoint1: { x: 250, y: 500 },
    mountPoint2: { x: 550, y: 500 },
    wheel1: { radius: 80, startAngle: 0, speed: -0.303 },
    subwheel1: { radius: 20, startAngle: 0, speed: 0.909 },
    wheel2: { radius: 100, startAngle: -Math.PI / 2, speed: 0.3 },
    subwheel2: { radius: 30, startAngle: Math.PI, speed: -0.9 },
    xArm: { length1: 250, length2: 250, extensionLength1: 60, extensionLength2: 60, flip: false },
    vArm: { length1: 60, length2: 60, flip: true },
    flip: false,
    penSettings: { color: "#000000", size: 1, shadowBlur: 0, shadowColor: "#000000" }
});

export class ProperPintograph {

    constructor({ mountPoint1, mountPoint2, wheel1, subwheel1, wheel2, subwheel2, xArm, vArm, flip, penSettings } = defaults()) {
        this.mountPoint1 = mountPoint1;
        this.mountPoint2 = mountPoint2;
        this.wheel1 = wheel1;
        this.subwheel1 = subwheel1;
        this.wheel2 = wheel2;
        this.subwheel2 = subwheel2;
        this.xArm = xArm;
        this.vArm = vArm;
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
        this.subwheel1.radius /= scaling;
        this.subwheel2.radius /= scaling;
        this.xArm.length1 /= scaling;
        this.xArm.length2 /= scaling;
        this.xArm.extensionLength1 /= scaling;
        this.xArm.extensionLength2 /= scaling;
        this.vArm.length1 /= scaling;
        this.vArm.length2 /= scaling;
    }

    build(scene) {
        let mountPoint1 = new Pintograph.StaticMountPoint(this.mountPoint1);
        let mountPoint2 = new Pintograph.StaticMountPoint(this.mountPoint2);
        let wheel1 = new Pintograph.Wheel(mountPoint1, this.wheel1.radius, this.wheel1.startAngle, this.wheel1.speed, this.penSettings.toolColor);
        let wheel2 = new Pintograph.Wheel(mountPoint2, this.wheel2.radius, this.wheel2.startAngle, this.wheel2.speed, this.penSettings.toolColor);
        let subwheel1 = new Pintograph.Wheel(wheel1.mountPoint, this.subwheel1.radius, this.subwheel1.startAngle, this.subwheel1.speed, this.penSettings.toolColor);
        let subwheel2 = new Pintograph.Wheel(wheel2.mountPoint, this.subwheel2.radius, this.subwheel2.startAngle, this.subwheel2.speed, this.penSettings.toolColor);
        
        let xArm = new Pintograph.XArm({
            mountedAt1: subwheel1.mountPoint,
            mountedAt2: subwheel2.mountPoint,
            ...this.xArm
        }, this.penSettings.toolColor);

        let arm = new Pintograph.VArm({
            mountedAt1: xArm.mountPoint1,
            mountedAt2: xArm.mountPoint2,
            ...this.vArm
        }, this.penSettings.toolColor);
        
        let pen = new Pintograph.Pen(arm.mountPoint, this.penSettings.color, {
            lineWidth: this.penSettings.size,
            shadowBlur: this.penSettings.shadowBlur,
            shadowColor: this.penSettings.shadowColor
        });
        
        scene.objects.push(mountPoint1);
        scene.objects.push(mountPoint2);
        scene.objects.push(wheel1);
        scene.objects.push(subwheel1);
        scene.objects.push(wheel2);
        scene.objects.push(subwheel2);
        scene.objects.push(xArm);
        scene.objects.push(arm);
        scene.pens.push(pen);
    }
}