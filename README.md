# 创建项目框架

pnpm create vite

## eslint语法检测配置

代码质量校验工具，配置

### 安装依赖

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

## prettier格式检测配置

代码风格校验工具，配置

### 依赖配置

pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier

### eslint配置prettier

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

## stylelint检测配置

css 校验工具

### 安装依赖

pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D

### .stylelintrc.cjs配置文件

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

## 配置husky

git 仓库提交之前执行命令，如代码格式化等

### 配置与安装

pnpm install -D husky
执行
npx husky-init

###　pre-commit

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm run format

```

## 配置commitlint

git commit提交规范

### 安装包

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

## 强制使用pnmp包管理工具

团队开发项目的时候,需要统一包管理工具,因为不同包管理工具下载同一个依赖包,版本可能不一样,导致项目出现bug等问题,因此统一包管理工具.

### 配置

在根目录下创建`scripts/preinstall.js`文件，添加一下内容

```
if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository must using pnpm as the package manager ` +
      ` for scripts to work properly.\u001b[39m\n`,
  )
  process.exit(1)
}
```

配置命令

```
"scripts":{
	"preinstall": "node ./scripts/preinstall.js",
}
```

当我们使用npm或者yarn安装包的时候，就会报错。

## 安装element-plus

### 引入依赖

在main.ts中引入

```
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus' #引入依赖
import 'element-plus/dist/index.css'   #样式
import zhCn from 'element-plus/es/locale/lang/zh-cn' #中文

const app = createApp(App)

# 默认是英文，引入zhCn包之后，使用中文
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')

```

## SRC 别名配置

在开发项目的时候文件与文件关系可能很复杂，我们需要给src定义一个别名

```
//vite.config.ts

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve('./src'), //相对路径别名配置，使用@代替src
    },
  },
})

```

### TypeScript编译配置

```
//tsconfig.json

{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": "./", //解析非相对模块的基地址，默认是当前目录
    "paths": {
      //映射路径
      "@/*": ["src/*"]
    }
  }
}

```

## 环境变量配置

项目一般都是3个环境(**开发环境development,测试环境testing,生产环境production**)

在项目跟目录下分别添加开发、测试、生产的配置文件

```
.env.development
.env.testing
.env.production
```

文件内容

```
#.env.development
###
 # @Description: Stay hungry，Stay foolish
 # @Author: Huccct
 # @Date: 2023-05-17 17:26:26
 # @LastEditors: Huccct
 # @LastEditTime: 2023-05-23 15:39:53
###
# 变量必须以VITE_为前缀才能暴露给外部读取
NODE_ENV = 'development'
VITE_APP_TITLE = 'vue-admin'
VITE_APP_BASE_API = '/api'
VITE_SERVER = 'http://sph-api.atguigu.cn'
```

```
NODE_ENV = 'test'
VITE_APP_TITLE = 'vue-admin'
VITE_APP_BASE_API = '/test-api'
VITE_SERVER = 'http://sph-api.atguigu.cn'
```

```
###
 # @Description: Stay hungry，Stay foolish
 # @Author: Huccct
 # @Date: 2023-05-17 19:12:59
 # @LastEditors: Huccct
 # @LastEditTime: 2023-06-02 15:25:06
###
NODE_ENV = 'production'
VITE_APP_TITLE = 'vue-admin'
VITE_APP_BASE_API = 'http://sph-api.atguigu.cn'
VITE_SERVER = 'http://sph-api.atguigu.cn'
```

配置运行命令：package.json

```
 "scripts": {
 	"build:test": "vue-tsc && vite build --mode test",
    "build:pro": "vue-tsc && vite build --mode production"
    }
```

通过import.meta.env获取环境变量

## SVG图标配置

开发项目中经常会用到svg矢量图，我们使用svg以后，页面上加载的不再是图片资源，这对页面来说是个很大的提升，因为svg比img小很多，放在项目中不占资源

### 安装svg依赖插件

```
pnpm install vite-plugin-svg-icons -D
```

在vite.config.ts中配置插件

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
//引入svg
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'), //相对路径别名配置，使用@代替src
    },
  },
})

```

入口文件导入

```
import 'virtual:svg-icons-register'
```

### svg封装为全局组件

因为项目很多模块需要使用图标，因此把他封装为全局组件！！

在`src/components`目录创建一个Svgicon组件：

```
<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-17 19:59:04
 * @LastEditors: Huccct
 * @LastEditTime: 2023-05-17 20:09:32
-->
<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: String,
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
</script>
<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>
<style lang="scss" scoped></style>

```

#### 全局注册 `main.ts`

```
import { createApp } from "vue";
import App from "./App.vue";
// 路由 router 4.0
import router from "./router/router";
// 状态管理器  Pinia
import { createPinia } from "pinia";
const pinia = createPinia();
// UI库 ardo.design
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
// svg封装插件
import SvgIcon from "@/components/SvgIcon.vue";
import "virtual:svg-icons-register";
createApp(App)
  .use(router)
  .use(pinia)
  .component("svg-icon", SvgIcon)
  .use(ArcoVue, {
    componentPrefix: "arco",
  })
  .mount("#app");

