type ActionCallback = (args: IArguments) => void;
type ConditionCallback = (args: IArguments) => boolean;
export type RevertCallback = () => void;

function captureOutput(
    output: NodeJS.WritableStream,
    condition: ConditionCallback,
    action: ActionCallback,
    interceptWrite: boolean
): RevertCallback {
    const stdoutWrite = output.write;
    output.write = function () {
        if (condition(arguments)) {
            action(arguments);
            if (interceptWrite) {
                return true;
            }
        }
        return stdoutWrite.apply(output, arguments);
    };
    return () => {
        output.write = stdoutWrite;
    };
}

export function captureStdOut(
    condition: ConditionCallback,
    action: ActionCallback,
    interceptWrite = true
): RevertCallback {
    return captureOutput(process.stdout, condition, action, interceptWrite);
}

export function captureStdErr(
    condition: (args: IArguments) => boolean,
    action: (args: IArguments) => void,
    interceptWrite = true
): RevertCallback {
    return captureOutput(process.stderr, condition, action, interceptWrite);
}

const nodeVersions = process.versions.node.split(".").map(Number);

export function isOlderThanNode(version: string): boolean {
    const versions = version.split('.').map(Number)

    return computeScore(versions) > computeScore(nodeVersions)
}

function computeScore(version: number[]): number {
    return 10000 * version[0] + 100 * version[1] + version[2]
}