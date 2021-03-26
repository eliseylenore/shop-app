<template>
  <div>
    <b-table-simple
      table-class="w-auto"
      thead-class="hidden_header"
      tbody-tr-class="no-border-top"
      borderless
      show-empty="true"
    >
      <b-thead class="hidden_header">
        <b-tr>
          <b-th>Property</b-th>
          <b-th>Value</b-th>
          <b-th>Edit</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr>
          <b-td>Name</b-td>
          <b-td>{{ user.name }}</b-td>
          <b-td>
            <router-link :to="{ name: 'Dashboard' }">Edit</router-link>
          </b-td>
        </b-tr>
        <b-tr>
          <b-td>Email</b-td>
          <b-td>{{ user.email }}</b-td>
          <b-td>
            <router-link :to="{ name: 'Dashboard' }">Edit</router-link>
          </b-td>
        </b-tr>
        <b-tr>
          <b-td>Password</b-td>
          <b-td>Last changed: {{ formattedDate }}</b-td>
          <b-td>
            <router-link :to="{ name: 'Dashboard' }">Edit</router-link>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      items: [
        { property: "Name", value: "Glenda Rose", edit: "" },
        { property: "Password", value: "Last changed: 06/15/1992", edit: "" }
      ]
    };
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedDate() {
      return moment(this.user.date).format("L");
    }
  }
};
</script>

<style lang="scss">
.hidden_header {
  display: none;
}
table {
  border: 1px #cccccc solid;
}
td:first-child,
td:nth-child(2) {
  font-weight: bold;
}
td:first-child {
  color: #666666;
}
.table td {
  // @include respond-above(sm) {
  //   padding-right: 4em;
  // }
}
</style>
