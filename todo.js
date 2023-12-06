new Vue({
    el: '#app',
    data() {
      return {
        todoList: [
          {"id":0,"title":"餵食狐蒙寶寶","done":false},
          {"id":1,"title":"讀一本書","done":false},
          {"id":4,"title":"澆花","done":true}
        ],
        new_todo: '',
        showComplete: false,
      };
    },
    computed: {},
    mounted() {
      this.getTodos();
    },
    watch: {
      todoList: {
        handler: function(updatedList) {
          localStorage.setItem('todo_list', JSON.stringify(updatedList));
        },
        deep: true
      }
    },
    computed:{
      pending: function() {
        return this.todoList.filter(function(item) {
          return !item.done;
        })
      },
      completed: function() {
        return this.todoList.filter(function(item) {
          return item.done;
        }); 
      },
      completedPercentage: function() {
        return (Math.floor((this.completed.length / this.todoList.length) * 100)) + "%";
      },
      today: function() {
        var weekday = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
  
        if(dd<10) {
            dd = '0'+dd
        } 
  
        if(mm<10) {
            mm = '0'+mm
        } 
  
        today = {
          day: weekday[today.getDay()],
          date:  yyyy + '-' + mm + '-' + dd,
        }
  
        return(today);
      }
    },
    methods: {
      // get all todos when loading the page
      getTodos() {
        if (localStorage.getItem('todo_list')) {
          this.todoList = JSON.parse(localStorage.getItem('todo_list'));
        }
      },
      // add a new item
      addItem() {
        // validation check
        if (this.new_todo) {
          this.todoList.unshift({
            id: this.todoList.length,
            title: this.new_todo,
            done: false,
          });
        }
        // reset new_todo
        this.new_todo = '';
        // save the new item in localstorage
        return true;
      },
      deleteItem(item) {
        this.todoList.splice(this.todoList.indexOf(item), 1);
      },
      toggleShowComplete() {
        this.showComplete = !this.showComplete;
      },
      clearAll() {
        this.todoList = [];
      }
    },
  });