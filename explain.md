# Go17 UI 项目说明文档

## 📋 项目概述

Go17 UI 是一个基于 React + TypeScript + Tailwind CSS 的 Monorepo 组件库项目，采用现代化的前端工程架构，包含可复用的 UI 组件、React Hooks 以及配套的文档站点。

## 🏗️ 项目目录结构

```
go17ui/
├── packages/                      # 可发布的包
│   ├── components/               # React 组件库 (@go17/components)
│   │   ├── src/
│   │   │   ├── components/       # 组件源码
│   │   │   │   ├── __tests__/   # 组件单元测试
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Page.tsx
│   │   │   ├── i18n/            # 国际化
│   │   │   │   ├── locales/     # 语言包 (en, zh-CN)
│   │   │   │   └── translations.ts
│   │   │   ├── theme/           # 主题配置
│   │   │   │   ├── index.tsx
│   │   │   │   └── themes.ts
│   │   │   └── index.ts         # 包入口文件
│   │   ├── dist/                # 构建产物
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vitest.config.ts     # 测试配置
│   │   ├── tailwind.config.ts   # Tailwind 配置
│   │   └── eslint.config.js     # ESLint 配置
│   │
│   └── hooks/                    # React Hooks 库 (@go17/hooks)
│       ├── src/
│       │   ├── __tests__/       # Hook 单元测试
│       │   ├── useToggle.ts
│       │   ├── usePrefersColorMode.ts
│       │   └── index.ts
│       ├── dist/                # 构建产物
│       ├── package.json
│       ├── tsconfig.json
│       └── vitest.config.ts
│
├── docs/                         # 文档站点（不发布）
│   ├── storybook/               # Storybook 文档站
│   │   ├── stories/             # Story 文件
│   │   │   ├── assets/          # 静态资源
│   │   │   ├── hooks/           # Hooks 示例
│   │   │   ├── Button.stories.tsx
│   │   │   ├── Header.stories.tsx
│   │   │   ├── Page.stories.tsx
│   │   │   └── Configure.mdx
│   │   ├── package.json
│   │   ├── tailwind.config.cjs
│   │   └── postcss.config.cjs
│   │
│   ├── integration/             # 集成示例应用
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   └── index.css
│   │   ├── dist/                # 构建产物
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.ts
│   │   └── postcss.config.cjs
│   │
│   └── shared/                  # 文档站共享资源
│       ├── i18n/
│       └── themes.ts
│
├── package.json                 # 根 package.json
├── pnpm-workspace.yaml          # pnpm 工作区配置
├── lerna.json                   # Lerna 配置
├── tsconfig.base.json           # TypeScript 基础配置
├── tsconfig.json                # TypeScript 根配置
├── pnpm-lock.yaml               # 依赖锁文件
└── README.md                    # 项目说明
```

## 🛠️ 涉及的技术栈

### 核心技术

1. **React 19** - UI 框架
2. **TypeScript 5.6** - 类型系统
3. **Tailwind CSS 3.4** - 样式工具

### 构建工具

4. **Vite** - 现代化构建工具（用于集成示例）
5. **tsup 8.2** - TypeScript 库打包工具（基于 esbuild）
6. **PostCSS** - CSS 处理工具
7. **Autoprefixer** - CSS 浏览器前缀自动添加

### Monorepo 管理

8. **pnpm** - 包管理器（支持 workspace）
9. **Lerna 7.4** - Monorepo 版本管理和发布工具

### 测试工具

10. **Vitest 2.1** - 单元测试框架
11. **Testing Library** - React 组件测试
12. **jsdom** - DOM 环境模拟

### 代码质量

13. **ESLint 9** - 代码检查
14. **eslint-plugin-react** - React 代码规范
15. **eslint-plugin-tailwindcss** - Tailwind 类名检查
16. **Prettier** - 代码格式化

### 文档工具

17. **Storybook** - 组件文档和开发环境

### 工具库

18. **clsx** - 条件类名组合

### 特性支持

19. **国际化 (i18n)** - 多语言支持
20. **主题系统** - 可定制的主题配置
21. **暗色模式** - 明暗主题切换

## 🚀 如何创建这样一个项目

### 第一步：初始化 Monorepo

```bash
# 创建项目目录
mkdir go17ui && cd go17ui

# 初始化 pnpm workspace
pnpm init

# 创建 pnpm-workspace.yaml
cat > pnpm-workspace.yaml << EOF
packages:
  - "packages/*"
  - "docs/*"
EOF

# 安装 Lerna
pnpm add -Dw lerna
```

### 第二步：创建基础配置

```bash
# 创建 tsconfig.base.json
cat > tsconfig.base.json << EOF
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true
  }
}
EOF

# 创建 lerna.json
cat > lerna.json << EOF
{
  "\$schema": "https://json.schemastore.org/lerna",
  "version": "independent",
  "npmClient": "pnpm",
  "useWorkspaces": true,
  "packages": ["packages/*"],
  "command": {
    "version": {
      "allowBranch": "master",
      "conventionalCommits": true,
      "message": "chore(release): publish packages"
    }
  }
}
EOF
```

