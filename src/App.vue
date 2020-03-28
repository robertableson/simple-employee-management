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
    this.firebase_fetchAllEmployees();
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
        showCancelButton: false,
        showConfirmButton:false,
        customClass: {
          container: 'add-employee-modal'
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

            <input type="submit" value="Add"/>
            <button>Cancel</button>
          </form>
        `
      }).then((result) => {
        if (result.value) {
          let newEmployee = this.getEmployeeToAddData();
          let newEmployeeQueryString = 
            'firstName=' + newEmployee.firstName +
            '&lastName=' + newEmployee.lastName +
            '&birthDate=' + newEmployee.birthDate +
            '&hourlyWage=' + newEmployee.hourlyWage
          ;

          axios.post('http://localhost:5000/employee?' + newEmployeeQueryString)
            .then((response) => {
              console.log(response);
              this.firebase_fetchAllEmployees();
            })
            .catch((error) => {
              console.log(error);
            }
          );
        }
      });
    },
    getEmployeeToAddData() {
      let newEmployee = {
        firstName: 'test',
        lastName: 'test',
        birthDate: 'test',
        hourlyWage: 11
      };

      return newEmployee;
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
.add-employee-modal form{
  text-align: left;
}
.add-employee-modal form input[type="text"]{
  width: 100%;
  height: 20px;
}
</style>
