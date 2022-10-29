function isShallowEqual(a: string[], b: string[]): boolean {
  const length = Math.max(a.length, b.length);

  for (let i = 0; i < length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

export default isShallowEqual;
