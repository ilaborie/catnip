import { html, TemplateResult } from "lit-html";

import { Constant, InstructionInstance } from "../models/input";

export const renderConstantPool = (constants: string): TemplateResult =>
  html`
    <details>
      <summary>Constant Pool</summary>
      <div class="constants">${constants}</div>
    </details>
  `;

// FIXME Frame, stack, locals, ... current step
export const renderMethodCode = (
  code: InstructionInstance[],
  position: number
): TemplateResult => {
  const classes = (inst: InstructionInstance) =>
    [
      inst.instruction.type ? `inst-${inst.instruction.type}` : "",
      position === inst.position ? "selected" : ""
    ]
      .filter(s => s !== "")
      .join(" ");
  return html`
    <ul class="code">
      ${code.map(
        inst => html`
  <li class="${classes(inst)}">
    <div class="position">${inst.position}</div>
    <div class="code">${inst.instruction.code}</div>
    <div class="args">${inst.args}</div>
  </li>
</ul>`
      )}
    </ul>
  `;
};
