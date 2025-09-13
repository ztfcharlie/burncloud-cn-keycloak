/**
 * "Hello (world)" => "world"
 * "Hello (world) (foo)" => "foo"
 * "Hello (world (foo))" => "world (foo)"
 */
export declare function extractLastParenthesisContent(str: string): string | undefined;
