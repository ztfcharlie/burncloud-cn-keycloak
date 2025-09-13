export type FetchOptionsLike = {
    proxy: string | undefined;
    noProxy: string | string[];
    strictSSL: boolean;
    cert: string | string[] | undefined;
    ca: string[] | undefined;
};
export declare function getProxyFetchOptions(params: {
    npmConfigGetCwd: string;
}): FetchOptionsLike;
