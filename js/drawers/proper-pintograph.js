import * as Pintograph from "../libraries/pintograph.js";

export class ProperPintograph {
    mountPoint1 = { x: 250, y: 500 };
    mountPoint2 = { x: 550, y: 500 };
    wheel1 = { radius: 80, startAngle: 0, speed: -0.303 };
    subwheel1 = { radius: 20, startAngle: 0, speed: 0.909 };
    wheel2 = { radius: 100, startAngle: -Math.PI / 2, speed: 0.3 };
    subwheel2 = { radius: 30, startAngle: Math.PI, speed: -0.9 };
    xArm = { length1: 250, length2: 250, extensionLength1: 60, extensionLength2: 60, flip: false };
    vArm = { length1: 60, length2: 60, flip: true };
    flip = false;
    penSize = 1;
    penColor = "black";
    shadowBlur = 0;
    shadowColor = "black";

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

    setMountPoints(x1, y1, x2, y2) {
        this.mountPoint1 = { x: x1, y: y1 }
        this.mountPoint2 = { x: x2, y: y2 }
    }

    setWheel1(radius, startAngle, speed) {
        this.wheel1 = { radius, startAngle, speed };
    }
    
    setWheel2(radius, startAngle, speed) {
        this.wheel2 = { radius, startAngle, speed };
    }

    setSubwheel1(radius, startAngle, speed) {
        this.subwheel1 = { radius, startAngle, speed };
    }

    setSubwheel2(radius, startAngle, speed) {
        this.subwheel2 = { radius, startAngle, speed };
    }

    setXArm(length1, extensionLength1, length2, extensionLength2, flip) {
        this.xArm = { length1, extensionLength1, length2, extensionLength2, flip };
    }

    setVArm(length1, length2, flip) {
        this.vArm = { length1, length2, flip };
    }

    setPenSettings(penSize, penColor, shadowBlur, shadowColor) {
        this.penSize = penSize;
        this.penColor = penColor;
        this.shadowBlur = shadowBlur;
        this.shadowColor = shadowColor;
    }

    build(scene) {
        let mountPoint1 = new Pintograph.StaticMountPoint({x: this.mountPoint1.x, y: this.mountPoint1.y});
        let mountPoint2 = new Pintograph.StaticMountPoint({x: this.mountPoint2.x, y: this.mountPoint2.y});
        let wheel1 = new Pintograph.Wheel(mountPoint1, this.wheel1.radius, this.wheel1.startAngle, this.wheel1.speed);
        let wheel2 = new Pintograph.Wheel(mountPoint2, this.wheel2.radius, this.wheel2.startAngle, this.wheel2.speed);
        let subwheel1 = new Pintograph.Wheel(wheel1.mountPoint, this.subwheel1.radius, this.subwheel1.startAngle, this.subwheel1.speed);
        let subwheel2 = new Pintograph.Wheel(wheel2.mountPoint, this.subwheel2.radius, this.subwheel2.startAngle, this.subwheel2.speed);
        
        let xArm = new Pintograph.XArm({
            mountedAt1: subwheel1.mountPoint,
            mountedAt2: subwheel2.mountPoint,
            length1: this.xArm.length1,
            extensionLength1: this.xArm.extensionLength1,
            length2: this.xArm.length2,
            extensionLength2: this.xArm.extensionLength2,
            flip: this.xArm.flip
        });

        let arm = new Pintograph.VArm({
            mountedAt1: xArm.mountPoint1,
            mountedAt2: xArm.mountPoint2,
            length1: this.vArm.length1,
            length2: this.vArm.length2,
            flip: this.vArm.flip
        });
        
        let pen = new Pintograph.Pen(arm.mountPoint, this.penColor, {
            lineWidth: this.penSize,
            shadowBlur: this.shadowBlur,
            shadowColor: this.shadowColor
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