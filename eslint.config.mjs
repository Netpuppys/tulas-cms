import tseslint from 'typescript-eslint'

// Switched away from `next/core-web-vitals` via FlatCompat: that combo
// crashes under this project's installed eslint-plugin-react-hooks version
// with "TypeError: Converting circular structure to JSON" (reproduced both
// locally and on Vercel's Lint check). This is a Payload backend, not a
// Next.js app in the usual sense, so the Next-specific web-vitals/image
// rules weren't buying much anyway — a plain typescript-eslint config
// covers what actually matters here (unused vars, ts-comment hygiene, etc.)
// without the crash.
export default tseslint.config(
  {
    ignores: ['.next/', 'node_modules/', 'src/payload-types.ts', 'src/payload-generated-schema.ts'],
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
)
