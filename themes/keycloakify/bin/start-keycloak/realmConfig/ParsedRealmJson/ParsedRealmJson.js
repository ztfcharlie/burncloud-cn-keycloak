import { z } from "zod";
import { assert } from "tsafe/assert";
import { id } from "tsafe/id";
export const zParsedRealmJson = (() => {
    const zTargetType = z.object({
        realm: z.string(),
        loginTheme: z.string().optional(),
        accountTheme: z.string().optional(),
        adminTheme: z.string().optional(),
        emailTheme: z.string().optional(),
        sslRequired: z.string().optional(),
        eventsListeners: z.array(z.string()),
        users: z.array(z.object({
            id: z.string(),
            email: z.string(),
            username: z.string(),
            credentials: z.array(z.object({
                type: z.string()
            })),
            clientRoles: z.record(z.array(z.string())).optional()
        })),
        roles: z.object({
            client: z.record(z.array(z.object({
                name: z.string(),
                containerId: z.string()
            })))
        }),
        clients: z.array(z.object({
            id: z.string(),
            clientId: z.string(),
            baseUrl: z.string().optional(),
            redirectUris: z.array(z.string()).optional(),
            webOrigins: z.array(z.string()).optional(),
            attributes: z
                .object({
                "post.logout.redirect.uris": z.string().optional()
            })
                .optional(),
            protocol: z.string().optional(),
            protocolMappers: z
                .array(z.object({
                id: z.string(),
                name: z.string(),
                protocol: z.string(),
                protocolMapper: z.string(),
                consentRequired: z.boolean(),
                config: z.record(z.string()).optional()
            }))
                .optional()
        }))
    });
    assert;
    return id(zTargetType);
})();
//# sourceMappingURL=ParsedRealmJson.js.map