#!/usr/bin/env node
import type { BuildContext } from "./shared/buildContext";
export declare function command(params: {
    buildContext: BuildContext;
}): Promise<void>;
