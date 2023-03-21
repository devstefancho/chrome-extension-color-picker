import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

interface Message {
  colorCode: string;
}

function Content() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [colorCode, setColorCode] = useState<string>();

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      // colorCode 팝업 띄우기
      if (request.colorCode) {
        console.log(request.colorCode);
        setAlertVisible(true);
        setColorCode(request.colorCode);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
      }

      // App.tsx의 clickPicker와 통신 테스트용으로 미리 만들어둠
      if (request.state) {
        if (request.state === "Activated") {
          console.log("Activated");
        }
        if (request.state === "Deactivated") {
          console.log("Deactivated");
        }
      }
    });
  }, []);

  return (
    <div>
      {alertVisible && (
        <div
          style={{
            zIndex: 999,
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translate(-50%, 0)",
            backgroundColor: "#1B1E21",
            padding: "8px 16px",
            fontSize: "14px",
            lineHeight: "21px",
            letterSpacing: "-0.02em",
            textAlign: "center",
            borderRadius: "38px",
            color: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,.2)",
          }}
        >
          <p>{colorCode} is Copied</p>
        </div>
      )}
    </div>
  );
}

const root = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Content />
  </React.StrictMode>
);
