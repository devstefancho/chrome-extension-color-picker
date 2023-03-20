import { useEffect, useRef, useState } from "react";
import CopyIcon from "./assets/copy.icon";
import Logo from "./assets/logo.icon";
import PipetteIcon from "./assets/pipette.icon";
import util from "./utils/picker";

type EyeDropperResponse = {
  sRGBHex: string;
};

type ColorData = string;

function App() {
  const [colorCode, setColorCode] = useState<ColorData>();
  const [isActive, setIsActive] = useState<boolean>(false);

  const sendMessage = (message: { [key: string]: string | boolean }) => {
    // TODO: any type 제거
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs: any) {
        chrome.tabs.sendMessage(tabs[0].id, message);
      }
    );
  };

  const clickPicker = async () => {
    // Activated
    setIsActive(true);
    const eyeDropper = new window.EyeDropper();
    sendMessage({ state: "Activated" });
    const result: EyeDropperResponse = await eyeDropper.open();

    // Deactivated
    setIsActive(false);

    // Set Color
    const newColor = result.sRGBHex.toUpperCase();
    setColorCode(newColor);
    sendMessage({ colorCode: newColor });
    util.copyToClipboard(newColor);
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
            style={{ backgroundColor: colorCode }}
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
            <span className="color-code-name">{colorCode}</span>
            <button
              className="color-code-copy"
              onClick={() => colorCode && util.copyToClipboard(colorCode)}
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
