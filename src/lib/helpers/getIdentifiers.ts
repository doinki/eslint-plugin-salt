import type { SpreadElement, Expression, Identifier } from 'estree';

function isNotNull<T>(value: T): value is NonNullable<T> {
  return value != null;
}

function isIdentifier<T extends Expression | SpreadElement>(
  value: T
): value is T & Identifier {
  return value.type === 'Identifier';
}

function getIdentifiers(elements: (SpreadElement | Expression | null)[]) {
  return elements.filter(isNotNull).filter(isIdentifier);
}

export default getIdentifiers;
