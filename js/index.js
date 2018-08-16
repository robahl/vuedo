var todoApp = new Vue({
  el: '#todo-app',
  data: {
    todos: [],
    todoText: "",
    editing: false,
    editCache: "" },

  methods: {
    addTodo: function addTodo() {
      if (this.canPostTodo) {
        this.todos.unshift({ text: this.todoText, completed: false });
        this.todoText = "";
        this.$refs.todoInput.focus();
      }
    },
    removeTodo: function removeTodo(index) {
      this.todos.splice(index, 1);
    },
    editTodo: function editTodo(index) {
      console.log("EDIT_TODO");
      this.editing = index;
      this.editCache = this.todos[index].text;
    },
    doneEdit: function doneEdit(index) {
      this.editing = false;
    },
    cancelEdit: function cancelEdit(index) {
      this.todos[index].text = this.editCache;
      this.editing = false;
    } },

  computed: {
    canPostTodo: function canPostTodo() {
      return this.todoText.trim().length > 0;
    },
    unfinishedTodos: function unfinishedTodos() {
      return this.todos.filter(function (el) {return !el.completed;}).length;
    },
    percentageCompleted: function percentageCompleted() {
      var finishedTodos = this.todos.length - this.unfinishedTodos;
      return Math.round(finishedTodos / this.todos.length * 100) || 0;
    } },

  mounted: function mounted() {
    if (localStorage.getItem('todos')) {
      this.todos = JSON.parse(localStorage.getItem('todos'));
    }
  },
  watch: {
    todos: {
      handler: function handler() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
      },
      deep: true } },


  directives: {
    focus: function focus(el, binding) {
      if (binding.value) {
        Vue.nextTick(function () {
          el.focus();
        });
      }
    } } });
