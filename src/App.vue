<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
// import axios from "axios"
import employee from "./mokup-data/employee.json";
import departments from "./mokup-data/departments.json";
import facilities from "./mokup-data/facilities.json";
import payment from "./mokup-data/payment.json";
import position from "./mokup-data/position.json";
import user from "./mokup-data/user.json";

export default {
  name: "App",
  mounted() {
    localStorage.setItem("employee", JSON.stringify(employee));
    localStorage.setItem("departments", JSON.stringify(departments));
    localStorage.setItem("facilities", JSON.stringify(facilities));
    localStorage.setItem("payment", JSON.stringify(payment));
    localStorage.setItem("payment", JSON.stringify(payment));
    localStorage.setItem("position", JSON.stringify(position));
    localStorage.setItem("user", JSON.stringify(user));
  },
};
</script>
