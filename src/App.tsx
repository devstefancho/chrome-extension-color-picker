import { useState } from "react";
import CopyIcon from "./assets/copy.icon";
import PipetteIcon from "./assets/pipette.icon";

type EyeDropperResponse = {
  sRGBHex: string;
};

function App() {
  const [pickedColor, setPickedColor] = useState("");
  const clickPicker = async () => {
    const result: EyeDropperResponse = await new window.EyeDropper().open();
    setPickedColor(result.sRGBHex);
  };

  return (
    <>
      <header>
        <div className="title-prefix-circle"></div>
        <div className="title">Color dropper</div>
      </header>
      <main className="color-picker-body">
        <div className="color-picker">
          <button onClick={clickPicker}>
            <PipetteIcon />
          </button>
          <span
            className="color-bar"
            style={{ backgroundColor: pickedColor }}
          ></span>
        </div>
        <div className="color-code-container">
          {/* <label htmlFor="color-code--selector"></label> */}
          <select id="color-code--selector" name="color-code--selector">
            <option value="hex">Hex</option>
            <option value="hsl">HSL</option>
          </select>
          <div className="color-code">
            <span className="color-code-name">{pickedColor}</span>
            <button className="color-code-copy">
              <CopyIcon />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
