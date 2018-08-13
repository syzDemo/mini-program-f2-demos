import F2 from '../../../lib/my-f2';
const app = getApp();
let chart = null;

function drawChart(canvas, width, height) {
  var data = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 145 },
    { year: '1958 年', sales: 48 },
    { year: '1959 年', sales: 38 },
    { year: '1960 年', sales: 38 },
    { year: '1962 年', sales: 38 },
  ];
  var chart = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart.source(data, {
    sales: {
      tickCount: 5
    }
  });
  chart.tooltip(false);
  chart.interval().position('year*sales');
  chart.interaction('interval-select', {
    selectStyle: {
      stroke: '#000',
      lineWidth: 1
    },
    selectAxisStyle: {
      fill: '#000',
      fontWeight: 'bold'
    },
    mode: 'range'
  });
  chart.render();
  return chart;
}

Page({
  data: {},
  onReady() {
    my.createSelectorQuery()
      .select('#intervalSelect')
      .boundingClientRect()
      .exec((res) => {
        // // 获取分辨率
        const pixelRatio = my.getSystemInfoSync().pixelRatio;
        // // 获取画布实际宽高
        const canvasWidth = res[0].width;
        const canvasHeight = res[0].height;
        this.setData({
          width: canvasWidth * pixelRatio,
          height: canvasHeight * pixelRatio
        });
        const myCtx = my.createCanvasContext('intervalSelect');
        myCtx.scale(pixelRatio, pixelRatio); // 必要！按照设置的分辨率进行放大
        const canvas = new F2.Renderer(myCtx);
        this.canvas = canvas;
        //console.log(res[0].width, res[0].height);
        drawChart(canvas, res[0].width, res[0].height);
      });
  },
  touchStart(e) {
    if (this.canvas) {
      this.canvas.emitEvent('touchstart', [e]);
    }
  },
  touchMove(e) {
    if (this.canvas) {
      this.canvas.emitEvent('touchmove', [e]);
    }
  },
  touchEnd(e) {
    if (this.canvas) {
      this.canvas.emitEvent('touchend', [e]);
    }
  }
});
