var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// external-cesium:Cesium
var require_Cesium = __commonJS({
  "external-cesium:Cesium"(exports, module) {
    module.exports = Cesium;
  }
});

// Specs/addDefaultMatchers.js
var import_engine2 = __toESM(require_Cesium(), 1);

// Specs/equals.js
var import_engine = __toESM(require_Cesium(), 1);
function isTypedArray(o) {
  return import_engine.FeatureDetection.typedArrayTypes.some(function(type) {
    return o instanceof type;
  });
}
function typedArrayToArray(array) {
  if (array !== null && typeof array === "object" && isTypedArray(array)) {
    return Array.prototype.slice.call(array, 0);
  }
  return array;
}
function equals(util, a, b) {
  a = typedArrayToArray(a);
  b = typedArrayToArray(b);
  return util.equals(a, b);
}
var equals_default = equals;

// Specs/addDefaultMatchers.js
function createMissingFunctionMessageFunction(item, actualPrototype, expectedInterfacePrototype) {
  return function() {
    return `Expected function '${item}' to exist on ${actualPrototype.constructor.name} because it should implement interface ${expectedInterfacePrototype.constructor.name}.`;
  };
}
function makeAsyncThrowFunction(debug, Type, name) {
  if (debug) {
    return function(util) {
      return {
        compare: function(actualPromise, message) {
          if (!(0, import_engine2.defined)(actualPromise) || !(0, import_engine2.defined)(actualPromise.then)) {
            throw new Error("Expected function to be called on a promise.");
          }
          return actualPromise.then(() => {
            return {
              pass: false,
              message: "Expected a promise to be rejected but it was resolved."
            };
          }).catch((e) => {
            let result = e instanceof Type || e.name === name;
            if ((0, import_engine2.defined)(message)) {
              if (typeof message === "string") {
                result = result && e.message === message;
              } else {
                result = result && message.test(e.message);
              }
            }
            return {
              pass: result,
              message: result ? `Expected a promise to be rejected with ${name}.` : `Expected a promise to be rejected with ${(0, import_engine2.defined)(message) ? `${name}: ${message}` : name}, but it was rejected with ${e}`
            };
          });
        }
      };
    };
  }
  return function() {
    return {
      compare: function(actualPromise) {
        return Promise.resolve(actualPromise).then(() => {
          return { pass: true };
        }).catch((e) => {
          return { pass: true };
        });
      },
      negativeCompare: function(actualPromise) {
        return Promise.resolve(actualPromise).then(() => {
          return { pass: true };
        }).catch((e) => {
          return { pass: true };
        });
      }
    };
  };
}
function makeThrowFunction(debug, Type, name) {
  if (debug) {
    return function(util) {
      return {
        compare: function(actual, message) {
          let result = false;
          let exception;
          if (typeof actual !== "function") {
            throw new Error("Actual is not a function");
          }
          try {
            actual();
          } catch (e) {
            exception = e;
          }
          if (exception) {
            result = exception instanceof Type || exception.name === name;
          }
          if ((0, import_engine2.defined)(message)) {
            if (typeof message === "string") {
              result = result && exception.message === message;
            } else {
              result = result && message.test(exception.message);
            }
          }
          let testMessage;
          if (result) {
            testMessage = `Expected function not to throw ${name} , but it threw ${exception.message || exception}`;
          } else {
            testMessage = (0, import_engine2.defined)(message) ? `Expected to throw with ${name}: ${message}, but it was thrown with ${exception}` : `Expected function to throw with ${name}.`;
          }
          return {
            pass: result,
            message: testMessage
          };
        }
      };
    };
  }
  return function() {
    return {
      compare: function(actual, expected) {
        return { pass: true };
      },
      negativeCompare: function(actual, expected) {
        return { pass: true };
      }
    };
  };
}
function createDefaultMatchers(debug) {
  return {
    toBeBetween: function(util) {
      return {
        compare: function(actual, lower, upper) {
          if (lower > upper) {
            const tmp = upper;
            upper = lower;
            lower = tmp;
          }
          return { pass: actual >= lower && actual <= upper };
        }
      };
    },
    toStartWith: function(util) {
      return {
        compare: function(actual, expected) {
          return { pass: actual.slice(0, expected.length) === expected };
        }
      };
    },
    toEndWith: function(util) {
      return {
        compare: function(actual, expected) {
          return { pass: actual.slice(-expected.length) === expected };
        }
      };
    },
    toEqual: function(util) {
      return {
        compare: function(actual, expected) {
          return {
            pass: equals_default(util, actual, expected)
          };
        }
      };
    },
    toEqualEpsilon: function(util) {
      return {
        compare: function(actual, expected, epsilon) {
          function equalityTester(a, b) {
            a = typedArrayToArray2(a);
            b = typedArrayToArray2(b);
            if (Array.isArray(a) && Array.isArray(b)) {
              if (a.length !== b.length) {
                return false;
              }
              for (let i = 0; i < a.length; ++i) {
                if (!equalityTester(a[i], b[i])) {
                  return false;
                }
              }
              return true;
            }
            let to_run;
            if ((0, import_engine2.defined)(a)) {
              if (typeof a.equalsEpsilon === "function") {
                return a.equalsEpsilon(b, epsilon);
              } else if (a instanceof Object) {
                to_run = Object.getPrototypeOf(a).constructor.equalsEpsilon;
                if (typeof to_run === "function") {
                  return to_run(a, b, epsilon);
                }
              }
            }
            if ((0, import_engine2.defined)(b)) {
              if (typeof b.equalsEpsilon === "function") {
                return b.equalsEpsilon(a, epsilon);
              } else if (b instanceof Object) {
                to_run = Object.getPrototypeOf(b).constructor.equalsEpsilon;
                if (typeof to_run === "function") {
                  return to_run(b, a, epsilon);
                }
              }
            }
            if (typeof a === "number" || typeof b === "number") {
              return Math.abs(a - b) <= epsilon;
            }
            if ((0, import_engine2.defined)(a) && (0, import_engine2.defined)(b)) {
              const keys = Object.keys(a);
              for (let i = 0; i < keys.length; i++) {
                if (!b.hasOwnProperty(keys[i])) {
                  return false;
                }
                const aVal = a[keys[i]];
                const bVal = b[keys[i]];
                if (!equalityTester(aVal, bVal)) {
                  return false;
                }
              }
              return true;
            }
            return equals_default(util, a, b);
          }
          const result = equalityTester(actual, expected);
          return { pass: result };
        }
      };
    },
    toConformToInterface: function(util) {
      return {
        compare: function(actual, expectedInterface) {
          const actualPrototype = actual.prototype;
          const expectedInterfacePrototype = expectedInterface.prototype;
          for (const item in expectedInterfacePrototype) {
            if (expectedInterfacePrototype.hasOwnProperty(item) && typeof expectedInterfacePrototype[item] === "function" && !actualPrototype.hasOwnProperty(item)) {
              return {
                pass: false,
                message: createMissingFunctionMessageFunction(
                  item,
                  actualPrototype,
                  expectedInterfacePrototype
                )
              };
            }
          }
          return { pass: true };
        }
      };
    },
    toRender: function(util) {
      return {
        compare: function(actual, expected) {
          return renderEquals(util, actual, expected, true);
        }
      };
    },
    notToRender: function(util) {
      return {
        compare: function(actual, expected) {
          return renderEquals(util, actual, expected, false);
        }
      };
    },
    toRenderAndCall: function(util) {
      return {
        compare: function(actual, expected) {
          const actualRgba = renderAndReadPixels(actual);
          const webglStub2 = !!window.webglStub;
          if (!webglStub2) {
            const callback = expected;
            callback(actualRgba);
          }
          return {
            pass: true
          };
        }
      };
    },
    toRenderPixelCountAndCall: function(util) {
      return {
        compare: function(actual, expected) {
          const actualRgba = renderAndReadPixels(actual);
          const webglStub2 = !!window.webglStub;
          if (!webglStub2) {
            const callback = expected;
            callback(countRenderedPixels(actualRgba));
          }
          return {
            pass: true
          };
        }
      };
    },
    toPickPrimitive: function(util) {
      return {
        compare: function(actual, expected, x, y, width, height) {
          return pickPrimitiveEquals(actual, expected, x, y, width, height);
        }
      };
    },
    notToPick: function(util) {
      return {
        compare: function(actual, x, y, width, height) {
          return pickPrimitiveEquals(actual, void 0, x, y, width, height);
        }
      };
    },
    toDrillPickPrimitive: function(util) {
      return {
        compare: function(actual, expected, x, y, width, height) {
          return drillPickPrimitiveEquals(actual, 1, x, y, width, height);
        }
      };
    },
    notToDrillPick: function(util) {
      return {
        compare: function(actual, x, y, width, height) {
          return drillPickPrimitiveEquals(actual, 0, x, y, width, height);
        }
      };
    },
    toPickAndCall: function(util) {
      return {
        compare: function(actual, expected, args) {
          const scene = actual;
          const result = scene.pick(args ?? new import_engine2.Cartesian2(0, 0));
          const webglStub2 = !!window.webglStub;
          if (!webglStub2) {
            const callback = expected;
            callback(result);
          }
          return {
            pass: true
          };
        }
      };
    },
    toPickVoxelAndCall: function(util) {
      return {
        compare: function(actual, expected, args) {
          const scene = actual;
          const result = scene.pickVoxel(args ?? new import_engine2.Cartesian2(0, 0));
          const webglStub2 = !!window.webglStub;
          if (!webglStub2) {
            const callback = expected;
            callback(result);
          }
          return {
            pass: true
          };
        }
      };
    },
    toDrillPickAndCall: function(util) {
      return {
        compare: function(actual, expected, limit) {
          const scene = actual;
          const pickedObjects = scene.drillPick(new import_engine2.Cartesian2(0, 0), limit);
          const webglStub2 = !!window.webglStub;
          if (!webglStub2) {
            const callback = expected;
            callback(pickedObjects);
          }
          return {
            pass: true
          };
        }
      };
    },
    toPickFromRayAndCall: function(util) {
      return {
        compare: function(actual, expected, ray, objectsToExclude, width) {
          const scene = actual;
          const result = scene.pickFromRay(ray, objectsToExclude, width);
          const webglStub2 = !!window.webglStub;
          if (!webglStub2) {
            const callback = expected;
            callback(result);
          }
          return {
            pass: true
          };
        }
      };
    },
    toDrillPickFromRayAndCall: function(util) {
      return {
        compare: function(actual, expected, ray, limit, objectsToExclude, width) {
          const scene = actual;
          const results = scene.drillPickFromRay(
            ray,
            limit,
            objectsToExclude,
            width
          );
          const webglStub2 = !!window.webglStub;
          if (!webglStub2) {
            const callback = expected;
            callback(results);
          }
          return {
            pass: true
          };
        }
      };
    },
    toSampleHeightAndCall: function(util) {
      return {
        compare: function(actual, expected, position, objectsToExclude, width) {
          const scene = actual;
          const results = scene.sampleHeight(position, objectsToExclude, width);
          const webglStub2 = !!window.webglStub;
          if (!webglStub2) {
            const callback = expected;
            callback(results);
          }
          return {
            pass: true
          };
        }
      };
    },
    toClampToHeightAndCall: function(util) {
      return {
        compare: function(actual, expected, cartesian, objectsToExclude, width) {
          const scene = actual;
          const results = scene.clampToHeight(
            cartesian,
            objectsToExclude,
            width
          );
          const webglStub2 = !!window.webglStub;
          if (!webglStub2) {
            const callback = expected;
            callback(results);
          }
          return {
            pass: true
          };
        }
      };
    },
    toPickPositionAndCall: function(util) {
      return {
        compare: function(actual, expected, x, y) {
          const scene = actual;
          const canvas = scene.canvas;
          x = x ?? canvas.clientWidth / 2;
          y = y ?? canvas.clientHeight / 2;
          const result = scene.pickPosition(new import_engine2.Cartesian2(x, y));
          const webglStub2 = !!window.webglStub;
          if (!webglStub2) {
            const callback = expected;
            callback(result);
          }
          return {
            pass: true
          };
        }
      };
    },
    toReadPixels: function(util) {
      return {
        compare: function(actual, expected) {
          let context;
          let framebuffer;
          let epsilon = 0;
          const options = actual;
          if ((0, import_engine2.defined)(options.context)) {
            context = options.context;
            framebuffer = options.framebuffer;
            epsilon = options.epsilon ?? epsilon;
          } else {
            context = options;
          }
          const rgba = context.readPixels({
            framebuffer
          });
          let pass = true;
          let message;
          const webglStub2 = !!window.webglStub;
          if (!webglStub2) {
            if (!import_engine2.Math.equalsEpsilon(rgba[0], expected[0], 0, epsilon) || !import_engine2.Math.equalsEpsilon(rgba[1], expected[1], 0, epsilon) || !import_engine2.Math.equalsEpsilon(rgba[2], expected[2], 0, epsilon) || !import_engine2.Math.equalsEpsilon(rgba[3], expected[3], 0, epsilon)) {
              pass = false;
              if (epsilon === 0) {
                message = `Expected context to render ${expected}, but rendered: ${rgba}`;
              } else {
                message = `Expected context to render ${expected} with epsilon = ${epsilon}, but rendered: ${rgba}`;
              }
            }
          }
          return {
            pass,
            message
          };
        }
      };
    },
    notToReadPixels: function(util) {
      return {
        compare: function(actual, expected) {
          const context = actual;
          const rgba = context.readPixels();
          let pass = true;
          let message;
          const webglStub2 = !!window.webglStub;
          if (!webglStub2) {
            if (rgba[0] === expected[0] && rgba[1] === expected[1] && rgba[2] === expected[2] && rgba[3] === expected[3]) {
              pass = false;
              message = `Expected context not to render ${expected}, but rendered: ${rgba}`;
            }
          }
          return {
            pass,
            message
          };
        }
      };
    },
    contextToRenderAndCall: function(util) {
      return {
        compare: function(actual, expected) {
          const actualRgba = contextRenderAndReadPixels(actual).color;
          const webglStub2 = !!window.webglStub;
          if (!webglStub2) {
            const callback = expected;
            callback(actualRgba);
          }
          return {
            pass: true
          };
        }
      };
    },
    contextToRender: function(util) {
      return {
        compare: function(actual, expected) {
          return expectContextToRender(actual, expected, true);
        }
      };
    },
    notContextToRender: function(util) {
      return {
        compare: function(actual, expected) {
          return expectContextToRender(actual, expected, false);
        }
      };
    },
    toBeImageOrImageBitmap: function(util) {
      return {
        compare: function(actual) {
          if (typeof createImageBitmap !== "function") {
            return {
              pass: actual instanceof Image
            };
          }
          return {
            pass: actual instanceof ImageBitmap || actual instanceof Image
          };
        }
      };
    },
    toThrowDeveloperError: makeThrowFunction(
      debug,
      import_engine2.DeveloperError,
      "DeveloperError"
    )
  };
}
function createDefaultAsyncMatchers(debug) {
  return {
    toBeRejectedWithDeveloperError: makeAsyncThrowFunction(
      debug,
      import_engine2.DeveloperError,
      "DeveloperError"
    )
  };
}
function countRenderedPixels(rgba) {
  const pixelCount = rgba.length / 4;
  let count = 0;
  for (let i = 0; i < pixelCount; i++) {
    const index = i * 4;
    if (rgba[index] !== 0 || rgba[index + 1] !== 0 || rgba[index + 2] !== 0 || rgba[index + 3] !== 255) {
      count++;
    }
  }
  return count;
}
function renderAndReadPixels(options) {
  let scene;
  if ((0, import_engine2.defined)(options.scene)) {
    scene = options.scene;
    const time = options.time;
    scene.initializeFrame();
    if ((0, import_engine2.defined)(options.primeShadowMap)) {
      scene.render(time);
    }
    scene.render(time);
  } else {
    scene = options;
    scene.initializeFrame();
    scene.render();
  }
  return scene.context.readPixels();
}
function isTypedArray2(o) {
  return import_engine2.FeatureDetection.typedArrayTypes.some(function(type) {
    return o instanceof type;
  });
}
function typedArrayToArray2(array) {
  if (isTypedArray2(array)) {
    return Array.prototype.slice.call(array, 0);
  }
  return array;
}
function renderEquals(util, actual, expected, expectEqual) {
  const actualRgba = renderAndReadPixels(actual);
  if (!!window.webglStub) {
    return {
      pass: true
    };
  }
  const eq = equals_default(util, actualRgba, expected);
  const pass = expectEqual ? eq : !eq;
  let message;
  if (!pass) {
    message = `Expected ${expectEqual ? "" : "not "}to render [${typedArrayToArray2(
      expected
    )}], but actually rendered [${typedArrayToArray2(actualRgba)}].`;
  }
  return {
    pass,
    message
  };
}
function pickPrimitiveEquals(actual, expected, x, y, width, height) {
  const scene = actual;
  const windowPosition = new import_engine2.Cartesian2(x, y);
  const result = scene.pick(windowPosition, width, height);
  if (!!window.webglStub) {
    return {
      pass: true
    };
  }
  let pass = true;
  let message;
  if ((0, import_engine2.defined)(expected)) {
    pass = result.primitive === expected;
  } else {
    pass = !(0, import_engine2.defined)(result);
  }
  if (!pass) {
    message = `Expected to pick ${expected}, but picked: ${result}`;
  }
  return {
    pass,
    message
  };
}
function drillPickPrimitiveEquals(actual, expected, x, y, width, height) {
  const scene = actual;
  const windowPosition = new import_engine2.Cartesian2(x, y);
  const result = scene.drillPick(windowPosition, void 0, width, height);
  if (!!window.webglStub) {
    return {
      pass: true
    };
  }
  let pass = true;
  let message;
  if ((0, import_engine2.defined)(expected)) {
    pass = result.length === expected;
  } else {
    pass = !(0, import_engine2.defined)(result);
  }
  if (!pass) {
    message = `Expected to pick ${expected}, but picked: ${result}`;
  }
  return {
    pass,
    message
  };
}
function contextRenderAndReadPixels(options) {
  const context = options.context;
  let vs = options.vertexShader;
  const fs = options.fragmentShader;
  let sp = options.shaderProgram;
  const uniformMap = options.uniformMap;
  const modelMatrix = options.modelMatrix;
  const depth = options.depth ?? 0;
  const clear = options.clear ?? true;
  let clearColor;
  if (!(0, import_engine2.defined)(context)) {
    throw new import_engine2.DeveloperError("options.context is required.");
  }
  if (!(0, import_engine2.defined)(fs) && !(0, import_engine2.defined)(sp)) {
    throw new import_engine2.DeveloperError(
      "options.fragmentShader or options.shaderProgram is required."
    );
  }
  if ((0, import_engine2.defined)(fs) && (0, import_engine2.defined)(sp)) {
    throw new import_engine2.DeveloperError(
      "Both options.fragmentShader and options.shaderProgram can not be used at the same time."
    );
  }
  if ((0, import_engine2.defined)(vs) && (0, import_engine2.defined)(sp)) {
    throw new import_engine2.DeveloperError(
      "Both options.vertexShader and options.shaderProgram can not be used at the same time."
    );
  }
  if (!(0, import_engine2.defined)(sp)) {
    if (!(0, import_engine2.defined)(vs)) {
      vs = "in vec4 position; void main() { gl_PointSize = 1.0; gl_Position = position; }";
    }
    sp = import_engine2.ShaderProgram.fromCache({
      context,
      vertexShaderSource: vs,
      fragmentShaderSource: fs,
      attributeLocations: {
        position: 0
      }
    });
  }
  let va = new import_engine2.VertexArray({
    context,
    attributes: [
      {
        index: 0,
        vertexBuffer: import_engine2.Buffer.createVertexBuffer({
          context,
          typedArray: new Float32Array([0, 0, depth, 1]),
          usage: import_engine2.BufferUsage.STATIC_DRAW
        }),
        componentsPerAttribute: 4
      }
    ]
  });
  if (clear) {
    import_engine2.ClearCommand.ALL.execute(context);
    clearColor = context.readPixels();
  }
  const command = new import_engine2.DrawCommand({
    primitiveType: import_engine2.PrimitiveType.POINTS,
    shaderProgram: sp,
    vertexArray: va,
    uniformMap,
    modelMatrix
  });
  command.execute(context);
  const rgba = context.readPixels();
  sp = sp.destroy();
  va = va.destroy();
  return {
    color: rgba,
    clearColor
  };
}
function expectContextToRender(actual, expected, expectEqual) {
  const options = actual;
  const context = options.context;
  const clear = options.clear ?? true;
  const epsilon = options.epsilon ?? 0;
  if (!(0, import_engine2.defined)(expected)) {
    expected = [255, 255, 255, 255];
  }
  const webglStub2 = !!window.webglStub;
  const output = contextRenderAndReadPixels(options);
  if (clear) {
    const clearedRgba = output.clearColor;
    if (!webglStub2) {
      const expectedAlpha = context.options.webgl.alpha ? 0 : 255;
      if (clearedRgba[0] !== 0 || clearedRgba[1] !== 0 || clearedRgba[2] !== 0 || clearedRgba[3] !== expectedAlpha) {
        return {
          pass: false,
          message: `After clearing the framebuffer, expected context to render [0, 0, 0, ${expectedAlpha}], but rendered: ${clearedRgba}`
        };
      }
    }
  }
  const rgba = output.color;
  if (!webglStub2) {
    if (expectEqual) {
      if (!import_engine2.Math.equalsEpsilon(rgba[0], expected[0], 0, epsilon) || !import_engine2.Math.equalsEpsilon(rgba[1], expected[1], 0, epsilon) || !import_engine2.Math.equalsEpsilon(rgba[2], expected[2], 0, epsilon) || !import_engine2.Math.equalsEpsilon(rgba[3], expected[3], 0, epsilon)) {
        return {
          pass: false,
          message: `Expected context to render ${expected}, but rendered: ${rgba}`
        };
      }
    } else if (import_engine2.Math.equalsEpsilon(rgba[0], expected[0], 0, epsilon) && import_engine2.Math.equalsEpsilon(rgba[1], expected[1], 0, epsilon) && import_engine2.Math.equalsEpsilon(rgba[2], expected[2], 0, epsilon) && import_engine2.Math.equalsEpsilon(rgba[3], expected[3], 0, epsilon)) {
      return {
        pass: false,
        message: `Expected context not to render ${expected}, but rendered: ${rgba}`
      };
    }
  }
  return {
    pass: true
  };
}
function addDefaultMatchers(debug) {
  return function() {
    this.addMatchers(createDefaultMatchers(debug));
    this.addAsyncMatchers(createDefaultAsyncMatchers(debug));
  };
}
var addDefaultMatchers_default = addDefaultMatchers;

