import { LocalVariables } from "../models/LocalVariables";
import { Value } from "../models/runtime";
import { renderTypedValue } from "./value";

const renderLocalValue = (value: Value | null): string =>
  value
    ? `<div class="type-${value.type}" title="${
        value.value
      }">${renderTypedValue(value.type, value.value)}</div>`
    : `<div class="empty"></div>`;

export const renderLocals = (locals: LocalVariables): string => `
<div class="locals">
    <header>Locals</header>
    <div>
        ${locals.list.map(renderLocalValue).join("\n")}
    </div>
</div>
`;
