import * as Pintograph from "../libraries/pintograph.js";

export class SimplePintograph {
    mountPoint1 = { x: 200, y: 450 };
    mountPoint2 = { x: 600, y: 450 };
    wheel1 = { radius: 150, startAngle: 0, speed: 0.5 };
    wheel2 = { radius: 100, startAngle: -Math.PI / 2, speed: 0.51 };
    armLength1 = 300;
    armLength2 = 350;
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
        this.armLength1 /= scaling;
        this.armLength2 /= scaling;
    }

    setMountPoints(x1, y1, x2, y2) {
        this.mountPoint1 = { x: x1, y: y1 };
        this.mountPoint2 = { x: x2, y: y2 };
    }

    setWheel1(radius, startAngle, speed) {
        this.wheel1 = { radius, startAngle, speed };
        console.log({ radius, startAngle, speed });
    }
    
    setWheel2(radius, startAngle, speed) {
        this.wheel2 = { radius, startAngle, speed };
        console.log({ radius, startAngle, speed });
    }

    setArmLengths(armLength1, armLength2) {
        this.armLength1 = armLength1;
        this.armLength2 = armLength2;
        console.log(armLength1, armLength2);
    }

    setFlip(flip) {
        this.flip = flip;
    }

    setPenSettings(penSize, penColor, shadowBlur, shadowColor) {
        this.penSize = penSize;
        this.penColor = penColor;
        this.shadowBlur = shadowBlur;
        this.shadowColor = shadowColor;
    }


    build(scene) {
        let mountPoint1 = new Pintograph.StaticMountPoint(this.mountPoint1);
        let mountPoint2 = new Pintograph.StaticMountPoint(this.mountPoint2);
        let wheel1 = new Pintograph.Wheel(mountPoint1, this.wheel1.radius, this.wheel1.startAngle, this.wheel1.speed);
        let wheel2 = new Pintograph.Wheel(mountPoint2, this.wheel2.radius, this.wheel2.startAngle, this.wheel2.speed);
        
        let arm = new Pintograph.VArm({
            mountedAt1: wheel1.mountPoint,
            mountedAt2: wheel2.mountPoint,
            length1: this.armLength1,
            length2: this.armLength2,
            flip: this.flip
        });

        let pen = new Pintograph.Pen(arm.mountPoint, this.penColor, {
            lineWidth: this.penSize,
            shadowBlur: this.shadowBlur,
            shadowColor: this.shadowColor
        });
        
        scene.objects.push(mountPoint1);
        scene.objects.push(mountPoint2);
        scene.objects.push(wheel1);
        scene.objects.push(wheel2);
        scene.objects.push(arm);
        scene.pens.push(pen);
    }
}