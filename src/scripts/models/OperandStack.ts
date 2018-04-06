import { Value } from "./runtime";

type MaybeValue = Value | null;

export class OperandStack {
  private _list: MaybeValue[];
  private _position = 0;
  get list(): MaybeValue[] {
    return this._list;
  }

  constructor(size: number) {
    this._list = Array.apply(null, Array<MaybeValue>(size));
  }

  public push(value: Value): void {
    this._list[this._position] = value;
    this._position++;
  }

  public pop(): Value {
    const v = this._list[this._position - 1];
    this._list[this._position - 1] = null;
    this._position--;
    return v as Value;
  }

  public peek(): Value {
    const v = this._list[this._position - 1];
    return v as Value;
  }
}
