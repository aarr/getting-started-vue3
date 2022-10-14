<template>
  <hr />
  <!-- ==================================== -->
  <h2>Directive Sample</h2>
  <!-- ------------------------------------ -->
  <h3>v-once</h3>
  <pre>一度のみ評価する。</pre>
  <div>
    <button v-on:click="editvOnceMessage">Edit Message</button><br />
    <span>v-onceなし : {{ vOnceMessage }}</span>
    <br />
    <span v-once>v-onceあり : {{ vOnceMessage }}</span>
  </div>
  <!-- ------------------------------------ -->
  <h3>v-html</h3>
  <pre>HTMLタグとして評価する。XSS等に気を付ける必要があり</pre>
  <p>{{ vHtmlMessage }}</p>
  <p v-html="vHtmlMessage"></p>
  <!-- ------------------------------------ -->
  <h3>v-cloak</h3>
  <pre>
    Vueの評価が完了するまで非表示にする。HTML属性にv-cloakが付与されるので、CSSで非表示設定が可能となる
  </pre>
  <p>non directive : {{ vCloakMessage }}</p>
  <p v-cloak>v-cloak directive : {{ vCloakMessage }}</p>
  <!-- ------------------------------------ -->
  <h3>v-text</h3>
  <pre>
    マスタッシュ構文とほぼ同様。
    ただしv-textはテキスト内容を指定された内容で置き換える為、固定文字列と動的文字列（v-textの内容）を結合して出すなどができない。マスタッシュ構文であれば可能。
  </pre>
  <p>マスタッシュ構文：{{ vTextMessage }}</p>
  <!-- Errorになる為削除
  <p v-text="vTextMessage">v-text構文：</p>
  -->
  <!-- ------------------------------------ -->
  <h3>Javascript</h3>
  <pre>
    マスタッシュ構文の中で、Scriptを記載可能。ただし、単一式のみ評価可能
  </pre>
  <p>文字列：{{ scriptSampleMessage.split(" ").reverse().join(" ") }}</p>
  <p>数値：{{ scriptSampleNum * 100 + 1 }}</p>
  <p>真偽値：{{ scriptSampleBool ? "YES" : "NO" }}</p>
  <!-- ------------------------------------ -->
  <h3>v-bind</h3>
  <pre>省略して記載が可能。v-bind:href="url" -> :href="url"</pre>
  <a v-bind:href="vBindUrl">Google 正式記法</a><br />
  <a :href="vBindUrl">Google 省略記法</a>
  <hr />
  <!-- ==================================== -->
  <h2>Computed Sample</h2>
  <!-- ------------------------------------ -->
  <h3>Computed Sample</h3>
  <pre>
    算出プロパティを利用する事で、Viewをシンプルにし、ロジックの再利用が可能になる。
    methods、computedいずれも同じことが実現できるが、
    methodsの場合、毎回計算する。computedの場合、計算で利用するプロパティ値が変わらない限り際計算しない（キャッシュする）、という違いがある。
  </pre>
  <p>script利用：{{ computedMessage.split(" ").reverse().join(" ") }}</p>
  <p>computed利用：{{ reverseMessage }}</p>
  <p>methods利用：{{ reverseMessageMethod() }}</p>
  <!-- ------------------------------------ -->
  <h3>Computed Getter/Setter Sample</h3>
  <pre>
    computed属性はgetter/setterを儲けることが可能。値の書き込み、読み込みの際にgetrer/setterが利用される。
  </pre>
  <p>base price: <input type="text" v-model="basePrice" /></p>
  <p>tax included price: <input type="text" v-model="taxIncludedPrice" /></p>
  <!-- ------------------------------------ -->
  <h3>Computed Cache Sample</h3>
  <pre>
    computedは１度計算したら値をキャッシュ。キャッシュ更新のトリガーはリアクティブデータの更新。methodsは毎回計算。
  </pre>
  <p>basenum: <input type="text" v-model="baseRandomNum" /></p>
  <ul>
    <li v-for="(value, index) in Array(3)" v-bind:key="value">
      computed value{{ index }}: {{ randomNum }}
    </li>
  </ul>
  <ul>
    <li v-for="(value, index) in Array(3)" v-bind:key="value">
      methods value{{ index }}: {{ randomNumMethod() }}
    </li>
  </ul>
  <hr />
  <!-- ==================================== -->
  <h2>Watcher Sample</h2>
  <!-- ------------------------------------ -->
  <h3>Watcher Sample</h3>
  <pre>値変更時にイベントをフック可能</pre>
  <p>target: <input type="text" v-model="watchMessage" /></p>
  <ul id="watchLog"></ul>
  <!-- ------------------------------------ -->
  <h3>Unit Exchange</h3>
  <pre>
    項目変更時に別項目の変更を行う。watchでもcomputedでも同様の実装が可能。computedの方がシンプルなので推奨
  </pre>
  <p><input type="text" v-model="km" />km</p>
  <p><input type="text" v-model="m" />m</p>
  <!-- ------------------------------------ -->
  <h3>Deep Watch</h3>
  <pre>
    watch指定時にdeepオプションをtrueにしないと階層を持つ値の変更は検知できない。
    また、階層を持つ値の場合、handlerにて変更前の値が変更後と同じ値として返される。
  </pre>
  NON DEEP WATCH : {{ watchStatusOfNonDeepWatch }}
  <ul>
    <li v-for="(elem, index) in nonDeepWatches" v-bind:key="elem">
      <button v-on:click="incrementNonDeepWatchElem(index)">
        {{ elem.value }}
      </button>
    </li>
  </ul>
  DEEP WATCH : {{ watchStatusOfDeepWatch }}
  <ul>
    <li v-for="(elem, index) in deepWatches" v-bind:key="elem">
      <button v-on:click="incrementDeepWatchElem(index)">
        {{ elem.value }}
      </button>
    </li>
  </ul>
  <hr />
  <!-- ==================================== -->
  <h2>Realtime Search (Watch)</h2>
  <p>
    Qiita Search :
    <input type="text" v-model="queryKeyword" />
    {{ apiMessage }}{{ apiErrorMessage }}
  </p>
  <ul>
    <li v-for="item in items" v-bind:key="item">
      <a v-bind:href="item.url" target="_blank">
        {{ item.title }} like:{{ item.likes_count }}
      </a>
    </li>
  </ul>
  <hr />
  <!-- ==================================== -->
  <h2>Class Databinding</h2>
  <h3>Class Databinding</h3>
  <pre>
    class属性を動的に設定する。class名にハイフンを含む場合、シングルクオークで囲む必要あり。class属性を直接指定している内容とも共存可能
    v-bind:classのv-bindを省力する記法も存在する。
  </pre>
  <div>
    font:
    <button v-on:click="changeFontSize">{{ fontSizeLable }}</button>
    <button v-on:click="changeFontColor">{{ fontColorLabel }}</button>
  </div>
  <p>
    v-bind：
    <span
      class="bg-gray"
      v-bind:class="{
        'large-font': isEnabledLargeFont,
        colorFont: isEnabledColorFont,
      }"
    >
      Class Databinding
    </span>
  </p>
  <p>
    v-bind省略：
    <span
      class="bg-gray"
      :class="{
        'large-font': isEnabledLargeFont,
        colorFont: isEnabledColorFont,
      }"
    >
      Class Databinding
    </span>
  </p>
  <!-- ------------------------------------ -->
  <h3>Class Databinding (Array/Object)</h3>
  <pre>class属性を配列/オブジェクトで動的に設定することが可能</pre>
  <p>
    v-bind（各要素）：
    <span v-bind:class="[largeFontClass, colorFontClass, bgColorClass]">
      Class Databinding (array)
    </span>
  </p>
  <p>
    v-bind（配列自体）：
    <span v-bind:class="classArray">Class Databinding (array)</span>
  </p>
  <p>
    v-bind（オブジェクト）：
    <span v-bind:class="classObject">Class Databinding (array)</span>
  </p>
  <hr />
  <!-- ==================================== -->
  <h2 id="renderingWithCondition">Rendering with Condition</h2>
  <h3>if/else/if-else / show</h3>
  <pre>
    if/else/if-elseは連続した要素にて使用する必要がある。連続していない場合、後半の条件は無効になり条件関係なく表示される
    if/elseはDOMの挿入有無、showはstyle(display:none)の設定有無を制御する
  </pre>
  <p>
    選択肢:
    <select v-model="selectedCondition">
      <option
        v-for="condition in conditions"
        v-bind:value="condition.value"
        v-bind:key="condition.key"
      >
        {{ condition.name }}
      </option>
    </select>
  </p>
  <p>
    選択結果表示(show):
    <input type="checkbox" v-model="isEnabledShow" />
  </p>
  <span v-show="isEnabledShow">選択(if/else)：</span>
  <span v-show="isEnabledShow" v-if="selectedCondition === 1">FIRST</span>
  <span v-show="isEnabledShow" v-else-if="selectedCondition === 2">
    SECOUND
  </span>
  <span v-show="isEnabledShow" v-else-if="selectedCondition === 3">THIRD</span>
  <span v-show="isEnabledShow" v-else>NOTHING</span>
  <hr />
  <!-- ==================================== -->
  <h2>Event Handler</h2>
  <h3>Inline/Method</h3>
  <pre>
    v-on定義の中で直接JavaScript式の記述が可能。通常はmethodsにmethod定義して指定
  </pre>
  <p>
    カウンタ :
    <span>{{ inlineMethodCounter }}</span>
    <button v-on:click="inlineMethodCounter++">COUNT UP (INLINE)</button>
    <button v-on:click="couterMethod">COUNT DOWN (METHOD)</button>
  </p>
  <!-- ------------------------------------ -->
  <h3>Event Object / argument</h3>
  <pre>
    イベントハンドラへ引数の指定が可能。Eventオブジェクトも利用する場合、$eventを引数で指定する。
    v-on:の指定は省略記法として@を利用することが可能。
    Event修飾子を使用することも可能（stop,prevent, capture, self, once, passiveなど）
  </pre>
  <p>
    <button v-on:click="methodArg($event, new Date().toJSON())">
      引数 : CLICK時刻
    </button>
    <button @click="methodArg($event, new Date().toJSON())">
      引数 : CLICK時刻（省略記法）
    </button>
    <button v-on:click.once="methodArg($event, new Date().toJSON())">
      引数 : CLICK時刻（ONCE）
    </button>
    <br />
    <span>{{ methodArgMessage }}</span>
  </p>
  <hr />
  <!-- ==================================== -->
  <h2>Form Input Binding</h2>
  <!-- ------------------------------------ -->
  <h3>Basic</h3>
  <pre><a href="https://codepen.io/aarr-the-typescripter/pen/bGMpQyw" target="_blank">その他サンプル</a></pre>
  <p>data(bindSampleMessage) : {{ bindSampleMessage }}</p>
  <!-- ------------------------------------ -->
  <!-- Errorになる為除外
  <li>
    v-modelを利用する場合、value属性は利用できない。（指定してもv-modelにて上書かれる）
  </li>
  <input type="text" v-model="bindSampleMessage" value="SAMPLE" />
  -->
  <!-- ------------------------------------ -->
  <li>
    textareaではマスタッシュ構文は利用できない（変更を検知できない）。v-modelを利用することで正しく動作させることが可能
  </li>
  <!-- Errorになる為除外。
  <p>
    <label>マスタッシュ構文 :</label>
    <textarea>{{ bindSampleMessage }}</textarea>
  </p>
  -->
  <p>
    <label>v-model :</label>
    <textarea v-model="bindSampleMessage"></textarea>
  </p>
  <!-- ------------------------------------ -->
  <li>複数チェックボックスの扱い</li>
  <p>
    data(bindSampleArray) :
    {{ bindSampleArray }}
  </p>
  <p>
    <label>Red(value=0)</label>
    <input type="checkbox" value="0" v-model="bindSampleArray" /><br />
    <label>Green(value=1)</label>
    <input type="checkbox" value="1" v-model="bindSampleArray" /><br />
    <label>Blue(value=2)</label>
    <input type="checkbox" value="2" v-model="bindSampleArray" />
  </p>
  <!-- ------------------------------------ -->
  <li>ラジオボックスの扱い</li>
  <p>
    data(bindSampleArray) :
    {{ bindSampleRadio }}
  </p>
  <p>
    <label>Red(value=0)</label>
    <input type="radio" value="0" v-model="bindSampleRadio" /><br />
    <label>Green(value=1)</label>
    <input type="radio" value="1" v-model="bindSampleRadio" /><br />
    <label>Blue(value=2)</label>
    <input type="radio" value="2" v-model="bindSampleRadio" />
  </p>
  <!-- ------------------------------------ -->
  <li>セレクトボックスの扱い</li>
  <p>
    <a href="#renderingWithCondition">
      ページ上部でサンプルあり (Rendering With Condition)
    </a>
  </p>
  <!-- ------------------------------------ -->
  <h3>Modifier</h3>
  <li>lazy。入力項目からフォーカスアウトしてからデータの変更が行われる</li>
  <p>
    data(bindSampleMessage) :
    {{ bindSampleMessage }}
  </p>
  <p>
    <label>Normal : </label>
    <input type="text" v-model="bindSampleMessage" /><br />
    <label>Lazy : </label>
    <input type="text" v-model.lazy="bindSampleMessage" />
  </p>
  <!-- ------------------------------------ -->
  <li>
    trim。入力値から前後のスペースを削除可能。ただし入力時に制御が行われる。値をバインドする際には動作しない。
  </li>
  <p>
    data(bindSampleMessage) :
    {{ bindSampleMessage }}
  </p>
  <p>
    <label>Trim : </label>
    <input type="text" v-model.trim="bindSampleMessage" />
  </p>
  <!-- ------------------------------------ -->
  <li>number。入力値を数値へ変換する</li>
  <p>
    data(bindSampleNumber) :
    {{ bindSampleNumber }}
  </p>
  <p>
    <label>Normal : </label>
    <input type="number" v-model="bindSampleNumber" />
    計算結果(2倍) : {{ bindSampleNumber + bindSampleNumber }}<br />
    <label>Number : </label>
    <input type="number" v-model.number="bindSampleNumber" />
    計算結果(2倍) : {{ bindSampleNumber + bindSampleNumber }}
  </p>
  <hr />
  <!-- ==================================== -->
  <h2>Component</h2>
  <!-- ------------------------------------ -->
  <h3>Basic</h3>
  <pre>
    Vueインスタンスにコンポーネント設定することで、タグとして利用可能。コンポーネント名はハイフン区切り(ケバブ形式）を利用する必要がある。
  </pre>
  <global-component-sample></global-component-sample>
  <global-component-sample></global-component-sample>
  <local-component-sample></local-component-sample>
  <local-component-sample></local-component-sample>
  <!-- ------------------------------------ -->
  <h3>Dynamic Process</h3>
  <pre>
    Component定義の中で、Componentで利用するdataやmethods定義を行う必要がある。
  </pre>
  <counter-component></counter-component>
  <counter-component></counter-component>
  <hr />
  <!-- ==================================== -->
  <h2>Transition</h2>
  <pre>
    v-if/v-showでDOMの変更、表示制御を行う際に、transitionタグで括ることで特定のクラスが設定される
    DOMの削除、非表示時にはxxx-leave-(from/active/to)、DOMの追加、表示時にはxxx-enter-(from/active/to)
    （from:開始、active:実行中、to:終了）
    xxxにはtransitionタグのname属性がprefixとして設定される
  </pre>
  <button v-on:click="isShowTransitionSample = !isShowTransitionSample">
    Change
  </button>
  <transition name="transition-sample">
    <span v-show="isShowTransitionSample">Transition Sample</span>
  </transition>
</template>

<style>
button {
  margin: 0px 10px;
}
label {
  vertical-align: top;
  display: inline-block;
  width: 150px;
}
[v-cloak] {
  display: none;
}
.large-font {
  font-size: xx-large;
}
.colorFont {
  color: red;
}
.bg-gray {
  background-color: gray;
}
.transition-sample-enter-active,
.transition-sample-leave-active {
  transition: opacity 3s;
}
.transition-sample-enter-from,
.transition-sample-leave-to {
  opacity: 0;
}
</style>

<script>
import axios from "axios";
import _ from "lodash";

export default {
  data: () => ({
    // Directive Sample
    vOnceMessage: "v-once sample",
    vHtmlMessage: "<span style='color:red;'>v-html sample</span>",
    vCloakMessage: "v-cloak sample",
    vTextMessage: "v-text sample",
    scriptSampleMessage: "v-script sample",
    scriptSampleNum: 100,
    scriptSampleBool: true,
    vBindUrl: "https://google.co.jp",

    // Computed Sample
    computedMessage: "computed sample",
    basePrice: 100,
    baseRandomNum: 1000,

    // Watcher Sample
    watchMessage: "watcher sample",
    // Unit Exchange
    m: 0,
    km: 0,
    // deep watch
    nonDeepWatches: [{ value: 1 }, { value: 2 }, { value: 3 }],
    watchStatusOfNonDeepWatch: "",
    deepWatches: [{ value: 11 }, { value: 12 }, { value: 13 }],
    watchStatusOfDeepWatch: "",

    // Realtime Search
    items: null,
    queryKeyword: "",
    apiMessage: "",
    apiErrorMessage: "",

    // Class Databinding
    isEnabledLargeFont: true,
    fontSizeLable: "Small",
    largeFontClass: "large-font",

    isEnabledColorFont: true,
    fontColorLabel: "Black",
    colorFontClass: "colorFont",

    bgColorClass: "bg-gray",

    // Class Databinding (array/Object)
    classArray: ["large-font", "colorFont", "bg-gray"],
    classObject: { "large-font": true, colorFont: true, "bg-gray": true },

    // Rendering with Condition
    conditions: [
      { name: "未選択", value: 0 },
      { name: "first", value: 1 },
      { name: "secound", value: 2 },
      { name: "third", value: 3 },
    ],
    selectedCondition: 0,
    isEnabledShow: true,

    // Event Handler
    // Inline Method
    inlineMethodCounter: 0,
    // Event Object / argument
    methodArgMessage: "",

    // Form Input Binding
    bindSampleMessage: "binding sample",
    bindSampleArray: [],
    bindSampleRadio: "1",
    bindSampleNumber: 0,

    // Transition
    isShowTransitionSample: true,
  }),
  computed: {
    reverseMessage: function () {
      return this.computedMessage
        ? this.computedMessage.split(" ").reverse().join(" ")
        : this.computedMessage;
    },
    taxIncludedPrice: {
      get: function () {
        return (this.basePrice * 1.1).toFixed(0);
      },
      set: function (value) {
        this.basePrice = (value / 1.1).toFixed(0);
      },
    },
    randomNum: function () {
      return (Math.random() * this.baseRandomNum).toFixed(0);
    },
  },
  methods: {
    // Directive Sample
    editvOnceMessage: function () {
      this.vOnceMessage = this.vOnceMessage.split(" ").reverse().join(" ");
    },
    // Computed Sample
    reverseMessageMethod: function () {
      return this.computedMessage
        ? this.computedMessage.split(" ").reverse().join(" ")
        : this.computedMessage;
    },
    randomNumMethod: function () {
      return (Math.random() * this.baseRandomNum).toFixed(0);
    },
    // Watch
    // Deep Watch
    incrementNonDeepWatchElem: function (index) {
      this.nonDeepWatches[index].value++;
    },
    incrementDeepWatchElem: function (index) {
      this.deepWatches[index].value++;
    },
    // Realtime Search
    getItemList: function () {
      if (!this.queryKeyword) {
        this.apiErrorMessage = "";
        this.apiMessage = "";
        return;
      }
      this.apiMessage = "Loading...";
      //this.items = null
      const vm = this;
      const params = { page: 1, per_page: 20, query: this.queryKeyword };
      axios
        .get("https://qiita.com/api/v2/items", params)
        .then(function (response) {
          console.log(response);
          vm.items = response.data;
        })
        .catch(function (error) {
          vm.apiErrorMessage = `Error : ${error}`;
        })
        .finally(function () {
          vm.apiMessage = "";
        });
    },
    // Class Databinding
    changeFontSize: function () {
      this.isEnabledLargeFont = !this.isEnabledLargeFont;
      this.fontSizeLable = this.isEnabledLargeFont ? "Small" : "Large";
    },
    changeFontColor: function () {
      this.isEnabledColorFont = !this.isEnabledColorFont;
      this.fontColorLabel = this.isEnabledColorFont ? "Black" : "Color";
    },
    // eventhandler
    // method
    couterMethod: function () {
      this.inlineMethodCounter--;
    },
    // Event Object / argument
    methodArg: function ($event, message) {
      const elem = $event.path
        .reverse()
        .map((p) => (p.nodeName ? p.nodeName : ""))
        .join(">");
      const label = $event.target.innerHTML;
      this.methodArgMessage = `EVENT情報 : ${elem} : ${label}をクリック。   引数は${message}`;
    },
  },
  watch: {
    // プロパティと同様の名称にて定義
    watchMessage: function (newValue, oldValue) {
      let logElem = document.getElementById("watchLog");
      let prependLogElem = document.createElement("li");
      prependLogElem.innerText = `Changed WatchMessage: ${oldValue} ---> ${newValue}`;
      logElem.prepend(prependLogElem);
      document
        .querySelectorAll("#watchLog li:nth-child(n + 6)")
        .forEach((elem) => elem.remove());
    },
    // Unit Exchange App
    m: function (newValue) {
      this.km = newValue ? newValue / 1000 : this.km;
    },
    km: function (newValue) {
      this.m = newValue ? newValue * 1000 : this.m;
    },
    // Deep Watch Sample
    nonDeepWatches: {
      handler: function (newValue, oldValue) {
        this.watchStatusOfNonDeepWatch = `${JSON.stringify(
          oldValue
        )} ---> ${JSON.stringify(newValue)}`;
        const _this = this;
        setTimeout(function () {
          _this.watchStatusOfNonDeepWatch = "";
        }, 2000);
      },
    },
    deepWatches: {
      handler: function (newValue, oldValue) {
        this.watchStatusOfDeepWatch = `${JSON.stringify(
          oldValue
        )} ---> ${JSON.stringify(newValue)}`;
        const _this = this;
        setTimeout(function () {
          _this.watchStatusOfDeepWatch = "";
        }, 2000);
      },
      deep: true,
    },
    // Realtime Search
    // queryKeyword: function (newValue, oldValue) {
    queryKeyword: function () {
      this.apiMessage = "Wating for input completion...";
      this.apiErrorMessage = "";
      this.debouncedGetItemList();
      // 以下でも問題はないがライブラリを利用する
      /*
      const _this = this;
      const prevNewValue = newValue;
      setTimeout(function () {
        if (prevNewValue !== _this.queryKeyword) {
          console.log("Cancel API");
        } else {
          console.log("Execute API");
          _this.getAnswer();
        }
      }, 1000);
      */
    },
  },
  mounted: function () {
    // Realtime Search
    // TODO lodashライブラリ利用
    this.debouncedGetItemList = _.debounce(this.getItemList, 1000);
  },
  // Component
  // Local Scolpe
  components: {
    "local-component-sample": {
      template: "<p>Local Component Sample</p>",
    },
  },
};
</script>
