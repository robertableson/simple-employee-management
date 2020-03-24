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

      <tr>
        <td class="checkbox-col">
          <input type="checkbox">
        </td>
        <td>prénom</td>
        <td>nom</td>
        <td>borth date</td>
        <td>46$</td>
      </tr>
    </table>
  </div>
</template>

<script>
  //import axios from 'axios';


  export default {
    name: 'EmployeeTable',
    data() {
      return {
        info: []
      }
    },
    mounted () {
      /*axios
        .get('http://localhost:5000/employees')
        .then(response => (this.info = response));*/
      
      this.info = [{
        name: 'dudly',
        pro: 'not'
      }];
      
      console.log(this.info[0]);
      
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


