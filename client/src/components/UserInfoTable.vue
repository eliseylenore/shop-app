<template>
  <div>
    <b-table-simple
      small
      table-class="w-100"
      thead-class="hidden_header"
      tbody-tr-class="no-border-top"
      show-empty="true"
    >
      <b-thead class="hidden_header">
        <b-tr>
          <b-th>Property</b-th>
          <b-th>Value</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr>
          <b-td>Name</b-td>
          <b-td>{{ user.name }}</b-td>
        </b-tr>
        <b-tr>
          <b-td>Email</b-td>
          <b-td>{{ user.email }}</b-td>
        </b-tr>
        <b-tr>
          <b-td>Password</b-td>
          <b-td>Last changed: {{ formattedDate }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <router-link :to="{ name: 'EditProfile' }"
      >Edit your information</router-link
    >
  </div>
</template>

<script>
import { formattedDate } from "../commons/utils";

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedDate() {
      return formattedDate(this.user.date);
    }
  }
};
</script>

<style lang="scss">
.hidden_header {
  display: none;
}
td:first-child {
  color: #666666;
}
</style>
