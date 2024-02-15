import {
  type ArrayExpression,
  type Expression,
  type SpreadElement,
} from 'estree';

function isArrayExpression<T extends Expression | SpreadElement>(
  value: T,
): value is T & ArrayExpression {
  return value.type === 'ArrayExpression';
}

function getDependencies(
  args: (Expression | SpreadElement)[],
): ArrayExpression | undefined {
  return args.find(isArrayExpression);
}

export default getDependencies;
