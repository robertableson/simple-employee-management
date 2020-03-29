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
        if(id.length > 1 || id.length < 1) {
          alert('SVP sélectionner un seul employé pour pouvoir l\'éditer.');
        }
        else {
          this.editSelectedEmployee(id);
        }
      }
      else if(action == 'delete') {
        let ids = this.getSelectedEmployeeIds();
        this.deleteSelectedEmployees(ids);
      }
    },
    addNewEmployee() {
      let that = this;

      Swal.fire({
        title: 'Add new',
        onOpen: function() {
          document.querySelector('form#add-new-employee').addEventListener('submit', function(e){
            e.preventDefault();
            that.addNewEmployeeFormSent();
          });          
        },
        showCancelButton: false,
        showConfirmButton:false,
        customClass: {
          container: 'employee-modal'
        },
        html: `
          <form action="http://localhost:5000/employee" method="post" id="add-new-employee">
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
      });
    },
    addNewEmployeeFormSent() {
      let newEmployee = this.getEmployeeModalData();
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

      Swal.close();
    },
    editEmployeeFormSent(_id) {
      let editedEmployee = this.getEmployeeModalData();
      let editedEmployeeQueryString = 
        'firstName=' + editedEmployee.firstName +
        '&lastName=' + editedEmployee.lastName +
        '&birthDate=' + editedEmployee.birthDate +
        '&hourlyWage=' + editedEmployee.hourlyWage
      ;        

      console.log('http://localhost:5000/employee/' + _id + '?' + editedEmployeeQueryString);
      

      axios.put('http://localhost:5000/employee/' + _id + '?' + editedEmployeeQueryString)
        .then((response) => {
          console.log(response);
          this.firebase_fetchAllEmployees();
        })
        .catch((error) => {
          console.log(error);
        }
      );

      Swal.close();
    },
    getEmployeeModalData() {
      const input_employeeFirstName = document.querySelector('.employee-modal form input#first-name');
      const input_employeeLastName = document.querySelector('.employee-modal form input#last-name');
      const input_employeeBirthDate = document.querySelector('.employee-modal form input#birth-date');
      const input_employeeHourlyWage = document.querySelector('.employee-modal form input#hourly-wage');

      let newEmployee = {
        firstName: input_employeeFirstName.value,
        lastName: input_employeeLastName.value,
        birthDate: input_employeeBirthDate.value,
        hourlyWage: input_employeeHourlyWage.value
      };

      return newEmployee;
    },
    editSelectedEmployee(_id) {
      let employeeToEdit = this.getEmployeeDataById(_id);

      let that = this;

      Swal.fire({
        title: 'Edit',
        onOpen: function() {
          document.querySelector('form#edit-employee').addEventListener('submit', function(e){
            e.preventDefault();
            that.editEmployeeFormSent(_id);
          });          
        },
        showCancelButton: false,
        showConfirmButton:false,
        customClass: {
          container: 'employee-modal'
        },
        html: `
          <form method="post" id="edit-employee">
            <label for="first-name">First name</label>
            <br/>
            <input id="first-name" type="text" value="${employeeToEdit.data.firstName}"/>

            <br/>
            <br/>

            <label for="last-name">Last name</label>
            <br/>
            <input id="last-name" type="text" value="${employeeToEdit.data.lastName}"/>

            <br/>
            <br/>

            <label for="birth-date">Birth date</label>
            <br/>
            <input id="birth-date" type="text" value="${employeeToEdit.data.birthDate}"/>

            <br/>
            <br/>

            <label for="hourly-wage">Hourly wage</label>
            <br/>
            <input id="hourly-wage" type="text" value="${employeeToEdit.data.hourlyWage}"/>

            <input type="submit" value="Add"/>
            <button>Cancel</button>
          </form>
        `
      });
      
    },
    getEmployeeDataById(_id) {
      let i = 0;
      let found = false;
      let employeeToEdit = {};      

      while(i < this.employees.length && found == false) {        
        if(this.employees[i].id == _id) {
          found = true;
        }

        i++;
      }

      if(found == true) {
        employeeToEdit = this.employees[i - 1];
      }

      return employeeToEdit;

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
.employee-modal form{
  text-align: left;
}
.employee-modal form input[type="text"]{
  width: 100%;
  height: 20px;
}
</style>
