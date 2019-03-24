<template>
  <section>
    <h1>{{ title }}</h1>
    <div class="tableau">
      <table>
        <thead>
        <tr class="tableau-titre">
          <th>Environnement</th>
          <th>Nombre de ruches</th>
          <th>Récolte</th>
          <th>Etat</th>
          <th>Dernière visite</th>
          <th>Prochaine visite</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(rucher,index) in ruchers" :key="index">
          <td>{{ rucher.lieu }}</td>
          <td>{{ rucher.nbRuches }}</td>
          <td>{{ rucher.nbHausses }}</td>
          <td>{{ rucher.etat }}</td>
          <td>{{ getDate(rucher.lastVisite) }}</td>
          <td>{{ getDate(getNewDate(rucher.lastVisite, frequency)) }}</td>
          <td>
            <input class="edit" type="button" @click="edit(index)" value="edition">
            <input class="delete" type="button" @click="del(index)" value="supprimer">
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'liste',
    data () {
      return {
        title: this.$route.name,
        frequency: null,
        ruchers: []
      }
    },

    mounted () {
      if ((localStorage.getItem('ruchers') != null) && (localStorage.getItem('ruchers') !== undefined)) {
        const save = JSON.parse(localStorage.getItem('ruchers'))
        console.log(save)
      } else {
        this.ruchers = [
          {
            lieu: 'test',
            nbRuches: 1,
            lastVisite: new Date()
          }
        ]
      }

      if ((localStorage.getItem('configuration') != null) && (localStorage.getItem('configuration') !== undefined)) {
        const save = JSON.parse(localStorage.getItem('configuration'))
        this.frequency = parseInt(save.frequency)
      }
    },

    methods: {
      getDate (date) {
        return (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
      },

      del (index) {
        this.ruchers.splice(index, 1)
        this.$router.push('/')
      },

      edit (index) {
        console.log('edit')
      },

      getNewDate (lastdate, nbjours) {
        const newDate = new Date(lastdate)
        newDate.setDate(newDate.getDate() + nbjours)
        return newDate
      },

      save () {
        localStorage.setItem('ruchers', JSON.stringify(this.ruchers))
      }
    }
  }
</script>

<style>
  table {
    text-align: center;
    width: 100vw;
  }
  h1 {
    text-align: center;
  }
</style>
