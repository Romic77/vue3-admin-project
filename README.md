# 创建项目框架

pnpm create vite

# eslint语法检测配置

代码质量校验工具，配置

## 安装依赖

pnpm install -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser

## eslint.config.js配置

```
// 导入 ESLint 相关插件和解析器

import pluginJs from "@eslint/js"; // ESLint JavaScript 规则插件
import tseslint from "@typescript-eslint/eslint-plugin"; // TypeScript ESLint 插件
import tsParser from "@typescript-eslint/parser"; // TypeScript 解析器
import pluginVue from "eslint-plugin-vue"; // Vue.js ESLint 插件
import vueEslintParser from "vue-eslint-parser"; // Vue 解析器
import globals from "globals";



// 导出 ESLint 配置数组

export default [
  {

    // 适用于的文件类型

    files: ["**/*.{js,mjs,cjs,ts,vue}"],

    // 忽略的文件和文件夹

    ignores: ["node_modules", "dist", "*.config.js"],

    languageOptions: {

      globals: globals.browser, // 使用浏览器全局变量

      ecmaVersion: "latest", // 使用最新的 ECMAScript 版本

      sourceType: "module", // 使用模块类型

      parser: tsParser, // 使用 TypeScript 解析器

    },

    // 配置使用的插件

    plugins: {

      vue: pluginVue, // 引入 Vue 插件

      "prettier":prettier, // 使用 Prettier 插件

      "@typescript-eslint": tseslint, // 引入 TypeScript ESLint 插件


    },

    // 定义 ESLint 规则

    rules: {

      ...pluginJs.configs.recommended.rules, // JavaScript 推荐规则

      ...tseslint.configs.recommended.rules, // TypeScript 推荐规则

      ...pluginVue.configs["flat/essential"].rules, // Vue 推荐规则



      // JavaScript 规则

      "no-var": "error", // 禁止使用 var

      "no-multiple-empty-lines": ["warn", { max: 1 }], // 允许最多一行空行

      "no-console": process.env.NODE_ENV === "production" ? "error" : "off", // 在生产环境中禁止使用 console

      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off", // 在生产环境中禁止使用 debugger

      "no-unexpected-multiline": "error", // 禁止意外的多行

      "no-useless-escape": "off", // 关闭不必要的转义



      // TypeScript 规则

      "@typescript-eslint/no-unused-vars": "error", // 禁止未使用的变量

      "@typescript-eslint/prefer-ts-expect-error": "error", // 优先使用 ts-expect-error

      "@typescript-eslint/no-explicit-any": "off", // 允许使用 any 类型

      "@typescript-eslint/no-non-null-assertion": "off", // 允许使用非空断言

      "@typescript-eslint/no-namespace": "off", // 允许使用命名空间

      "@typescript-eslint/semi": "off", // 关闭分号规则



      // Vue 规则

      "vue/multi-word-component-names": "off", // 关闭组件名称必须是多词的规则

      "vue/script-setup-uses-vars": "error", // 检查 script setup 中的变量

      "vue/no-mutating-props": "off", // 允许在 props 中进行变更

      "vue/attribute-hyphenation": "off", // 允许不使用连字符的属性命名

    },

  },

  {

    // 适用于 Vue 文件

    files: ["**/*.vue"],

    languageOptions: {

      parser: vueEslintParser, // 使用 Vue 解析器

      parserOptions: {

        parser: tsParser, // 使用 TypeScript 解析器

        ecmaVersion: "latest", // 使用最新的 ECMAScript 版本

        sourceType: "module", // 使用模块类型

      },

    },

  },

];
```

# prettier格式检测配置

代码风格校验工具，配置

依赖配置
pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier

## eslint配置prettier

