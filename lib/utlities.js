export const isRunningOnServer = () => (typeof window === 'undefined');

/**
 * Utility that is useful for determining if a string value equals "true" since the string "false"
 * is considered (boolean) true.  Reading environment variables are one example where this utility is needed.
 * @param {str} str The string to compare to 'true'
 * @returns Returns true if the passed-in value is equal to "true".
 */
export const doesStringEqualTrue = (str) => (String(str).trim() === 'true');