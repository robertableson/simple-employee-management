<template>
  <div class="table-actions-template">
    <a v-on:click="addNewEmployee" class="table-action table-action-add-new button button-add" href="#">Add new</a>
    <a v-on:click="editEmployee" class="table-action table-action-edit button button-edit" href="#">Edit</a>
    <a v-on:click="deleteEmployee" class="table-action table-action-add-delete button button-delete" href="#">Delete</a>
  </div>
</template>

<script>

export default {
  name: 'EmployeeTableActions',
  methods: {
    addNewEmployee: function() {
      alert('add new');
    },
    editEmployee: function() {
      alert('edit');
    },
    deleteEmployee: function() {
      alert('delete');
    }
  }
}
</script>

<style scoped>
  a.button{
    text-decoration: none;
    padding: 5px 10px;
  }
  .table-actions-template{
    text-align: right;
  }
  a.button-add{
    background-color: rgb(88, 199, 88);
    color: #fff;
    text-decoration: none;
  }
    a.button-edit{
    background-color: rgb(199, 147, 88);
    color: #fff;
    margin-left: 10px;
  }
  a.button-delete{
    background-color: rgb(199, 88, 88);
    color: #fff;
    margin-left: 10px;
  }
  a.table-action{
    display: inline;
  }
</style>

