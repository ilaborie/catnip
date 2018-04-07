import { Value } from "./runtime";

export class LocalVariables {
    private _list: Value[] = [];
    get list(): Value[] {
        return this._list;
    }

    constructor(size: number) {
        this._list = Array.apply(null, Array<Value>(size));
    }

    public get(i: number): Value {
        return this._list[i];
    }

    public set(i: number, value: Value): void {
        this._list[i] = value;
    }
}
