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
    console.log("sendMessage", result);
    const newColor = result.sRGBHex.toUpperCase();
    setColorCode(newColor);
    sendMessage({ colorCode: newColor });
    util.copyToClipboard(newColor);
  };

  return (
    <div>
      <header className="flex items-center gap-[8px] p-[12px] pl-[16px] border border-gray-300 h-12">
        <Logo />
        <div className="text-[#383838] font-bold text-[14px] leading-[21px]">
          Color Picker
        </div>
      </header>

      <main className="border border-gray-300 border-t-0 p-[16px]">
        {/* 스포이드 영역 */}
        <div id="color-picker" className="flex">
          <button
            onClick={clickPicker}
            className={`${
              isActive ? "bg-[#653CDD] hover:bg-[#653CDD]" : "hover:bg-gray-bg"
            } mr-auto rounded-[4px]`}
          >
            <PipetteIcon isActive={isActive} />
          </button>
          <span
            className={`inline-block border-[1px] border-[#e7e7e8] box-border rounded-[4px] w-[296px]`}
            style={{ background: colorCode }}
          ></span>
        </div>
        {/* Hex 영역 */}
        <div className="relative flex items-center mt-[8px] cursor-pointer select-none">
          <div className="font-medium text-[14px] mr-auto">
            <div className="w-[38px] text-center">Hex</div>
          </div>
          <div className="flex justify-between items-center h-[40px] rounded-[4px] border-gray-bg bg-gray-200 p-[12px] w-[296px]">
            <span className="text-sm">{colorCode}</span>
            <button
              onClick={() => colorCode && util.copyToClipboard(colorCode)}
            >
              <CopyIcon />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
