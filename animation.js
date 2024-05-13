const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const video = document.querySelector("video");
ctx.font = "300px serif"
ctx.strokeStyle = "rgb(255 0 0 / 50%)"
ctx.fillText("love", 60, 790)
let data = ctx.getImageData(0, 0, canvas.width, canvas.height)
ctx.clearRect(0, 0, canvas.width, canvas.height)

const getPixel = (data, x, y, width) => {
  if (x > width) { return [0, 0, 0, 0] }
  const d = data.data
  const stInd = (x+y*width)*4
  return d.slice(stInd, stInd+4)
}

const isThere = (data, x, y, width) => {
  const p = getPixel(data, x, y, width)
  const result = p.reduce((a, b) => a + b, 0)
  return result > 0
}

let lines = [] 

setInterval(() => {
  for (let i = 0; i<960; i++) {
    if (Math.random()>0.006) { continue }
    lines.push({ x: -140+Math.random()*140, y: i, speed: 1.7*Math.random(), lenX: 20*Math.random() })
  }
}, 10)

const draw = () => {
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  for (const line of lines) {
    ctx.beginPath()
    if (!isThere(data, line.x, line.y, canvas.width)) {
      ctx.moveTo(line.x, line.y)
      line.pauseX = line.x+(Math.random()-0.5)*25 
    } else {
      ctx.moveTo(line.pauseX, line.y)
    }
    ctx.lineTo((line.x+line.lenX), line.y)
    ctx.stroke()
    line.x += line.speed
    line.speed *= 0.999
  }
  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);

// animation end
//
// uncomment below for canvas recorder into mp4

/*
var videoStream = canvas.captureStream(60);
var mediaRecorder = new MediaRecorder(videoStream);

var chunks = [];
mediaRecorder.ondataavailable = function(e) {
  chunks.push(e.data);
};

mediaRecorder.onstop = function(e) {
  var blob = new Blob(chunks, { 'type' : 'video/mp4' });
  chunks = [];
  var videoURL = URL.createObjectURL(blob);
  video.src = videoURL;
};
mediaRecorder.ondataavailable = function(e) {
  chunks.push(e.data);
};

mediaRecorder.start();
setTimeout(function (){ mediaRecorder.stop(); }, 30000);
*/
