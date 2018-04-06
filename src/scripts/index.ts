import { MethodBody } from "./models/input";
import { OperandStack } from "./models/OperandStack";

import { Frame } from "./models/Frame";
import { Frames } from "./models/Frames";
import { LocalVariables } from "./models/LocalVariables";
import { constantPool, sample } from "./parser/sample";
import { renderFrames } from "./templates/frame";

const frames = new Frames(constantPool, sample);

export const catnip = (elt: HTMLElement | null): void => {
  if (elt !== null) {
    elt.innerHTML = renderFrames(frames);
    const btn = document.querySelector(
      ".frames menu .next"
    ) as HTMLButtonElement;
    if (btn) {
      btn.onclick = () => {
        frames.next();
        catnip(elt);
      };
    }
  } else {
    console.warn("Cannot mount element:", elt);
  }
};

window.catnip = catnip;
