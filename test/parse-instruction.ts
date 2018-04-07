import { constantPoolParser } from "../src/scripts/parser/impl/constant-parser";

const helloWorldConstants = `   #1 = Methodref          #6.#15         // java/lang/Object."<init>":()V
#2 = Fieldref           #16.#17        // java/lang/System.out:Ljava/io/PrintStream;
#3 = String             #18            // Hello Devoxx
#4 = Methodref          #19.#20        // java/io/PrintStream.println:(Ljava/lang/String;)V
#5 = Class              #21            // _00_helloworld/HelloWorld
#6 = Class              #22            // java/lang/Object
#7 = Utf8               <init>
#8 = Utf8               ()V
#9 = Utf8               Code
#10 = Utf8               LineNumberTable
#11 = Utf8               main
#12 = Utf8               ([Ljava/lang/String;)V
#13 = Utf8               SourceFile
#14 = Utf8               HelloWorld.java
#15 = NameAndType        #7:#8          // "<init>":()V
#16 = Class              #23            // java/lang/System
#17 = NameAndType        #24:#25        // out:Ljava/io/PrintStream;
#18 = Utf8               Hello Devoxx
#19 = Class              #26            // java/io/PrintStream
#20 = NameAndType        #27:#28        // println:(Ljava/lang/String;)V
#21 = Utf8               _00_helloworld/HelloWorld
#22 = Utf8               java/lang/Object
#23 = Utf8               java/lang/System
#24 = Utf8               out
#25 = Utf8               Ljava/io/PrintStream;
#26 = Utf8               java/io/PrintStream
#27 = Utf8               println
#28 = Utf8               (Ljava/lang/String;)V`;

it("parse HelloWorld constants", () => {
    const poll = constantPoolParser.parse(helloWorldConstants);
    expect(poll.length).toBe(28);
});
