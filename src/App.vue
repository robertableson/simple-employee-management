<template>
  <div id="app">
    <h1>Super simple employee management</h1>
    <EmployeeTableActions v-on:actionButtonClicked="actionButtonClicked"/>
    <EmployeeTable v-bind:employees="employees"/>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'

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
    //this.firebase_fetchAllEmployees();
  },
  methods: {
    firebase_fetchAllEmployees() {
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
      Swal.fire({
        title: 'Add new',
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel',
        customClass: {
          container: 'container-class'
        },
        html: `
          <form id="add-new-employee">
            <label for="first-name">First name</label>
            <br/>
            <input id="first-name" type="text"/>

            <br/>
            <br/>

            <label for="last-name">Last name</label>
            <br/>
            <input id="last-name" type="text"/>

            <br/>
            <br/>

            <label for="birth-date">Birth date</label>
            <br/>
            <input id="birth-date" type="text"/>

            <br/>
            <br/>

            <label for="hourly-wage">Hourly wage</label>
            <br/>
            <input id="hourly-wage" type="text"/>
          </form>
        `
      }).then((result) => {
        if (result.value) {
          //TODO: Send add call
        }
      });
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
.container-class form{
  text-align: left;
}
.container-class form input{
  width: 100%;
  height: 20px;
}
</style>
