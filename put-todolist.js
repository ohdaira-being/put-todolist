var Vue = new Vue({
  el: "#app",
  data: {
    todos: [],
  },

  mounted:function() {
    if (localStorage.getItem("todos")) {
      try {
        this.todos = JSON.parse(localStorage.getItem("todos"));
      } catch(e) {
        localStorage.removeItem("todos");
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

    doChangeState: function (item) {
      item.state = !item.state ? true : false;
      this.savetodos();
    },
    
    doCommentform: function (item) {
      item.editform = !item.editform ? true : false;
    },
    
    doChangeComment: function(item){
      item.editform = !item.editform ? true : false;
      this.savetodos();
    },

    doeditstop: function(item){
      window.location.reload();
      item.editform = false;
    },
    
    doRemove: function (item) {
      var index = this.todos.indexOf(item);
      this.todos.splice(index, 1);
      this.savetodos();
    },

    savetodos: function(){
      var parsed = JSON.stringify(this.todos);
      localStorage.setItem("todos", parsed);
    }
  },
});
