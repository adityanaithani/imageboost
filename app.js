// image processing
function saturateHigh(img) {
  let result = img.copy;
  function saturate(result, x, y) {
    let p = result.getPixel(x, y);
    if (p[0] > 0.5 / 3) {
      p[0] = 1;
    }
    if (p[1] > 0.5 / 3) {
      p[1] = 1;
    }
    if (p[2] > 0.5 / 3) {
      p[2] = 1;
    }
    return p;
  }
  return imageMapXY(img, saturate);
}

const input = document.getElementById("input");
const fry = document.getElementById("fry");
const clear = document.getElementById("clear");

input.addEventListener("change", function () {
  changeImage(this);
});

const img = new Image();
img.crossOrigin = "anonymous";
img.src = "";

const preview = document.getElementById("preview");
const ctx = preview.getContext("2d");

img.onload = () => {
  ctx.drawImage(img, 0, 0, preview.width, preview.height);
};

const original = () => {
  ctx.drawImage(img, 0, 0, preview.width, preview.height);
};

const saturate = () => {
  ctx.drawImage(img, 0, 0, preview.width, preview.height);
  const imageData = ctx.getImageData(0, 0, preview.width, preview.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] > 90) {
      // console.log(data[i]);
      data[i] = 255;
    }
    if (data[i + 1] > 90) {
      data[i + 1] = 255;
    }
    if (data[i + 2] > 90) {
      data[i + 2] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  console.log("saturated");
};

function changeImage(input) {
  let reader;

  if (input.files && input.files[0]) {
    reader = new FileReader();

    reader.onload = function (e) {
      let ret = e.target.result;
      img.src = ret;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, preview.width, preview.height);
  img.src = "";
  input.setAttribute("placeholder", "No file chosen");
}

fry.addEventListener("click", saturate);

clear.addEventListener("click", clearCanvas);
