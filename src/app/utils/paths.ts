const BP = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/+$/, '')

export function getImagePath(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${BP}${p}`
}