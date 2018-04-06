import { Constant, InstructionInstance, MethodBody } from "../../models/input";
import { lookupInstruction } from "../../models/instructions";
import { Value } from "../../models/runtime";
import { TODO } from "../../models/utils";
import { MethodParser } from "../parser";

class MethodBodyImpl implements MethodBody {
  constructor(
    readonly stack: number,
    readonly locals: number,
    readonly args_size: number,
    readonly code: InstructionInstance[]
  ) {}
}

const createInstruction = (line: string): InstructionInstance => {
  const regexpInstruction1 = /^\s*(\d+): ([a-z0-9_]*)\s+(\S*)\s+\/\/\s(.*)$/gm;
  const t1 = regexpInstruction1.exec(line);
  if (t1 !== null) {
    const [all, sIndex, opscode, v0, v1] = Array.from(t1 || []);
    const position = parseInt(sIndex, 10);
    const args = v0 && v1 ? [v1] : v0 ? [v0] : [];
    const instruction = lookupInstruction(opscode, args);
    return { position, instruction, args };
  }

  const regexpInstruction2 = /^\s*(\d+): ([a-z0-9_]*)(\s+([\d, ]*))?$/gm;
  const t2 = regexpInstruction2.exec(line);
  if (t2 !== null) {
    const [all, sIndex, opscode, v0, v1] = Array.from(t2 || []);
    const position = parseInt(sIndex, 10);
    const args = v1 ? (v1 as string).split(", ") : [];
    const instruction = lookupInstruction(opscode, args);
    return { position, instruction, args };
  }

  throw new Error(`Cannot parse line ${line}`);
};

export const methodParser: MethodParser = {
  parse(
    constantPool: Constant[],
    stack: number,
    locals: number,
    args_size: number,
    input: string
  ) {
    const code = input
      .split("\n")
      .map(s => s.trim())
      .filter(s => s !== "")
      .map(s => createInstruction(s));

    return new MethodBodyImpl(stack, locals, args_size, code);
  }
};
