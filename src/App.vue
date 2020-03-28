<template>
  <div id="app">
    <h1>Super simple employee management</h1>
    <EmployeeTableActions/>
    <EmployeeTable v-bind:employees="employees"/>
  </div>
</template>

<script>
import axios from 'axios';

import EmployeeTableActions from './components/EmployeeTableActions.vue'
import EmployeeTable from './components/EmployeeTable.vue'

export default {
  name: 'App',
  components: {
    EmployeeTableActions,
    EmployeeTable
  },
  data () {
    return {
      employees: []
    }
  },
  mounted () {
    axios.get('http://localhost:5000/employees')
      .then((response) => {
        this.employees = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      }
    );
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