```
import pluginJs from "@eslint/js"; // ESLint JavaScript 规则插件
import tseslint from "@typescript-eslint/eslint-plugin"; // TypeScript ESLint 插件
import tsParser from "@typescript-eslint/parser"; // TypeScript 解析器
import pluginVue from "eslint-plugin-vue"; // Vue.js ESLint 插件
import vueEslintParser from "vue-eslint-parser"; // Vue 解析器
import globals from "globals";
import prettier from "eslint-plugin-prettier"; // 引入 Prettier 插件

export default [
  {
    // 适用于的文件类型
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    // 忽略的文件和文件夹
    ignores: ["node_modules", "dist", "*.config.js"],
    languageOptions: {
      globals: globals.browser, // 使用浏览器全局变量
      ecmaVersion: "latest", // 使用最新的 ECMAScript 版本
      sourceType: "module", // 使用模块类型
      parser: tsParser, // 使用 TypeScript 解析器
    },
    // 配置使用的插件
    plugins: {
      vue: pluginVue, // 引入 Vue 插件
      "@typescript-eslint": tseslint, // 引入 TypeScript ESLint 插件
      prettier, // 使用 Prettier 插件
    },
    // 定义 ESLint 规则
    rules: {
      ...pluginJs.configs.recommended.rules, // JavaScript 推荐规则
      ...tseslint.configs.recommended.rules, // TypeScript 推荐规则
      ...pluginVue.configs["flat/essential"].rules, // Vue 推荐规则

      // JavaScript 规则
      "no-var": "error", // 禁止使用 var
      "no-multiple-empty-lines": ["warn", { max: 1 }], // 允许最多一行空行
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off", // 在生产环境中禁止使用 console
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off", // 在生产环境中禁止使用 debugger
      "no-unexpected-multiline": "error", // 禁止意外的多行
      "no-useless-escape": "off", // 关闭不必要的转义

      // TypeScript 规则
      "@typescript-eslint/no-unused-vars": "error", // 禁止未使用的变量
      "@typescript-eslint/prefer-ts-expect-error": "error", // 优先使用 ts-expect-error
      "@typescript-eslint/no-explicit-any": "off", // 允许使用 any 类型
      "@typescript-eslint/no-non-null-assertion": "off", // 允许使用非空断言
      "@typescript-eslint/no-namespace": "off", // 允许使用命名空间
      "@typescript-eslint/semi": "off", // 关闭分号规则

      // Vue 规则
      "vue/multi-word-component-names": "off", // 关闭组件名称必须是多词的规则
      "vue/script-setup-uses-vars": "error", // 检查 script setup 中的变量
      "vue/no-mutating-props": "off", // 允许在 props 中进行变更
      "vue/attribute-hyphenation": "off", // 允许不使用连字符的属性命名

      // Prettier 规则
      "prettier/prettier": "error", // 让 Prettier 作为 ESLint 错误显示
    },
  },

  {
    // 适用于 Vue 文件
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueEslintParser, // 使用 Vue 解析器
      parserOptions: {
        parser: tsParser, // 使用 TypeScript 解析器
        ecmaVersion: "latest", // 使用最新的 ECMAScript 版本
        sourceType: "module", // 使用模块类型
      },
    },
  },
];

```

# stylelint检测配置

css 校验工具

安装依赖
pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D

## .stylelintrc.cjs配置文件

```
// @see https://stylelint.bootcss.com/

module.exports = {
    extends: [
      'stylelint-config-standard', // 配置stylelint拓展插件
      'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
      'stylelint-config-standard-scss', // 配置stylelint scss插件
      'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
      'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
      'stylelint-config-prettier', // 配置stylelint和prettier兼容
    ],
    overrides: [
      {
        files: ['**/*.(scss|css|vue|html)'],
        customSyntax: 'postcss-scss',
      },
      {
        files: ['**/*.(html|vue)'],
        customSyntax: 'postcss-html',
      },
    ],
    ignoreFiles: [
      '**/*.js',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.ts',
      '**/*.json',
      '**/*.md',
      '**/*.yaml',
    ],
    /**
     * null  => 关闭该规则
     * always => 必须
     */
    rules: {
      'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
      'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
      'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
      'no-empty-source': null, // 关闭禁止空源码
      'selector-class-pattern': null, // 关闭强制选择器类名的格式
      'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
      'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
      'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
      'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
      'selector-pseudo-class-no-unknown': [
        // 不允许未知的选择器
        true,
        {
          ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
        },
      ],
    },
  }

```

# 配置husky

git 仓库提交之前执行命令，如代码格式化等

## 配置与安装
pnpm install -D husky
执行
npx husky-init

###　pre-commit
```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm run format

```

# 配置commitlint
git commit提交规范

## 安装包
`pnpm add @commitlint/config-conventional @commitlint/cli -D`

添加配置文件,新建commitlint.config.cjs
```
module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
  },
}

```

package.json中配置scripts命令
```
"scripts": {
    "commitlint": "commitlint --config commitlint.config.cjs -e -V"
  }
```
配置结束,填写commit信息,需要添加subject
```
build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
docs：文档更新
feat：新增功能
fix：bug 修复
perf：性能优化
refactor：重构代码(既没有新增功能，也没有修复 bug)
style：不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)
test：新增测试用例或是更新现有测试
revert：回滚某个更早之前的提交
chore：不属于以上类型的其他类型(日常事务)
```

配置husky

```
npx husky add .husky/commit-msg
```

commit-msg中添加命令

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm commitlint
```



以后commit提交信息需要添加类型

```
git commit -m 'feat: 增加 xxx 功能'
git commit -m 'bug: 修复 xxx 功能'
```



