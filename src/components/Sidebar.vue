<template>
  <v-navigation-drawer v-if="!drawer" app>
    <v-img
      height="140"
      class="pa-4"
      src="https://pdp.edu.vn/wp-content/uploads/2021/04/hinh-nen-cong-nghe-1.jpg"
    >
      <div class="text-center">
        <v-avatar class="mb-2" color="grey darken-1" size="77">
          <v-img
            aspect-ratio="30"
            :src="imageInfo"
          />
        </v-avatar>
        <h3 class="white--text">{{userInfo}}</h3>
      </div>
    </v-img>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="[icon, text, url] in links" :key="icon" link :to='url' class="item-sidebar">
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          {{ text }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      links: [
        ["mdi-microsoft-windows", "Trang Chủ", "/"],
        ["mdi-account", "Quản Lý Tài Khoản", "/user"],
        ["mdi-card-account-details-outline", "Quản Lý Nhân Viên", "/employee"],
        ["mdi-desktop-classic", "Quản Lý CS Vật Chất", "/facilities"],
        ["mdi-home-city", "Quản Lý Phòng Ban", "/department"],
        ["mdi-shield-account", "Quản Lý Chức Vụ", "/position"],
        ["mdi-cash-multiple", "Quản Lý Tiền Lương", "/payment"],
        ["mdi-cog", "Cài Đặt", "/"],
      ],
    };
  },
      computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
      imageInfo: (state) => state.imageInfo,
    }),
  },
};
</script>

<style scoped>
  a{
    text-decoration: none;
    color: green !important;
    display: block;
  }
  a,i{
    color:#9ca6ac!important;
    transition: 0.3s;
  }
  .v-list-item--link{
    transition: 0.3s;
  }
  .v-list-item--link:hover{
    background-color: green
  }
  .v-list-item--link:hover,
    .v-list-item--link:hover i{
    color: #fff !important;;
  }
  .item-sidebar{
    display: flex;
  }
</style>
