import {MethodBody} from "./../models/input";
import { constantPoolParser } from "./impl/constant-parser";
import { methodParser } from "./impl/instruction-parser";

const consts = `#1 = Methodref          #6.#18         // java/lang/Object."<init>":()V
   #2 = Fieldref           #19.#20        // java/lang/System.out:Ljava/io/PrintStream;
   #3 = Methodref          #5.#21         // _01_factorial/Factorial.factorial:(I)I
   #4 = Methodref          #22.#23        // java/io/PrintStream.println:(I)V
   #5 = Class              #24            // _01_factorial/Factorial
   #6 = Class              #25            // java/lang/Object
   #7 = Utf8               <init>
   #8 = Utf8               ()V
   #9 = Utf8               Code
  #10 = Utf8               LineNumberTable
  #11 = Utf8               factorial
  #12 = Utf8               (I)I
  #13 = Utf8               StackMapTable
  #14 = Utf8               main
  #15 = Utf8               ([Ljava/lang/String;)V
  #16 = Utf8               SourceFile
  #17 = Utf8               Factorial.java
  #18 = NameAndType        #7:#8          // "<init>":()V
  #19 = Class              #26            // java/lang/System
  #20 = NameAndType        #27:#28        // out:Ljava/io/PrintStream;
  #21 = NameAndType        #11:#12        // factorial:(I)I
  #22 = Class              #29            // java/io/PrintStream
  #23 = NameAndType        #30:#31        // println:(I)V
  #24 = Utf8               _01_factorial/Factorial
  #25 = Utf8               java/lang/Object
  #26 = Utf8               java/lang/System
  #27 = Utf8               out
  #28 = Utf8               Ljava/io/PrintStream;
  #29 = Utf8               java/io/PrintStream
  #30 = Utf8               println
  #31 = Utf8               (I)V`;

const factorialCode = `0: iconst_1
1: istore_1
2: iconst_2
3: istore_2
4: iload_2
5: iload_0
6: if_icmpgt     19
9: iload_1
10: iload_2
11: imul
12: istore_1
13: iinc          2, 1
16: goto          4
19: iload_1
20: ireturn`;

const mainCode = ` 0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
3: iconst_5
4: invokestatic  #3                  // Method plop:(I)I
7: invokevirtual #4                  // Method java/io/PrintStream.println:(I)V
10: return`;

export const constantPool = constantPoolParser.parse(consts);

export const sample = new Map<string, MethodBody>()
    .set("plop:(I)I", methodParser.parse(constantPool, 2, 3, 1, factorialCode))
    .set("main", methodParser.parse(constantPool, 2, 1, 1, mainCode))
;
