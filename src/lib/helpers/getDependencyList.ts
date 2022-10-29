import type { ArrayExpression, Expression, SpreadElement } from 'estree';

function isArrayExpression<T extends Expression | SpreadElement>(
  value: T
): value is T & ArrayExpression {
  return value.type === 'ArrayExpression';
}

function getDependencyList(
  args: (Expression | SpreadElement)[]
): ArrayExpression | undefined {
  return args.find(isArrayExpression);
}

export default getDependencyList;
