/*
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");
*/
const app = Vue.createApp({
    data: () => ({
        // TODO Application
        newItem: '',
        todos: [],

        isDataDisplayed: false,
        dataDisplayLable: '表示',

        // Directive Sample
        vOnceMessage: 'v-once sample',
        vHtmlMessage: '<span style="color:red;">v-html sample</span>',
        vCloakMessage: 'v-cloak sample',
        vTextMessage: 'v-text sample',
        scriptSampleMessage: 'v-script sample',
        scriptSampleNum: 100,
        scriptSampleBool: true,
        vBindUrl: 'https://google.co.jp',

        // Computed Sample
        computedMessage: 'computed sample',
        basePrice: 100,
        baseRandomNum: 1000,

        // Watcher Sample
        watchMessage: 'watcher sample',
        // Unit Exchange
        m: 0,
        km: 0,
        // deep watch
        nonDeepWatches: [
            { value: 1 },
            { value: 2 },
            { value: 3 },
        ],
        watchStatusOfNonDeepWatch: '',
        deepWatches: [
            { value: 11 },
            { value: 12 },
            { value: 13 },
        ], 
        watchStatusOfDeepWatch: '',

        // Realtime Search
        items: null,
        queryKeyword: '',
        apiMessage: '',
        apiErrorMessage: '',

        // Class Databinding
        isEnabledLargeFont: true,
        fontSizeLable: 'Small',
        largeFontClass: 'large-font',

        isEnabledColorFont: true,
        fontColorLabel: 'Black',
        colorFontClass: 'colorFont',

        bgColorClass: 'bg-gray',

        // Class Databinding (array/Object)
        classArray: ['large-font', 'colorFont', 'bg-gray'],
        classObject: {'large-font': true, 'colorFont': true, 'bg-gray': true},

        // Rendering with Condition
        conditions: [{name: '未選択', value: 0}, {name: 'first', value: 1}, {name: 'secound', value: 2}, {name: 'third', value: 3}],
        selectedCondition: 0,
        isEnabledShow: true ,

        // Event Handler
        // Inline Method
        inlineMethodCounter: 0,
        // Event Object / argument
        methodArgMessage: '',

        // Form Input Binding
        bindSampleMessage: 'binding sample',
        bindSampleArray: [],
        bindSampleRadio: '1',
        bindSampleNumber: 0,

        // Transition
        isShowTransitionSample: true,

    }),
    computed: {
        reverseMessage: function(message) {
            return this.computedMessage ? this.computedMessage.split(' ').reverse().join(' ') : computedMessage
        },
        taxIncludedPrice: {
            get: function() {
                return (this.basePrice * 1.1).toFixed(0)
            },
            set: function(value) {
                this.basePrice = (value / 1.1).toFixed(0)
            }
        },
        randomNum: function() {
            return (Math.random() * this.baseRandomNum).toFixed(0)
        }
    },
    methods: {
        // TODO Application
        addItem: function(event) {
            console.log('Add')
            if (!this.newItem) return
            let todo = {
                item: this.newItem,
                isDone: false
            }
            this.todos.push(todo)
            this.newItem = ''
        },
        deleteItem: function(index) {
            console.log('delete item:' + index)
            this.todos.splice(index, 1)
        },
        toggleDataDisplayed: function() {
            this.isDataDisplayed = !this.isDataDisplayed
            this.dataDisplayLable = this.isDataDisplayed ? '非表示' : '表示'
        },

        // Directive Sample
        editvOnceMessage: function(event) {
            this.vOnceMessage = this.vOnceMessage.split(' ').reverse().join(' ')
        },

        // Computed Sample
        reverseMessageMethod: function() {
            return this.computedMessage ? this.computedMessage.split(' ').reverse().join(' ') : computedMessage
        },
        randomNumMethod: function() {
            return (Math.random() * this.baseRandomNum).toFixed(0)
        },

        // Watch
        // Deep Watch
        incrementNonDeepWatchElem: function(index) {
            this.nonDeepWatches[index].value++
        },
        incrementDeepWatchElem: function(index) {
            this.deepWatches[index].value++
        },

        // Realtime Search
        getItemList: function() {
            if(!this.queryKeyword) {
                this.apiErrorMessage = ''
                this.apiMessage = ''
                return
            }
            this.apiMessage = 'Loading...'
            //this.items = null
            const vm = this
            const params = { page: 1, per_page:20, query: this.queryKeyword }
            axios.get('https://qiita.com/api/v2/items', params)
                .then(function(response) {
                    console.log(response)
                    vm.items = response.data
                })
                .catch(function(error) {
                    vm.apiErrorMessage = `Error : ${error}`
                })
                .finally(function() {
                    vm.apiMessage = ''
                })
        },

        // Class Databinding
        changeFontSize: function() {
            this.isEnabledLargeFont = !this.isEnabledLargeFont
            this.fontSizeLable = this.isEnabledLargeFont ? 'Small' : 'Large'
        },
        changeFontColor: function() {
            this.isEnabledColorFont = !this.isEnabledColorFont
            this.fontColorLabel = this.isEnabledColorFont ? 'Black' : 'Color'
        },

        // Rendergin with Condition
        selectCondition: function() {
            this.s
        },

        // eventhandler
        // method
        couterMethod: function(event) {
            this.inlineMethodCounter--
        },
        // Event Object / argument
        methodArg: function($event, message) {
            elem = $event.path.reverse().map(p => p.nodeName ? p.nodeName : '').join('>')
            label = $event.target.innerHTML
            this.methodArgMessage = `EVENT情報 : ${elem} : ${label}をクリック。   引数は${message}`
        },


    },
    watch: {
        // プロパティと同様の名称にて定義
        watchMessage: function(newValue, oldValue) {
            let logElem = document.getElementById('watchLog')
            let prependLogElem = document.createElement('li')
            prependLogElem.innerText = `Changed WatchMessage: ${oldValue} ---> ${newValue}`
            logElem.prepend(prependLogElem)
            document.querySelectorAll('#watchLog li:nth-child(n + 6)').forEach((elem) => elem.remove())
        },
        // Unit Exchange App
        m: function(newValue, oldValue) {
            this.km = newValue ?  newValue / 1000 : this.km
        },
        km: function(newValue, oldValue) {
            this.m = newValue ?  newValue * 1000 : this.m
        },
        // Deep Watch Sample
        nonDeepWatches: {
            handler: function(newValue, oldValue) {
                this.watchStatusOfNonDeepWatch = `${JSON.stringify(oldValue)} ---> ${JSON.stringify(newValue)}`
                _this = this
                setTimeout(function() {
                    _this.watchStatusOfNonDeepWatch = ''
                }, 2000)
            },
        },
        deepWatches: {
            handler: function(newValue, oldValue) {
                this.watchStatusOfDeepWatch = `${JSON.stringify(oldValue)} ---> ${JSON.stringify(newValue)}`
                _this = this
                setTimeout(function() {
                    _this.watchStatusOfDeepWatch = ''
                }, 2000)
            },
            deep: true
        },
        // Realtime Search
        queryKeyword: function(newValue, oldValue) {
            this.apiMessage = 'Wating for input completion...'
            this.apiErrorMessage = ''
            this.debouncedGetItemList()
            // 以下でも問題はないがライブラリを利用する
            /*
            const _this = this
            const prevNewValue = newValue
            setTimeout(function() {
                if (prevNewValue !== _this.queryKeyword) {
                    console.log('Cancel API')
                } else {
                    console.log('Execute API')
                    _this.getAnswer()
                }
            }, 1000)
            */
        },

    },
    mounted: function() {
        // Realtime Search
        this.debouncedGetItemList = _.debounce(this.getItemList, 1000)
    }

    // Component
    // Local Scolpe
    ,components: {
        'local-component-sample': {
            template: '<p>Local Component Sample'
        }
    }
})

// Component
// Global Scope
app.component('global-component-sample', {
    template: '<p>Global Component Sample</p>'

// Dynamic Process
}).component('counter-component', {
    template: '<p><span>COUNT : </span><button v-on:click="countUp">{{ countComponent }}</button></p>',
    data: () => ({
        // Component
        countComponent: 0,
    }),
    methods: {
        // Component
        countUp: function() {
            this.countComponent++
        },
    }
})
app.mount('#app')