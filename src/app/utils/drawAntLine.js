export default class AntLineDrawer {

  constructor(config) {
    this.unit = config.unit || 1;
    this.antLength = config.antLength || 10;
    this.spaceLength = config.spaceLength || 10;
    this.color = config.color || '#666';
    this.direction = config.direction || 1; // 1 顺时针; 2 逆时针
  }

  setColor(color) {
    this.color = color || this.color;
  }

  draw(ctx, offset) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const length = 2 * (width + height);
    const ant = this.antLength;
    const space = this.spaceLength;
    const segment = ant + space;

    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.lineWidth = this.unit;

    let x = 0;
    let y = 0;
    ctx.moveTo(x, y);
    ctx.beginPath();
    for (let i = 0; i < length; i += 1) {
      offset %= segment;
      if (offset < ant) {
        ctx.lineTo(x, y);
      } else {
        ctx.moveTo(x, y);
      }
      if (this.direction === 1) { // 顺时针
        offset = offset - 1 + segment;
      } else { // 逆时针
        offset += 1;
      }

      if (i < width) {
        // P1: 0 ~ width →
        x += 1;
      } else if (i >= width && i < (width + height)) {
        // P2: width ~ width + height ↓
        y += 1;
      } else if (i >= (width + height) && i < (2 * width + height)) {
        // P3: width + height ~ 2 * width + height ←
        x -= 1;
      } else {
        // P4: 2 * width + height ~ length ↑
        y -= 1;
      }
    }

    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}
