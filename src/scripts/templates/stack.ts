import { OperandStack } from "../models/OperandStack";
import { Value } from "../models/runtime";

const renderStackValue = (value: Value | null): string =>
    value ? `<div class="type-${value.type}" title="${value.value}">${value.value}</div>` :
        `<div class="empty"></div>`;

export const renderStack = (stack: OperandStack): string => `
<div class="stack">
    <header>Stack</header>
    <div>
        ${stack.list.map(renderStackValue).join("\n")}
    </div>
</div>
`;
