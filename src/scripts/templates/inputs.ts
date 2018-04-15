import { Constant, InstructionInstance } from "../models/input";

export const renderConstantPool = (constantPool: Constant[]): string => `
<details>
    <summary>Constant Pool</summary>
    <div class="constants">
      ${constantPool
        .map(
          constant => `
        <div class="index">${constant.index}</div>
        <div class="type">${constant.type}</div>
        <div class="value">${constant.value}</div>
        `
        )
        .join("\n")}
    </div>
</details>
`;

// FIXME Frame, stack, locals, ... current step
export const renderMethodCode = (
  code: InstructionInstance[],
  position: number
): string => {
  const classes = (inst: InstructionInstance) =>
    [
      inst.instruction.type ? `inst-${inst.instruction.type}` : "",
      position === inst.position ? "selected" : ""
    ]
      .filter(s => s !== "")
      .join(" ");
  return `
<ul class="code">
  ${code
    .map(
      inst => `
  <li class="${classes(inst)}">
    <div class="position">${inst.position}</div>
    <div class="code">${inst.instruction.code}</div>
    <div class="args">${inst.args}</div>

  </li>
    `
    )
    .join("\n")}
</ul>
`;
};
