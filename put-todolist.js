new Vue({
  el: "#app",
  data: {
    todos: [],
  },

  mounted() {
    if (localStorage.getItem('todos')) {
      try {
        this.todos = JSON.parse(localStorage.getItem('todos'));
      } catch(e) {
        localStorage.removeItem('todos');
      }
    }
  },

  methods: {
    doAdd: function () {
      var day = this.$refs.day;
      var comment = this.$refs.comment;
      if (!comment.value.length) {
        return;
      }
      this.todos.push({
        day: day.value,
        comment: comment.value,
        editform: false,
        state: false,
      });
      comment.value = "";
      day.value = "";
      this.savetodos();
    },

    doCommentform: function (item) {
      item.editform = !item.editform ? true : false;
    },

    doChangeComment: function(item){
      item.editform = !item.editform ? true : false;
      this.savetodos();
    },

    doChangeState: function (item) {
      item.state == true ? item.state = false : item.state = true
      this.savetodos();
    },

    doRemove: function (item) {
      var index = this.todos.indexOf(item);
      this.todos.splice(index, 1);
      this.savetodos();
    },

    doeditstop: function(){
      window.location.reload();
    },

    savetodos(){
      const parsed = JSON.stringify(this.todos);
      localStorage.setItem('todos', parsed);
    }
  },
});
