<template>
  <div>
    <v-app-bar app elevate-on-scroll elevation="3" color="white">
      <v-app-bar-nav-icon @click="$emit('drawerEvent')"></v-app-bar-nav-icon>
      <v-spacer />
      <v-col lg="6" cols="12">
        <v-form>
          <v-text-field
            class="p-0 m-0 mt-6"
            full-width
            dense
            append-icon="mdi-magnify"
            outlined
            rounded
            placeholder="Tìm Kiếm"
          />
        </v-form>
      </v-col>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <span class="mx-5 mr-10" style="cursor: pointer" v-bind="attrs" v-on="on">
            <v-badge content="3" color="red" offset-y="10" offset-x="10">
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </span>
        </template>
        <v-list three-line width="250">
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              v-text="item.header"
            ></v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-item v-else :key="item.title">
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <span style="cursor: pointer" v-bind="attrs" v-on="on">
            <v-chip link>
              <v-badge dot bottom color="green" offset-y="10" offset-x="10">
                <v-avatar size="40" v-if="imgUrl">
                  <v-img :src="imgUrl" />
                </v-avatar>
                <v-avatar size="40" v-else>
                  <v-img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv_8jyrBjic0ELBWNbA2JH7ufzOb3jkJvN8Q&usqp=CAU"
                  />
                </v-avatar>
              </v-badge>
              <span class="ml-3" v-if="lastName && firstName"
                >{{ lastName }} {{ firstName }}</span
              >
              <span class="ml-3" v-else>Người dùng mới</span>
            </v-chip>
          </span>
        </template>
        <v-list width="250" class="py-0">
          <v-list-item two-line>
            <v-list-item-avatar v-if="imgUrl">
              <img style="object-fit: cover;" :src="imgUrl" />
            </v-list-item-avatar>
            <v-list-item-avatar v-else>
              <img
                style="object-fit: cover;"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv_8jyrBjic0ELBWNbA2JH7ufzOb3jkJvN8Q&usqp=CAU"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-if="lastName && lastName"
                >{{ lastName }} {{ firstName }}</v-list-item-title
              >
              <v-list-item-title v-else>Người dùng mới</v-list-item-title>
              <v-list-item-subtitle
                class="mt-1 text-uppercase"
                style="line-height: 1.4;"
                >{{ role }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item
            link
            v-for="(menu, i) in menus"
            :key="i"
            @click="listAction(menu.action)"
          >
            <v-list-item-icon>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ menu.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <popup
      :show="showDialog"
      :cancel="cancel"
      :confirm="confirm"
      text="Có! Mình muốn đăng xuất ^^"
      textCancel="Không nha :v"
      title="Thông báo?"
      description="Bạn có muốn đăng xuất không ???"
    ></popup>
  </div>
</template>

<script>
// import { mapState } from "vuex";
// import axios from "axios";
import Popup from "./Popup.vue";
export default {
  components: { Popup },
  name: "Topbar",
  data() {
    return {
      menus: [
        { title: "Thông Tin Nhân Viên", icon: "mdi-account", action: "profile" },
        { title: "Đổi Mật Khẩu", icon: "mdi-key" },
        { title: "Cài Đặt", icon: "mdi-cog" },
        { title: "Đăng Xuất", icon: "mdi-logout", action: "logout" },
      ],
      items: [
        {
          avatar:
            "https://oxford.edu.vn/UploadFinder/images/van%20phong%202-compressed.jpg",
          title: "Phòng Cơ Sở Vật Chất",
          subtitle: `Bạn vừa được giao nhiệm vụ quản lý LapTop`,
        },
        { divider: true, inset: true },
        {
          avatar:
            "https://tuyensinhdhcd.vn/wp-content/uploads/2020/11/cong-viec-nhan-su-gom-nhung-gi-1.jpg",
          title: "Phòng Nhân Sự",
          subtitle: `Phòng của bạn vừa có 1 nhân viên mới`,
        },
        { divider: true, inset: true },
        {
          avatar:
            "https://thietkevanphongmienbac.vn/Uploaded_products/img_any/thiet-ke-noi-that-phong-giam-doc-sang-trong-mb1.jpg",
          title: "Phòng Giám Đốc",
          subtitle: "Giám đốc đã giao cho bạn 3 nhiệm vụ mới",
        },
        { divider: true, inset: true },
        {
          avatar:
            "https://cdn.vietnambiz.vn/171464876016439296/2020/4/24/0-15877038145611885671211.jpg",
          title: "Phòng Hành Chính",
          subtitle: "Bạn được mời phòng hành chính nhận lương vào ngày 22/02/2022",
        },
      ],
      showDialog: false,
      firstName: "",
      lastName: "",
      imgUrl: "",
      role: "",
    };
  },
  // computed: {
  //   ...mapState({
  //     userInfo: (state) => state.userInfo,
  //     imageInfo: (state) => state.imageInfo,
  //   }),
  // },
  async mounted() {
    // const res = await axios.get(`${process.env.VUE_APP_SERVER_URL}/employee`);
    const res = JSON.parse(localStorage.getItem("employee"));
    const dataLogin = JSON.parse(localStorage.getItem("user-info"));
    let id = dataLogin.email;
    let data = res;
    const index = data.find((el) => el.email === id);
    //  const index =  data.map(el => el.email == id)
    this.firstName = index.firstName;
    this.lastName = index.lastName;
    this.imgUrl = index.imgUrl;
    this.role = index.role;
  },
  methods: {
    listAction(action) {
      if (action === "logout") {
        this.showDialog = true;
      }
      if (action === "profile") {
        if (this.$route.name !== "userInfo") {
          this.$router.push("/userInfo");
        } else {
          alert("Bạn đang ở trang này rồi");
        }
      }
    },
    cancel() {
      this.showDialog = false;
    },
    confirm() {
      localStorage.removeItem("user-info");
      this.$router.push("/login");
      this.showDialog = false;
    },
  },
};
</script>

<style scoped></style>
