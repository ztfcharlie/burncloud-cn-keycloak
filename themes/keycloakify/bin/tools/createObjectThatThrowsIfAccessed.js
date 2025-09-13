const keyIsTrapped = "isTrapped_zSskDe9d";
export class AccessError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export function createObjectThatThrowsIfAccessed(params) {
    const { debugMessage = "", isPropertyWhitelisted = () => false } = params !== null && params !== void 0 ? params : {};
    const get = (...args) => {
        const [, prop] = args;
        if (isPropertyWhitelisted(prop)) {
            return Reflect.get(...args);
        }
        if (prop === keyIsTrapped) {
            return true;
        }
        throw new AccessError(`Cannot access ${String(prop)} yet ${debugMessage}`);
    };
    const trappedObject = new Proxy({}, {
        get,
        set: get
    });
    return trappedObject;
}
export function createObjectThatThrowsIfAccessedFactory(params) {
    const { isPropertyWhitelisted } = params;
    return {
        createObjectThatThrowsIfAccessed: (params) => {
            const { debugMessage } = params !== null && params !== void 0 ? params : {};
            return createObjectThatThrowsIfAccessed({
                debugMessage,
                isPropertyWhitelisted
            });
        }
    };
}
export function isObjectThatThrowIfAccessed(obj) {
    return obj[keyIsTrapped] === true;
}
export const THROW_IF_ACCESSED = {
    __brand: "THROW_IF_ACCESSED"
};
export function createObjectWithSomePropertiesThatThrowIfAccessed(obj, debugMessage) {
    return Object.defineProperties(obj, Object.fromEntries(Object.entries(obj)
        .filter(([, value]) => value === THROW_IF_ACCESSED)
        .map(([key]) => {
        const getAndSet = () => {
            throw new AccessError(`Cannot access ${key} yet ${debugMessage !== null && debugMessage !== void 0 ? debugMessage : ""}`);
        };
        const pd = {
            get: getAndSet,
            set: getAndSet,
            enumerable: true
        };
        return [key, pd];
    })));
}
//# sourceMappingURL=createObjectThatThrowsIfAccessed.js.map