### 第三步：创建 packages

```bash
# 创建 components 包
mkdir -p packages/components/src/components
cd packages/components
pnpm init

# 安装依赖
pnpm add clsx
pnpm add -D react react-dom typescript tsup vitest @testing-library/react @testing-library/jest-dom tailwindcss postcss autoprefixer eslint

# 创建 hooks 包
mkdir -p packages/hooks/src
cd packages/hooks
pnpm init

# 安装依赖
pnpm add -D react typescript tsup vitest @testing-library/react eslint
```

### 第四步：创建文档站点

```bash
# 创建 Storybook
cd docs
npm create storybook@latest

# 创建 Vite 集成示例
pnpm create vite integration --template react-ts
cd integration
pnpm install
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 第五步：配置构建工具

在各个包的 `package.json` 中配置构建脚本：

```json
{
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts --sourcemap --clean",
    "test": "vitest",
    "lint": "eslint \"src/**/*.{ts,tsx}\""
  }
}
```

### 第六步：根目录统一脚本

```json
{
  "scripts": {
    "build": "pnpm --filter ./packages/* run build",
    "test": "pnpm --filter ./packages/* run test",
    "lint": "pnpm --filter ./packages/* run lint",
    "storybook": "pnpm --filter docs-storybook storybook",
    "integration": "pnpm --filter docs-integration dev"
  }
}
```

## 💻 如何开发

### 1. 安装依赖

```bash
# 安装所有依赖
pnpm install
```

### 2. 开发模式

#### 开发组件库

```bash
# 启动 Storybook 开发环境
pnpm storybook

# Storybook 会在 http://localhost:6006 启动
```

#### 开发集成示例

```bash
# 启动 Vite 开发服务器
pnpm integration

# 示例应用会在 http://localhost:5173 启动
```

#### 开发单个包

```bash
# 进入具体的包目录
cd packages/components

# 运行测试（监听模式）
pnpm test

# 代码检查
pnpm lint

# 构建
pnpm build
```

### 3. 编写组件

在 `packages/components/src/components/` 创建新组件：

```typescript
// MyComponent.tsx
import React from "react";
import { clsx } from "clsx";

interface MyComponentProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  variant = "primary",
  children,
}) => {
  return (
    <div
      className={clsx(
        "p-4 rounded-lg",
        variant === "primary" && "bg-blue-500",
        variant === "secondary" && "bg-gray-500"
      )}
    >
      {children}
    </div>
  );
};
```

### 4. 编写测试

```typescript
// __tests__/MyComponent.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "../MyComponent";

