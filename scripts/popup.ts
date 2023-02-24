import { EyeDropperReturnType } from "./types/eye-dropper";
import util from "./utils";

let pickerBtn;

ready(init);

function ready(fn) {
  document.addEventListener("DOMContentLoaded", fn);
  console.log("Started...", document);
}

function init() {
  getButton();
  if (pickerBtn) {
    pickerBtn.addEventListener("click", openPicker);
  }
}

function getButton() {
  pickerBtn = document.querySelector(".color-picker-btn");
}

function openPicker() {
  new window.EyeDropper()
    .open()
    .then((result: EyeDropperReturnType) => pickColor(result.sRGBHex));
}

function pickColor(sRGBHex: EyeDropperReturnType["sRGBHex"]) {
  copyToClipboard(sRGBHex);

  // selected color is appended to list
  const colorCodes = document.querySelector(".color-container");
  // const code = document.createElement("div");
  // code.innerText = `${sRGBHex} (hsl : ${util.RGBToHSL(sRGBHex)})`;
  // code.style.color = sRGBHex;
  colorCodes?.appendChild(createColorItem(sRGBHex));
  updateColorBar(sRGBHex);
}

function createColorItem(colorHexaCode: string) {
  const container = document.createElement("div");
  container.id = "selected-color-code";
  container.className = "color-list";

  const select = document.createElement("select");
  select.name = "color-list--selector";

  const option1 = document.createElement("option");
  option1.value = "hex";
  option1.textContent = "Hex";
  select.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = "hsl";
  option2.textContent = "HSL";
  select.appendChild(option2);

  container.appendChild(select);

  const colorCode = document.createElement("div");
  colorCode.className = "color-list--code";

  const colorName = document.createElement("span");
  colorName.className = "color-list--code-name";
  colorName.textContent = colorHexaCode;
  colorCode.appendChild(colorName);

  const colorCopy = document.createElement("div");
  colorCopy.className = "icon-copy";
  colorCopy.innerHTML =
    '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M15.5999 7.90039H9.29991C8.52671 7.90039 7.8999 8.52719 7.8999 9.30038V15.6003C7.8999 16.3735 8.52671 17.0003 9.29991 17.0003H15.5999C16.3731 17.0003 16.9999 16.3735 16.9999 15.6003V9.30038C16.9999 8.52719 16.3731 7.90039 15.5999 7.90039Z" stroke="#1B1E21" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M5.10001 12.0999H4.4C4.0287 12.0999 3.6726 11.9524 3.41005 11.6899C3.1475 11.4273 3 11.0712 3 10.6999V4.39999C3 4.02869 3.1475 3.67259 3.41005 3.41005C3.6726 3.1475 4.0287 3 4.4 3H10.7C11.0713 3 11.4274 3.1475 11.69 3.41005C11.9525 3.67259 12.1 4.02869 12.1 4.39999V5.09998" stroke="#1B1E21" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>';
  colorCopy.addEventListener("click", () => {
    copyToClipboard(colorHexaCode);
  });
  colorCode.appendChild(colorCopy);

  container.appendChild(colorCode);
  return container;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function updateColorBar(colorHexaCode: string) {
  const colorBar = document.querySelector(
    ".current-color-bar"
  ) as HTMLDivElement;
  colorBar.style.backgroundColor = colorHexaCode;
}
