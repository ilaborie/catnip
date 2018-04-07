import { Frames } from "./Frames";
import { MethodBody } from "./input";
import { LocalVariables } from "./LocalVariables";
import { OperandStack } from "./OperandStack";
import { Value } from "./runtime";
import { TODO } from "./utils";

export class Frame {

    constructor(readonly parent: Frames,
                readonly name: string,
                readonly position: number,
                readonly args: any[],
                readonly methodBody: MethodBody,
                readonly stack: OperandStack,
                readonly locals: LocalVariables) { }

    public next(position?: number): void {
        TODO("Frame#next");
    }

    public return(value?: Value): void {
        TODO("Frame#return");
    }

    public callStaticMethod(value: any): void {
        TODO("Frame#callStaticMethod");
    }
    public callObjectMethod(value: any): void {
        TODO("Frame#callObjectMethod");
    }
}
