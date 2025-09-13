import { useEffect } from "react";
import { useConst } from "./useConst";
import { id } from "tsafe/id";
/** Callback is guaranteed to be call only once per component mount event in strict mode */
export function useOnFistMount(callback) {
    const refHasCallbackBeenCalled = useConst(() => ({ current: id(false) }));
    useEffect(() => {
        if (refHasCallbackBeenCalled.current) {
            return;
        }
        callback();
        refHasCallbackBeenCalled.current = true;
    }, []);
}
//# sourceMappingURL=useOnFirstMount.js.map