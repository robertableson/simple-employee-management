<template>
  <div class="table-template">
    <table>
      <tr>
        <th class="checkbox-col"></th>
        <th>First name</th>
        <th>Last name</th>
        <th>Birth date</th>
        <th>Hourly wage</th>
      </tr>

      <tr v-for="(employee, i) in employees" v-bind:key="i">
        <td class="checkbox-col">
          <input type="checkbox" :id="i"/>
        </td>
        <td>{{ employee.firstName }}</td> 
        <td>{{ employee.lastName }}</td> 
        <td>{{ employee.birthDate }}</td>  
        <td>{{ employee.hourlyWage }}</td>  
      </tr>

    </table>
  </div>
</template>

<script>
  import axios from 'axios';


  export default {
    name: 'EmployeeTable',
    data() {
      return {
        employees: []
      }
    },
    methods: {
      updateTable: function() {

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
        });


    /*
      axios
        .get('http://localhost:5000/employees')
        .then(response => (t = response.data)
        .catch()*/
    }
  }
</script>

<style>
  table{
    width: 100%;    
  }
  td, th{
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  table{
    border-collapse: collapse;
  }

  .table-template{
    padding: 20px 0;
  }

  .checkbox-col{
    border:none;
    text-align: right;
    width: 12px;
  }
</style>