// Specs/equalsMethodEqualityTester.js
var import_engine3 = __toESM(require_Cesium(), 1);
function equalsMethodEqualityTester(a, b) {
  let to_run;
  if (a !== null && (0, import_engine3.defined)(a)) {
    if (typeof a.equals === "function") {
      return a.equals(b);
    } else if (a instanceof Object) {
      to_run = Object.getPrototypeOf(a).constructor.equals;
      if (typeof to_run === "function") {
        return to_run(a, b);
      }
    }
  }
  if (b !== null && (0, import_engine3.defined)(b)) {
    if (typeof b.equals === "function") {
      return b.equals(a);
    } else if (b instanceof Object) {
      to_run = Object.getPrototypeOf(b).constructor.equals;
      if (typeof to_run === "function") {
        return to_run(b, a);
      }
    }
  }
  return void 0;
}
var equalsMethodEqualityTester_default = equalsMethodEqualityTester;

// Specs/customizeJasmine.js
function customizeJasmine(env2, includedCategory, excludedCategory, webglValidation2, webglStub2, release2, debugCanvasWidth2, debugCanvasHeight2) {
  window.devicePixelRatio = 1;
  window.specsUsingRelease = release2;
  const originalDescribe = window.describe;
  window.describe = function(name, suite, category) {
    if (includedCategory && includedCategory !== "" && includedCategory !== "none" && category !== includedCategory) {
      window.xdescribe(name, suite);
    } else if (excludedCategory && excludedCategory !== "" && category === excludedCategory) {
      window.xdescribe(name, suite);
    } else {
      originalDescribe(name, suite);
    }
  };
  if (webglValidation2) {
    window.webglValidation = true;
  }
  if (webglStub2) {
    window.webglStub = true;
  }
  window.debugCanvasWidth = debugCanvasWidth2;
  window.debugCanvasHeight = debugCanvasHeight2;
  env2.beforeEach(function() {
    addDefaultMatchers_default(!release2).call(env2);
    env2.addCustomEqualityTester(equalsMethodEqualityTester_default);
  });
}
var customizeJasmine_default = customizeJasmine;

