import type { Rule } from 'eslint';

import getDependencyList from '../helpers/getDependencyList';
import getIdentifiers from '../helpers/getIdentifiers';
import getNames from '../helpers/getNames';
import isHook from '../helpers/isHook';
import isShallowEqual from '../helpers/isShallowEqual';
import sort from '../helpers/sort';
import type { SortOptions } from '../types';

const Hooks: Rule.RuleModule = {
  meta: {
    docs: {
      description: "Enforce `Hook's Dependency List`",
      recommended: true,
      url: 'https://github.com/doinki/eslint-plugin-salt/blob/main/docs/rules/hooks.md',
    },
    fixable: 'code',
    type: 'suggestion',
    schema: [
      {
        type: 'object',
        properties: {
          callbacksLast: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const options: SortOptions = context.options[0] || {
      callbacksLast: true,
    };

    return {
      CallExpression(node) {
        if (!isHook(node)) {
          return;
        }

        const dependencyList = getDependencyList(node.arguments);

        if (!dependencyList) {
          return;
        }

        const names = getNames(getIdentifiers(dependencyList.elements));
        const sortedNames = sort(names, options);

        if (isShallowEqual(names, sortedNames)) {
          return;
        }

        const range = dependencyList.range;

        if (!range) {
          return;
        }

        context.report({
          fix: (fixer) =>
            fixer.replaceTextRange(
              [range[0] + 1, range[1] - 1],
              sortedNames.join(', ').trim()
            ),
          message: "Hook's Dependency List should be sorted alphabetically",
          node: dependencyList,
        });
      },
    };
  },
};

export default Hooks;
