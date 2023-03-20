export {};

declare global {
  var chrome: {
    tabs: any;
    runtime: any;
  };

  interface Window {
    EyeDropper: any;
  }
}
