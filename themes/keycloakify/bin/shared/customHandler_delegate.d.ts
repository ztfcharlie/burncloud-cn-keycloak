import type { BuildContext } from "./buildContext";
import { type CommandName } from "./customHandler";
export declare function maybeDelegateCommandToCustomHandler(params: {
    commandName: CommandName;
    buildContext: BuildContext;
}): Promise<{
    hasBeenHandled: boolean;
}>;
