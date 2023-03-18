import { useState } from "react";
import CopyIcon from "./assets/copy.icon";
import Logo from "./assets/logo.icon";
import PipetteIcon from "./assets/pipette.icon";
import util from "./utils/picker";

type EyeDropperResponse = {
  sRGBHex: string;
};

type ColorData = string;

function App() {
  const [colorData, setColorData] = useState<ColorData>();
  const [isActive, setIsActive] = useState<boolean>(false);

  const clickPicker = async () => {
    setIsActive(true);
    const result: EyeDropperResponse = await new window.EyeDropper().open();
    setIsActive(false);
    setColorData(result.sRGBHex.toUpperCase());
  };

  return (
    <>
      <header>
        <Logo />
        <div className="title">Color Picker</div>
      </header>
      <main className="color-picker-body">
        {/* 스포이드 라인 */}
        <div id="color-picker" className="flex">
          <button onClick={clickPicker} className="mr-auto">
            <PipetteIcon isActive={isActive} />
          </button>
          <span
            className="inline-block border-[1px] border-[#e7e7e8] box-border rounded-[4px] w-[296px]"
            style={{ backgroundColor: colorData }}
          ></span>
        </div>
        {/* Select Box 라인 */}
        <div className="relative flex items-center mt-[8px] cursor-pointer select-none">
          <div className="font-medium text-[14px] mr-auto">
            <div className="w-[38px] text-center">Hex</div>
          </div>
          <div
            id="text-rgb"
            className="flex justify-between items-center h-[40px] rounded-[4px] border-gray-bg bg-gray-200 p-[12px] w-[296px]"
          >
            <span className="color-code-name">{colorData}</span>
            <button
              className="color-code-copy"
              onClick={() => colorData && util.copyToClipboard(colorData)}
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
