<template>
  <div id="app">
    <h1>Super simple employee management</h1>
    <EmployeeTableActions/>
    <EmployeeTable/>
  </div>
</template>

<script>
import EmployeeTableActions from './components/EmployeeTableActions.vue'
import EmployeeTable from './components/EmployeeTable.vue'

export default {
  name: 'App',
  components: {
    EmployeeTableActions,
    EmployeeTable
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
