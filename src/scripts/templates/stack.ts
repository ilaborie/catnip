import { html, TemplateResult } from "lit-html";

import { OperandStack } from "../models/OperandStack";
import { Value } from "../models/runtime";

const renderStackValue = (value: Value | null): TemplateResult =>
  value
    ? html`
        <div class="type-${value.type}" title="${value.value}">
          ${value.value}
        </div>
      `
    : html`
        <div class="empty"></div>
      `;

export const renderStack = (stack: OperandStack): TemplateResult =>
  html`
    <div class="stack">
      <header>Stack</header>
      <div>
        ${stack.list.map(renderStackValue)}
      </div>
    </div>
  `;
