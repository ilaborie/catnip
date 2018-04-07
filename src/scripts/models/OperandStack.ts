import { Value } from "./runtime";

export class OperandStack {
    private _list: Value[];
    private _position = 0;
    get list(): Value[] {
        return this._list;
    }

    constructor(size: number) {
        this._list = Array.apply(null, Array<Value>(size));
    }

    public push(value: Value): void {
        this._list[this._position] = value;
        this._position++;
    }

    public pop(): Value {
        const v = this._list[this._position];
        this._position--;
        return v;
    }

    public peek(): Value {
        return this._list[this._position];
    }
}
