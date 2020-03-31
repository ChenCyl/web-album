module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    // '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // off 或者 0：关闭规则
    // warn 或者 1：打开规则，并且作为一个警告（不影响 exit code）
    // error 或者 2：打开规则，并且作为一个错误（exit code 将会是1）
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: [1, 'never'], // 单引号
    'comma-dangle': [2, 'never'], // 逗号不使用悬挂
    'vue/attribute-hyphenation': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/html-closing-bracket-spacing': 2,
    'vue/mustache-interpolation-spacing': 0,
    // "vue/html-self-closing": ["error", {
    //   "html": {
    //     "void": "never",
    //     "normal": "never",
    //     "component": "always"
    //   },
    //   "svg": "never",
    //   "math": "never"
    // }],
    "vue/max-attributes-per-line": ['error', {
      "singleline": 3,
      "multiline": {
        "max": 1,
        "allowFirstLine": true
      }
    }],
    'vue/multiline-html-element-content-newline': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/require-default-prop': 0,
    "vue/order-in-components": ["error", {
      "order": [
        "el",
        "name",
        "parent",
        "functional",
        ["delimiters", "comments"],
        ["components", "directives", "filters"],
        "extends",
        "mixins",
        "inheritAttrs",
        "model",
        ["props", "propsData"],
        "data",
        "computed",
        "watch",
        "LIFECYCLE_HOOKS",
        "methods",
        ["template", "render"],
        "renderError"
      ]
    }],
    "vue/html-indent": 2, // 强制缩进
    "vue/script-indent": 2
  },
  // /* 全局变量 */
  // globals: {
  //   // 包含在这个集合中的属性都会被工具认为是全局变量
  //   // no-undef 规则就不会发出警告
  //   '$': true,
  //   '_': true,
  //   '__BUILD__': true,
  //   '__DEV__': true,
  //   '__TEST__': true,
  //   '__PRE__': true,
  //   '__ONLINE__': true,
  //   '_MEIQIA': true,
  //   'common': true,
  //   'Log': true,
  //   'config': true,
  //   laydate: true,
  //   wx: true,
  //   ZDao: true,
  //   CCJSAPI: true
  // }
};
