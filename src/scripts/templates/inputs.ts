import {Constant, MethodBody} from "../models/input";

export const renderConstantPool = (constantPool: Constant[]): string => `
<details>
    <summary>Constant Pool</summary>
    <div class="constants">
      ${
        constantPool.map((constant) => `
        <div class="index">${constant.index}</div>
        <div class="type">${constant.type}</div>
        <div class="value">${constant.value}</div>
        `).join("\n")
        }
    </div>
</details>
`;

// FIXME Frame, stack, locals, ... current step
export const renderMethodBody = (method: MethodBody): string => `
<ul class="code">
  ${
    method.code.map((inst) => `
  <li class="pos-${inst.position} inst-${inst.instruction.type}">
    <div class="position">${inst.position}</div>
    <div class="code">${inst.instruction.code}</div>
    <div class="args">${inst.args}</div>

  </li>
    `).join("\n")
    }
</ul>
`;
