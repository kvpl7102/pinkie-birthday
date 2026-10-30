const BP = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/+$/, '')

export function getImagePath(path: string | undefined | null): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path
  }
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (BP && (normalized === BP || normalized.startsWith(`${BP}/`))) {
    return normalized
  }
  return BP ? `${BP}${normalized}` : normalized
}
