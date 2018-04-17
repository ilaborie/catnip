import { Frame } from "./Frame";
import { Constant, MethodBody, Type } from "./input";
import { LocalVariables } from "./LocalVariables";
import { nativeMethods } from "./native-methods";
import { OperandStack } from "./OperandStack";
import { Value } from "./runtime";

export class Frames {
  public readonly frames: Frame[] = [];

  get currentFrame(): Frame {
    return this.frames[this.frames.length - 1];
  }

  constructor(
    readonly constantPool: Constant[],
    readonly methods: Map<string, MethodBody>,
    mainArgs: Value[] = [{ type: Type.Ref, value: [] }]
  ) {
    const mainMethod = methods.get("main");
    if (!mainMethod) {
      throw new Error(`'main' method is missing`);
    }
    const mainFrame = this.createFrame("main", mainMethod, mainArgs);
    mainFrame.locals.set(0, mainArgs[0]);
    this.frames.push(mainFrame);
  }

  public next() {
    const currentFrame = this.currentFrame;
    const { methodBody, position } = currentFrame;
    const instruction = currentFrame.currentInstruction;
    instruction.instruction.apply(currentFrame);
  }

  public callStaticMethod(value: string): void {
    const nativeMethod = nativeMethods.get(value);
    if (nativeMethod) {
      const args = this.getArgs(nativeMethod.args_size);
      const res = nativeMethod.call(args);
      if (res) {
        this.currentFrame.stack.push(res);
      }
      this.currentFrame.next();
    } else {
      const method = this.getMethod(value);
      const args = this.getArgs(method.args_size);
      const frame = this.createFrame(value, method, args);
      this.frames.push(frame);
      // bind args to locals
      const locals = this.currentFrame.locals;
      args.forEach((arg, index) => locals.set(index, arg));
    }
  }

  public callObjectMethod(value: any): void {
    const nativeMethod = nativeMethods.get(value);
    if (nativeMethod) {
      const methodArgs = this.getArgs(nativeMethod.args_size);
      const objectRef = this.currentFrame.stack.pop();
      const args = [objectRef, ...methodArgs];
      const res = nativeMethod.call(args);
      if (res) {
        this.currentFrame.stack.push(res);
      }
      this.currentFrame.next();
    } else {
      const method = this.getMethod(value);
      const methodArgs = this.getArgs(method.args_size);
      const objectRef = this.currentFrame.stack.pop();
      const args = [objectRef, ...methodArgs];
      const frame = this.createFrame(value, method, args);
      this.frames.push(frame);
      // bind args to locals
      const locals = this.currentFrame.locals;
      args.forEach((arg, index) => locals.set(index, arg));
    }
  }

  public endFrame(value?: Value): void {
    this.frames.pop();
    if (value) {
      this.currentFrame.stack.push(value);
    }
    if (this.frames.length === 0) {
      alert("Done");
    } else {
      this.currentFrame.next();
    }
  }

  private createFrame(name: string, body: MethodBody, args: Value[]): Frame {
    return new Frame(
      this,
      name,
      body.code[0].position,
      args,
      body,
      new OperandStack(body.stack),
      new LocalVariables(body.locals)
    );
  }

  private getMethod(m: string): MethodBody {
    const method = this.methods.get(m);
    if (!method) {
      throw new Error(
        `'${m}' not found, got ${Array.from(this.methods.keys())}`
      );
    }
    return method;
  }

  private getArgs(size: number): Value[] {
    const args: Value[] = [];
    for (let i = 0; i < size; i++) {
      args.push(this.currentFrame.stack.pop());
    }
    return args;
  }
}
