export default class GraphDrawer {

  constructor(config) {
    this.unit = config.unit || 1;
    this.ratio = config.ratio || 1;
    this.color = config.color || '#f33';
    this.coordinate = config.coordinate;
    this.startX = config.startX || 0;
    this.startY = config.startY || 0;
  }

  makeEquation(equation) {
    if (typeof equation === 'function') {
      return x => this.ratio * equation(x / this.ratio);
    } else {
      // 解析字符串型数学表达式 返回一个输入参数为x并返回计算结果的函数
      return 0;
    }
  }

  drawCoordinateSystem(ctx, coordinateStyle) {
    let coordinate = '#ccc';
    if (coordinateStyle) {
      coordinate = coordinateStyle;
    } else if (this.coordinate && this.coordinate !== true) {
      coordinate = this.coordinate;
    }
    ctx.save();
    ctx.strokeStyle = coordinate;
    ctx.fillStyle = coordinate;

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const zeroPointX = 0 - this.startX;
    const zeroPointY = height + this.startY;

    ctx.beginPath();
    if (zeroPointY <= height) { // X轴未超出画板范围
      ctx.moveTo(0, zeroPointY);
      ctx.lineTo(width, zeroPointY);
    }
    if (zeroPointX > 0) { // Y轴未超出画板范围
      ctx.moveTo(zeroPointX, height);
      ctx.lineTo(zeroPointX, 0);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    if (zeroPointY <= height) { // X轴未超出画板范围
      ctx.moveTo(width, zeroPointY);
      ctx.lineTo(width - 10, zeroPointY - 5);
      ctx.lineTo(width - 10, zeroPointY + 5);
      ctx.lineTo(width, zeroPointY);
    }
    if (zeroPointX > 0) { // Y轴未超出画板范围
      ctx.moveTo(zeroPointX, 0);
      ctx.lineTo(zeroPointX - 5, 10);
      ctx.lineTo(zeroPointX + 5, 10);
      ctx.lineTo(zeroPointX, 0);
    }
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  setColor(color) {
    this.color = color || this.color;
  }

  draw(x1, x2, equation, canvas) {
    const zeroPointX = 0 - this.startX;
    const zeroPointY = canvas.canvas.height + this.startY;
    if (canvas && x1 <= x2) {
      let offsetX = zeroPointX + x1;
      equation = this.makeEquation(equation);

      canvas.save();
      canvas.strokeStyle = this.color;
      canvas.fillStyle = this.color;
      canvas.lineWidth = this.unit;
      canvas.moveTo(offsetX, zeroPointY);
      canvas.beginPath();
      for (let x = x1; x <= x2; x += 1) {
        canvas.lineTo(offsetX, zeroPointY - equation(x));
        offsetX += 1;
      }
      canvas.stroke();
      canvas.closePath();
      canvas.restore();
    }
  }

}
