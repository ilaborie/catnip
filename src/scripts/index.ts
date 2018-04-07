import { MethodBody } from "./models/input";
import { OperandStack } from "./models/OperandStack";

import { Frame } from "./models/Frame";
import { Frames } from "./models/Frames";
import { LocalVariables } from "./models/LocalVariables";
import { constantPool, sample } from "./parser/sample";
import { renderFrames } from "./templates/frame";

const frames = new Frames(constantPool, sample);
console.log({ frames });

window.catnip = (elt: HTMLElement | null): void => {
    if (elt !== null) {
        elt.innerHTML = renderFrames(frames);

        const btn = document.querySelector(".frames menu .next") as HTMLButtonElement;
        btn.onclick = () => {
            frames.next();
            elt.innerHTML = renderFrames(frames);
         };
    } else {
        console.warn("Cannot mount element:", elt);
    }
};
