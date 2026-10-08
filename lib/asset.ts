// Prefixes a /public path with the site's base path (set in next.config.ts).
// Needed because unoptimised <Image> sources are not prefixed automatically.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`
