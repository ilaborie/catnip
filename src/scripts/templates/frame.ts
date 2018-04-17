import { Frame } from "../models/Frame";
import { Frames } from "../models/Frames";
import { Value } from "../models/runtime";
import { renderConstantPool, renderMethodCode } from "./inputs";
import { renderLocals } from "./locals";
import { renderStack } from "./stack";
import { renderTypedValue } from "./value";

const renderArgs = (args: Value[]): string =>
  `<span class="args">${args
    .map(
      ({ type, value }) =>
        `<span class="type-${type}">${renderTypedValue(type, value)}</span>`
    )
    .join("")}</span>`;

const renderFrame = (frame: Frame, current: boolean): string => `
<article class="frame ${current ? "current" : ""}">
  <header>${frame.name} ${renderArgs(frame.args)}</header>
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
      ${
        frames.frames.length > 0
          ? `<button type="button" class="next">↩️ Next</button>`
          : ``
      }
    </menu>
    <div>
      ${frames.frames
        .map(frame => renderFrame(frame, frame === frames.currentFrame))
        .join("\n")}
    </div>
</details>
`;
