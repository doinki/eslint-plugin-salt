import { type Rule } from 'eslint';

import getDependencies from '../helpers/getDependencies';
import getIdentifiers from '../helpers/getIdentifiers';
import getNames from '../helpers/getNames';
import isHook from '../helpers/isHook';
import isShallowEqual from '../helpers/isShallowEqual';
import sort from '../helpers/sort';
import { type SortOptions } from '../types';

const reactHookDependencies: Rule.RuleModule = {
  create(context) {
    const options: SortOptions = context.options[0] || {
      callbacksLast: true,
    };

    return {
      CallExpression(node) {
        if (!isHook(node)) {
          return;
        }

        const dependencies = getDependencies(node.arguments);

        if (!dependencies) {
          return;
        }

        const names = getNames(getIdentifiers(dependencies.elements));
        const sortedNames = sort(names, options);

        if (isShallowEqual(names, sortedNames)) {
          return;
        }

        const { range } = dependencies;

        if (!range) {
          return;
        }

        context.report({
          fix: (fixer) =>
            fixer.replaceTextRange(
              [range[0] + 1, range[1] - 1],
              sortedNames.join(', ').trim(),
            ),
          message: 'React Hook Dependencies should be sorted alphabetically',
          node: dependencies,
        });
      },
    };
  },
  meta: {
    docs: {
      description: 'Enforce `React Hook Dependencies`',
      recommended: true,
      url: 'https://github.com/doinki/eslint-plugin-salt/blob/main/docs/rules/react-hook-dependencies.md',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          callbacksLast: {
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
};

export default reactHookDependencies;
