export const isClient = typeof window !== "undefined";

export const _window = isClient ? window : undefined;
