const BP = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/+$/, '')

export function getImagePath(path: string): string {
  if (!BP) {
    return path.startsWith('/') ? path : `/${path}`
  }
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${BP}${normalized}`
}