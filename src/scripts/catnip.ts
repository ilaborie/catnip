import { render } from "lit-html";

import { Frames } from "./models/Frames";
import { consts, sample } from "./parser/sample";
import { renderFrames } from "./templates/frame";

declare global {
  interface Window {
    catnip: any;
  }
}

const frames = new Frames(consts, sample);

export const catnip = (elt: HTMLElement | null): void => {
  if (elt !== null) {
    const display = () => {
      frames.next();
      catnip(elt);
    };
    render(renderFrames(frames, display), elt);
  } else {
    console.warn("Cannot mount element:", elt);
  }
};

window.catnip = catnip;
