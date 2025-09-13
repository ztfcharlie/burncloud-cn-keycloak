import { capitalize } from "tsafe/capitalize";
export function kebabCaseToCamelCase(kebabCaseString) {
    const [first, ...rest] = kebabCaseString.split("-");
    return [first, ...rest.map(capitalize)].join("");
}
//# sourceMappingURL=kebabCaseToSnakeCase.js.map