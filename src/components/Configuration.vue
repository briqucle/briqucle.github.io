<template>
  <div id="app">
    <label>Ajouter une fréquence (en nb jours)</label>
    <input type="text" v-model="text"/>
    <label>Ajouter un environnement</label>
    <input type="text" v-model="text2"/>
    <button @click="addTodo()">Ajouter</button>
    <ul>
      <li v-for="todo in todos">
        {{ todo }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        text: null,
        text2: null,
        todos: []
      }
    },
    mounted () {
      const todos = JSON.parse(this.$localStorage.get('todos'))
      if (todos) {
        this.todos = todos
      }
    },
    methods: {
      addTodo () {
        var data = this.text + ' jours pour l\'environnement : ' + this.text2
        this.todos.push(data)
        this.text = null
        this.text2 = null
        this.$localStorage.set('todos', JSON.stringify(this.todos))
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  a {
    color: #42b983;
  }
</style>
