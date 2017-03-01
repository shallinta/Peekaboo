/**
 *
 */

const postPaint = Symbol('postPaint');
const drawingSurfaceImageData = Symbol('drawingSurfaceImageData');
const saveDrawingSurface = Symbol('saveDrawingSurface');
const restoreDrawingSurface = Symbol('restoreDrawingSurface');
const axisClientToCanvas = Symbol('axisClientToCanvas');
const drawGuidewires = Symbol('drawGuidewires');
const updateRubberbandRect = Symbol('updateRubberbandRect');
const drawRubberbandShape = Symbol('drawRubberbandShape');
const updateRubberband = Symbol('updateRubberband');
const dragging = Symbol('dragging');

class Paintor {

  static shape = {
    LINE: 1,
    CIRCLE: 2,
  };

  preStyle = null;

  style = {
    strokeStyle: '#ccc',
    fillStyle: '#fff',
    lineWidth: 0.5,
  };

  [drawingSurfaceImageData] = null;
  [dragging] = false;
  shape = Paintor.shape.LINE;
  guidewires = true;
  rubberbandRect = {};
  mousedownPoint = {};

  canvas = null;
  ctx = null;

  constructor(canvas, style, post) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    if (typeof style === 'boolean') { // style 是 boolean
      const temp = post;
      post = style;
      style = temp;
    }
    if (style) {
      this.setStyle(style);
    }
    if (post) {
      this[postPaint]();
    }
  }

  getContext() {
    return this.ctx;
  }

  clear(deep) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!deep) {
      this[postPaint]();
    }
  }

  getStyle() {
    return Object.assign({}, this.style);
  }

  setStyle(style) {
    if (style) {
      this.preStyle = { ...this.style };
      Object.assign(this.style, style);
      this.ctx.save();
      Object.assign(this.ctx, this.style);
    }
  }

  restoreStyle() {
    if (this.preStyle) {
      this.ctx.restore();
      this.style = { ...this.preStyle };
    }
  }

  setShape(shape) {
    this.shape = shape;
  }

  // 绘制坐标纸底线与提示坐标轴
  [postPaint]() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const MARGIN = 40.5;
    const ORIGIN_POINT = { x: MARGIN, y: height - MARGIN };
    const STEP = 10;
    const NUM_TICK_X = (width - MARGIN * 2) / STEP;
    const NUM_TICK_Y = (height - MARGIN * 2) / STEP;

    this.setStyle({
      strokeStyle: '#d3d3d3',
      lineWidth: 0.5,
    });
    for (let i = STEP + 0.5; i < width; i += STEP) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = STEP + 0.5; i < height; i += STEP) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }
    this.restoreStyle();

    this.setStyle({
      strokeStyle: '#666',
      fillStyle: '#f66',
      lineWidth: 1,
    });
    ctx.beginPath();
    ctx.moveTo(ORIGIN_POINT.x, ORIGIN_POINT.y);
    ctx.lineTo(width - MARGIN, ORIGIN_POINT.y);
    ctx.moveTo(ORIGIN_POINT.x, ORIGIN_POINT.y);
    ctx.lineTo(ORIGIN_POINT.x, MARGIN);
    ctx.stroke();
    this.restoreStyle();

    this.setStyle({
      strokeStyle: '#999',
      lineWidth: 0.5,
    });
    for (let i = 1; i < NUM_TICK_X; i += 1) {
      let deltaY = 0;
      ctx.beginPath();
      if (i % 5 === 0) {
        deltaY = STEP;
      } else {
        deltaY = STEP / 2;
      }
      ctx.moveTo(ORIGIN_POINT.x + i * STEP, ORIGIN_POINT.y - deltaY);
      ctx.lineTo(ORIGIN_POINT.x + i * STEP, ORIGIN_POINT.y + deltaY);
      ctx.stroke();
    }
    for (let i = 1; i < NUM_TICK_Y; i += 1) {
      let deltaX = 0;
      ctx.beginPath();
      if (i % 5 === 0) {
        deltaX = STEP;
      } else {
        deltaX = STEP / 2;
      }
      ctx.moveTo(ORIGIN_POINT.x - deltaX, ORIGIN_POINT.y - i * STEP);
      ctx.lineTo(ORIGIN_POINT.x + deltaX, ORIGIN_POINT.y - i * STEP);
      ctx.stroke();
    }
    this.restoreStyle();

    this.setStyle({
      fillStyle: '#666',
    });
    ctx.beginPath();
    ctx.arc(ORIGIN_POINT.x, ORIGIN_POINT.y, 3, 0, Math.PI * 2);
    ctx.fill();
    this.restoreStyle();
  }

  // 保存与还原绘图表面
  [saveDrawingSurface]() {
    this[drawingSurfaceImageData] = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }
  [restoreDrawingSurface]() {
    this.ctx.putImageData(this[drawingSurfaceImageData], 0, 0);
  }

  // 转换页面坐标为canvas坐标
  [axisClientToCanvas](x, y) {
    const canvasBoundRect = this.canvas.getBoundingClientRect();
    return {
      x: x - canvasBoundRect.left * (this.canvas.width / canvasBoundRect.width),
      y: y - canvasBoundRect.top * (this.canvas.height / canvasBoundRect.height),
    };
  }

  // updateRubberband
  [updateRubberband](loc) {
    this[updateRubberbandRect](loc);
    this[drawRubberbandShape](loc);
  }
  [updateRubberbandRect](loc) {
    this.rubberbandRect.width = Math.abs(loc.x - this.mousedownPoint.x);
    this.rubberbandRect.height = Math.abs(loc.y - this.mousedownPoint.y);
    if (loc.x > this.mousedownPoint.x) {
      this.rubberbandRect.left = this.mousedownPoint.x;
    } else {
      this.rubberbandRect.left = loc.x;
    }
    if (loc.y > this.mousedownPoint.y) {
      this.rubberbandRect.top = this.mousedownPoint.y;
    } else {
      this.rubberbandRect.top = loc.y;
    }
  }
  [drawRubberbandShape](loc) {
    this.ctx.beginPath();
    const shape = Paintor.shape;
    const radius = Math.sqrt(Math.pow(this.mousedownPoint.x - loc.x, 2) + Math.pow(this.mousedownPoint.y - loc.y, 2)) / 2;
    switch (this.shape) {
      case shape.LINE:
        this.ctx.moveTo(this.mousedownPoint.x, this.mousedownPoint.y);
        this.ctx.lineTo(loc.x, loc.y);
        this.ctx.stroke();
        break;
      case shape.CIRCLE:
        this.ctx.arc((this.mousedownPoint.x + loc.x) / 2, (this.mousedownPoint.y + loc.y) / 2, radius, 0, Math.PI * 2, false);
        this.ctx.stroke();
        break;
      default:
    }
  }

  // 参考线
  [drawGuidewires](x, y) {
    this.setStyle({
      strokeStyle: 'rgba(0, 0, 230, 0.4)',
      fillStyle: 'rgba(0, 0, 230, 0.4)',
      lineWidth: 0.5,
    });
    const ctx = this.ctx;
    ctx.setLineDash([8, 5, 3, 5]);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, this.canvas.height);
    ctx.moveTo(0, y);
    ctx.lineTo(this.canvas.width, y);
    ctx.stroke();
    ctx.fillText(`[${x - 0.5}, ${y - 0.5}]`, x + 10, y - 10);
    this.restoreStyle();
  }

  // Canvas鼠标事件监听
  onMouseDown(e) {
    const loc = this[axisClientToCanvas](e.clientX, e.clientY);
    this[saveDrawingSurface]();
    this.mousedownPoint = {
      x: loc.x,
      y: loc.y
    };
    this[dragging] = true;
  }
  onMouseMove(e) {
    if (this[dragging]) {
      const loc = this[axisClientToCanvas](e.clientX, e.clientY);
      this[restoreDrawingSurface]();
      this[updateRubberband](loc);
      if (this.guidewires) {
        this[drawGuidewires](loc.x, loc.y);
      }
    }
  }
  onMouseUp(e) {
    const loc = this[axisClientToCanvas](e.clientX, e.clientY);
    this[restoreDrawingSurface]();
    this[updateRubberband](loc);
    this[dragging] = false;
  }

  paint(option, style) {
    this.setStyle(style);

    const ox = option.x;
    const oy = option.y;
    const or = option.r;
    const on = option.n;

    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(ox, oy, 5, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(ox + or, oy);
    for (let i = 0; i <= on; i += 1) {
      ctx.lineTo(ox + or * Math.cos(Math.PI * 2 / on * i), oy + or * Math.sin(Math.PI * 2 / on * i));
    }
    ctx.stroke();

    if (style) {
      this.restoreStyle();
    }
  }

}

export default Paintor;