```

#### 组件使用 `index.vue`

```
<template>
  <div>
    <el-button type="primary" size="default" @click="null" :icons="Plus">
      主要按钮
    </el-button>

    <el-button type="success" size="default" :icons="Edit" @click="null">
      修改
    </el-button>

    <el-pagination
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :total="1000"
    />


    <svg-icon name="phone" width="100px" height="100px" />

    <!-- 测试svg使用 -->
    <!-- svg外层是容器，类似div，内部需要与use结合使用 相当于li -->
    <!-- <svg>
      <use xlink:href="#icon-phone"></use>
    </svg> -->
  </div>
</template>

<script setup lang="ts">
import { Edit, Plus } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss"></style>

```

### 集成saas

```
<style scoped lang="scss"></style>
```

接下来我们为项目添加全局的样式

在src/styles目录下创建一个index.scss文件，当然项目中需要用到清除默认样式，隐藏在index.scss引入reset.scss

```
@import reset.scss
```

在入口文件main.ts引入

```
import '@/styles'
```

但是你会发现在src/style/index.scss全局样式文件中没有办法使用$变量，因此需要给项目引入全局变量$

在style/variable.scss创建一个variable.scss文件

在vite.config.ts文件配置如下：

```
export default defineConfig((config)=>{
//引入scss全局变量
   css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "@/styles/variable.scss";',
      },
    },
  },
})
```

## mock数据

```
pnpm install -D vite-plugin-mock mock.js
```

在vite.config.js配置文件启用插件

```
export derfault({command})={
return {
	plugins:[
	vue(),
	viteMockServe({
	localEnabled:command ==='serve'
	})
	]
}
}
```

在根目录创建mock文件夹，创建我们需要mock的数据与接口。

在mock文件夹中创建user.ts文件

```
/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-18 11:41:46
 * @LastEditors: Huccct
 * @LastEditTime: 2023-05-20 10:50:25
 */
function createUserList() {
  return [
    {
      userId: 1,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'admin',
      password: '123456',
      desc: '平台管理员',
      roles: ['平台管理员'],
      buttons: ['cuser.detail'],
      routes: ['home'],
      token: 'Admin Token',
    },
    {
      userId: 2,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'system',
      password: '123456',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System Token',
    },
  ]
}

export default [
  // 用户登录接口
  {
    url: '/api/user/login', //请求地址
    method: 'post', //请求方式
    response: ({ body }) => {
      //获取请求体携带过来的用户名与密码
      const { username, password } = body
      //调用获取用户信息函数,用于判断是否有此用户
      const checkUser = createUserList().find(
        (item) => item.username === username && item.password === password,
      )
      //没有用户返回失败信息
      if (!checkUser) {
        return { code: 201, data: { message: '账号或者密码不正确' } }
      }
      //如果有返回成功信息
      const { token } = checkUser
      return { code: 200, data: { token } }
    },
  },
  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: (request) => {
      //获取请求头携带token
      const token = request.headers.token
      //查看用户信息是否包含有次token用户
      const checkUser = createUserList().find((item) => item.token === token)
      //没有返回失败的信息
      if (!checkUser) {
        return { code: 201, data: { message: '获取用户信息失败' } }
      }
      //如果有返回成功信息
      return { code: 200, data: { checkUser } }
    },
  },
]

```

在main.ts中测试

```
import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
import globalComponent from './components'
import '@/styles/index.scss'
import axios from 'axios'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(globalComponent)

//测试代码：测试假的接口
axios({
  url: '/api/user/login',
  method: 'post',
  data: {
    username: 'admin',
    password: '123456',
  },
})

app.mount('#app')

```

## axios

### axios封装

src目录下创建utils/request.ts

```
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('satoken')
    if (token) {
      config.headers['satoken'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data

    // 请求成功
    if (res.code === 200) {
      return res.data
    }

    // token失效
    if (res.code === 401) {
      localStorage.removeItem('satoken')
      localStorage.removeItem('userInfo')
      router.push('/login')
      return Promise.reject(new Error('登录已过期，请重新登录'))
    }

    // 其他业务错误
    const error = new Error(res.message || '操作失败')
    error.code = res.code
    return Promise.reject(error)
  },
  error => {
    // 网络错误等
    const message = error.response?.data?.message || '网络错误'
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

export default service
```

## pinia仓库

Pinia 中的 **仓库（Store）** 是一个用于管理共享状态的对象。它类似于 Vuex 中的 `store`，但设计更灵活，使用体验更简洁。

一个 Pinia 仓库包括以下部分：

- **State**: 用于存储共享的状态数据。

- **Getters**: 类似于计算属性，用于派生状态。

- **Actions**: 类似于方法，用于处理业务逻辑，可以是同步或异步操作。

### 安装

```
pnpm i pinia
```

## NProgress

**NProgress** 是一个轻量级的 JavaScript 库，用于在页面加载或 AJAX 请求过程中显示进度条。它通常用在单页应用（SPA）或需要表现加载状态的场景中。

### 安装

```
npm install nprogress
```

### 示例

```
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 开始加载
NProgress.start();

// 模拟加载完成
setTimeout(() => {
  NProgress.done();
}, 2000);

```

## 后端接口文档地址

http://39.98.123.211:8510/swagger-ui.html

## 代理跨域

```
# vite.config.ts
proxy: {
        '/api/admin/acl': {
          // 更新代理规则以匹配新的路径
          target: 'http://sph-api.atguigu.cn', // 目标后端服务
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/api': {
          //获取数据的服务器地址设置
          target: 'http://39.98.123.211:8510',
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
```
