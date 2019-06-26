export = caipora;

declare var caipora: Caipora;

type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "silent";

interface CaiporaConstructor {
    prototype: Caipora;
    new(stdout: NodeJS.WritableStream, stderr?: NodeJS.WritableStream, ignoreErrors?: boolean): Caipora;
    new(options: NodeJS.ConsoleConstructorOptions): Caipora;
}

interface Caipora {
    /**
     *  The Caipora class can be used to create a simple logger with configurable output streams.
     *  The default log level follows the
     */
    Caipora: CaiporaConstructor;
    /**
     * This is an alias of {@link Caipora} class. It is not the same as {@link console.Console}.
     * It is exported for compatibility reasons.
     */
    Console: CaiporaConstructor;
    /**
     * A simple assertion test that verifies whether `condition` is truthy.
     * If it is not, an `AssertionError` is printed.
     * If provided, the error `message` is formatted using `util.format()` and used as the error message.
     */
    assert(condition: boolean): void;
    assert(condition: boolean, message: string, ...optionalParams: any[]): void;
    /**
     * When `stdout` is a TTY, calling `console.clear()` will attempt to clear the TTY.
     * When `stdout` is not a TTY, this method does nothing.
     */
    clear(): void;
    /**
     * Maintains an internal counter specific to `label` and outputs to `stdout` the number of times `console.count()` has been called with the given `label`.
     */
    count(label?: string): void;
    /**
     * Resets the internal counter specific to `label`.
     */
    countReset(label?: string): void;
    /**
     * Prints to `stdout` with newline if debug level is enabled.
     * If a single argument is passed and it is a function, it prints lazily.
     */
    debug(func: () => [string, ...any[]]): void;
    debug(func: () => any[]): void;
    debug(func: () => any): void;
    debug(message: string, ...optionalParams: any[]): void;
    debug(...args: any[]): void;
    /**
     * Uses {@link util.inspect()} on `obj` and prints the resulting string to `stdout`.
     * This bypasses any custom `inspect()` defined on `obj`.
     */
    dir(obj: any, options?: NodeJS.InspectOptions): void;
    /**
     * This method calls {@link console.log()} passing it the arguments received. Please note that this method does not produce any XML formatting
     */
    dirxml(...data: any[]): void;
    /**
     * Prints to `stderr` with newline if error level is enabled.
     * If a single argument is passed and it is a function, it prints lazily.
     */
    error(func: () => [string, ...any[]]): void;
    error(func: () => any[]): void;
    error(func: () => any): void;
    error(message: string, ...optionalParams: any[]): void;
    error(...args: any[]): void;
    /**
     * Gets the current log level.
     */
    getLevel(): LogLevel;
    /**
     * Increases indentation of subsequent lines by two spaces.
     * If one or more `label`s are provided, those are printed first without the additional indentation.
     */
    group(...label: any[]): void;
    /**
     * The `console.groupCollapsed()` is an alias for {@link console.group()}.
     */
    groupCollapsed(): void;
    /**
     * Decreases indentation of subsequent lines by two spaces.
     */
    groupEnd(): void;
    /**
     * Prints to `stdout` with newline if info level is enabled.
     * If a single argument is passed and it is a function, it prints lazily.
     */
    info(func: () => [string, ...any[]]): void;
    info(func: () => any[]): void;
    info(func: () => any): void;
    info(message: string, ...optionalParams: any[]): void;
    info(...args: any[]): void;
    /**
     * Prints to `stdout` with newline regardless of the log level.
     * If a single argument is passed and it is a function, it prints lazily.
     */
    log(func: () => [string, ...any[]]): void;
    log(func: () => any[]): void;
    log(func: () => any): void;
    log(message: string, ...optionalParams: any[]): void;
    log(...args: any[]): void;
    /**
     * This method does not display anything unless used in the inspector.
     *  Prints to `stdout` the array `array` formatted as a table.
     */
    table(tabularData: any, properties?: string[]): void;
    /**
     * Starts a timer that can be used to compute the duration of an operation. Timers are identified by a unique `label`.
     */
    time(label?: string): void;
    /**
     * Stops a timer that was previously started by calling {@link console.time()} and prints the result to `stdout`.
     */
    timeEnd(label?: string): void;
    /**
     * For a timer that was previously started by calling {@link console.time()}, prints the elapsed time and other `data` arguments to `stdout`.
     */
    timeLog(label?: string, ...data: any[]): void;
    /**
     * Prints to `stderr` the string 'Trace :', followed by the {@link util.format()} formatted message and stack trace to the current position in the code if trace level is enabled.
     * If a single argument is passed and it is a function, it prints lazily.
     */
    trace(func: () => [string, ...any[]]): void;
    trace(func: () => any[]): void;
    trace(func: () => any): void;
    trace(message: string, ...optionalParams: any[]): void;
    trace(...args: any[]): void;
    /**
     * Prints to `stderr` with newline if warn level is enabled.
     * If a single argument is passed and it is a function, it prints lazily.
     */
    warn(func: () => [string, ...any[]]): void;
    warn(func: () => any[]): void;
    warn(func: () => any): void;
    warn(message: string, ...optionalParams: any[]): void;
    warn(...args: any[]): void;

    // --- Inspector mode only ---
    /**
     * This method does not display anything unless used in the inspector.
     *  The console.markTimeline() method is the deprecated form of console.timeStamp().
     *
     * @deprecated Use console.timeStamp() instead.
     */
    markTimeline(label?: string): void;
    /**
     * This method does not display anything unless used in the inspector.
     *  Starts a JavaScript CPU profile with an optional label.
     */
    profile(label?: string): void;
    /**
     * This method does not display anything unless used in the inspector.
     *  Stops the current JavaScript CPU profiling session if one has been started and prints the report to the Profiles panel of the inspector.
     */
    profileEnd(label?: string): void;
    /**
     * Sets the current log level.
     * The log level defaults to LOG_LEVEL environment variable if set or `info` if not set.
     */
    setLevel(level: LogLevel): void;
    /**
     * This method does not display anything unless used in the inspector.
     *  Adds an event with the label `label` to the Timeline panel of the inspector.
     */
    timeStamp(label?: string): void;
    /**
     * This method does not display anything unless used in the inspector.
     *  The console.timeline() method is the deprecated form of console.time().
     *
     * @deprecated Use console.time() instead.
     */
    timeline(label?: string): void;
    /**
     * This method does not display anything unless used in the inspector.
     *  The console.timelineEnd() method is the deprecated form of console.timeEnd().
     *
     * @deprecated Use console.timeEnd() instead.
     */
    timelineEnd(label?: string): void;
}