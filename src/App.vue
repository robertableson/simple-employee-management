<template>
  <div id="app">
    <h1>Super simple employee management</h1>
    <EmployeeTableActions v-on:actionButtonClicked="actionButtonClicked"/>
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
    this.fetchAllEmployees();
  },
  methods: {
    fetchAllEmployees() {
      axios.get('http://localhost:5000/employees')
        .then((response) => {
          this.employees = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        }
      );
    },
    actionButtonClicked(action) {
      if(action == 'add') {
        this.addNewEmployee();
      }
      else if(action == 'edit') {
        let id = this.getSelectedEmployeeIds();
        this.editSelectedEmployee(id);
      }
      else if(action == 'delete') {
        let ids = this.getSelectedEmployeeIds();
        this.deleteSelectedEmployees(ids);
      }
    },
    addNewEmployee() {
      console.log('Add new Clicked');
    },
    editSelectedEmployee(id) {
      console.log(id);      
      console.log('Edit Clicked');
    },
    deleteSelectedEmployees(ids) {
      console.log(ids);
      console.log('delete Clicked');
    },
    getSelectedEmployeeIds() {
      let checkbox_selectedEmployees = document.querySelectorAll('input[type=checkbox]:checked');
      let selectedEmployeeIds = [];

      checkbox_selectedEmployees.forEach(function(checkbox_selectedEmployee) {
        selectedEmployeeIds.push(checkbox_selectedEmployee.id);
      });

      return selectedEmployeeIds;
    }
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
