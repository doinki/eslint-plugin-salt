# eslint-plugin-salt

## Installation

```bash
# yarn
yarn add -D eslint-plugin-salt

# npm
npm install -D eslint-plugin-salt
```

## Configuration

```json
{
  "plugins": ["salt"],
  "rules": {
    "salt/react-hook-dependencies": "error"
  }
}
```

## List of supported rules

✔️: Enabled in the recommended configuration.\
🔧: Fixable with eslint --fix.

| ✔️  | 🔧  | Rule                                                                                                                    | Description                       |
| :-: | :-: | :---------------------------------------------------------------------------------------------------------------------- | :-------------------------------- |
|     | 🔧  | [react-hook-dependencies](https://github.com/doinki/eslint-plugin-salt/blob/main/docs/rules/react-hook-dependencies.md) | Enforce `React Hook Dependencies` |
