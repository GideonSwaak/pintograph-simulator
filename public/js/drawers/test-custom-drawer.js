import AbstractCustomDrawer from "./abstract-custom-drawer.js";

export default class TestCustomDrawer extends AbstractCustomDrawer {
    xSpeed = 1;
    x = 100;
    draw() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(0, 0, this.x, 100);
        this.x += this.xSpeed;
    }
}
