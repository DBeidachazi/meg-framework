import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/*
*  函数参数：
*  id => 容器id(即div的id)
*  fileName => 导出pdf的文件名
*  isLoad => 是否需要下载pdf文件
*  cb => 回调函数
*  watermark => 这是水印内容文字
*  bgcolor => 背景色
*  scale => 缩放,数字越大越清晰，但是文件也更大，最佳是2倍。
*/
export const exportPDF = (id, fileName = null, isLoad = true, watermark = '这是水印内容文字', bgcolor = '#ffffff', scale = 2, cb = _ => { },) => {
  const ele = document.getElementById(id)
  console.log(ele)
  html2canvas(ele, {
    dpi: 100, // 分辨率
    scale, // 设置缩放
    useCORS: true, // 允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
    bgcolor, // 应该这样写 （不要使用backgroundColor:'#ffffff'）
    logging: false, // 打印日志用的 可以不加默认为false
  }).then((canvas) => {
    // 需要生成pdf的DOM内容宽高（已按照比例缩放）
    const contentWidth = canvas.width
    const contentHeight = canvas.height
    // a4纸的尺寸[595.28,841.89](数字类型，实际单位是毫米，不是px等，如是a3纸等其他纸张，需要修改此参数)
    const a4_width = 595.28
    const a4_height = 841.89
    // 一页pdf显示html页面生成的canvas高度（即完整的一页a4纸对应的px）
    const pageHeight = (contentWidth / a4_width) * a4_height
    /*
    *  页面偏移(数字类型，实际单位是毫米)，使用场景主要有2个
    *  1、计算最后一页结束位置。
    *  2、合同类的pdf计算盖章位置。
    */
    let position_y = 0, position_x = 0;
    // html页面生成的canvas在pdf中图片的宽高
    const imgWidth = a4_width;
    const imgHeight = (imgWidth / contentWidth) * contentHeight;
    const ctx = canvas.getContext('2d')
    // 添加水印
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.rotate((25 * Math.PI) / 180);
    ctx.font = '50px Microsoft Yahei';
    ctx.fillStyle = 'rgba(239, 239, 239, 0.5)';
    for (let i = contentWidth * -1; i < contentWidth; i += 240) {
      for (let j = contentWidth * -1; j < contentWidth; j += 100) {
        // 填充文字，x 间距, y 间距
        ctx.fillText(watermark, i * 3, j * 3)
      }
    }
    const pdfData = canvas.toDataURL('image/jpeg', 1.0)
    const pdf = new jsPDF('', 'pt', 'a4')
    // pages pdf总页数
    const pages = Math.ceil(contentHeight / pageHeight)
    const lastHeight = (contentHeight - ((pages - 1) * pageHeight)) * a4_height / pageHeight
    for (let index = pages; index > 0; index--) {
      pdf.addImage(pdfData, 'JPEG', position_x, position_y, imgWidth, imgHeight)
      if (index > 1) pdf.addPage();
      position_y -= a4_height;
    }

    if (isLoad) {
      // 下载pdf
      // 可动态生成
      if (!fileName) fileName = new Date().getTime()
      pdf.output('dataurlnewwindow')
    } else {
      pdf.save(`${fileName}.pdf`)
      // // 获取pdf文件流
      // const base64Data = pdf.output('datauristring')
      // /*
      // *  回调函数参数可拿到数据
      // *  base64Data => pdf的base64文件数据流
      // *  pages => pdf总页数
      // *  a4_width => pdf总宽度
      // *  lastHeight => pdf最后一页的高度
      // */
      // cb(base64Data, pages, a4_width.toFixed(0) - 0, lastHeight.toFixed(0) - 0)
    }
  })
}