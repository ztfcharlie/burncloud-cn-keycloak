export declare const getIsKnownByGit: (params: {
    filePath: string;
}) => Promise<boolean>;
export declare const untrackFromGit: (params: {
    filePath: string;
}) => Promise<void>;
