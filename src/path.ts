export const normalizePath = (value: string) => value.replace(/\/+$/, '') || '/';
/** Static hosting serves directories, so the canonical form of every page ends with a slash. */
export const withTrailingSlash = (value: string) => (value.endsWith('/') ? value : `${value}/`);
