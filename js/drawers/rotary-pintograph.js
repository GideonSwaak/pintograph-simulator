import * as Pintograph from '../libraries/pintograph.js';

export class RotaryPintograph {
    mountPoint = { x: 250, y: 250 };
    baseWheel1 = { radius: 200, startAngle: 0, speed: 0.201 };
    baseWheel2 = { radius: 200, startAngle: Math.PI / 6, speed: 0.201 };
    wheel1 = { radius: 20, startAngle: -Math.PI, speed: 6 };
    wheel2 = { radius: 40, startAngle: 0, speed: 2 };
    armLength1 = 80;
    armLength2 = 100;
    flip = true;
    penColor = '#000';
    penSize = 1;
    shadowBlur = 0;
    shadowColor = '#000';

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

    setMountPoint(x, y) {
        this.mountPoint = { x, y };
    }

    setBaseWheel1(radius, startAngle, speed) {
        this.baseWheel1 = { radius, startAngle, speed };
    }

    setBaseWheel2(radius, startAngle, speed) {
        this.baseWheel2 = { radius, startAngle, speed };
    }

    setWheel1(radius, startAngle, speed) {
        this.wheel1 = { radius, startAngle, speed };
    }

    setWheel2(radius, startAngle, speed) {
        this.wheel2 = { radius, startAngle, speed };
    }

    setArmLength1(length) {
        this.armLength1 = length;
    }

    setArmLength2(length) {
        this.armLength2 = length;
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
        let center = new Pintograph.StaticMountPoint(this.mountPoint);
        let baseWheel1 = new Pintograph.Wheel(center, this.baseWheel1.radius, this.baseWheel1.startAngle, this.baseWheel1.speed);
        let baseWheel2 = new Pintograph.Wheel(center, this.baseWheel2.radius, this.baseWheel2.startAngle, this.baseWheel2.speed);
        let wheel1 = new Pintograph.Wheel(baseWheel1.mountPoint, this.wheel1.radius, this.wheel1.startAngle, this.wheel1.speed);
        let wheel2 = new Pintograph.Wheel(baseWheel2.mountPoint, this.wheel2.radius, this.wheel2.startAngle, this.wheel2.speed);
    
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
        
        scene.objects.push(center);
        scene.objects.push(baseWheel1);
        scene.objects.push(baseWheel2);
        scene.objects.push(wheel1);
        scene.objects.push(wheel2);
        scene.objects.push(arm);
        scene.pens.push(pen);
    }
}