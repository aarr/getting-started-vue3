<template>
  <div id="todoApp">
    <h2>TODO List</h2>
    <form v-on:submit.prevent>
      <input type="text" v-model="newItem" />
      <button v-on:click="addItem">Add</button>
    </form>
    <ul>
      <li v-for="(todo, index) in todos" v-bind:key="todo">
        <input type="checkbox" v-model="todo.isDone" />
        <span>{{ todo.item }}</span>
        <button v-on:click="deleteItem(index)">Delete</button>
      </li>
    </ul>
    <div>
      <span>$data</span>
      <a href="javascript:void(0)" v-on:click="toggleDataDisplayed">
        {{ dataDisplayLable }}
      </a>
      <pre v-show="isDataDisplayed" class="log">{{ $data }}</pre>
    </div>
  </div>
</template>

<style>
#todoApp ul {
  list-style: none;
}
#todoApp input + span {
  display: inline-block;
  width: 100px;
  text-align: left;
  vertical-align: sub;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#todoApp input:checked + span {
  text-decoration: line-through;
}
.log {
  text-align: left;
  background-color: gray;
  color: white;
}
</style>

<script>
export default {
  data: () => ({
    newItem: "",
    todos: [],

    isDataDisplayed: false,
    dataDisplayLable: "表示",
  }),
  methods: {
    addItem: function () {
      console.log("Add");
      if (!this.newItem) return;
      let todo = {
        item: this.newItem,
        isDone: false,
      };
      this.todos.push(todo);
      this.newItem = "";
    },
    deleteItem: function (index) {
      console.log("delete item:" + index);
      this.todos.splice(index, 1);
    },
    toggleDataDisplayed: function () {
      this.isDataDisplayed = !this.isDataDisplayed;
      this.dataDisplayLable = this.isDataDisplayed ? "非表示" : "表示";
    },
  },
};
</script>
