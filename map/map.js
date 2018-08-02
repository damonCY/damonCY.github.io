function Chart (ctx) {
  this.ctx = ctx
  this.canvasWidth = 540 // canvas宽度
  this.canvasHeight = 400 // canvas高度
  this.canvasPadding = 20 // 图像到边际的间隙,
  this.mapWidth = this.canvasWidth - this.canvasPadding * 2 // 折线图的宽度
  this.mapHeight = this.canvasHeight - this.canvasPadding * 2 // 折线图的宽度
  this.originX = this.canvasPadding // 原点x
  this.originY = this.canvasHeight - this.canvasPadding // 原点y
  this.minValue = 0 // 测试数据的最小值
  this.maxValue = 100 // 测试数据的最大值
  this.testNumber = 20 // 测试数据的数量
  this.graduation = 5 // 轴线上刻度大小
  this.graduationNumber = 10 // 轴线上刻度数量
  this.testArr = this.createRandomArr(this.minValue, this.maxValue) // 测试数组
  this.intervalX = ((this.canvasWidth - this.canvasPadding * 2) / this.testNumber).toFixed(0) // 间距
  this.arrMaxValue = this.getMaxValue(this.testArr)
}
Chart.prototype = {
  init: function () {
    this.drawBorder(this.ctx) // 绘制坐标
    this.drawLine(this.ctx, this.testArr) // 绘制折线
  },
  createRandomArr: function (min, max) {
    const arr = []
    for (let i = 0; i < this.testNumber; i++) {
      arr.push(Math.floor(min + (Math.random() * max)))
    }
    return arr
  },
  drawBorder: function (ctx) { // 绘制坐标轴
    // Y轴
    ctx.beginPath()
    ctx.moveTo(this.canvasPadding + 0.5, this.canvasPadding)
    ctx.lineTo(this.originX + 0.5, this.originY)
    // X轴
    ctx.moveTo(this.originX, this.originY + 0.5)
    ctx.lineTo(this.canvasWidth - this.canvasPadding, this.canvasHeight - this.canvasPadding + 0.5)
    ctx.lineWidth = 1
    ctx.stroke()

    // Y轴 刻度
    this.drawGraduation(ctx, 'Y')
    // X轴 刻度
    this.drawGraduation(ctx, 'X')
  },
  drawGraduation: function (ctx, type) {
    const padding = this.canvasPadding
    const graduation = this.graduation
    const graduationNumber = this.graduationNumber
    const spacingY = this.mapHeight / graduationNumber
    const mapWidth = this.mapWidth
    const maxVaue = this.arrMaxValue
    const testNumber = this.testNumber
    if (type === 'Y') {
      for (let i = 0; i <= graduationNumber; i++) {
        ctx.beginPath()
        const y = i * spacingY + padding
        ctx.moveTo(padding, y)
        ctx.lineTo(padding + graduation, y)
        ctx.fillText(Math.floor(maxVaue - maxVaue * i / graduationNumber), padding - 15, y + 5)
        if (i === graduationNumber) {
          ctx.fillText('值', padding - 10, padding - 10)
        }
        ctx.stroke()
      }
    }
    else {
      for (let i = 0; i <= testNumber; i++) {
        ctx.beginPath()
        const x = i * mapWidth / testNumber + padding
        const y = this.mapHeight + padding
        ctx.moveTo(x, y)
        ctx.lineTo(x, y - graduation)
        ctx.fillText(i + 1, x - 3, y + 10)
        if (i === testNumber) {
          ctx.fillText('第x个测试数据', x - 50, y + 30)
        }
        ctx.stroke()
      }
    }
  },
  getMaxValue: function (list) {
    let max = list[0]
    for (let i = 0; i < list.length; i++) {
      if (max < list[i]) {
        max = list[i]
      }
    }
    return max
  },
  drawLine: function (ctx, data) {
    const padding = this.canvasPadding
    const mapHeight = this.mapHeight
    const intervalX = this.intervalX
    const scale = (mapHeight / this.getMaxValue(data)).toFixed(2) // Y上的比例
    ctx.beginPath()
    data.forEach(function (value, index) {
      const x = (intervalX * index) + padding + 0.5
      const y = mapHeight + padding - (value * scale).toFixed(0) + 0.5
      ctx.fillText(value, x + 2, y)
      ctx.lineTo(x, y)
    })
    ctx.stroke()
  }
}
window.Chart = Chart