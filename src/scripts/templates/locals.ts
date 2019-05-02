import { html, TemplateResult } from "lit-html";

import { LocalVariables } from "../models/LocalVariables";
import { Value } from "../models/runtime";
import { renderTypedValue } from "./value";

const renderLocalValue = (value: Value | null): TemplateResult =>
  value
    ? html`
        <div class="type-${value.type}" title="${value.value}">
          ${renderTypedValue(value.type, value.value)}
        </div>
      `
    : html`
        <div class="empty"></div>
      `;

export const renderLocals = (locals: LocalVariables): TemplateResult => html`
  <div class="locals">
    <header>Locals</header>
    <div>
      ${locals.list.map(renderLocalValue)}
    </div>
  </div>
`;
