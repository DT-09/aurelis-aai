var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now2 = Date.now();
  const seconds = Math.trunc(now2 / 1e3);
  const nanos = now2 % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// _core.js
var enc = new TextEncoder();
var now = /* @__PURE__ */ __name(() => (/* @__PURE__ */ new Date()).toISOString(), "now");
var id = /* @__PURE__ */ __name((p) => `${p}_${crypto.randomUUID().replaceAll("-", "").slice(0, 20)}`, "id");
async function sha256(s) {
  const b = await crypto.subtle.digest("SHA-256", enc.encode(s));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
}
__name(sha256, "sha256");
async function hashSecret(s) {
  return sha256(s);
}
__name(hashSecret, "hashSecret");
function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });
}
__name(json, "json");
function cookie(name, value, maxAge) {
  return `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}
__name(cookie, "cookie");
function getCookie(req, name) {
  const c = req.headers.get("Cookie") || "";
  const m = c.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return m?.[1] || null;
}
__name(getCookie, "getCookie");
async function requireSession(req, env2, roles = []) {
  const sid = getCookie(req, "aurelis_session");
  if (!sid) return null;
  const r = await env2.DB.prepare("SELECT * FROM sessions WHERE id=? AND expires_at>?").bind(sid, now()).first();
  if (!r) return null;
  if (roles.length && !roles.includes(r.role)) return null;
  return r;
}
__name(requireSession, "requireSession");
async function audit(env2, tenant, actor, event, payload) {
  await env2.DB.prepare("INSERT INTO audit_events VALUES(?,?,?,?,?,?)").bind(id("aud"), tenant, actor, event, JSON.stringify(payload), now()).run();
}
__name(audit, "audit");

// _auth.js
async function login(req, env2) {
  const b = await req.json();
  const u = await env2.DB.prepare("SELECT * FROM users WHERE email=?").bind(String(b.email || "").toLowerCase()).first();
  if (!u) return json({ error: "INVALID_CREDENTIALS" }, 401);
  if (await hashSecret(String(b.password || "")) !== u.pass_hash) return json({ error: "INVALID_CREDENTIALS" }, 401);
  const sid = id("ses"), exp = new Date(Date.now() + 1e3 * 60 * 60 * 12).toISOString();
  await env2.DB.prepare("INSERT INTO sessions VALUES(?,?,?,?,?,?)").bind(sid, u.id, u.tenant_id, u.role, exp, now()).run();
  await audit(env2, u.tenant_id, u.id, "AUTH_LOGIN", {});
  return new Response(JSON.stringify({ ok: true, role: u.role, tenantId: u.tenant_id }), { headers: { "content-type": "application/json", "set-cookie": cookie("aurelis_session", sid, 60 * 60 * 12) } });
}
__name(login, "login");
async function logout(req, env2) {
  const sid = getCookie(req, "aurelis_session");
  if (sid) await env2.DB.prepare("DELETE FROM sessions WHERE id=?").bind(sid).run();
  return new Response(JSON.stringify({ ok: true }), { headers: { "content-type": "application/json", "set-cookie": cookie("aurelis_session", "", 0) } });
}
__name(logout, "logout");
async function me(req, env2) {
  const s = await requireSession(req, env2);
  if (!s) return json({ authenticated: false }, 401);
  const t = await env2.DB.prepare("SELECT id,name,status FROM tenants WHERE id=?").bind(s.tenant_id).first();
  return json({ authenticated: true, userId: s.user_id, tenantId: s.tenant_id, role: s.role, tenant: t });
}
__name(me, "me");

// api/auth.js
async function onRequestPost({ request, env: env2 }) {
  const p = new URL(request.url).pathname;
  if (p.endsWith("/login")) return login(request, env2);
  return logout(request, env2);
}
__name(onRequestPost, "onRequestPost");
async function onRequestGet({ request, env: env2 }) {
  return me(request, env2);
}
__name(onRequestGet, "onRequestGet");

// _engine.js
var ENGINE_VERSION = "aurelis-change-engine-3.0.0";
var domains = ["identity", "spend", "incident", "recovery", "supply_chain", "vendor_risk", "compliance", "data_access", "ai_trust", "assurance", "observability"];
var norm = /* @__PURE__ */ __name((s) => ({ model: s.model || "unspecified", instructions: s.instructions || "", tools: s.tools || [], data: s.data || [], controls: s.controls || [] }), "norm");
function map(s) {
  const x = norm(s);
  const m = /* @__PURE__ */ new Map();
  m.set("model", x.model);
  m.set("instructions", x.instructions);
  for (const t of x.tools) m.set(`tool:${t.name}`, JSON.stringify(t));
  for (const d of x.data) m.set(`data:${d.name}`, JSON.stringify(d));
  for (const c of x.controls) m.set(`control:${c.name}`, JSON.stringify(c));
  return m;
}
__name(map, "map");
function diff(a, b) {
  const A = map(a), B = map(b), changes = [];
  for (const [k, v] of A) if (!B.has(k)) changes.push({ path: k, type: "REMOVED", from: v, to: null });
  for (const [k, v] of B) if (!A.has(k)) changes.push({ path: k, type: "ADDED", from: null, to: v });
  for (const [k, v] of A) if (B.has(k) && B.get(k) !== v) changes.push({ path: k, type: "MODIFIED", from: v, to: B.get(k) });
  return changes;
}
__name(diff, "diff");
function parse(v) {
  try {
    return JSON.parse(v);
  } catch {
    return {};
  }
}
__name(parse, "parse");
function analyzeImpact(changes) {
  const affected = /* @__PURE__ */ new Set(), tests = [], findings = [];
  let authority = false, sensitive = false, external = false, approval = false;
  for (const c of changes) {
    affected.add(c.path);
    const before = parse(c.from), after = parse(c.to);
    if (c.path.startsWith("tool:")) {
      const bw = !!before.write || !!before.delete || !!before.send;
      const aw = !!after.write || !!after.delete || !!after.send;
      if (aw && !bw) authority = true;
      if (after.external) external = true;
      tests.push({ name: `Tool authority validation \u2014 ${c.path.slice(5)}`, category: "AUTHORITY", reason: "Tool capability changed" });
    }
    if (c.path.startsWith("data:")) {
      sensitive = true;
      tests.push({ name: `Data boundary validation \u2014 ${c.path.slice(5)}`, category: "DATA_ACCESS", reason: "Data boundary changed" });
    }
    if (c.path.startsWith("control:")) {
      if (after.requiredApproval === false) approval = true;
      tests.push({ name: `Control integrity validation \u2014 ${c.path.slice(8)}`, category: "CONTROL", reason: "Control definition changed" });
    }
    if (c.path === "instructions") {
      tests.push({ name: "Instruction / policy regression validation", category: "INSTRUCTION", reason: "Instruction layer changed" });
    }
    if (c.path === "model") tests.push({ name: "Model behavior regression validation", category: "MODEL", reason: "Model provider/version changed" });
  }
  if (authority) findings.push({ severity: "HIGH", title: "Authority boundary increased", description: "A changed tool now grants a capability that was not present in the baseline." });
  if (sensitive && external) findings.push({ severity: "HIGH", title: "Sensitive-data external action path changed", description: "A changed system combines sensitive data access with an external-effect capability." });
  if (approval) findings.push({ severity: "CRITICAL", title: "Approval control weakened", description: "A control change removes a previously required human approval boundary." });
  if (!tests.length) tests.push({ name: "Baseline consistency validation", category: "BASELINE", reason: "No specialized change class matched" });
  return { affected: [...affected], tests, findings, flags: { authority, sensitive, external, approval } };
}
__name(analyzeImpact, "analyzeImpact");
async function executeChange({ db, tenantId, systemId, fromVersion, toVersion, actorId }) {
  const changes = diff(JSON.parse(fromVersion.snapshot_json), JSON.parse(toVersion.snapshot_json));
  const impact = analyzeImpact(changes);
  const changeId = id("chg");
  let decision = impact.findings.length ? "BLOCKED" : "APPROVED";
  const created = now();
  await db.prepare("INSERT INTO changes VALUES(?,?,?,?,?,?,?,?)").bind(changeId, tenantId, systemId, fromVersion.id, toVersion.id, JSON.stringify(changes), JSON.stringify(impact), decision, created).run();
  for (const t of impact.tests) {
    const fail = impact.findings.some((f) => f.severity === "CRITICAL" && t.category === "CONTROL") || impact.findings.some((f) => f.severity === "HIGH" && ["AUTHORITY", "DATA_ACCESS"].includes(t.category));
    await db.prepare("INSERT INTO tests VALUES(?,?,?,?,?,?,?)").bind(id("tst"), changeId, t.name, t.category, fail ? "FAIL" : "PASS", JSON.stringify({ reason: t.reason, executed: true }), created).run();
  }
  for (const f of impact.findings) {
    await db.prepare("INSERT INTO findings VALUES(?,?,?,?,?,?,?)").bind(id("fnd"), changeId, f.severity, f.title, f.description, "OPEN", created).run();
  }
  const reason = impact.findings.length ? impact.findings.map((f) => f.title).join("; ") : "All selected validations passed for the observed change.";
  const decisionId = id("dec");
  await db.prepare("INSERT INTO decisions VALUES(?,?,?,?,?,?)").bind(decisionId, changeId, decision, reason, ENGINE_VERSION, created).run();
  const payload = { changeId, systemId, fromVersion: fromVersion.version, toVersion: toVersion.version, changes, impact, decision, engineVersion: ENGINE_VERSION, createdAt: created };
  const hash = await sha256(JSON.stringify(payload));
  await db.prepare("INSERT INTO evidence VALUES(?,?,?,?,?,?,?)").bind(id("evd"), tenantId, changeId, "RELEASE_DECISION", JSON.stringify({ ...payload, integrityHash: hash }), hash, created).run();
  return { changeId, decision, reason, impact, tests: impact.tests, findings: impact.findings, integrityHash: hash };
}
__name(executeChange, "executeChange");

// api/demo.js
async function onRequestGet2() {
  const baseline = { model: "support-model-v17", tools: [{ name: "CRM", read: true }], data: [{ name: "Customer PII" }], controls: [{ name: "Ticket modification approval", requiredApproval: true }] };
  const changed = { ...baseline, tools: [{ name: "CRM", read: true, write: true }] };
  const changes = diff(baseline, changed), impact = analyzeImpact(changes);
  return json({ engine: ENGINE_VERSION, controlledDemo: true, baseline, changed, changes, impact, decision: impact.findings.length ? "BLOCKED" : "APPROVED" });
}
__name(onRequestGet2, "onRequestGet");

// api/health.js
async function onRequestGet3({ env: env2 }) {
  let db = "ok";
  try {
    await env2.DB.prepare("SELECT 1").first();
  } catch {
    db = "unavailable";
  }
  return json({ service: "AURELIS AAI", engine: "aurelis-change-engine-3.0.0", status: db === "ok" ? "operational" : "degraded", database: db, time: now() });
}
__name(onRequestGet3, "onRequestGet");

// api/setup.js
async function onRequestPost2({ request, env: env2 }) {
  const b = await request.json();
  const count3 = await env2.DB.prepare("SELECT COUNT(*) c FROM users").first();
  if (Number(count3.c) > 0) return json({ error: "ALREADY_INITIALIZED" }, 409);
  if (!b.email || !b.password || !b.name) return json({ error: "email,password,name required" }, 400);
  const tenant = id("ten"), user = id("usr");
  await env2.DB.batch([env2.DB.prepare("INSERT INTO tenants VALUES(?,?,?,?)").bind(tenant, b.name, "ACTIVE", now()), env2.DB.prepare("INSERT INTO users VALUES(?,?,?,?,?,?)").bind(user, tenant, String(b.email).toLowerCase(), "OWNER", await hashSecret(b.password), now()), env2.DB.prepare("INSERT INTO entitlements VALUES(?,?,?)").bind(tenant, "assurance", "ACTIVE")]);
  return json({ ok: true, tenantId: tenant, userId: user, note: "Store these credentials securely. This setup endpoint is disabled after initialization." });
}
__name(onRequestPost2, "onRequestPost");

// api/client.js
async function onRequest({ request, env: env2 }) {
  const s = await requireSession(request, env2, ["OWNER", "OPERATOR", "CLIENT"]);
  if (!s) return json({ error: "AUTHENTICATION_REQUIRED" }, 401);
  if (request.method === "GET") {
    const t = await env2.DB.prepare("SELECT id,name,status FROM tenants WHERE id=?").bind(s.tenant_id).first();
    const e = await env2.DB.prepare('SELECT domain,status FROM entitlements WHERE tenant_id=? AND status="ACTIVE"').bind(s.tenant_id).all();
    const c = await env2.DB.prepare("SELECT COUNT(*) c FROM changes WHERE tenant_id=?").bind(s.tenant_id).first();
    return json({ tenant: t, entitlements: e.results, changes: Number(c.c) });
  }
  return json({ error: "METHOD_NOT_ALLOWED" }, 405);
}
__name(onRequest, "onRequest");

// api/engine.js
var parse2 = /* @__PURE__ */ __name(async (r) => {
  try {
    return await r.json();
  } catch {
    return {};
  }
}, "parse");
async function entitled(env2, tenant, domain2) {
  const r = await env2.DB.prepare('SELECT 1 FROM entitlements WHERE tenant_id=? AND domain=? AND status="ACTIVE"').bind(tenant, domain2).first();
  return !!r;
}
__name(entitled, "entitled");
async function onRequest2({ request, env: env2 }) {
  const s = await requireSession(request, env2, ["OWNER", "OPERATOR", "CLIENT"]);
  if (!s) return json({ error: "AUTHENTICATION_REQUIRED" }, 401);
  if (s.role === "CLIENT" && !await entitled(env2, s.tenant_id, "assurance")) return json({ error: "ENTITLEMENT_REQUIRED", domain: "assurance" }, 403);
  const u = new URL(request.url), p = u.pathname.split("/").filter(Boolean);
  const action = p[2] || "";
  if (action === "domains") return json({ domains });
  if (action === "systems" && request.method === "GET") {
    const rows = await env2.DB.prepare("SELECT * FROM systems WHERE tenant_id=? ORDER BY created_at DESC").bind(s.tenant_id).all();
    return json({ systems: rows.results });
  }
  if (action === "systems" && request.method === "POST") {
    const b = await parse2(request);
    const sid = id("sys"), vid = id("ver"), v = b.version || "1.0.0", snap = JSON.stringify(b.snapshot || {});
    await env2.DB.batch([env2.DB.prepare("INSERT INTO systems VALUES(?,?,?,?,?)").bind(sid, s.tenant_id, b.name || "Untitled AI System", b.environment || "production", now()), env2.DB.prepare("INSERT INTO system_versions VALUES(?,?,?,?,?)").bind(vid, sid, v, snap, now())]);
    await audit(env2, s.tenant_id, s.user_id, "SYSTEM_REGISTERED", { systemId: sid, version: v });
    return json({ systemId: sid, versionId: vid });
  }
  if (action === "systems" && p[3] && request.method === "POST") {
    const sid = p[3], b = await parse2(request);
    const own = await env2.DB.prepare("SELECT * FROM systems WHERE id=? AND tenant_id=?").bind(sid, s.tenant_id).first();
    if (!own) return json({ error: "NOT_FOUND" }, 404);
    const latest = await env2.DB.prepare("SELECT * FROM system_versions WHERE system_id=? ORDER BY created_at DESC LIMIT 1").bind(sid).first();
    const vid = id("ver");
    await env2.DB.prepare("INSERT INTO system_versions VALUES(?,?,?,?,?)").bind(vid, sid, b.version || `v${Date.now()}`, JSON.stringify(b.snapshot || {}), now()).run();
    const result = await executeChange({ db: env2.DB, tenantId: s.tenant_id, systemId: sid, fromVersion: latest, toVersion: { id: vid, version: b.version || `v${Date.now()}`, snapshot_json: JSON.stringify(b.snapshot || {}) }, actorId: s.user_id });
    await audit(env2, s.tenant_id, s.user_id, "CHANGE_EVALUATED", { changeId: result.changeId, decision: result.decision });
    return json(result);
  }
  if (action === "changes" && request.method === "GET") {
    const rows = await env2.DB.prepare("SELECT * FROM changes WHERE tenant_id=? ORDER BY created_at DESC LIMIT 100").bind(s.tenant_id).all();
    return json({ changes: rows.results.map((x) => ({ ...x, change_json: JSON.parse(x.change_json), impact_json: JSON.parse(x.impact_json) })) });
  }
  if (action === "evidence" && p[3]) {
    const r = await env2.DB.prepare("SELECT * FROM evidence WHERE id=? AND tenant_id=?").bind(p[3], s.tenant_id).first();
    return r ? json({ ...r, payload_json: JSON.parse(r.payload_json) }) : json({ error: "NOT_FOUND" }, 404);
  }
  if (action === "retest" && p[3] && request.method === "POST") {
    const ch = await env2.DB.prepare("SELECT * FROM changes WHERE id=? AND tenant_id=?").bind(p[3], s.tenant_id).first();
    if (!ch) return json({ error: "NOT_FOUND" }, 404);
    const b = await parse2(request);
    const sys = await env2.DB.prepare("SELECT * FROM systems WHERE id=? AND tenant_id=?").bind(ch.system_id, s.tenant_id).first();
    const latest = await env2.DB.prepare("SELECT * FROM system_versions WHERE system_id=? ORDER BY created_at DESC LIMIT 1").bind(ch.system_id).first();
    if (!sys || !latest) return json({ error: "SYSTEM_NOT_FOUND" }, 404);
    const result = await executeChange({ db: env2.DB, tenantId: s.tenant_id, systemId: ch.system_id, fromVersion: { id: ch.to_version_id, version: latest.version, snapshot_json: latest.snapshot_json }, toVersion: { id: latest.id, version: latest.version, snapshot_json: JSON.stringify(b.snapshot || JSON.parse(latest.snapshot_json)) }, actorId: s.user_id });
    return json({ ...result, retestOf: p[3] });
  }
  if (action === "remediate" && p[3] && request.method === "POST") {
    const f = await env2.DB.prepare("SELECT * FROM findings WHERE id=?").bind(p[3]).first();
    if (!f) return json({ error: "NOT_FOUND" }, 404);
    await env2.DB.prepare('UPDATE findings SET status="REMEDIATED" WHERE id=?').bind(p[3]).run();
    await env2.DB.prepare("INSERT INTO remediations VALUES(?,?,?,?,?)").bind(id("rem"), p[3], JSON.stringify(await parse2(request)), "APPLIED", now()).run();
    await env2.DB.prepare("INSERT INTO regression_tests VALUES(?,?,?,?,?,?)").bind(id("reg"), s.tenant_id, p[3], f.title, JSON.stringify({ description: f.description }), now()).run();
    return json({ ok: true, regressionCreated: true });
  }
  return json({ error: "UNKNOWN_ENGINE_ROUTE" }, 404);
}
__name(onRequest2, "onRequest");

// api/invite.js
async function onRequest3({ request, env: env2 }) {
  if (request.method === "GET") {
    const token = new URL(request.url).searchParams.get("token");
    if (!token) return json({ error: "TOKEN_REQUIRED" }, 400);
    const h2 = await sha256(token), r = await env2.DB.prepare("SELECT tenant_id,email,expires_at,used_at FROM invites WHERE token_hash=?").bind(h2).first();
    if (!r || r.used_at || r.expires_at < now()) return json({ valid: false }, 400);
    const t = await env2.DB.prepare("SELECT name FROM tenants WHERE id=?").bind(r.tenant_id).first();
    return json({ valid: true, email: r.email, tenantName: t?.name });
  }
  const b = await request.json();
  const h = await sha256(b.token || "");
  const inv = await env2.DB.prepare("SELECT * FROM invites WHERE token_hash=?").bind(h).first();
  if (!inv || inv.used_at || inv.expires_at < now()) return json({ error: "INVALID_INVITATION" }, 400);
  if (!b.password) return json({ error: "password required" }, 400);
  const uid = id("usr"), sid = id("ses"), exp = new Date(Date.now() + 12 * 36e5).toISOString();
  await env2.DB.batch([env2.DB.prepare("INSERT INTO users VALUES(?,?,?,?,?,?)").bind(uid, inv.tenant_id, inv.email, "CLIENT", await hashSecret(b.password), now()), env2.DB.prepare("UPDATE invites SET used_at=? WHERE id=?").bind(now(), inv.id), env2.DB.prepare("INSERT INTO sessions VALUES(?,?,?,?,?,?)").bind(sid, uid, inv.tenant_id, "CLIENT", exp, now())]);
  return new Response(JSON.stringify({ ok: true, tenantId: inv.tenant_id }), { headers: { "content-type": "application/json", "set-cookie": cookie("aurelis_session", sid, 43200) } });
}
__name(onRequest3, "onRequest");

// api/operator.js
async function onRequest4({ request, env: env2 }) {
  const s = await requireSession(request, env2, ["OWNER", "OPERATOR"]);
  if (!s) return json({ error: "OPERATOR_AUTH_REQUIRED" }, 403);
  const b = await request.json().catch(() => ({}));
  if (request.method === "POST" && b.action === "create-client") {
    const tenant = id("ten"), email = String(b.email || "").toLowerCase(), name = b.name || "Client";
    if (!email) return json({ error: "email required" }, 400);
    const token = crypto.randomUUID() + crypto.randomUUID(), hash = await sha256(token);
    await env2.DB.batch([env2.DB.prepare("INSERT INTO tenants VALUES(?,?,?,?)").bind(tenant, name, "ACTIVE", now()), env2.DB.prepare("INSERT INTO invites VALUES(?,?,?,?,?,?)").bind(id("inv"), tenant, email, hash, new Date(Date.now() + 7 * 864e5).toISOString(), null, now())]);
    for (const d of b.domains || ["assurance"]) await env2.DB.prepare("INSERT INTO entitlements VALUES(?,?,?)").bind(tenant, d, "ACTIVE").run();
    await audit(env2, tenant, s.user_id, "CLIENT_PROVISIONED", { email });
    return json({ tenantId: tenant, inviteToken: token, invitePath: `/access.html?invite=${encodeURIComponent(token)}`, note: "Send the invitation path to the client; token is shown once." });
  }
  if (request.method === "GET") {
    const ts = await env2.DB.prepare("SELECT id,name,status,created_at FROM tenants ORDER BY created_at DESC").all();
    return json({ tenants: ts.results });
  }
  return json({ error: "UNKNOWN_OPERATOR_ROUTE" }, 404);
}
__name(onRequest4, "onRequest");

// ../.wrangler/tmp/pages-syBRkd/functionsRoutes-0.02202857336428321.mjs
var routes = [
  {
    routePath: "/api/auth",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/auth",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/demo",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet2]
  },
  {
    routePath: "/api/health",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet3]
  },
  {
    routePath: "/api/setup",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/client",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest]
  },
  {
    routePath: "/api/engine",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest2]
  },
  {
    routePath: "/api/invite",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest3]
  },
  {
    routePath: "/api/operator",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest4]
  }
];

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count3 = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count3--;
          if (count3 === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count3++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count3)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse3(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse3, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse3(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../../../../../AppData/Roaming/npm/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env2, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context2 = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env: env2,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context2);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env2["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error3) {
      if (isFailOpen) {
        const response = await env2["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error3;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
