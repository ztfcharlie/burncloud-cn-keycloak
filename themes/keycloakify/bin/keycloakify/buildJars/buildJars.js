import { assert } from "tsafe/assert";
import { keycloakAccountV1Versions, keycloakThemeAdditionalInfoExtensionVersions } from "./extensionVersions";
import { getKeycloakVersionRangeForJar } from "./getKeycloakVersionRangeForJar";
import { buildJar } from "./buildJar";
assert();
export async function buildJars(params) {
    const { resourcesDirPath, buildContext } = params;
    const doesImplementAccountV1Theme = buildContext.implementedThemeTypes.account.isImplemented &&
        buildContext.implementedThemeTypes.account.type === "Multi-Page";
    await Promise.all(keycloakAccountV1Versions
        .map(keycloakAccountV1Version => keycloakThemeAdditionalInfoExtensionVersions.map(keycloakThemeAdditionalInfoExtensionVersion => {
        const keycloakVersionRange = getKeycloakVersionRangeForJar({
            doesImplementAccountV1Theme,
            keycloakAccountV1Version,
            keycloakThemeAdditionalInfoExtensionVersion
        });
        if (keycloakVersionRange === undefined) {
            return undefined;
        }
        const jarTarget = buildContext.jarTargets.find(jarTarget => jarTarget.keycloakVersionRange === keycloakVersionRange);
        if (jarTarget === undefined) {
            return undefined;
        }
        const { jarFileBasename } = jarTarget;
        return buildJar({
            jarFileBasename,
            keycloakAccountV1Version,
            keycloakThemeAdditionalInfoExtensionVersion,
            resourcesDirPath,
            doesImplementAccountV1Theme,
            buildContext
        });
    }))
        .flat());
}
//# sourceMappingURL=buildJars.js.map