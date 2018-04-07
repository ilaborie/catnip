import { Frame } from "./Frame";
import { Constant, MethodBody } from "./input";
import { LocalVariables } from "./LocalVariables";
import { OperandStack } from "./OperandStack";
import { TODO } from "./utils";

export class Frames {
    public readonly frames: Frame[] = [];

    constructor(readonly constantPool: Constant[],
                readonly methods: Map<string, MethodBody>) {
        const mainMethod = methods.get("main");
        if (!mainMethod) {
            throw new Error(`'main' method is missing`);
        }
        const mainFrame = new Frame(this,
            "main",
            mainMethod.code[0].position,
            [],
            mainMethod,
            new OperandStack(mainMethod.stack),
            new LocalVariables(mainMethod.locals));
        this.frames.push(mainFrame);
    }

    public next() {
        const currentFrame = this.frames[this.frames.length - 1];
        const { methodBody, position } = currentFrame;
        const instruction = methodBody.code.find((inst) => inst.position === position);
        if (!instruction) {
            throw new Error(`No instruction for position ${position}`);
        }
        console.log(`Eval ${instruction.instruction.code}`);
        instruction.instruction.apply(currentFrame);
        console.log({ currentFrame });
    }
}
