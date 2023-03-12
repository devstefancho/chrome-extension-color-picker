import { useState } from "react";
import ArrowDown from "./assets/arrow-down.icon";
import CopyIcon from "./assets/copy.icon";
import PipetteIcon from "./assets/pipette.icon";
import util from "./utils/picker";

type EyeDropperResponse = {
  sRGBHex: string;
};

enum Mode {
  Hex = "hex",
  Hsl = "hsl",
}

type ColorData = {
  [Mode.Hex]: string;
  [Mode.Hsl]: string;
};

const modeText = {
  hex: "Hex",
  hsl: "Hsl",
};

function App() {
  const [colorData, setColorData] = useState<ColorData>();
  const [mode, setMode] = useState<Mode>(Mode.Hex);
  const [isOpenSelectBox, setIsOpenSelectBox] = useState(false);
  const clickPicker = async () => {
    const result: EyeDropperResponse = await new window.EyeDropper().open();
    setColorData({ hex: result.sRGBHex, hsl: util.rgbToHsl(result.sRGBHex) });
  };

  const clickOption = (mode: Mode) => {
    setMode(mode);
    setIsOpenSelectBox(false);
  };

  return (
    <>
      <header>
        <div className="title-prefix-circle"></div>
        <div className="title">Color dropper</div>
      </header>
      <main className="color-picker-body">
        {/* 스포이드 라인 */}
        <div className="color-picker">
          <button onClick={clickPicker}>
            <PipetteIcon />
          </button>
          <span
            className="color-bar"
            style={{ backgroundColor: colorData?.hex }}
          ></span>
        </div>
        {/* Select Box 라인 */}
        <div className="relative color-code-container cursor-pointer select-none">
          <div
            className={`select-rect rounded-[4px] hover:border-black ${
              isOpenSelectBox
                ? "rounded-bl-[0px] rounded-br-[0px] hover:border-gray-bg"
                : ""
            }`}
            onClick={() => setIsOpenSelectBox((prev) => !prev)}
          >
            <div>{modeText[mode]}</div>
            <div>
              <ArrowDown />
            </div>
          </div>
          <ul
            id="select-box"
            className={`absolute top-[100%] overflow-hidden ${
              isOpenSelectBox
                ? "block rounded-bl-[4px] rounded-br-[4px]"
                : "hidden"
            }`}
          >
            {mode === Mode.Hsl ? (
              <li className="select-rect" onClick={() => clickOption(Mode.Hex)}>
                {modeText[Mode.Hex]}
              </li>
            ) : (
              <li className="select-rect" onClick={() => clickOption(Mode.Hsl)}>
                {modeText[Mode.Hsl]}
              </li>
            )}
          </ul>
          <div className="border-gray-bg color-code hover:border-black border-[1px]">
            <span className="color-code-name">{colorData?.[mode]}</span>
            <button
              className="color-code-copy"
              onClick={() =>
                colorData?.[mode] && util.copyToClipboard(colorData[mode])
              }
            >
              <CopyIcon />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
