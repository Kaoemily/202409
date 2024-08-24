let ctx;
let points = [[0,3],[5,8],[8,9],[10,9],[12,10],[13,9],[13,3],[10,-1],[7,-3],[3,-4],[2,-6],[0,-7],[0,-5],[-1,-4],[-7,-2],[-10,1],[-11,3],[-12,4],[-14,4],[-16,5],[-15,6],[-13,6],[-13,8],[-12,9],[-11,7],[-11,5],[-8,3],[-8,5],[-6,4],[-5,2],[-3,2]];  //利用串列點畫出圖形
var colors = "d8e2dc-ffe5d9-ffcad4-f4acb7-9d8189".split("-").map(a=>"#"+a)
function setup() {  //基礎設定
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i].length; j++) {
      points[i][j] = points[i][j] * 10;
      background(100);
      ctx = canvas.getContext('2d');
      ctx.lineWidth = 10;
      ctx.lineCap = 'round'
    }
  }
}


function draw() {
  background(255);
  translate(width / 2, height / 2); //原本原點在左上角，利用這指令把原點放到視窗的中心
  scale(1, -1); //上下翻轉
  for(z=1;z<6;z++) {
    for (let p = 0; p < points.length - 1; p++) {
      // 從顏色陣列中依序取用顏色
      const c1 = colors[p % colors.length];
      const c2 = colors[(p + 1) % colors.length];
        
      gradientLine(ctx, (points[p][0]*(mouseX/1000)*z), (points[p][1]*(mouseX/1000)*z), (points[p+1][0]*(mouseX/1000)*z), (points[p+1][1]*(mouseX/1000)*z), c1, c2);
    }
    //把最後一點與第一點的連線
    //line(points[points.length - 1][0], points[points.length - 1][1], points[0][0], points[0][1]);
    gradientLine(ctx, (points[points.length-1][0]*(mouseX/1000))*z, (points[points.length-1][1]*(mouseX/1000))*z, (points[0][0]*(mouseX/1000))*z, (points[0][1]*(mouseX/1000))*z, colors[0], colors[0]);
  }
      // 在圖案上顯示文字
      scale(1,-1)
      const text = 'I am blue whale';
      const fontSize = 40;
      const x = points[0][0] * (mouseX / 1000) * z;
      const y = points[0][1] * (mouseX / 1000) * z;
      ctx.save(); // 保存當前狀態
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = '#457b9d';
      ctx.textAlign = 'center';
      ctx.fillText(text, x, y);
      ctx.restore(); // 恢復狀態
}


//以下函數主要畫從(x1,y1)~(x2,y2)間，顏色為c1到c2的變化
function gradientLine(ctx, x1, y1, x2, y2, c1, c2) {
const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
gradient.addColorStop(0, c1);
gradient.addColorStop(1, c2);
ctx.strokeStyle = gradient;

ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();
}