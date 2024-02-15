import { type SortOptions } from '../types';

function sort(names: string[], options: SortOptions): string[] {
  if (!options.callbacksLast) {
    return [...names].sort();
  }

  const first: string[] = [];
  const last: string[] = [];

  const tester = /^(handle[A-Z]|on[A-Z])/;

  names.forEach((value) => {
    if (tester.test(value)) {
      last.push(value);
    } else {
      first.push(value);
    }
  });

  first.sort();
  last.sort();

  return [...first, ...last];
}

export default sort;
