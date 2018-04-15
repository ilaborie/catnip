import { Constant } from "../../models/input";
import { ConstantPoolParser } from "../parser";

const createConstant = (s: string): Constant => {
  const regexpConstant = /^\s*#(\d+) = ([a-zA-Z0-8]*)\s+(\S*)(\s+\/\/\s(.*))?$/gm;
  const t = regexpConstant.exec(s);
  const [all, sIndex, type, v0, rest, v1] = Array.from(t || []);
  const index = parseInt(sIndex, 10);
  const value = v1 ? v1 : v0;
  return { index, type, value };
};

export const constantPoolParser: ConstantPoolParser = {
  parse(input: string): Constant[] {
    return input
      .split("\n")
      .map(s => s.trim())
      .filter(s => s !== "")
      .map(s => createConstant(s));
  }
};
