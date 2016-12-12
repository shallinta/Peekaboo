export default class LoadingDrawer {

  constructor(config) {
    this.color = config.color || '#99c';
    this.duration = config.duration || 3000; // 周期
    this.radius = config.radius || 3; // 小圆点半径
    this.delay = config.delay || 80; // 延迟
    this.count = config.count || 5; // 小圆点数量
    this.type = config.type || 1; // 使用的动画曲线
  }

  setColor(color) {
    this.color = color || this.color;
  }

  draw(ctx, t, style) {
    style = style || LoadingDrawer.styles.LINE;
    this[`draw${style}`](ctx, t);
  }

  drawLine(ctx, t) {
    const width = ctx.canvas.width + 2 * this.radius;
    const height = ctx.canvas.height;

    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;

    const y = height / 2;
    let x = 0;

    for (let i = 0; i < this.count; i += 1) {
      x = this.ease(t) * width - this.radius;
      ctx.moveTo(x, y);
      ctx.beginPath();
      ctx.arc(x, y, this.radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      t -= this.delay;
      t = t > 0 ? t : 0;
    }
    ctx.restore();
  }

  drawCircle(ctx, t) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const r = Math.min(width, height) / 2 - this.radius; // 半径
    const x0 = width / 2; // 圆心x
    const y0 = height / 2; // 圆心y

    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    let x = x0;
    let y = y0 + r;
    let angle = 0;

    for (let i = 0; i < this.count; i += 1) {
      angle = ((7 / 4 - this.ease(t, width)) % 1) * Math.PI * 2;
      x = x0 + Math.cos(angle) * r;
      y = y0 - Math.sin(angle) * r;
      ctx.moveTo(x, y);
      ctx.beginPath();
      ctx.arc(x, y, this.radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      t -= this.delay;
      t = t > 0 ? t : 0;
    }
    ctx.restore();
  }

  ease(t) {
    switch (this.type) {
      case 1:
        return this.easeTangent(t);
      case 2:
        return this.easeCircle(t);
      default:
    }
    return this.easeTangent(t);
  }

  easeTangent(t) {
    const d = 1 / 2;
    const x = (t % this.duration) / this.duration;
    return d / Math.tan(1) * (Math.tan((x - d) / d) + Math.tan(1));
  }

  easeCircle(t) {
    const d = 1 / 2;
    let x = (t % this.duration) / this.duration;
    if (x < d) {
      return d * Math.sqrt(1 - (x = (x - d) / d) * x);
    } else {
      return 1 - d * Math.sqrt(1 - (x = (x - d) / d) * x);
    }
  }
}

LoadingDrawer.styles = {
  LINE: 'Line',
  CIRCLE: 'Circle',
};
