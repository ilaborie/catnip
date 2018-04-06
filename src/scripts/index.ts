
const mount = (elt: HTMLElement | null): void => {
    if (elt !== null) {
        elt.innerHTML = "Plop";
    } else {
        console.warn("Cannot mount element:", elt);
    }
};

// Main

mount(document.querySelector("main"));
