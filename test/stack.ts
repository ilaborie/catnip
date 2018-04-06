import { Type } from "../src/scripts/models/input";
import { OperandStack } from "./../src/scripts/models/OperandStack";

const type = Type.Int;

it("empty stack", () => {
  const stack = new OperandStack(1);
  expect(stack.pop()).toBeUndefined();
});

it("push one elt on stack", () => {
  const stack = new OperandStack(1);
  stack.push({ type, value: 1 });

  const res = stack.pop();
  expect(res).toBeDefined();
  expect(res.value).toBe(1);
  expect(stack.list).toEqual([null]);
});

it("poping some elt on stack", () => {
  const stack = new OperandStack(2);
  stack.push({ type, value: 1 });
  stack.push({ type, value: 2 });

  let res = stack.pop();
  expect(res).toBeDefined();
  expect(res.value).toBe(2);

  res = stack.pop();
  expect(res).toBeDefined();
  expect(res.value).toBe(1);

  expect(stack.list).toEqual([null, null]);
});
