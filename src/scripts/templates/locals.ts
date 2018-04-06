import { Value } from "../models/runtime";
import { LocalVariables } from "./../models/LocalVariables";

const renderLocalValue = (value: Value | null): string =>
    value ? `<div class="type-${value.type}" title="${value.value}">${value.value}</div>` :
        `<div class="empty"></div>`;

export const renderLocals = (locals: LocalVariables): string => `
<div class="locals">
    <header>Locals</header>
    <div>
        ${locals.list.map(renderLocalValue).join("\n")}
    </div>
</div>
`;
