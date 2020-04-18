
export function getuuid() {
  return Math.random().toString().substring(2, 5) + Date.now().toString()
}

