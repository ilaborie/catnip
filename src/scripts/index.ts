import {constantPool} from "./parser/sample";
import {renderConstantPool, renderMethodBody} from "./templates/inputs";

const mount = (elt: HTMLElement | null): void => {
    if (elt !== null) {
        elt.innerHTML = renderConstantPool(constantPool);

    } else {
        console.warn("Cannot mount element:", elt);
    }
};

// Main

mount(document.querySelector("main"));
