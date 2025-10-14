
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cleanParams<T extends Record<string, any>>(params: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(params).filter(([, value]) => {
            if (value === undefined || value === null) return false;
            if (typeof value === 'string' && value.trim() === '') return false;
            if (Array.isArray(value) && value.length === 0) return false;
            return true;
        })
    ) as Partial<T>;
}
