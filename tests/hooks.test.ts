import { RuleTester } from 'eslint';

import hooks from '../src/lib/rules/hooks';

(RuleTester as any).setDefaultConfig({
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
});

const ruleTester = new RuleTester();

ruleTester.run('hooks', hooks, {
  valid: [
    `
import { useCallback, useState } from 'react';

const Test = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const handleClick = useCallback(() => {
    setA(a + 1);
    setB(b + 1);
  }, [a, b]);

  return <div>Test</div>;
}

export default Test;
`,
    `
import { useEffect, useState } from 'react';

const Test = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  useEffect(() => {
    console.log(a, b);
  }, [a, b]);

  return <div>App</div>;
}

export default Test;
`,
    `
import { useLayoutEffect, useState } from 'react';

const Test = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  useLayoutEffect(() => {
    console.log(a, b);
  }, [a, b]);

  return <div>App</div>;
}

export default Test;
`,
    `
import { useMemo, useState } from 'react';

const Test = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const c = useMemo(() => a + b, [a, b]);

  return <div>Test</div>;
}

export default Test;
`,
    `
import { useState } from 'react';

import useCustomHook from './useCustomHook';

const Test = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  useCustomHook(() => {
    console.log(a, b);
  }, [b, a])

  return <div>Test</div>;
}

export default Test;
`,
  ],
  invalid: [
    {
      code: `
import { useCallback, useState } from 'react';

const Test = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const handleClick = useCallback(() => {
    setA(a + 1);
    setB(b + 1);
  }, [b, a]);

  return <div>Test</div>;
}

export default Test;
`,
      errors: [
        {
          message: "Hook's Dependency List should be sorted alphabetically",
          type: 'ArrayExpression',
        },
      ],
      output: `
import { useCallback, useState } from 'react';

const Test = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const handleClick = useCallback(() => {
    setA(a + 1);
    setB(b + 1);
  }, [a, b]);

  return <div>Test</div>;
}

export default Test;
`,
    },
    {
      code: `
import { useEffect, useState } from 'react';

const Test = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  useEffect(() => {
    console.log(a, b);
  }, [b, a])

  return <div>Test</div>;
}

export default Test;
`,
      errors: [
        {
          message: "Hook's Dependency List should be sorted alphabetically",
          type: 'ArrayExpression',
        },
      ],
      output: `
import { useEffect, useState } from 'react';

const Test = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  useEffect(() => {
    console.log(a, b);
  }, [a, b])

  return <div>Test</div>;
}

export default Test;
`,
    },
    {
      code: `
import { useLayoutEffect, useState } from 'react';

const Test = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  useLayoutEffect(() => {
    console.log(a, b);
  }, [b, a])

  return <div>Test</div>;
}

export default Test;
`,
      errors: [
        {
          message: "Hook's Dependency List should be sorted alphabetically",
          type: 'ArrayExpression',
        },
      ],
      output: `
import { useLayoutEffect, useState } from 'react';

const Test = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  useLayoutEffect(() => {
    console.log(a, b);
  }, [a, b])

  return <div>Test</div>;
}

export default Test;
`,
    },
    {
      code: `
import { useMemo, useState } from 'react';

const Test = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const c = useMemo(() => a + b, [b, a]);

  return <div>Test</div>;
}

export default Test;
`,
      errors: [
        {
          message: "Hook's Dependency List should be sorted alphabetically",
          type: 'ArrayExpression',
        },
      ],
      output: `
import { useMemo, useState } from 'react';

const Test = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const c = useMemo(() => a + b, [a, b]);

  return <div>Test</div>;
}

export default Test;
`,
    },
  ],
});
