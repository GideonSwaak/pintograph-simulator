import { SceneObject } from "./SceneObject";
import { MountPoint } from "./MountPoint";
import { Vector2, subtractVectors, distance, getAngle } from "../math/Vectors";
import { transform, identity, Matrix3, fromRotation, fromTranslation, multiply } from "../math/Matrices";
import { EPSILON, circleCircleIntersection } from "../math/MathUtils";
import { drawMountPoint } from "./rendering/drawMountPoint";

export interface VArmParameters {
	mountedAt1 : MountPoint;
	mountedAt2 : MountPoint;
	length1 : number;
	length2 : number;
	flip : boolean;
}

export class VArm implements SceneObject {

	public mountPoint : MountPoint = { transformation: identity() };

	public mountedAt1 : MountPoint;
	public mountedAt2 : MountPoint;
	public length1 : number;
	public length2 : number;
	public flip : boolean;

	private mountedAt1WS : Vector2 = { x: 0, y: 0 };
	private mountedAt2WS : Vector2 = { x: 0, y: 0 };

	private mountPointTranslation : Matrix3 = identity();
	private mountPointRotation : Matrix3 = identity();

	constructor(parameters : VArmParameters) {
		this.mountedAt1 = parameters.mountedAt1;
		this.mountedAt2 = parameters.mountedAt2;
		this.length1 = parameters.length1;
		this.length2 = parameters.length2;
		this.flip = parameters.flip;
	}

	step(elapsedTime: number, deltaTime: number) {
		transform(this.mountedAt1WS, { x: 0, y: 0 }, this.mountedAt1.transformation);
		transform(this.mountedAt2WS, { x: 0, y: 0 }, this.mountedAt2.transformation);

		let d = distance(this.mountedAt1WS, this.mountedAt2WS);
		if (d < EPSILON) {
			throw new Error("Mount points are placed too close to each other.");
		}

		if (d > this.length1 + this.length2) {
			throw new Error("Arms are too short.");
		}

		let possibleMountPoints = circleCircleIntersection(this.mountedAt1WS, this.length1, this.mountedAt2WS, this.length2);
		let mountPointPosition = this.flip ? possibleMountPoints[1] : possibleMountPoints[0];
		let mountPointRotationVector = subtractVectors(mountPointPosition, this.mountedAt1WS);
		let mountPointRotation = getAngle(mountPointRotationVector);

		fromRotation(this.mountPointRotation, mountPointRotation);
		fromTranslation(this.mountPointTranslation, mountPointPosition.x, mountPointPosition.y);

		multiply(this.mountPoint.transformation, this.mountPointTranslation, this.mountPointRotation);
	}

	drawDebug(context: CanvasRenderingContext2D) {
		let mountPointWS = {x: 0, y: 0};
		transform(mountPointWS, {x: 0, y: 0}, this.mountPoint.transformation);

		context.beginPath();
		context.moveTo(this.mountedAt1WS.x, this.mountedAt1WS.y);
		context.lineTo(mountPointWS.x, mountPointWS.y);
		context.lineTo(this.mountedAt2WS.x, this.mountedAt2WS.y);
		context.lineWidth = 3;
		context.strokeStyle = 'lime';
		context.stroke();

		context.lineWidth = 1;
		drawMountPoint(context, this.mountPoint.transformation);
	}
}
