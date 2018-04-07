import { MethodBody, Type } from "./input";
import { LocalVariables } from "./LocalVariables";
import { OperandStack } from "./OperandStack";

export interface Value {
    type: Type;
    value: any;
}
