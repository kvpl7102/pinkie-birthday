/**
 * Get the correct image path with basePath for GitHub Pages deployment
 */
export function getImagePath(path: string): string {
  // In production on GitHub Pages, add basePath
  if (process.env.NODE_ENV === 'production') {
    return `/pinkie-birthday${path}`
  }
  // In development, use path as-is
  return path
}