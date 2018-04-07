parcelRequire=function(e,r,n){var t="function"==typeof parcelRequire&&parcelRequire,i="function"==typeof require&&require;function u(n,o){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!o&&f)return f(n,!0);if(t)return t(n,!0);if(i&&"string"==typeof n)return i(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}a.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,a,l,l.exports)}return r[n].exports;function a(e){return u(a.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=t;for(var o=0;o<n.length;o++)u(n[o]);return u}({16:[function(require,module,exports) {
"use strict";var e;function t(t){switch(t){case e.Int:return"i";case e.Long:return"l";case e.Float:return"f";case e.Double:return"d";case e.Char:return"c";case e.Short:return"s";default:throw new Error("Unexpected type "+t)}}Object.defineProperty(exports,"__esModule",{value:!0}),function(e){e[e.Constant=0]="Constant",e[e.Int=1]="Int",e[e.Long=2]="Long",e[e.Float=3]="Float",e[e.Double=4]="Double",e[e.Char=5]="Char",e[e.Short=6]="Short"}(e=exports.Type||(exports.Type={})),exports.typePrefix=t;
},{}],7:[function(require,module,exports) {
"use strict";var t=function(){function t(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(n,e,i){return e&&t(n.prototype,e),i&&t(n,i),n}}();function n(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./input"),i=function(){function i(t,e,o,r,s,u,a){n(this,i),this.parent=t,this.name=e,this.position=o,this.args=r,this.methodBody=s,this.stack=u,this.locals=a}return t(i,[{key:"next",value:function(t){if(t)this.getInstruction(t),this.position=t;else{var n=this.methodBody.code.indexOf(this.currentInstruction);this.position=this.methodBody.code[n+1].position}}},{key:"return",value:function(t){t?console.log(this.name+"("+this.args+") return: ["+e.Type[t.type]+"] "+t.value):console.log(this.name+"("+this.args+") return: void"),this.parent.endFrame(t)}},{key:"getInstruction",value:function(t){var n=this.methodBody.code.find(function(n){return n.position===t});if(!n)throw new Error("No instruction found with position "+t);return n}},{key:"currentInstruction",get:function(){return this.getInstruction(this.position)}}]),i}();exports.Frame=i;
},{"./input":16}],8:[function(require,module,exports) {
"use strict";var t=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var n=function(){function n(t){e(this,n),this._list=[],this._list=Array.apply(null,Array(t))}return t(n,[{key:"get",value:function(t){return this._list[t]}},{key:"set",value:function(t,e){this._list[t]=e}},{key:"list",get:function(){return this._list}}]),n}();exports.LocalVariables=n;
},{}],9:[function(require,module,exports) {
"use strict";function r(r){if(Array.isArray(r)){for(var e=0,t=Array(r.length);e<r.length;e++)t[e]=r[e];return t}return Array.from(r)}Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./input");function t(){var e,t=Array.from(arguments);(e=console).log.apply(e,r(t))}var a={args_size:1,call:function(r){var t=r[1];t.type&&t.value?alert("["+e.Type[t.type]+"]: "+t.value):alert(JSON.stringify(t))}};exports.nativeMethods=(new Map).set("Method java/io/PrintStream.println:(I)V",a).set("Method java/io/PrintStream.println:(Ljava/lang/Object;)V",a);
},{"./input":16}],10:[function(require,module,exports) {
"use strict";var t=function(){function t(t,i){for(var n=0;n<i.length;n++){var e=i[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(i,n,e){return n&&t(i.prototype,n),e&&t(i,e),i}}();function i(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var n=function(){function n(t){i(this,n),this._position=0,this._list=Array.apply(null,Array(t))}return t(n,[{key:"push",value:function(t){this._list[this._position]=t,this._position++}},{key:"pop",value:function(){var t=this._list[this._position-1];return this._list[this._position-1]=null,this._position--,t}},{key:"peek",value:function(){return this._list[this._position-1]}},{key:"list",get:function(){return this._list}}]),n}();exports.OperandStack=n;
},{}],4:[function(require,module,exports) {
"use strict";var e=function(){function e(e,r){for(var t=0;t<r.length;t++){var a=r[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(r,t,a){return t&&e(r.prototype,t),a&&e(r,a),r}}();function r(e){if(Array.isArray(e)){for(var r=0,t=Array(e.length);r<e.length;r++)t[r]=e[r];return t}return Array.from(e)}function t(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var a=require("./Frame"),n=require("./LocalVariables"),s=require("./native-methods"),i=require("./OperandStack"),o=function(){function o(e,r){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];t(this,o),this.constantPool=e,this.methods=r,this.frames=[];var n=r.get("main");if(!n)throw new Error("'main' method is missing");var s=this.createFrame("main",n,a);s.locals.set(0,a[0]),this.frames.push(s)}return e(o,[{key:"next",value:function(){var e=this.currentFrame;e.methodBody,e.position;e.currentInstruction.instruction.apply(e)}},{key:"callStaticMethod",value:function(e){var r=s.nativeMethods.get(e);if(r){var t=this.getArgs(r.args_size),a=r.call(t);a&&this.currentFrame.stack.push(a),this.currentFrame.next()}else{var n=this.getMethod(e),i=this.getArgs(n.args_size),o=this.createFrame(e,n,i);this.frames.push(o);var c=this.currentFrame.locals;i.forEach(function(e,r){return c.set(r,e)})}}},{key:"callObjectMethod",value:function(e){var t=s.nativeMethods.get(e);if(t){var a=this.getArgs(t.args_size),n=[this.currentFrame.stack.pop()].concat(r(a)),i=t.call(n);i&&this.currentFrame.stack.push(i),this.currentFrame.next()}else{var o=this.getMethod(e),c=this.getArgs(o.args_size),u=[this.currentFrame.stack.pop()].concat(r(c)),h=this.createFrame(e,o,u);this.frames.push(h);var l=this.currentFrame.locals;u.forEach(function(e,r){return l.set(r,e)})}}},{key:"endFrame",value:function(e){this.frames.pop(),e&&this.currentFrame.stack.push(e),0===this.frames.length?alert("Done"):this.currentFrame.next()}},{key:"createFrame",value:function(e,r,t){return new a.Frame(this,e,r.code[0].position,t,r,new i.OperandStack(r.stack),new n.LocalVariables(r.locals))}},{key:"getMethod",value:function(e){var r=this.methods.get(e);if(!r)throw new Error("'"+e+"' not found, got "+Array.from(this.methods.keys()));return r}},{key:"getArgs",value:function(e){for(var r=[],t=this.currentFrame.stack,a=0;a<e;a++)r.push(t.pop());return r}},{key:"currentFrame",get:function(){return this.frames[this.frames.length-1]}}]),o}();exports.Frames=o;
},{"./Frame":7,"./LocalVariables":8,"./native-methods":9,"./OperandStack":10}],14:[function(require,module,exports) {
"use strict";var r=function(){return function(r,t){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return function(r,t){var e=[],n=!0,o=!1,a=void 0;try{for(var i,u=r[Symbol.iterator]();!(n=(i=u.next()).done)&&(e.push(i.value),!t||e.length!==t);n=!0);}catch(r){o=!0,a=r}finally{try{!n&&u.return&&u.return()}finally{if(o)throw a}}return e}(r,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();Object.defineProperty(exports,"__esModule",{value:!0});var t=function(t){var e=/^\s*#(\d+) = ([a-zA-Z0-8]*)\s+(\S*)(\s+\/\/\s(.*))?$/gm.exec(t),n=Array.from(e||[]),o=r(n,6),a=(o[0],o[1]),i=o[2],u=o[3],s=(o[4],o[5]);return{index:parseInt(a,10),type:i,value:s||u}};exports.constantPoolParser={parse:function(r){return r.split("\n").map(function(r){return r.trim()}).filter(function(r){return""!==r}).map(function(r){return t(r)})}};
},{}],18:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../input");exports.flowInstructions={};var n={ge:function(t,n){return t>=n},gt:function(t,n){return t>n},le:function(t,n){return t<=n},lt:function(t,n){return t<n},ne:function(t,n){return t!==n}},r=function(r,e,o){return{type:r,code:"if_"+t.typePrefix(r)+"cmp"+o,apply:function(t){var r=t.stack.pop().value,u=t.stack.pop().value,c=n[o](u,r);t.next(c?e:void 0)}}},e=function(t){return{code:"goto",apply:function(n){n.next(t)}}};exports.flowInstructions.goto=function(t){var n=parseInt(t[0],10);return e(n)},exports.flowInstructions.return=function(){return{code:"return",apply:function(t){return t.return()}}},[t.Type.Int,t.Type.Long,t.Type.Float,t.Type.Double].forEach(function(n){var e=t.typePrefix(n);["gt","ge","lt","le","ne"].forEach(function(t){exports.flowInstructions["if_"+e+"cmp"+t]=function(e){var o=parseInt(e[0],10);return r(n,o,t)}}),exports.flowInstructions[e+"return"]=function(){return{type:n,code:e+"return",apply:function(t){var n=t.stack.pop();t.return(n)}}}});
},{"../input":16}],19:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../input");exports.mathInstructions={};var n=function(n,e,r){return{type:n,code:t.typePrefix(n)+e,apply:function(t){var e=t.stack.pop(),u=t.stack.pop();t.stack.push({type:n,value:r(e.value,u.value)}),t.next()}}},e=function(n,e,r){return{type:n,code:t.typePrefix(n)+e,apply:function(t){var e=t.stack.pop();t.stack.pop();t.stack.push({type:n,value:r(e.value)}),t.next()}}},r=function(n,e){return{type:t.Type.Int,code:"iinc",apply:function(t){var r=t.locals.get(n),u=r.type,o=r.value;t.locals.set(n,{type:u,value:o+e}),t.next()}}};[t.Type.Int,t.Type.Long,t.Type.Float,t.Type.Double].forEach(function(u){var o=t.typePrefix(u);exports.mathInstructions[o+"add"]=function(){return n(u,"add",function(t,n){return t+n})},exports.mathInstructions[o+"sub"]=function(){return n(u,"sub",function(t,n){return t-n})},exports.mathInstructions[o+"mul"]=function(){return n(u,"mul",function(t,n){return t*n})},exports.mathInstructions[o+"div"]=function(){return n(u,"rem",function(t,n){return t%n})},exports.mathInstructions[o+"neg"]=function(){return e(u,"neg",function(t){return-t})},exports.mathInstructions.iinc=function(t){var n=parseInt(t[0],10),e=parseInt(t[1],10);return r(n,e)}});
},{"../input":16}],20:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../input");exports.objectsInstructions={},exports.objectsInstructions.getstatic=function(e){return{code:"getstatic",apply:function(n){var o=e[0];n.stack.push({type:t.Type.Constant,value:o}),n.next()}}},exports.objectsInstructions.invokestatic=function(t){return{code:"invokestatic",apply:function(e){var n=t[0];e.parent.callStaticMethod(n)}}},exports.objectsInstructions.invokevirtual=function(t){return{code:"invokevirtual",apply:function(e){var n=t[0];e.parent.callObjectMethod(n)}}};
},{"../input":16}],21:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.otherInstructions={};
},{}],22:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../input");exports.stackInstructions={};var n=function(n,e){return{type:n,code:t.typePrefix(n)+"const_"+e,apply:function(t){t.stack.push({type:n,value:e}),t.next()}}},e=function(n,e){return{type:n,code:t.typePrefix(n)+"store_"+e,apply:function(t){var n=t.stack.pop();t.locals.set(e,n),t.next()}}},o=function(n,e){return{type:n,code:t.typePrefix(n)+"load_"+e,apply:function(t){var n=t.locals.get(e);t.stack.push(n),t.next()}}};[t.Type.Int,t.Type.Long,t.Type.Float,t.Type.Double].forEach(function(r){for(var c=t.typePrefix(r),s=function(t){exports.stackInstructions[c+"const_"+t]=function(){return n(r,t)}},u=0;u<6;u++)s(u);var p=function(t){exports.stackInstructions[c+"store_"+t]=function(){return e(r,t)},exports.stackInstructions[c+"load_"+t]=function(){return o(r,t)}};for(u=0;u<4;u++)p(u)}),exports.stackInstructions.iconst_m1=function(){return n(t.Type.Int,-1)},exports.stackInstructions.ldc=function(n){return{code:"ldc",apply:function(e){var o=n[0];e.stack.push({type:t.Type.Constant,value:o}),e.next()}}};
},{"../input":16}],17:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./flow"),e=require("./math"),r=require("./objects"),o=require("./others"),s=require("./stacks"),n=Object.assign({},s.stackInstructions,r.objectsInstructions,e.mathInstructions,t.flowInstructions,o.otherInstructions);console.log("Got "+Object.keys(n).length+" instructions"),exports.lookupInstruction=function(t,e){var r=n[t];if(r)return r(e);throw new Error("Opscode "+t+" not found !")};
},{"./flow":18,"./math":19,"./objects":20,"./others":21,"./stacks":22}],15:[function(require,module,exports) {
"use strict";var r=function(){return function(r,t){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return function(r,t){var n=[],e=!0,i=!1,o=void 0;try{for(var a,s=r[Symbol.iterator]();!(e=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);e=!0);}catch(r){i=!0,o=r}finally{try{!e&&s.return&&s.return()}finally{if(i)throw o}}return n}(r,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();function t(r,t){if(!(r instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var n=require("../../models/instructions"),e=function r(n,e,i,o){t(this,r),this.stack=n,this.locals=e,this.args_size=i,this.code=o},i=function(t){var e=/^\s*(\d+): ([a-z0-9_]*)\s+(\S*)\s+\/\/\s(.*)$/gm.exec(t);if(null!==e){var i=Array.from(e||[]),o=r(i,5),a=(o[0],o[1]),s=o[2],u=o[3],c=o[4],l=parseInt(a,10),f=u&&c?[c]:u?[u]:[];return{position:l,instruction:n.lookupInstruction(s,f),args:f}}var p=/^\s*(\d+): ([a-z0-9_]*)(\s+([\d, ]*))?$/gm.exec(t);if(null!==p){var h=Array.from(p||[]),v=r(h,5),y=(v[0],v[1]),d=v[2],m=(v[3],v[4]),w=parseInt(y,10),g=m?m.split(", "):[];return{position:w,instruction:n.lookupInstruction(d,g),args:g}}throw new Error("Cannot parse line "+t)};exports.methodParser={parse:function(r,t,n,o,a){var s=a.split("\n").map(function(r){return r.trim()}).filter(function(r){return""!==r}).map(function(r){return i(r)});return new e(t,n,o,s)}};
},{"../../models/instructions":17}],5:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./impl/constant-parser"),a=require("./impl/instruction-parser"),n='#1 = Methodref          #6.#18         // java/lang/Object."<init>":()V\n   #2 = Fieldref           #19.#20        // java/lang/System.out:Ljava/io/PrintStream;\n   #3 = Methodref          #5.#21         // _01_factorial/Factorial.factorial:(I)I\n   #4 = Methodref          #22.#23        // java/io/PrintStream.println:(I)V\n   #5 = Class              #24            // _01_factorial/Factorial\n   #6 = Class              #25            // java/lang/Object\n   #7 = Utf8               <init>\n   #8 = Utf8               ()V\n   #9 = Utf8               Code\n  #10 = Utf8               LineNumberTable\n  #11 = Utf8               factorial\n  #12 = Utf8               (I)I\n  #13 = Utf8               StackMapTable\n  #14 = Utf8               main\n  #15 = Utf8               ([Ljava/lang/String;)V\n  #16 = Utf8               SourceFile\n  #17 = Utf8               Factorial.java\n  #18 = NameAndType        #7:#8          // "<init>":()V\n  #19 = Class              #26            // java/lang/System\n  #20 = NameAndType        #27:#28        // out:Ljava/io/PrintStream;\n  #21 = NameAndType        #11:#12        // factorial:(I)I\n  #22 = Class              #29            // java/io/PrintStream\n  #23 = NameAndType        #30:#31        // println:(I)V\n  #24 = Utf8               _01_factorial/Factorial\n  #25 = Utf8               java/lang/Object\n  #26 = Utf8               java/lang/System\n  #27 = Utf8               out\n  #28 = Utf8               Ljava/io/PrintStream;\n  #29 = Utf8               java/io/PrintStream\n  #30 = Utf8               println\n  #31 = Utf8               (I)V',e="0: iconst_1\n1: istore_1\n2: iconst_2\n3: istore_2\n4: iload_2\n5: iload_0\n6: if_icmpgt     19\n9: iload_1\n10: iload_2\n11: imul\n12: istore_1\n13: iinc          2, 1\n16: goto          4\n19: iload_1\n20: ireturn",i=" 0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;\n3: iconst_5\n4: invokestatic  #3                  // Method plop:(I)I\n7: invokevirtual #4                  // Method java/io/PrintStream.println:(I)V\n10: return";exports.constantPool=t.constantPoolParser.parse(n),exports.sample=(new Map).set("Method plop:(I)I",a.methodParser.parse(exports.constantPool,2,3,1,e)).set("main",a.methodParser.parse(exports.constantPool,2,1,1,i));
},{"./impl/constant-parser":14,"./impl/instruction-parser":15}],11:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.renderConstantPool=function(n){return'\n<details>\n    <summary>Constant Pool</summary>\n    <div class="constants">\n      '+n.map(function(n){return'\n        <div class="index">'+n.index+'</div>\n        <div class="type">'+n.type+'</div>\n        <div class="value">'+n.value+"</div>\n        "}).join("\n")+"\n    </div>\n</details>\n"},exports.renderMethodCode=function(n,i){return'\n<ul class="code">\n  '+n.map(function(n){return'\n  <li class="'+function(n){return[n.instruction.type?"inst-"+n.instruction.type:"",i===n.position?"selected":""].filter(function(n){return""!==n}).join(" ")}(n)+'">\n    <div class="position">'+n.position+'</div>\n    <div class="code">'+n.instruction.code+'</div>\n    <div class="args">'+n.args+"</div>\n\n  </li>\n    "}).join("\n")+"\n</ul>\n"};
},{}],12:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(e){return e?'<div class="type-'+e.type+'" title="'+e.value+'">'+e.value+"</div>":'<div class="empty"></div>'};exports.renderLocals=function(n){return'\n<div class="locals">\n    <header>Locals</header>\n    <div>\n        '+n.list.map(e).join("\n")+"\n    </div>\n</div>\n"};
},{}],13:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(e){return e?'<div class="type-'+e.type+'" title="'+e.value+'">'+e.value+"</div>":'<div class="empty"></div>'};exports.renderStack=function(t){return'\n<div class="stack">\n    <header>Stack</header>\n    <div>\n        '+t.list.map(e).join("\n")+"\n    </div>\n</div>\n"};
},{}],6:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./inputs"),n=require("./locals"),r=require("./stack"),t=function(e){return'<span class="args">'+e.map(function(e){return'<span class="type-'+e.type+'">'+e.value+"</span>"}).join("")+"</span>"},a=function(a,s){return'\n<article class="frame '+(s?"current":"")+'">\n  <header>'+a.name+" "+t(a.args)+"</header>\n  "+e.renderMethodCode(a.methodBody.code,a.position)+"\n  "+r.renderStack(a.stack)+"\n  "+n.renderLocals(a.locals)+"\n</article>\n"};exports.renderFrames=function(n){return"\n"+e.renderConstantPool(n.constantPool)+'\n<details open class="frames">\n    <summary>Frames</summary>\n    <menu>\n      '+(n.frames.length>0?'<button type="button" class="next">↩️ Next</button>':"")+"\n    </menu>\n    <div>\n      "+n.frames.map(function(e){return a(e,e===n.currentFrame)}).join("\n")+"\n    </div>\n</details>\n"};
},{"./inputs":11,"./locals":12,"./stack":13}],3:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./models/Frames"),n=require("./parser/sample"),r=require("./templates/frame"),t=new e.Frames(n.constantPool,n.sample);exports.catnip=function(e){if(null!==e){e.innerHTML=r.renderFrames(t);var n=document.querySelector(".frames menu .next");n&&(n.onclick=function(){t.next(),exports.catnip(e)})}else console.warn("Cannot mount element:",e)},window.catnip=exports.catnip;
},{"./models/Frames":4,"./parser/sample":5,"./templates/frame":6}]},{},[3])
//# sourceMappingURL=/scripts.3fb271f0.map