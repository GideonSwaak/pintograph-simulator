import { MountPoint } from './MountPoint';
import { transform } from '../math/Matrices';
import { SceneObject } from './SceneObject';
import { Vector2 } from '../math/Vectors';

interface DrawBufferItem extends Vector2 {
	color : string;
	shadowColor : string;
}

export class Pen implements SceneObject {

	public color : ((elapsedTime : number) => string);
	public lineWidth : number = 1;
	public shadowBlur : number = 0;
	public shadowColor : ((elapsedTime : number) => string) = () => 'black';
	private worldPosition: Vector2 = { x: 0, y: 0 };
	private drawBuffer: DrawBufferItem[] = [];

	constructor(private mountedAt: MountPoint, color : string | ((elapsedTime : number) => string), options?: any) {
		
		this.color = typeof color === 'string' ? () => color : color;
		if (options) {
			if (options.lineWidth) this.lineWidth = options.lineWidth;
			if (options.shadowBlur) this.shadowBlur = options.shadowBlur;
			if (options.shadowColor) this.shadowColor = typeof options.shadowColor === 'string' ? () => options.shadowColor : options.shadowColor;
		}
	}

	step(elapsedTime: number, deltaTime: number) {
		transform(this.worldPosition, { x: 0, y: 0 }, this.mountedAt.transformation);
		this.drawBuffer.push({ ...this.worldPosition, color: this.color(elapsedTime), shadowColor: this.shadowColor(elapsedTime) });
	};

	drawDebug(context: CanvasRenderingContext2D) { };

	draw(context: CanvasRenderingContext2D) {
		if (this.drawBuffer.length > 1) {
			context.beginPath();
			context.moveTo(this.drawBuffer[0].x, this.drawBuffer[0].y);

			for (let i = 1; i < this.drawBuffer.length; ++i) {
				context.lineTo(this.drawBuffer[i].x, this.drawBuffer[i].y);
			}

			context.strokeStyle = this.drawBuffer[0].color;
			context.lineWidth = this.lineWidth;
			context.shadowBlur = this.shadowBlur;
			context.shadowColor = this.drawBuffer[0].shadowColor;
			context.stroke();

			this.drawBuffer = [ this.drawBuffer[this.drawBuffer.length - 1] ];
		}
	}
}
