export function apiBaseUrl () {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:9090'
  } else {
    return 'http://localhost:9090'
  }
}
