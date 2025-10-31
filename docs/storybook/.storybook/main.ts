import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/react-webpack5";

const currentDir = dirname(fileURLToPath(import.meta.url));

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-webpack5-compiler-swc",
    {
      name: "@storybook/addon-styling-webpack",
      options: {
        rules: [
          {
            test: /\.css$/,
            use: [
              require.resolve("style-loader"),
              {
                loader: require.resolve("css-loader"),
                options: { importLoaders: 1 }
              },
              {
                loader: require.resolve("postcss-loader"),
                options: { implementation: require("postcss") }
              }
            ],
          }
        ]
      }
    }
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  webpackFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@go17/components": resolve(currentDir, "../../../packages/components/src"),
      "@go17/hooks": resolve(currentDir, "../../../packages/hooks/src")
    };
    return config;
  }
};

export default config;
