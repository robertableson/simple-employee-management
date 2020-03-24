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
export default {
  name: 'EmployeeTable'
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