// Specs/spec-main.js
var import_engine4 = __toESM(require_Cesium(), 1);
var queryString = (0, import_engine4.queryToObject)(window.location.search.substring(1));
var webglValidation = false;
var webglStub = false;
var debugCanvasWidth;
var debugCanvasHeight;
var release = window.location.search.indexOf("release") !== -1;
var categoryString = queryString.category;
var excludeCategoryString = queryString.not;
if ((0, import_engine4.defined)(queryString.webglValidation)) {
  webglValidation = true;
}
if ((0, import_engine4.defined)(queryString.webglStub)) {
  webglStub = true;
}
if ((0, import_engine4.defined)(queryString.debugCanvasWidth)) {
  debugCanvasWidth = parseInt(queryString.debugCanvasWidth);
}
if ((0, import_engine4.defined)(queryString.debugCanvasHeight)) {
  debugCanvasHeight = parseInt(queryString.debugCanvasHeight);
}
if (release) {
  window.CESIUM_BASE_URL = "../Build/Cesium";
} else {
  window.CESIUM_BASE_URL = "../Build/CesiumUnminified";
}
jasmine.DEFAULT_TIMEOUT_INTERVAL = 3e4;
var specFilter = new jasmine.HtmlSpecFilter({
  filterString: function() {
    return queryString.spec;
  }
});
var env = jasmine.getEnv();
env.configure({
  stopSpecOnExpectationFailure: false,
  stopOnSpecFailure: false,
  random: false,
  hideDisabled: true,
  specFilter: function(spec) {
    if (!specFilter.matches(spec.getFullName()) || categoryString === "none" && !(0, import_engine4.defined)(queryString.spec)) {
      return false;
    }
    return true;
  }
});
customizeJasmine_default(
  env,
  categoryString,
  excludeCategoryString,
  webglValidation,
  webglStub,
  release,
  debugCanvasWidth,
  debugCanvasHeight
);
//# sourceMappingURL=spec-main.js.map
