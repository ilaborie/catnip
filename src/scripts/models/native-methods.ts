import { Type } from "./input";
import { NativeMethod } from "./native-methods";
import { Value } from "./runtime";

export interface NativeMethod {
  args_size: number;

  call(args: any[]): Value | undefined;
}

function printConsole() {
  const args = Array.from(arguments);
  console.log(...args);
  return;
}

const println: NativeMethod = {
  args_size: 1,
  call(args: any[]) {
    // first arg is the java/io/PrintStream
    const value = args[1];
    if (value.type && value.value) {
      alert(`[${Type[value.type]}]: ${value.value}`);
    } else {
      alert(JSON.stringify(value));
    }
    return undefined;
  }
};

export const nativeMethods = new Map<string, NativeMethod>()
  .set("Method java/io/PrintStream.println:(I)V", println)
  .set("Method java/io/PrintStream.println:(Ljava/lang/Object;)V", println);
