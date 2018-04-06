import { Frames } from "./Frames";
import { InstructionInstance, MethodBody, Type } from "./input";
import { LocalVariables } from "./LocalVariables";
import { OperandStack } from "./OperandStack";
import { Value } from "./runtime";
import { TODO } from "./utils";

export class Frame {
  get currentInstruction(): InstructionInstance {
    return this.getInstruction(this.position);
  }
  constructor(
    readonly parent: Frames,
    readonly name: string,
    public position: number,
    readonly args: Value[],
    readonly methodBody: MethodBody,
    readonly stack: OperandStack,
    readonly locals: LocalVariables
  ) {}

  public next(position?: number): void {
    if (position) {
      this.getInstruction(position);
      this.position = position;
    } else {
      const idx = this.methodBody.code.indexOf(this.currentInstruction);
      this.position = this.methodBody.code[idx + 1].position;
    }
  }

  public return(value?: Value): void {
    if (value) {
      console.log(
        `${this.name}(${this.args}) return: [${Type[value.type]}] ${
          value.value
        }`
      );
    } else {
      console.log(`${this.name}(${this.args}) return: void`);
    }
    this.parent.endFrame(value);
  }

  private getInstruction(pos: number): InstructionInstance {
    const res = this.methodBody.code.find(inst => inst.position === pos);
    if (!res) {
      throw new Error(`No instruction found with position ${pos}`);
    }
    return res;
  }
}
