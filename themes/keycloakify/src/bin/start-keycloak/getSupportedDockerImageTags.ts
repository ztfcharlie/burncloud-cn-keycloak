import fetch from "make-fetch-happen";
import type { BuildContext } from "../shared/buildContext";
import { assert, type Equals } from "tsafe/assert";
import { id } from "tsafe/id";
import { z } from "zod";
import { SemVer } from "../tools/SemVer";
import { exclude } from "tsafe/exclude";
import { getSupportedKeycloakMajorVersions } from "./realmConfig/defaultConfig";
import { join as pathJoin, dirname as pathDirname } from "path";
import * as fs from "fs/promises";
import { existsAsync } from "../tools/fs.existsAsync";
import { readThisNpmPackageVersion } from "../tools/readThisNpmPackageVersion";
import type { ReturnType } from "tsafe";

export type BuildContextLike = {
    fetchOptions: BuildContext["fetchOptions"];
    cacheDirPath: string;
};

assert<BuildContext extends BuildContextLike ? true : false>;

export async function getSupportedDockerImageTags(params: {
    buildContext: BuildContextLike;
}): Promise<{
    allSupportedTags: string[];
    latestMajorTags: string[];
}> {
    const { buildContext } = params;

    {
        const result = await getCachedValue({ cacheDirPath: buildContext.cacheDirPath });

        if (result !== undefined) {
            return result;
        }
    }

    const tags_queryResponse: string[] = [];

    await (async function callee(url: string) {
        const r = await fetch(url, buildContext.fetchOptions);

        await Promise.all([
            (async () => {
                tags_queryResponse.push(
                    ...z
                        .object({
                            tags: z.array(z.string())
                        })
                        .parse(await r.json()).tags
                );
            })(),
            (async () => {
                const link = r.headers.get("link");

                if (link === null) {
                    return;
                }

                const split = link.split(";").map(s => s.trim());

                assert(split.length === 2);

                assert(split[1] === 'rel="next"');

                const match = split[0].match(/^<(.+)>$/);

                assert(match !== null);

                const nextUrl = new URL(url).origin + match[1];

                await callee(nextUrl);
            })()
        ]);
    })("https://quay.io/v2/keycloak/keycloak/tags/list");

    const supportedKeycloakMajorVersions = getSupportedKeycloakMajorVersions();

    const allSupportedTags_withVersion = tags_queryResponse
        .map(tag => ({
            tag,
            version: (() => {
                if (tag.includes("-")) {
                    return undefined;
                }

                let version: SemVer;

                try {
                    version = SemVer.parse(tag);
                } catch {
                    return undefined;
                }

                if (tag.split(".").length !== 3) {
                    return undefined;
                }

                if (!supportedKeycloakMajorVersions.includes(version.major)) {
                    return undefined;
                }

                return version;
            })()
        }))
        .map(({ tag, version }) => (version === undefined ? undefined : { tag, version }))
        .filter(exclude(undefined))
        .sort(({ version: a }, { version: b }) => SemVer.compare(b, a));

    const latestTagByMajor: Record<number, SemVer | undefined> = {};

    for (const { version } of allSupportedTags_withVersion) {
        const version_current = latestTagByMajor[version.major];

        if (
            version_current === undefined ||
            SemVer.compare(version_current, version) === -1
        ) {
            latestTagByMajor[version.major] = version;
        }
    }

    const latestMajorTags = Object.entries(latestTagByMajor)
        .sort(([a], [b]) => parseInt(b) - parseInt(a))
        .map(([, version]) => version)
        .map(version => {
            assert(version !== undefined);

            if (!supportedKeycloakMajorVersions.includes(version.major)) {
                return undefined;
            }

            return SemVer.stringify(version);
        })
        .filter(exclude(undefined));

    const allSupportedTags = allSupportedTags_withVersion.map(({ tag }) => tag);

    const result = {
        latestMajorTags,
        allSupportedTags
    };

    await setCachedValue({ cacheDirPath: buildContext.cacheDirPath, result });

    return result;
}

const { getCachedValue, setCachedValue } = (() => {
    type Result = ReturnType<typeof getSupportedDockerImageTags>;

    const zResult = (() => {
        type TargetType = Result;

        const zTargetType = z.object({
            allSupportedTags: z.array(z.string()),
            latestMajorTags: z.array(z.string())
        });

        type InferredType = z.infer<typeof zTargetType>;

        assert<Equals<TargetType, InferredType>>;

        return id<z.ZodType<TargetType>>(zTargetType);
    })();

    type Cache = {
        keycloakifyVersion: string;
        time: number;
        result: Result;
    };

    const zCache = (() => {
        type TargetType = Cache;

        const zTargetType = z.object({
            keycloakifyVersion: z.string(),
            time: z.number(),
            result: zResult
        });

        type InferredType = z.infer<typeof zTargetType>;

        assert<Equals<TargetType, InferredType>>;

        return id<z.ZodType<TargetType>>(zTargetType);
    })();

    let inMemoryCachedResult: Cache["result"] | undefined = undefined;

    function getCacheFilePath(params: { cacheDirPath: string }) {
        const { cacheDirPath } = params;

        return pathJoin(cacheDirPath, "supportedDockerImageTags.json");
    }

    async function getCachedValue(params: { cacheDirPath: string }) {
        const { cacheDirPath } = params;

        if (inMemoryCachedResult !== undefined) {
            return inMemoryCachedResult;
        }

        const cacheFilePath = getCacheFilePath({ cacheDirPath });

        if (!(await existsAsync(cacheFilePath))) {
            return undefined;
        }

        let cache: Cache | undefined;

        try {
            cache = zCache.parse(JSON.parse(await fs.readFile(cacheFilePath, "utf8")));
        } catch {
            return undefined;
        }

        if (cache.keycloakifyVersion !== readThisNpmPackageVersion()) {
            return undefined;
        }

        if (Date.now() - cache.time > 3_600 * 24) {
            return undefined;
        }

        inMemoryCachedResult = cache.result;

        return cache.result;
    }

    async function setCachedValue(params: {
        cacheDirPath: string;
        result: Cache["result"];
    }) {
        const { cacheDirPath, result } = params;

        inMemoryCachedResult = result;

        const cacheFilePath = getCacheFilePath({ cacheDirPath });

        {
            const dirPath = pathDirname(cacheFilePath);

            if (!(await existsAsync(dirPath))) {
                await fs.mkdir(dirPath, { recursive: true });
            }
        }

        await fs.writeFile(
            cacheFilePath,
            JSON.stringify(
                zCache.parse({
                    keycloakifyVersion: readThisNpmPackageVersion(),
                    time: Date.now(),
                    result
                }),
                null,
                2
            )
        );
    }

    return {
        getCachedValue,
        setCachedValue
    };
})();
