import { assert } from "tsafe/assert";
export function getKeycloakVersionRangeForJar(params) {
    const { keycloakAccountV1Version, keycloakThemeAdditionalInfoExtensionVersion, doesImplementAccountV1Theme } = params;
    if (doesImplementAccountV1Theme) {
        const keycloakVersionRange = (() => {
            switch (keycloakAccountV1Version) {
                case null:
                    switch (keycloakThemeAdditionalInfoExtensionVersion) {
                        case null:
                            return "21-and-below";
                        case "1.1.5":
                            return undefined;
                        default:
                            assert(false);
                    }
                case "0.3":
                    switch (keycloakThemeAdditionalInfoExtensionVersion) {
                        case null:
                            return undefined;
                        case "1.1.5":
                            return "23";
                        default:
                            assert(false);
                    }
                case "0.4":
                    switch (keycloakThemeAdditionalInfoExtensionVersion) {
                        case null:
                            return undefined;
                        case "1.1.5":
                            return "24";
                        default:
                            assert(false);
                    }
                case "0.6":
                    switch (keycloakThemeAdditionalInfoExtensionVersion) {
                        case null:
                            return "26.0-to-26.1";
                        case "1.1.5":
                            return "25";
                        default:
                            assert(false);
                    }
                case "0.7":
                    switch (keycloakThemeAdditionalInfoExtensionVersion) {
                        case null:
                            return "26.2-and-above";
                        case "1.1.5":
                            return undefined;
                        default:
                            assert(false);
                    }
                default:
                    assert(false);
            }
        })();
        assert();
        return keycloakVersionRange;
    }
    else {
        const keycloakVersionRange = (() => {
            if (keycloakAccountV1Version !== null) {
                return undefined;
            }
            switch (keycloakThemeAdditionalInfoExtensionVersion) {
                case null:
                    return "all-other-versions";
                case "1.1.5":
                    return "22-to-25";
            }
            assert(false);
        })();
        assert();
        return keycloakVersionRange;
    }
}
//# sourceMappingURL=getKeycloakVersionRangeForJar.js.map