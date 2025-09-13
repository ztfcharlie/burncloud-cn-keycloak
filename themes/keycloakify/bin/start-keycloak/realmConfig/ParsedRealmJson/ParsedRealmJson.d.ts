import { z } from "zod";
export type ParsedRealmJson = {
    realm: string;
    loginTheme?: string;
    accountTheme?: string;
    adminTheme?: string;
    emailTheme?: string;
    sslRequired?: string;
    eventsListeners: string[];
    users: {
        id: string;
        email: string;
        username: string;
        credentials: {
            type: string;
        }[];
        clientRoles?: Record<string, string[]>;
    }[];
    roles: {
        client: Record<string, {
            name: string;
            containerId: string;
        }[]>;
    };
    clients: {
        id: string;
        clientId: string;
        baseUrl?: string;
        redirectUris?: string[];
        webOrigins?: string[];
        attributes?: {
            "post.logout.redirect.uris"?: string;
        };
        protocol?: string;
        protocolMappers?: {
            id: string;
            name: string;
            protocol: string;
            protocolMapper: string;
            consentRequired: boolean;
            config?: Record<string, string>;
        }[];
    }[];
};
export declare const zParsedRealmJson: z.ZodType<ParsedRealmJson, z.ZodTypeDef, ParsedRealmJson>;
