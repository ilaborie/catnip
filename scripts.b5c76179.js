// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({24:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Type;
(function (Type) {
    Type[Type["Constant"] = 0] = "Constant";
    // Numeric
    Type[Type["Int"] = 1] = "Int";
    Type[Type["Long"] = 2] = "Long";
    Type[Type["Float"] = 3] = "Float";
    Type[Type["Double"] = 4] = "Double";
    Type[Type["Char"] = 5] = "Char";
    Type[Type["Short"] = 6] = "Short";
})(Type = exports.Type || (exports.Type = {}));
function typePrefix(type) {
    switch (type) {
        case Type.Int:
            return "i";
        case Type.Long:
            return "l";
        case Type.Float:
            return "f";
        case Type.Double:
            return "d";
        case Type.Char:
            return "c";
        case Type.Short:
            return "s";
        default:
            throw new Error("Unexpected type " + type);
    }
}
exports.typePrefix = typePrefix;
},{}],8:[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("./input");

var Frame = function () {
    function Frame(parent, name, position, args, methodBody, stack, locals) {
        _classCallCheck(this, Frame);

        this.parent = parent;
        this.name = name;
        this.position = position;
        this.args = args;
        this.methodBody = methodBody;
        this.stack = stack;
        this.locals = locals;
    }

    _createClass(Frame, [{
        key: "next",
        value: function next(position) {
            if (position) {
                this.getInstruction(position);
                this.position = position;
            } else {
                var idx = this.methodBody.code.indexOf(this.currentInstruction);
                this.position = this.methodBody.code[idx + 1].position;
            }
        }
    }, {
        key: "return",
        value: function _return(value) {
            if (value) {
                console.log(this.name + "(" + this.args + ") return: [" + input_1.Type[value.type] + "] " + value.value);
            } else {
                console.log(this.name + "(" + this.args + ") return: void");
            }
            this.parent.endFrame(value);
        }
    }, {
        key: "getInstruction",
        value: function getInstruction(pos) {
            var res = this.methodBody.code.find(function (inst) {
                return inst.position === pos;
            });
            if (!res) {
                throw new Error("No instruction found with position " + pos);
            }
            return res;
        }
    }, {
        key: "currentInstruction",
        get: function get() {
            return this.getInstruction(this.position);
        }
    }]);

    return Frame;
}();

exports.Frame = Frame;
},{"./input":24}],9:[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var LocalVariables = function () {
    function LocalVariables(size) {
        _classCallCheck(this, LocalVariables);

        this._list = [];
        this._list = Array.apply(null, Array(size));
    }

    _createClass(LocalVariables, [{
        key: "get",
        value: function get(i) {
            return this._list[i];
        }
    }, {
        key: "set",
        value: function set(i, value) {
            this._list[i] = value;
        }
    }, {
        key: "list",
        get: function get() {
            return this._list;
        }
    }]);

    return LocalVariables;
}();

exports.LocalVariables = LocalVariables;
},{}],43:[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("./input");
function printConsole() {
    var _console;

    var args = Array.from(arguments);
    (_console = console).log.apply(_console, _toConsumableArray(args));
    return;
}
var println = {
    args_size: 1,
    call: function call(args) {
        // first arg is the java/io/PrintStream
        var value = args[1];
        if (value.type && value.value) {
            alert("[" + input_1.Type[value.type] + "]: " + value.value);
        } else {
            alert(JSON.stringify(value));
        }
        return undefined;
    }
};
exports.nativeMethods = new Map().set("Method java/io/PrintStream.println:(I)V", println).set("Method java/io/PrintStream.println:(Ljava/lang/Object;)V", println);
},{"./input":24}],10:[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var OperandStack = function () {
    function OperandStack(size) {
        _classCallCheck(this, OperandStack);

        this._position = 0;
        this._list = Array.apply(null, Array(size));
    }

    _createClass(OperandStack, [{
        key: "push",
        value: function push(value) {
            this._list[this._position] = value;
            this._position++;
        }
    }, {
        key: "pop",
        value: function pop() {
            var v = this._list[this._position - 1];
            this._list[this._position - 1] = null;
            this._position--;
            return v;
        }
    }, {
        key: "peek",
        value: function peek() {
            var v = this._list[this._position - 1];
            return v;
        }
    }, {
        key: "list",
        get: function get() {
            return this._list;
        }
    }]);

    return OperandStack;
}();

exports.OperandStack = OperandStack;
},{}],4:[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Frame_1 = require("./Frame");
var LocalVariables_1 = require("./LocalVariables");
var native_methods_1 = require("./native-methods");
var OperandStack_1 = require("./OperandStack");

var Frames = function () {
    function Frames(constantPool, methods) {
        var mainArgs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        _classCallCheck(this, Frames);

        this.constantPool = constantPool;
        this.methods = methods;
        this.frames = [];
        var mainMethod = methods.get("main");
        if (!mainMethod) {
            throw new Error("'main' method is missing");
        }
        var mainFrame = this.createFrame("main", mainMethod, mainArgs);
        mainFrame.locals.set(0, mainArgs[0]);
        this.frames.push(mainFrame);
    }

    _createClass(Frames, [{
        key: "next",
        value: function next() {
            var currentFrame = this.currentFrame;
            var methodBody = currentFrame.methodBody,
                position = currentFrame.position;

            var instruction = currentFrame.currentInstruction;
            instruction.instruction.apply(currentFrame);
        }
    }, {
        key: "callStaticMethod",
        value: function callStaticMethod(value) {
            var nativeMethod = native_methods_1.nativeMethods.get(value);
            if (nativeMethod) {
                var args = this.getArgs(nativeMethod.args_size);
                var res = nativeMethod.call(args);
                if (res) {
                    this.currentFrame.stack.push(res);
                }
                this.currentFrame.next();
            } else {
                var method = this.getMethod(value);
                var _args = this.getArgs(method.args_size);
                var frame = this.createFrame(value, method, _args);
                this.frames.push(frame);
                // bind args to locals
                var locals = this.currentFrame.locals;
                _args.forEach(function (arg, index) {
                    return locals.set(index, arg);
                });
            }
        }
    }, {
        key: "callObjectMethod",
        value: function callObjectMethod(value) {
            var nativeMethod = native_methods_1.nativeMethods.get(value);
            if (nativeMethod) {
                var methodArgs = this.getArgs(nativeMethod.args_size);
                var objectRef = this.currentFrame.stack.pop();
                var args = [objectRef].concat(_toConsumableArray(methodArgs));
                var res = nativeMethod.call(args);
                if (res) {
                    this.currentFrame.stack.push(res);
                }
                this.currentFrame.next();
            } else {
                var method = this.getMethod(value);
                var _methodArgs = this.getArgs(method.args_size);
                var _objectRef = this.currentFrame.stack.pop();
                var _args2 = [_objectRef].concat(_toConsumableArray(_methodArgs));
                var frame = this.createFrame(value, method, _args2);
                this.frames.push(frame);
                // bind args to locals
                var locals = this.currentFrame.locals;
                _args2.forEach(function (arg, index) {
                    return locals.set(index, arg);
                });
            }
        }
    }, {
        key: "endFrame",
        value: function endFrame(value) {
            this.frames.pop();
            if (value) {
                this.currentFrame.stack.push(value);
            }
            if (this.frames.length === 0) {
                alert("Done");
            } else {
                this.currentFrame.next();
            }
        }
    }, {
        key: "createFrame",
        value: function createFrame(name, body, args) {
            return new Frame_1.Frame(this, name, body.code[0].position, args, body, new OperandStack_1.OperandStack(body.stack), new LocalVariables_1.LocalVariables(body.locals));
        }
    }, {
        key: "getMethod",
        value: function getMethod(m) {
            var method = this.methods.get(m);
            if (!method) {
                throw new Error("'" + m + "' not found, got " + Array.from(this.methods.keys()));
            }
            return method;
        }
    }, {
        key: "getArgs",
        value: function getArgs(size) {
            var args = [];
            var stack = this.currentFrame.stack;
            for (var i = 0; i < size; i++) {
                args.push(stack.pop());
            }
            return args;
        }
    }, {
        key: "currentFrame",
        get: function get() {
            return this.frames[this.frames.length - 1];
        }
    }]);

    return Frames;
}();

exports.Frames = Frames;
},{"./Frame":8,"./LocalVariables":9,"./native-methods":43,"./OperandStack":10}],14:[function(require,module,exports) {
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Object.defineProperty(exports, "__esModule", { value: true });
var createConstant = function createConstant(s) {
    var regexpConstant = /^\s*#(\d+) = ([a-zA-Z0-8]*)\s+(\S*)(\s+\/\/\s(.*))?$/gm;
    var t = regexpConstant.exec(s);

    var _Array$from = Array.from(t || []),
        _Array$from2 = _slicedToArray(_Array$from, 6),
        all = _Array$from2[0],
        sIndex = _Array$from2[1],
        type = _Array$from2[2],
        v0 = _Array$from2[3],
        rest = _Array$from2[4],
        v1 = _Array$from2[5];

    var index = parseInt(sIndex, 10);
    var value = v1 ? v1 : v0;
    return { index: index, type: type, value: value };
};
exports.constantPoolParser = {
    parse: function parse(input) {
        return input.split("\n").map(function (s) {
            return s.trim();
        }).filter(function (s) {
            return s !== "";
        }).map(function (s) {
            return createConstant(s);
        });
    }
};
},{}],19:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("../input");
// return, ireturn
exports.flowInstructions = {};
var comparators = {
    ge: function ge(a, b) {
        return a >= b;
    },
    gt: function gt(a, b) {
        return a > b;
    },
    le: function le(a, b) {
        return a <= b;
    },
    lt: function lt(a, b) {
        return a < b;
    },
    ne: function ne(a, b) {
        return a !== b;
    }
};
var typedIfCmp = function typedIfCmp(type, jump, cmp) {
    return {
        type: type,
        code: "if_" + input_1.typePrefix(type) + "cmp" + cmp,
        apply: function apply(frame) {
            var b = frame.stack.pop().value;
            var a = frame.stack.pop().value;
            var needJump = comparators[cmp](a, b);
            frame.next(needJump ? jump : undefined);
        }
    };
};
var gotoLabel = function gotoLabel(jump) {
    return {
        code: "goto",
        apply: function apply(frame) {
            frame.next(jump);
        }
    };
};
exports.flowInstructions.goto = function (args) {
    var jump = parseInt(args[0], 10);
    return gotoLabel(jump);
};
exports.flowInstructions.return = function () {
    return {
        code: "return",
        apply: function apply(frame) {
            return frame.return();
        }
    };
};
[input_1.Type.Int, input_1.Type.Long, input_1.Type.Float, input_1.Type.Double].forEach(function (type) {
    var t = input_1.typePrefix(type);
    ["gt", "ge", "lt", "le", "ne"].forEach(function (cmp) {
        exports.flowInstructions["if_" + t + "cmp" + cmp] = function (args) {
            var jump = parseInt(args[0], 10);
            return typedIfCmp(type, jump, cmp);
        };
    });
    exports.flowInstructions[t + "return"] = function () {
        return {
            type: type,
            code: t + "return",
            apply: function apply(frame) {
                var value = frame.stack.pop();
                frame.return(value);
            }
        };
    };
});
},{"../input":24}],20:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("../input");
// imul, iinc
exports.mathInstructions = {};
var typedBinaryOperation = function typedBinaryOperation(type, key, ope) {
    return {
        type: type,
        code: input_1.typePrefix(type) + key,
        apply: function apply(frame) {
            var a = frame.stack.pop();
            var b = frame.stack.pop();
            frame.stack.push({ type: type, value: ope(a.value, b.value) });
            frame.next();
        }
    };
};
var typedUnaryOperation = function typedUnaryOperation(type, key, ope) {
    return {
        type: type,
        code: input_1.typePrefix(type) + key,
        apply: function apply(frame) {
            var a = frame.stack.pop();
            var b = frame.stack.pop();
            frame.stack.push({ type: type, value: ope(a.value) });
            frame.next();
        }
    };
};
var incr = function incr(index, increment) {
    return {
        type: input_1.Type.Int,
        code: "iinc",
        apply: function apply(frame) {
            var _frame$locals$get = frame.locals.get(index),
                type = _frame$locals$get.type,
                value = _frame$locals$get.value;

            frame.locals.set(index, { type: type, value: value + increment });
            frame.next();
        }
    };
};
// Arithmetic
[input_1.Type.Int, input_1.Type.Long, input_1.Type.Float, input_1.Type.Double].forEach(function (type) {
    var t = input_1.typePrefix(type);
    exports.mathInstructions[t + "add"] = function () {
        return typedBinaryOperation(type, "add", function (a, b) {
            return a + b;
        });
    };
    exports.mathInstructions[t + "sub"] = function () {
        return typedBinaryOperation(type, "sub", function (a, b) {
            return a - b;
        });
    };
    exports.mathInstructions[t + "mul"] = function () {
        return typedBinaryOperation(type, "mul", function (a, b) {
            return a * b;
        });
    };
    exports.mathInstructions[t + "div"] = function () {
        return typedBinaryOperation(type, "rem", function (a, b) {
            return a % b;
        });
    };
    exports.mathInstructions[t + "neg"] = function () {
        return typedUnaryOperation(type, "neg", function (a) {
            return -a;
        });
    };
    exports.mathInstructions.iinc = function (args) {
        var index = parseInt(args[0], 10);
        var increment = parseInt(args[1], 10);
        return incr(index, increment);
    };
});
},{"../input":24}],21:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("../input");
exports.objectsInstructions = {};
exports.objectsInstructions.getstatic = function (args) {
    return {
        code: "getstatic",
        apply: function apply(frame) {
            var value = args[0];
            frame.stack.push({ type: input_1.Type.Constant, value: value });
            frame.next();
        }
    };
};
exports.objectsInstructions.invokestatic = function (args) {
    return {
        code: "invokestatic",
        apply: function apply(frame) {
            var value = args[0];
            frame.parent.callStaticMethod(value);
        }
    };
};
exports.objectsInstructions.invokevirtual = function (args) {
    return {
        code: "invokevirtual",
        apply: function apply(frame) {
            var value = args[0];
            frame.parent.callObjectMethod(value);
        }
    };
};
// new, invokespecial, putfield, getfield
},{"../input":24}],22:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//
exports.otherInstructions = {};
},{}],23:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("../input");
exports.stackInstructions = {};
var typedConst = function typedConst(type, value) {
    return {
        type: type,
        code: input_1.typePrefix(type) + "const_" + value,
        apply: function apply(frame) {
            frame.stack.push({ type: type, value: value });
            frame.next();
        }
    };
};
var typedStore = function typedStore(type, index) {
    return {
        type: type,
        code: input_1.typePrefix(type) + "store_" + index,
        apply: function apply(frame) {
            var value = frame.stack.pop();
            frame.locals.set(index, value);
            frame.next();
        }
    };
};
var typedLoad = function typedLoad(type, index) {
    return {
        type: type,
        code: input_1.typePrefix(type) + "load_" + index,
        apply: function apply(frame) {
            var value = frame.locals.get(index);
            frame.stack.push(value);
            frame.next();
        }
    };
};
// Typed const, store, load
[input_1.Type.Int, input_1.Type.Long, input_1.Type.Float, input_1.Type.Double].forEach(function (type) {
    var t = input_1.typePrefix(type);

    var _loop = function _loop(i) {
        exports.stackInstructions[t + "const_" + i] = function () {
            return typedConst(type, i);
        };
    };

    for (var i = 0; i < 6; i++) {
        _loop(i);
    }

    var _loop2 = function _loop2(i) {
        exports.stackInstructions[t + "store_" + i] = function () {
            return typedStore(type, i);
        };
        exports.stackInstructions[t + "load_" + i] = function () {
            return typedLoad(type, i);
        };
    };

    for (var i = 0; i < 4; i++) {
        _loop2(i);
    }
});
exports.stackInstructions.iconst_m1 = function () {
    return typedConst(input_1.Type.Int, -1);
};
exports.stackInstructions.ldc = function (args) {
    return {
        code: "ldc",
        apply: function apply(frame) {
            var value = args[0];
            frame.stack.push({ type: input_1.Type.Constant, value: value });
            frame.next();
        }
    };
};
// dup, Tstore, Tload, bipush, putstatic, aastore
},{"../input":24}],18:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var flow_1 = require("./flow");
var math_1 = require("./math");
var objects_1 = require("./objects");
var others_1 = require("./others");
var stacks_1 = require("./stacks");
var allInstructions = Object.assign({}, stacks_1.stackInstructions, objects_1.objectsInstructions, math_1.mathInstructions, flow_1.flowInstructions, others_1.otherInstructions);
console.log("Got " + Object.keys(allInstructions).length + " instructions");
exports.lookupInstruction = function (opscode, args) {
    var i = allInstructions[opscode];
    if (i) {
        return i(args);
    }
    throw new Error("Opscode " + opscode + " not found !");
};
},{"./flow":19,"./math":20,"./objects":21,"./others":22,"./stacks":23}],15:[function(require,module,exports) {
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var instructions_1 = require("../../models/instructions");

var MethodBodyImpl = function MethodBodyImpl(stack, locals, args_size, code) {
    _classCallCheck(this, MethodBodyImpl);

    this.stack = stack;
    this.locals = locals;
    this.args_size = args_size;
    this.code = code;
};

var createInstruction = function createInstruction(line) {
    var regexpInstruction1 = /^\s*(\d+): ([a-z0-9_]*)\s+(\S*)\s+\/\/\s(.*)$/gm;
    var t1 = regexpInstruction1.exec(line);
    if (t1 !== null) {
        var _Array$from = Array.from(t1 || []),
            _Array$from2 = _slicedToArray(_Array$from, 5),
            all = _Array$from2[0],
            sIndex = _Array$from2[1],
            opscode = _Array$from2[2],
            v0 = _Array$from2[3],
            v1 = _Array$from2[4];

        var position = parseInt(sIndex, 10);
        var args = v0 && v1 ? [v1] : v0 ? [v0] : [];
        var instruction = instructions_1.lookupInstruction(opscode, args);
        return { position: position, instruction: instruction, args: args };
    }
    var regexpInstruction2 = /^\s*(\d+): ([a-z0-9_]*)(\s+([\d, ]*))?$/gm;
    var t2 = regexpInstruction2.exec(line);
    if (t2 !== null) {
        var _Array$from3 = Array.from(t2 || []),
            _Array$from4 = _slicedToArray(_Array$from3, 5),
            _all = _Array$from4[0],
            _sIndex = _Array$from4[1],
            _opscode = _Array$from4[2],
            _v = _Array$from4[3],
            _v2 = _Array$from4[4];

        var _position = parseInt(_sIndex, 10);
        var _args = _v2 ? _v2.split(", ") : [];
        var _instruction = instructions_1.lookupInstruction(_opscode, _args);
        return { position: _position, instruction: _instruction, args: _args };
    }
    throw new Error("Cannot parse line " + line);
};
exports.methodParser = {
    parse: function parse(constantPool, stack, locals, args_size, input) {
        var code = input.split("\n").map(function (s) {
            return s.trim();
        }).filter(function (s) {
            return s !== "";
        }).map(function (s) {
            return createInstruction(s);
        });
        return new MethodBodyImpl(stack, locals, args_size, code);
    }
};
},{"../../models/instructions":18}],5:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constant_parser_1 = require("./impl/constant-parser");
var instruction_parser_1 = require("./impl/instruction-parser");
var consts = "#1 = Methodref          #6.#18         // java/lang/Object.\"<init>\":()V\n   #2 = Fieldref           #19.#20        // java/lang/System.out:Ljava/io/PrintStream;\n   #3 = Methodref          #5.#21         // _01_factorial/Factorial.factorial:(I)I\n   #4 = Methodref          #22.#23        // java/io/PrintStream.println:(I)V\n   #5 = Class              #24            // _01_factorial/Factorial\n   #6 = Class              #25            // java/lang/Object\n   #7 = Utf8               <init>\n   #8 = Utf8               ()V\n   #9 = Utf8               Code\n  #10 = Utf8               LineNumberTable\n  #11 = Utf8               factorial\n  #12 = Utf8               (I)I\n  #13 = Utf8               StackMapTable\n  #14 = Utf8               main\n  #15 = Utf8               ([Ljava/lang/String;)V\n  #16 = Utf8               SourceFile\n  #17 = Utf8               Factorial.java\n  #18 = NameAndType        #7:#8          // \"<init>\":()V\n  #19 = Class              #26            // java/lang/System\n  #20 = NameAndType        #27:#28        // out:Ljava/io/PrintStream;\n  #21 = NameAndType        #11:#12        // factorial:(I)I\n  #22 = Class              #29            // java/io/PrintStream\n  #23 = NameAndType        #30:#31        // println:(I)V\n  #24 = Utf8               _01_factorial/Factorial\n  #25 = Utf8               java/lang/Object\n  #26 = Utf8               java/lang/System\n  #27 = Utf8               out\n  #28 = Utf8               Ljava/io/PrintStream;\n  #29 = Utf8               java/io/PrintStream\n  #30 = Utf8               println\n  #31 = Utf8               (I)V";
var factorialCode = "0: iconst_1\n1: istore_1\n2: iconst_2\n3: istore_2\n4: iload_2\n5: iload_0\n6: if_icmpgt     19\n9: iload_1\n10: iload_2\n11: imul\n12: istore_1\n13: iinc          2, 1\n16: goto          4\n19: iload_1\n20: ireturn";
var mainCode = " 0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;\n3: iconst_5\n4: invokestatic  #3                  // Method plop:(I)I\n7: invokevirtual #4                  // Method java/io/PrintStream.println:(I)V\n10: return";
exports.constantPool = constant_parser_1.constantPoolParser.parse(consts);
exports.sample = new Map().set("Method plop:(I)I", instruction_parser_1.methodParser.parse(exports.constantPool, 2, 3, 1, factorialCode)).set("main", instruction_parser_1.methodParser.parse(exports.constantPool, 2, 1, 1, mainCode));
},{"./impl/constant-parser":14,"./impl/instruction-parser":15}],11:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.renderConstantPool = function (constantPool) {
    return "\n<details>\n    <summary>Constant Pool</summary>\n    <div class=\"constants\">\n      " + constantPool.map(function (constant) {
        return "\n        <div class=\"index\">" + constant.index + "</div>\n        <div class=\"type\">" + constant.type + "</div>\n        <div class=\"value\">" + constant.value + "</div>\n        ";
    }).join("\n") + "\n    </div>\n</details>\n";
};
// FIXME Frame, stack, locals, ... current step
exports.renderMethodCode = function (code, position) {
    var classes = function classes(inst) {
        return [inst.instruction.type ? "inst-" + inst.instruction.type : "", position === inst.position ? "selected" : ""].filter(function (s) {
            return s !== "";
        }).join(" ");
    };
    return "\n<ul class=\"code\">\n  " + code.map(function (inst) {
        return "\n  <li class=\"" + classes(inst) + "\">\n    <div class=\"position\">" + inst.position + "</div>\n    <div class=\"code\">" + inst.instruction.code + "</div>\n    <div class=\"args\">" + inst.args + "</div>\n\n  </li>\n    ";
    }).join("\n") + "\n</ul>\n";
};
},{}],12:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var renderLocalValue = function renderLocalValue(value) {
    return value ? "<div class=\"type-" + value.type + "\" title=\"" + value.value + "\">" + value.value + "</div>" : "<div class=\"empty\"></div>";
};
exports.renderLocals = function (locals) {
    return "\n<div class=\"locals\">\n    <header>Locals</header>\n    <div>\n        " + locals.list.map(renderLocalValue).join("\n") + "\n    </div>\n</div>\n";
};
},{}],13:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var renderStackValue = function renderStackValue(value) {
    return value ? "<div class=\"type-" + value.type + "\" title=\"" + value.value + "\">" + value.value + "</div>" : "<div class=\"empty\"></div>";
};
exports.renderStack = function (stack) {
    return "\n<div class=\"stack\">\n    <header>Stack</header>\n    <div>\n        " + stack.list.map(renderStackValue).join("\n") + "\n    </div>\n</div>\n";
};
},{}],6:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inputs_1 = require("./inputs");
var locals_1 = require("./locals");
var stack_1 = require("./stack");
var renderArgs = function renderArgs(args) {
  return "<span class=\"args\">" + args.map(function (_ref) {
    var type = _ref.type,
        value = _ref.value;
    return "<span class=\"type-" + type + "\">" + value + "</span>";
  }).join("") + "</span>";
};
var renderFrame = function renderFrame(frame, current) {
  return "\n<article class=\"frame " + (current ? "current" : "") + "\">\n  <header>" + frame.name + " " + renderArgs(frame.args) + "</header>\n  " + inputs_1.renderMethodCode(frame.methodBody.code, frame.position) + "\n  " + stack_1.renderStack(frame.stack) + "\n  " + locals_1.renderLocals(frame.locals) + "\n</article>\n";
};
exports.renderFrames = function (frames) {
  return "\n" + inputs_1.renderConstantPool(frames.constantPool) + "\n<details open class=\"frames\">\n    <summary>Frames</summary>\n    <menu>\n      " + (frames.frames.length > 0 ? "<button type=\"button\" class=\"next\">\u21A9\uFE0F Next</button>" : "") + "\n    </menu>\n    <div>\n      " + frames.frames.map(function (frame) {
    return renderFrame(frame, frame === frames.currentFrame);
  }).join("\n") + "\n    </div>\n</details>\n";
};
},{"./inputs":11,"./locals":12,"./stack":13}],3:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Frames_1 = require("./models/Frames");
var sample_1 = require("./parser/sample");
var frame_1 = require("./templates/frame");
var frames = new Frames_1.Frames(sample_1.constantPool, sample_1.sample);
exports.catnip = function (elt) {
    if (elt !== null) {
        elt.innerHTML = frame_1.renderFrames(frames);
        var btn = document.querySelector(".frames menu .next");
        if (btn) {
            btn.onclick = function () {
                frames.next();
                exports.catnip(elt);
            };
        }
    } else {
        console.warn("Cannot mount element:", elt);
    }
};
window.catnip = exports.catnip;
},{"./models/Frames":4,"./parser/sample":5,"./templates/frame":6}],47:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '51766' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[47,3])
//# sourceMappingURL=/scripts.b5c76179.map