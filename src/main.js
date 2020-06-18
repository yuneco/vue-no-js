import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const requireComponent = require.context(
  // コンポーネントフォルダの相対パス
  './',
  // サブフォルダ内を調べるかどうか
  true,
  // 基底コンポーネントのファイル名に一致させるのに使う正規表現
  /.*\.vue$/
)

console.log(requireComponent.keys())

requireComponent.keys().forEach(fileName => {
  // コンポーネント設定を取得する
  const componentConfig = requireComponent(fileName)

  // コンポーネント名をパスカルケース (PascalCase) で取得する
  const componentName =
      // フォルダの深さに関わらずファイル名を取得する
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')

  // コンポーネントをグローバル登録する
  Vue.component(
    componentName,
    // `export default` を使ってコンポーネントがエクスポートされた場合に存在する
    // `.default` でコンポーネントオプションを期待していて
    // 存在しない場合にはモジュールのルートにフォールバックします。
    componentConfig.default || componentConfig
  )

  console.log(componentName, componentConfig.default)
})

new Vue({
  render: h => h(App)
}).$mount('#app')
