export = Caipora;

type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "silent";

declare namespace Caipora {
    /**
     * A simple assertion test that verifies whether `condition` is truthy.
     * If it is not, an `AssertionError` is thrown.
     * If provided, the error `message` is formatted using `util.format()` and used as the error message.
     */
    function assert(condition?: boolean, message?: string, ...optionalParams: any[]): void;
    /**
     * When `stdout` is a TTY, calling `console.clear()` will attempt to clear the TTY.
     * When `stdout` is not a TTY, this method does nothing.
     */
    function clear(): void;
    /**
     * Maintains an internal counter specific to `label` and outputs to `stdout` the number of times `console.count()` has been called with the given `label`.
     */
    function count(label?: string): void;
    /**
     * Resets the internal counter specific to `label`.
     */
    function countReset(label?: string): void;
    /**
     * Prints to `stdout` with newline if debug level is enabled.
     * If a single argument is passed and it is a function, it prints lazily.
     */
    function debug(func: () => [string, ...any[]]): void;
    function debug(func: () => any[]): void;
    function debug(func: () => any): void;
    function debug(message: string, ...optionalParams: any[]): void;
    function debug(...args: any[]): void;
    /**
     * Uses {@link util.inspect()} on `obj` and prints the resulting string to `stdout`.
     * This function bypasses any custom `inspect()` function defined on `obj`.
     */
    function dir(obj: any, options?: NodeJS.InspectOptions): void;
    /**
     * This method calls {@link caipora.log()} passing it the arguments received. Please note that this method does not produce any XML formatting
     */
    function dirxml(...data: any[]): void;
    /**
     * Prints to `stderr` with newline if error level is enabled.
     * If a single argument is passed and it is a function, it prints lazily.
     */
    function error(func: () => [string, ...any[]]): void;
    function error(func: () => any[]): void;
    function error(func: () => any): void;
    function error(message: string, ...optionalParams: any[]): void;
    function error(...args: any[]): void;
    /**
     * Gets the current log level.
     */
    function getLevel(): LogLevel;
    /**
     * Increases indentation of subsequent lines by two spaces.
     * If one or more `label`s are provided, those are printed first without the additional indentation.
     */
    function group(...label: any[]): void;
    /**
     * The `console.groupCollapsed()` function is an alias for {@link console.group()}.
     */
    function groupCollapsed(): void;
    /**
     * Decreases indentation of subsequent lines by two spaces.
     */
    function groupEnd(): void;
    /**
     * Prints to `stdout` with newline if info level is enabled.
     * If a single argument is passed and it is a function, it prints lazily.
     */
    function info(func: () => [string, ...any[]]): void;
    function info(func: () => any[]): void;
    function info(func: () => any): void;
    function info(message: string, ...optionalParams: any[]): void;
    function info(...args: any[]): void;
    /**
     * Prints to `stdout` with newline regardless of the log level.
     * If a single argument is passed and it is a function, it prints lazily.
     */
    function log(func: () => [string, ...any[]]): void;
    function log(func: () => any[]): void;
    function log(func: () => any): void;
    function log(message: string, ...optionalParams: any[]): void;
    function log(...args: any[]): void;
    /**
     * This method does not display anything unless used in the inspector.
     *  Prints to `stdout` the array `array` formatted as a table.
     */
    function table(tabularData: any, properties?: string[]): void;
    /**
     * Starts a timer that can be used to compute the duration of an operation. Timers are identified by a unique `label`.
     */
    function time(label?: string): void;
    /**
     * Stops a timer that was previously started by calling {@link console.time()} and prints the result to `stdout`.
     */
    function timeEnd(label?: string): void;
    /**
     * For a timer that was previously started by calling {@link console.time()}, prints the elapsed time and other `data` arguments to `stdout`.
     */
    function timeLog(label?: string, ...data: any[]): void;
    /**
     * Prints to `stderr` the string 'Trace :', followed by the {@link util.format()} formatted message and stack trace to the current position in the code if trace level is enabled.
     * If a single argument is passed and it is a function, it prints lazily.
     */
    function trace(func: () => [string, ...any[]]): void;
    function trace(func: () => any[]): void;
    function trace(func: () => any): void;
    function trace(message: string, ...optionalParams: any[]): void;
    function trace(...args: any[]): void;
    /**
     * Prints to `stderr` with newline if warn level is enabled.
     * If a single argument is passed and it is a function, it prints lazily.
     */
    function warn(func: () => [string, ...any[]]): void;
    function warn(func: () => any[]): void;
    function warn(func: () => any): void;
    function warn(message: string, ...optionalParams: any[]): void;
    function warn(...args: any[]): void;

    // --- Inspector mode only ---
    /**
     * This method does not display anything unless used in the inspector.
     *  The console.markTimeline() method is the deprecated form of console.timeStamp().
     *
     * @deprecated Use console.timeStamp() instead.
     */
    function markTimeline(label?: string): void;
    /**
     * This method does not display anything unless used in the inspector.
     *  Starts a JavaScript CPU profile with an optional label.
     */
    function profile(label?: string): void;
    /**
     * This method does not display anything unless used in the inspector.
     *  Stops the current JavaScript CPU profiling session if one has been started and prints the report to the Profiles panel of the inspector.
     */
    function profileEnd(label?: string): void;
    /**
     * Sets the current log level.
     * The log level defaults to LOG_LEVEL environment variable if set or `info` if not set.
     */
    function setLevel(level: LogLevel): void;
    /**
     * This method does not display anything unless used in the inspector.
     *  Adds an event with the label `label` to the Timeline panel of the inspector.
     */
    function timeStamp(label?: string): void;
    /**
     * This method does not display anything unless used in the inspector.
     *  The console.timeline() method is the deprecated form of console.time().
     *
     * @deprecated Use console.time() instead.
     */
    function timeline(label?: string): void;
    /**
     * This method does not display anything unless used in the inspector.
     *  The console.timelineEnd() method is the deprecated form of console.timeEnd().
     *
     * @deprecated Use console.timeEnd() instead.
     */
    function timelineEnd(label?: string): void;
}