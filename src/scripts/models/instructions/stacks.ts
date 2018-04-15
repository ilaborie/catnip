import { Frame } from "../Frame";
import { Instruction, InstructionBuilder, Type, typePrefix } from "../input";

export const stackInstructions: InstructionBuilder = {};

const typedConst = (type: Type, value: any): Instruction => ({
  type,
  code: `${typePrefix(type)}const_${value}`,
  apply: (frame: Frame) => {
    frame.stack.push({ type, value });
    frame.next();
  }
});

const typedStore = (type: Type, index: number): Instruction => ({
  type,
  code: `${typePrefix(type)}store_${index}`,
  apply: (frame: Frame) => {
    const value = frame.stack.pop();
    frame.locals.set(index, value);
    frame.next();
  }
});

const typedLoad = (type: Type, index: number): Instruction => ({
  type,
  code: `${typePrefix(type)}load_${index}`,
  apply: (frame: Frame) => {
    const value = frame.locals.get(index);
    frame.stack.push(value);
    frame.next();
  }
});

// Typed const, store, load
[Type.Int, Type.Long, Type.Float, Type.Double].forEach(type => {
  const t = typePrefix(type);

  for (let i = 0; i < 6; i++) {
    stackInstructions[`${t}const_${i}`] = () => typedConst(type, i);
  }
  for (let i = 0; i < 4; i++) {
    stackInstructions[`${t}store_${i}`] = () => typedStore(type, i);
    stackInstructions[`${t}load_${i}`] = () => typedLoad(type, i);
  }
});

stackInstructions.iconst_m1 = () => typedConst(Type.Int, -1);

stackInstructions.ldc = (args: any[]): Instruction => ({
  code: "ldc",
  apply: (frame: Frame) => {
    const value = args[0];
    frame.stack.push({ type: Type.Constant, value });
    frame.next();
  }
});

stackInstructions.dup = (args: any[]): Instruction => ({
  code: "dup",
  apply: (frame: Frame) => {
    const value = frame.stack.peek();
    frame.stack.push(value);
    frame.next();
  }
});

// Tstore, Tload, bipush, putstatic, aastore
