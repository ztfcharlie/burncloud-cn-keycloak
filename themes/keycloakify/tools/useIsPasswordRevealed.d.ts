/// <reference types="react" />
/**
 * Initially false, state that enables to dynamically control if
 * the type of a password input is "password" (false) or "text" (true).
 */
export declare function useIsPasswordRevealed(params: {
    passwordInputId: string;
}): {
    isPasswordRevealed: boolean;
    toggleIsPasswordRevealed: import("react").DispatchWithoutAction;
};
