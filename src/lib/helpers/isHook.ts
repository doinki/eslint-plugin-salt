import type { Rule } from 'eslint';
import type { CallExpression } from 'estree';

function isHook(node: CallExpression & Rule.NodeParentExtension): boolean {
  if (!('name' in node.callee)) {
    return false;
  }

  switch (node.callee.name) {
    case 'useCallback':
    case 'useEffect':
    case 'useImperativeHandle':
    case 'useLayoutEffect':
    case 'useMemo':
      return true;
    default:
      return false;
  }
}

export default isHook;
