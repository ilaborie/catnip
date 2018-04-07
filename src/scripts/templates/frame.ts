import { Frame } from "../models/Frame";
import { Frames } from "../models/Frames";
import { renderConstantPool, renderMethodCode } from "./inputs";
import { renderLocals } from "./locals";
import { renderStack } from "./stack";

const renderFrame = (frame: Frame): string => `
<article class="frame">
  <header>${frame.name} <span>${frame.args}</span></header>
  ${renderMethodCode(frame.methodBody.code, frame.position)}
  ${renderStack(frame.stack)}
  ${renderLocals(frame.locals)}
</article>
`;

export const renderFrames = (frames: Frames): string => `
${renderConstantPool(frames.constantPool)}
<details open class="frames">
    <summary>Frames</summary>
    <menu>
      <button type="button" class="next">↩️ Next</button>
    </menu>
    <div>
      ${frames.frames.map((frame) => renderFrame(frame)).join("\n")}
    </div>
</details>
`;