describe("MyComponent", () => {
  it("renders children", () => {
    render(<MyComponent>Hello</MyComponent>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

### 5. 编写 Storybook Story

```typescript
// docs/storybook/stories/MyComponent.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "@go17/components";

const meta: Meta<typeof MyComponent> = {
  title: "Components/MyComponent",
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Component",
  },
};
```

### 6. 运行测试

```bash
# 运行所有测试
pnpm test

# 运行特定包的测试
pnpm --filter @go17/components test

# 运行测试覆盖率
pnpm --filter @go17/components test -- --coverage
```

### 7. 代码检查

```bash
# 检查所有包
pnpm lint

# 检查特定包
pnpm --filter @go17/components lint
```

## 🔨 如何构建

### 构建所有包

```bash
# 构建所有可发布的包
pnpm build
```

这会执行：

- 清理之前的构建产物
- 使用 tsup 构建 ESM 和 CJS 格式
- 生成 TypeScript 类型定义文件 (.d.ts)
- 生成 source map

### 构建输出

每个包会在 `dist/` 目录生成：

```
dist/
├── index.js          # ESM 格式
├── index.js.map      # ESM source map
├── index.cjs         # CommonJS 格式
├── index.cjs.map     # CJS source map
├── index.d.ts        # TypeScript 类型定义
└── index.d.cts       # CJS 类型定义
```

### 构建文档站点

```bash
# 构建 Storybook 静态站点
pnpm --filter docs-storybook build

# 构建集成示例
pnpm --filter docs-integration build
```

### 单独构建某个包

```bash
# 只构建 components
pnpm --filter @go17/components build

# 只构建 hooks
pnpm --filter @go17/hooks build
```

## 📦 如何发布

### 方式一：使用 Lerna 统一发布

#### 1. 更新版本

```bash
# Lerna 会提示选择版本号
pnpm release

# 或者指定版本类型
pnpm lerna version patch   # 0.0.1 -> 0.0.2
pnpm lerna version minor   # 0.0.1 -> 0.1.0
pnpm lerna version major   # 0.0.1 -> 1.0.0
```

Lerna 会：

- 自动检测有变更的包
- 提示输入新版本号（支持独立版本）
- 更新 package.json
- 创建 git tag
- 提交变更

#### 2. 发布到 npm

```bash
# 发布到公共 npm registry
pnpm lerna publish from-package

# 发布到私有 registry
pnpm lerna publish from-package --registry https://your-private-registry.com
```

### 方式二：手动发布单个包

```bash
# 进入要发布的包
cd packages/components

# 构建
pnpm build

# 发布到 npm（需要登录）
npm login
npm publish

# 发布到私有 registry
npm publish --registry https://your-private-registry.com
```

### 发布前检查清单

- [ ] 所有测试通过：`pnpm test`
- [ ] 代码检查通过：`pnpm lint`
- [ ] 构建成功：`pnpm build`
- [ ] 版本号已更新
- [ ] CHANGELOG 已更新（如果使用）
- [ ] README 文档已更新
- [ ] Git 工作区干净

### 发布配置说明

包的 `package.json` 中的关键配置：

```json
{
  "name": "@go17/components",
  "version": "0.0.1",
  "private": false, // 设置为 false 才能发布
  "type": "module",
  "main": "dist/index.cjs", // CommonJS 入口
  "module": "dist/index.js", // ESM 入口
  "types": "dist/index.d.ts", // TypeScript 类型定义
  "exports": {
    // 现代化导出配置
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "files": ["dist"], // 发布时包含的文件
  "publishConfig": {
    "access": "restricted" // restricted=私有, public=公开
  }
}
```

## 🚀 如何部署

### 部署文档站点

#### Storybook 部署

```bash
# 1. 构建 Storybook
pnpm --filter docs-storybook build

# 2. 输出在 docs/storybook/storybook-static/
# 可以部署到任何静态托管服务
```

**部署选项：**

- **Vercel**

  ```bash
  cd docs/storybook
  vercel --prod
  ```

- **Netlify**

  ```bash
  cd docs/storybook
  netlify deploy --prod --dir=storybook-static
  ```

- **GitHub Pages**

  ```bash
  # 在 .github/workflows/deploy.yml 中配置
  - name: Build Storybook
    run: pnpm --filter docs-storybook build
  - name: Deploy
    uses: peaceiris/actions-gh-pages@v3
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      publish_dir: ./docs/storybook/storybook-static
  ```

- **Nginx / Apache**
  ```bash
  # 直接复制 storybook-static 到服务器
  scp -r docs/storybook/storybook-static/* user@server:/var/www/html/
  ```

#### 集成示例部署

```bash
# 1. 构建
pnpm --filter docs-integration build

# 2. 输出在 docs/integration/dist/
```

部署方式同上（Vercel、Netlify、GitHub Pages 等）。

### CI/CD 配置示例

#### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test

      - name: Build
        run: pnpm build

  deploy-docs:
    needs: test
    if: github.ref == 'refs/heads/master'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Build Storybook
        run: pnpm --filter docs-storybook build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./docs/storybook/storybook-static
```

### Docker 部署

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制依赖文件
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages ./packages
COPY docs ./docs

# 安装依赖
RUN pnpm install --frozen-lockfile

# 构建
RUN pnpm build
RUN pnpm --filter docs-storybook build

# 生产环境
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/docs/storybook/storybook-static /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

```bash
# 构建镜像
docker build -t go17ui-docs .

# 运行容器
docker run -d -p 80:80 go17ui-docs
```

### 环境变量配置

如果需要不同环境的配置：

```bash
# .env.development
VITE_API_URL=http://localhost:3000

# .env.production
VITE_API_URL=https://api.production.com
```

## 🔧 常见问题

### 1. Tailwind 样式不生效

确保在消费项目中配置了 Tailwind：

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@go17/components/dist/**/*.js",
  ],
  // ...
};
```

### 2. 类型定义找不到

确保在 `tsconfig.json` 中包含了类型：

```json
{
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  }
}
```

### 3. pnpm workspace 链接问题

```bash
# 重新安装所有依赖
pnpm install --force

# 清理并重新构建
pnpm clean
pnpm install
pnpm build
```

### 4. 发布权限问题

```bash
# 登录 npm
npm login

# 检查登录状态
npm whoami

# 发布到私有 scope
npm publish --access restricted
```

## 📚 参考资源

- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Vite 文档](https://vitejs.dev/)
- [pnpm Workspace](https://pnpm.io/workspaces)
- [Lerna 文档](https://lerna.js.org/)
- [Vitest 文档](https://vitest.dev/)
- [Storybook 文档](https://storybook.js.org/)
- [Testing Library](https://testing-library.com/)

## 📄 许可证

根据项目需要添加相应的许可证信息。

---

**维护者**: Go17 Team  
**最后更新**: 2025-11-12
