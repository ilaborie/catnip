import {Constant, InstructionInstance, MethodBody, TODO} from "../models/input";
import {lookupInstruction} from "../models/instructions";
import {Value} from "../models/runtime";
import {ConstantPoolParser, MethodParser} from "./parser";

const createConstant = (s: string): Constant => {
    const regexpConstant = /^\s*#(\d+) = ([a-zA-Z0-8]*)\s+(\S*)(\s+\/\/\s(.*))?$/gm;
    const t = regexpConstant.exec(s);
    const [all, sIndex, type, v0, rest, v1] = Array.from(t || []);
    const index = parseInt(sIndex, 10);
    const value = (v1 ? v1 : v0);
    return {index, type, value};
};

export const constantPoolParser: ConstantPoolParser = {
    parse(input: string): Constant[] {
        return input.split("\n")
            .map((s) => s.trim())
            .filter((s) => s !== "")
            .map((s) => createConstant(s));
    },
};

class MethodBodyImpl implements MethodBody {

    constructor(readonly stack: number,
                readonly locals: number,
                readonly args_size: number,
                readonly code: InstructionInstance[]) {
    }

    public eval(): Value {

        return TODO();
    }
}

const createInstruction = (line: string): InstructionInstance => {
    const regexpInstruction1 = /^\s*(\d+): ([a-z0-9_]*)\s+(\S*)\s+\/\/\s(.*)$/gm;
    const t1 = regexpInstruction1.exec(line);
    if (t1 !== null) {
        const [all, sIndex, opscode, v0, v1] = Array.from(t1 || []);
        const position = parseInt(sIndex, 10);
        const instruction = lookupInstruction(opscode);
        const args = (v0 && v1 ? [v1] : (v0 ? [v0] : []));
        return {position, instruction, args};
    }

    const regexpInstruction2 = /^\s*(\d+): ([a-z0-9_]*)(\s+([\d, ]*))?$/gm;
    const t2 = regexpInstruction2.exec(line);
    if (t2 !== null) {
        // position: number;
        // instruction: Instruction;
        // args: any[];
        const [all, sIndex, opscode, v0, v1] = Array.from(t2 || []);
        const position = parseInt(sIndex, 10);
        const instruction = lookupInstruction(opscode);
        const args = (v1 ? (v1 as string).split(", ") : []);
        return {position, instruction, args};
    }

    throw new Error(`Cannot parse line ${line}`);
};

export const methodParser: MethodParser = {

    parse(constantPool: Constant[],
          stack: number,
          locals: number,
          args_size: number,
          input: string) {

        const code = input.split("\n")
            .map((s) => s.trim())
            .filter((s) => s === "")
            .map((s) => createInstruction(s));

        return new MethodBodyImpl(stack, locals, args_size, code);
    },
};
