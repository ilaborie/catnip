import {Instruction, Type, typePrefix} from "../input";
import {Frame} from "../runtime";

const typedConst = (type: Type, value: any): Instruction => ({
    type,
    code: `${typePrefix(type)}const_${value}`,
    apply: (frame: Frame) => {
        frame.stack.push({type, value});
    },
});

export const stackInstructions: { [index: string]: () => Instruction } = {};

//
for (let i = 0; i < 6; i++) {
    stackInstructions[`iconst_${i}`] = () => typedConst(Type.Int, 1);
    // TODO, iload_
    // TODO, istore_
}
