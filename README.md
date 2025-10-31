# Go17 UI Monorepo

This workspace hosts the Go17 UI component system, reusable hooks, and the accompanying documentation sites. It is managed with pnpm workspaces and organised into `packages` and `docs`.

## Workspace structure

```
.
├── packages
│   ├── components   # Tailwind-powered React component library (@go17/components)
│   └── hooks        # Reusable React hooks (@go17/hooks)
└── docs
    ├── storybook    # Storybook instance that consumes the published packages
    └── integration  # Vite + Tailwind demo app showcasing combined usage
```

## Common scripts

Run the following from the workspace root:

- `pnpm install` – install workspace dependencies (requires access to your registry).
- `pnpm build` – build all publishable packages (`components`, `hooks`).
- `pnpm test` – run unit tests for all packages with Vitest.
- `pnpm lint` – lint package source code with ESLint.
- `pnpm storybook` – start the docs Storybook (`docs/storybook`).
- `pnpm integration` – run the integration demo (`docs/integration`).

You can scope commands to a single package with filters, e.g. `pnpm --filter @go17/components test`.

## Publishing

Both `@go17/components` and `@go17/hooks` are configured for publication to a private registry via `publishConfig.access = "restricted"`. When you are ready to publish a new version, run:

```bash
pnpm --filter @go17/components publish --tag latest --registry <your-private-registry>
pnpm --filter @go17/hooks publish --tag latest --registry <your-private-registry>
```

The documentation apps (`docs/storybook`, `docs/integration`) are marked `"private": true` and are **not** published. Deploy them by building within their package (`pnpm --filter docs-storybook build`, `pnpm --filter docs-integration build`) and pushing the resulting static assets to your server of choice.

## Tailwind usage

- Components ship Tailwind utility classes directly. Consumers should include Tailwind in their build pipeline and point their `content` globs at `node_modules/@go17/components/dist` (or your source package if linking).
- Storybook and the integration demo each have their own Tailwind configuration that also scans `packages/components/src` to expose all utilities during development.

## Testing

Both packages use Vitest with Testing Library:

- Component tests live in `packages/components/src/components/__tests__`.
- Hook tests live in `packages/hooks/src/__tests__`.

`vitest.setup.ts` registers `@testing-library/jest-dom` assertions for consistent expectations across packages.

## Next steps

- Configure CI to run `pnpm install`, `pnpm lint`, `pnpm test`, and `pnpm build`.
- Point Storybook and the integration demo at your deployment targets.
- Add additional components/hooks following the established structure.
