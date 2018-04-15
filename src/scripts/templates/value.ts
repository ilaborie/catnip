import Any = jasmine.Any;
import { Type } from "../models/input";

const renderArrayValue = (array: Any[]): string =>
  array.length === 0
    ? "[]"
    : array.reduce(
        (acc, elt) => (acc === "" ? `[ ${elt}` : `${acc}, ${elt}`),
        ""
      ) + " ]";

export const renderTypedValue = (type: Type, value: any): string => {
  switch (type) {
    case Type.Ref:
      return `
    ref: ${Array.isArray(value) ? renderArrayValue(value) : value}`;
    default:
      return value === null ? "<null>" : `${value}`;
  }
};
