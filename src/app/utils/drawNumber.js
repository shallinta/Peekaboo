export default class NumberDrawer {

  constructor(config) {
    this.lineWidth = 1;
    this.lineColor = '#333';
    this.numberWidth = 100;
    this.heightRatio = 2 / (Math.sqrt(5) - 1);
    this.backColor = 'rgba(240, 240, 240, .4)';
    if (config) {
      this.lineWidth = config.lineWidth || this.lineWidth;
      this.lineColor = config.lineColor || this.lineColor;
      this.numberWidth = config.numberWidth || this.numberWidth;
      this.heightRatio = config.heightRatio || this.heightRatio;
      this.halfLineWidth = this.lineWidth / 2;
      this.backColor = config.backColor === false ? false : config.backColor || this.backColor;
    }
  }

  setLineWidth(width) {
    this.lineWidth = width;
  }

  setLineColor(color) {
    this.lineColor = color;
  }

  draw(num, canvas, offset) {
    if (canvas && num >= 0 && num < 10) {
      const curOffset = {
        x: 0,
        y: 0,
        ...offset
      };

      if (this.backColor) {
        canvas.save();
        canvas.strokeStyle = this.backColor;
        canvas.lineWidth = this.lineWidth;
        canvas.beginPath();
        this.draw8(canvas, curOffset);
        canvas.stroke();
        canvas.closePath();
        canvas.restore();
      }

      canvas.save();
      canvas.strokeStyle = this.lineColor;
      canvas.lineWidth = this.lineWidth;
      canvas.beginPath();
      this[`draw${num}`](canvas, curOffset);
      canvas.stroke();
      canvas.closePath();
      canvas.restore();
    }
  }

  draw1(canvas, offset) {
    const x = offset.x;
    const y = offset.y;
    const rx = x + this.numberWidth;
    const by = y + this.numberWidth * this.heightRatio;
    const hlw = this.halfLineWidth;
    canvas.moveTo(rx - hlw, y);
    canvas.lineTo(rx - hlw, by);
  }

  draw2(canvas, offset) {
    const x = offset.x;
    const y = offset.y;
    const rx = x + this.numberWidth;
    const my = y + this.numberWidth * this.heightRatio / 2;
    const by = y + this.numberWidth * this.heightRatio;
    const hlw = this.halfLineWidth;
    canvas.moveTo(x, y + hlw);
    canvas.lineTo(rx - hlw, y + hlw);
    canvas.lineTo(rx - hlw, my);
    canvas.lineTo(x + hlw, my);
    canvas.lineTo(x + hlw, by - hlw);
    canvas.lineTo(rx, by - hlw);
  }

  draw3(canvas, offset) {
    const x = offset.x;
    const y = offset.y;
    const rx = x + this.numberWidth;
    const my = y + this.numberWidth * this.heightRatio / 2;
    const by = y + this.numberWidth * this.heightRatio;
    const hlw = this.halfLineWidth;
    canvas.moveTo(x, y + hlw);
    canvas.lineTo(rx - hlw, y + hlw);
    canvas.lineTo(rx - hlw, by - hlw);
    canvas.lineTo(x, by - hlw);
    canvas.moveTo(x, my);
    canvas.lineTo(rx, my);
  }

  draw4(canvas, offset) {
    const x = offset.x;
    const y = offset.y;
    const rx = x + this.numberWidth;
    const my = y + this.numberWidth * this.heightRatio / 2;
    const by = y + this.numberWidth * this.heightRatio;
    const hlw = this.halfLineWidth;
    canvas.moveTo(x + hlw, y);
    canvas.lineTo(x + hlw, my);
    canvas.lineTo(rx, my);
    canvas.moveTo(rx - hlw, y);
    canvas.lineTo(rx - hlw, by);
  }

  draw5(canvas, offset) {
    const x = offset.x;
    const y = offset.y;
    const rx = x + this.numberWidth;
    const my = y + this.numberWidth * this.heightRatio / 2;
    const by = y + this.numberWidth * this.heightRatio;
    const hlw = this.halfLineWidth;
    canvas.moveTo(rx, y + hlw);
    canvas.lineTo(x + hlw, y + hlw);
    canvas.lineTo(x + hlw, my);
    canvas.lineTo(rx - hlw, my);
    canvas.lineTo(rx - hlw, by - hlw);
    canvas.lineTo(x, by - hlw);
  }

  draw6(canvas, offset) {
    const x = offset.x;
    const y = offset.y;
    const rx = x + this.numberWidth;
    const my = y + this.numberWidth * this.heightRatio / 2;
    const by = y + this.numberWidth * this.heightRatio;
    const hlw = this.halfLineWidth;
    canvas.moveTo(rx, y + hlw);
    canvas.lineTo(x + hlw, y + hlw);
    canvas.lineTo(x + hlw, by - hlw);
    canvas.lineTo(rx - hlw, by - hlw);
    canvas.lineTo(rx - hlw, my);
    canvas.lineTo(x, my);
  }

  draw7(canvas, offset) {
    const x = offset.x;
    const y = offset.y;
    const rx = x + this.numberWidth;
    const by = y + this.numberWidth * this.heightRatio;
    const hlw = this.halfLineWidth;
    canvas.moveTo(x, y + hlw);
    canvas.lineTo(rx - hlw, y + hlw);
    canvas.lineTo(rx - hlw, by);
  }

  draw8(canvas, offset) {
    const x = offset.x;
    const y = offset.y;
    const rx = x + this.numberWidth;
    const my = y + this.numberWidth * this.heightRatio / 2;
    const by = y + this.numberWidth * this.heightRatio;
    const hlw = this.halfLineWidth;
    canvas.moveTo(x, y + hlw);
    canvas.lineTo(rx - hlw, y + hlw);
    canvas.lineTo(rx - hlw, by - hlw);
    canvas.lineTo(x + hlw, by - hlw);
    canvas.lineTo(x + hlw, y);
    canvas.moveTo(x, my);
    canvas.lineTo(rx, my);
  }

  draw9(canvas, offset) {
    const x = offset.x;
    const y = offset.y;
    const rx = x + this.numberWidth;
    const my = y + this.numberWidth * this.heightRatio / 2;
    const by = y + this.numberWidth * this.heightRatio;
    const hlw = this.halfLineWidth;
    canvas.moveTo(x, by - hlw);
    canvas.lineTo(rx - hlw, by - hlw);
    canvas.lineTo(rx - hlw, y + hlw);
    canvas.lineTo(x + hlw, y + hlw);
    canvas.lineTo(x + hlw, my);
    canvas.lineTo(rx, my);
  }

  draw0(canvas, offset) {
    const x = offset.x;
    const y = offset.y;
    const rx = x + this.numberWidth;
    const by = y + this.numberWidth * this.heightRatio;
    const hlw = this.halfLineWidth;
    canvas.moveTo(x, y + hlw);
    canvas.lineTo(rx - hlw, y + hlw);
    canvas.lineTo(rx - hlw, by - hlw);
    canvas.lineTo(x + hlw, by - hlw);
    canvas.lineTo(x + hlw, y);
  }

}
