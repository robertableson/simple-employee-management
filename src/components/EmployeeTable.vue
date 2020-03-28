<template>
  <div class="table-template">
    <table>
      <tr>
        <th class="checkbox-col"></th>
        <th>First name</th>
        <th>Last name</th>
        <th>Birth date</th>
        <th>Hourly salary</th>
      </tr>

      <tr v-for="employee in employees" v-bind:key="employee.id">
        <td class="checkbox-col">
          <input type="checkbox" :id="employee.id"/>
        </td>
        <td>{{ employee.data.firstName }}</td> 
        <td>{{ employee.data.lastName }}</td> 
        <td>{{ employee.data.birthDate }}</td>  
        <td>{{ employee.data.hourlyWage }}</td>  
      </tr>

    </table>
  </div>
</template>

<script>
  export default {
    name: 'EmployeeTable',
    props: {
      employees: Array
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


