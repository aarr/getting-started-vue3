# task-management-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


***

# MEMO 

[Creating Project](<https://www.vuemastery.com/courses/real-world-vue-js/vue-cli/>)

## Vueプロジェクト作成方法

- npmにてvue-cliをinstallし、コマンド実行
- プロジェクト作成方法は２種類

~~~bash:vue-cli
npm install -g @vue/cli
~~~

1. cliにて作成

~~~bash:vue-cli
vue create project-name
# Server起動
cd project-name
npm run serve
~~~

2. vue-uiにて作成

- 画面UIでProject作成が可能

~~~bash:vue-cli
vue ui
~~~


***

## プロジェクト構成

~~~text:project-constitution
project-name
  |- node_module    : library. プロジェクトをビルドするために必要なmodule
  |- public         : webpackで実行したくないファイルを配置
      |- index.html : ベースのHTML。Vueオブジェクトをマウントさせる要素を持つ
  |- src            : アプリケーションソース
      |- assets     : imageやfontなど
      |- components : vueアプリソース（ビルド対象）
      |- views      : pagesではない画面
      |- App.vue    : Rootコンポーネント
      |- main.js    : Vue、App.vue、router、storeの読み込み、DOMにVueオブジェクトをマウントさせる
      |- router.js  : 画面遷移定義
      |- store.js   : Vuex
  |- dist           : build成果を物格納
~~~

***

## Build

- Build対象プロジェクトにてコマンド実行
- distフォルダが作成され、Build聖生物が格納される

~~~bash:Build
npm run Build
~~~

***

## サービス起動

- Build対象プロジェクトにてコマンド実行
- 起動時のログに起動URL、PORTが記述されるのでそこにアクセス

~~~bash:serve
npm run serve 
~~~

***

## フォーマッター、コード解析

- [Prettier](https://prettier.io/docs/en/options.html)：コードフォーマッター
  - 設定ファイル：.prettierrc.json
  - 除外定義：.prettierignore
- [ESLint](https://eslint.org/docs/latest/rules/)：コードの静的検証によるバグ検出。フォーマッターとしても利用できるが、そちらはPrettierに任せる
  - 設定ファイル
    1. .eslintrc.(js|cjs|yaml|yml|json), package.json
    2. package.jsonにeslintConfigフィールドを設けて定義
  - 除外定義：.eslintignore

***

## Vueライフサイクル

[![lifecycle](https://ja.vuejs.org/assets/lifecycle.16e4c08e.png)](https://ja.vuejs.org/guide/essentials/lifecycle.html#ライフサイクルダイアグラム)

***

## ライブラリ／プラグイン

- 利用方法

  1. グローバルに使用

    - main.jsにてimportし、ルートコンポーネントに設定(use)

      ~~~bash:install
      npm install libraryName
      ~~~

      ~~~vue:plugijn
      import App from "./App.vue"
      import name from "libraryName"
      createApp(App).use(name)
      ~~~

  2. 各テンプレートでのみ使用

    - テンプレートのscript定義の中でimportを実行

      ~~~bash:
      npm install libraryName
      ~~~

      ~~~vue:
      <template>
        ・・・
      </template>
      <script>
      import name from "libraryName"

      export default {
        ・・・
        methods: {
          func: function () {
            name.execute()
          }
        }
      }
      </script>
      ~~~

- Axios：通信
  - axios：本体
  - vue-axios：Vue用のWrapper。記述がしやすくなる

    ~~~bash:npm install
    npm install axios
    npm install vue-axios
    ~~~


## XXX