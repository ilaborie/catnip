export function TODO<T>(reason: string = ""): T {
  throw new Error(`Not Implemented${reason ? ": " + reason : ""}`);
}
