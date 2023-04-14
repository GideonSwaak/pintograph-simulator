export default class AbstractCustomDrawer {
    ctx;

    setContext(ctx) {
        this.ctx = ctx;
    }

    draw() {
        throw new Error("AbstractCustomDrawer.draw() not implemented");
    }
}