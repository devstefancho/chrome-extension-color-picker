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
      console.log(
        sender.tab
          ? "from a content script:" + sender.tab.url
          : "from the extension"
      );
      if (request.colorCode) {
        setAlertVisible(true);
        setColorCode(request.colorCode);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
        console.log(request.colorCode);
      }
      if (request.state) {
        if (request.state === "Activated") {
          console.log("Activated");
        }
        if (request.state === "Deactivated") {
          // clear event listener
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
