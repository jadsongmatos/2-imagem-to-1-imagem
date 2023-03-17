// Ovo image
var imgOVO = new Image();
imgOVO.onload = startOVO;
imgOVO.onerror = function () {
  alert(imgOVO.src + " failed to load.");
};
imgOVO.src = "ovo.webp";

// Pera image
var imgPERA = new Image();
imgPERA.onload = startPERA;
imgPERA.onerror = function () {
  alert(imgPERA.src + " failed to load.");
};
imgPERA.src = "pera.webp";

// start is called every time an image loads
async function startOVO() {
  let canvas = document.getElementById("canvasOVO");
  let context = canvas.getContext("2d");
  // context.drawImage will successfully draw each one
  context.drawImage(imgOVO, 0, 0);
}

// start is called every time an image loads
function startPERA() {
  let canvas = document.getElementById("canvasPERA");
  let context = canvas.getContext("2d");
  // context.drawImage will successfully draw each one
  context.drawImage(imgPERA, 0, 0);
}

// != Canvas
async function teste() {
  console.log("teste");
  async function getIMG() {
    let canvasOVO = document.getElementById("canvasOVO");
    let contextOVO = await canvasOVO.getContext("2d");

    let canvasPERA = document.getElementById("canvasPERA");
    let contextPERA = await canvasPERA.getContext("2d");

    return [contextOVO, contextPERA];
  }

  let img = await getIMG();

  async function getDataIMG(arr) {
    let dataOVO = await arr[0].getImageData(0, 0, 640, 640).data;
    let dataPERA = await arr[1].getImageData(0, 0, 640, 640).data;

    return [dataOVO, dataPERA];
  }

  let dataIMG = await getDataIMG(img);

  let canvasD = document.getElementById("canvasD");
  let contextD = canvasD.getContext("2d");

  let size = 640 * 640;
  let ind = 0;

  /*contextD.fillStyle = `rgb(127,127,127)`;
  contextD.fillRect(0, 0, 640, 640);*/

  // Raiz quadrada para adquirir um canvas power of two
  let CanvasSize = Math.ceil(Math.sqrt((size * 3) / 3));

  /*
  255= 100
  x= y 
  */

  for (let i = 0; i < size; i++) {
    let r = (dataIMG[0][ind] + dataIMG[1][ind]) / 2;
    let g = (dataIMG[0][ind + 1] + dataIMG[1][ind + 1]) / 2;
    let b = (dataIMG[0][ind + 2] + dataIMG[1][ind + 2]) / 2;

    ind = ind + 4;

    let cor = `rgb(${r},${g},${b})`;
    contextD.fillStyle = cor;
    if (r < 0 || r > 255) {
      console.log("erro RED", cor, i, dataIMG[0][ind], dataIMG[1][ind]);
    }
    if (g < 0 || g > 255) {
      console.log(
        "erro GREN",
        cor,
        i,
        dataIMG[0][ind + 1],
        dataIMG[1][ind + 1]
      );
    }
    if (b < 0 || b > 255) {
      console.log(
        "erro BLUE",
        cor,
        i,
        dataIMG[0][ind + 2],
        dataIMG[1][ind + 2]
      );
    }
    //console.log(cor);

    let yPosition = Math.floor(i / CanvasSize);
    let xPosition = i % CanvasSize;
    //console.log("y " + yPosition + "x " + xPosition);

    contextD.fillRect(xPosition, yPosition, 1, 1);
  }
  await console.log("FIM D");
}

// F Canvas
async function teste2() {
  console.log("teste");
  async function getIMG() {
    let canvasOVO = document.getElementById("canvasOVO");
    let contextOVO = await canvasOVO.getContext("2d");

    let canvasD = document.getElementById("canvasD");
    let contextD = await canvasD.getContext("2d");

    return [contextOVO, contextD];
  }

  let img = await getIMG();

  async function getDataIMG(arr) {
    let dataOVO = await arr[0].getImageData(0, 0, 640, 640).data;
    let dataD = await arr[1].getImageData(0, 0, 640, 640).data;

    return [dataOVO, dataD];
  }

  let dataIMG = await getDataIMG(img);

  let canvasF = document.getElementById("canvasF");
  let contextF = canvasF.getContext("2d");

  let size = 640 * 640;
  let ind = 0;

  /*contextD.fillStyle = `rgb(127,127,127)`;
  contextD.fillRect(0, 0, 640, 640);*/

  // Raiz quadrada para adquirir um canvas power of two
  let CanvasSize = Math.ceil(Math.sqrt((size * 3) / 3));

  for (let i = 0; i < size; i++) {
    /*let r = 127 + (dataIMG[0][ind] - dataIMG[1][ind]);
    let g = dataIMG[0][ind + 1] + (dataIMG[0][ind + 1] - dataIMG[1][ind + 1]);
    let b = dataIMG[0][ind + 2] + (dataIMG[0][ind + 2] - dataIMG[1][ind + 2]);*/

    let r = -dataIMG[0][ind] + dataIMG[1][ind] * 2;
    let g = -dataIMG[0][ind + 1] + dataIMG[1][ind + 1] * 2;
    let b = -dataIMG[0][ind + 2] + dataIMG[1][ind + 2] * 2;

    ind = ind + 4;

    let cor = `rgb(${r},${g},${b})`;
    contextF.fillStyle = cor;
    //console.log(cor);

    let yPosition = Math.floor(i / CanvasSize);
    let xPosition = i % CanvasSize;
    //console.log("y " + yPosition + "x " + xPosition);

    contextF.fillRect(xPosition, yPosition, 1, 1);
  }
  await console.log("FIM F");
}
