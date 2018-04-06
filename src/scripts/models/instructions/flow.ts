import { Frame } from "../Frame";
import { Instruction, InstructionBuilder, Type, typePrefix } from "../input";

// return, ireturn

export const flowInstructions: InstructionBuilder = {};

interface Comparators {
  [index: string]: (a: number, b: number) => boolean;
}

const comparators: Comparators = {
  ge: (a: number, b: number): boolean => a >= b,
  gt: (a: number, b: number): boolean => a > b,
  le: (a: number, b: number): boolean => a <= b,
  lt: (a: number, b: number): boolean => a < b,
  ne: (a: number, b: number): boolean => a !== b
};

const typedIfCmp = (
  type: Type,
  jump: number,
  cmp: keyof Comparators
): Instruction => ({
  type,
  code: `if_${typePrefix(type)}cmp${cmp}`,
  apply: (frame: Frame) => {
    const b = frame.stack.pop().value as number;
    const a = frame.stack.pop().value as number;
    const needJump = comparators[cmp](a, b);
    frame.next(needJump ? jump : undefined);
  }
});

const gotoLabel = (jump: number): Instruction => ({
  code: `goto`,
  apply: (frame: Frame) => {
    frame.next(jump);
  }
});

flowInstructions.goto = (args: any[]) => {
  const jump = parseInt(args[0], 10);
  return gotoLabel(jump);
};

flowInstructions.return = () => ({
  code: `return`,
  apply: (frame: Frame) => frame.return()
});

[Type.Int, Type.Long, Type.Float, Type.Double].forEach(type => {
  const t = typePrefix(type);

  ["gt", "ge", "lt", "le", "ne"].forEach(cmp => {
    flowInstructions[`if_${t}cmp${cmp}`] = (args: any[]) => {
      const jump = parseInt(args[0], 10);
      return typedIfCmp(type, jump, cmp);
    };
  });

  flowInstructions[`${t}return`] = () => ({
    type,
    code: `${t}return`,
    apply: (frame: Frame) => {
      const value = frame.stack.pop();
      frame.return(value);
    }
  });
});
