<template>
  <div class="account">
    <v-container class="container">
      <v-row>
        <v-col cols="12">
          <!-- <h1>employee list</h1> -->
          <v-card>
            <v-card-title class="pb-0">
              DANH SÁCH TÀI KHOẢN
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Tìm Kiếm"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="green" dark v-bind="attrs" v-on="on" class="ms-5 my-4">
                  Thêm Mới
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="pt-7">
                  <span class="text-h5">Thêm mới tài khoản</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Email*"
                          required
                          v-model="user.email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Password*"
                          type="password"
                          required
                          v-model="user.password"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          :items="this.listRole"
                          label="Chức Vụ"
                          required
                          v-model="user.role"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    Đóng
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="createUser">
                    Cập nhật
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-data-table
              :headers="header"
              :items="account"
              :items-per-page="10"
              class="elevation-1 text-center table-list"
              item-key="id"
              show-select
              :search="search"
              :footer-props="{
                showFirstLastPage: true,
                firstIcon: 'mdi-arrow-collapse-left',
                lastIcon: 'mdi-arrow-collapse-right',
              }"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-dialog max-width="600" persistent>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                      @click="DetailsUser(item)"
                      >Chi Tiết <v-icon dark right> mdi-eye </v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:default="dialogDetails">
                    <v-card class="pb-2">
                      <v-card-text class="pb-0">
                        <v-container class="px-0 pt-13 pb-0">
                          <h1 class="px-5 py-0 text-center primary--text">
                            Thông Tin Tài Khoản
                          </h1>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                label="ID"
                                required
                                :value="detailsItem.id"
                                readonly
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                label="Email"
                                required
                                :value="detailsItem.email"
                                readonly
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                label="Password"
                                required
                                :value="detailsItem.password"
                                readonly
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                label="Chức Vụ"
                                required
                                :value="detailsItem.role"
                                readonly
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                label="Thời gian đăng nhập gần đây*"
                                required
                                :value="detailsItem.timeLogin"
                                readonly
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn
                          text
                          @click="dialogDetails.value = false"
                          color="primary"
                          >Đóng</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
                <!-- <user-details
                  :id="detailsItem.id"
                  :email="detailsItem.email"
                  :password="detailsItem.password"
                  :role="detailsItem.role"
                  :timeLogin="detailsItem.timeLogin"
                  :detailsUser="DetailsUser(item)"
                ></user-details> -->
                <v-btn
                  class="ma-2"
                  color="orange darken-2"
                  dark
                  @click="showDialogUpdate = true"
                >
                  Sửa
                  <v-icon dark right> mdi-pencil </v-icon>
                </v-btn>
                <v-btn class="ma-2" color="red" dark @click="handleRow(item)">
                  Xóa
                  <v-icon dark right> mdi-delete </v-icon>
                </v-btn>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary"> Reset </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <popup
      :show="showDialogDelete"
      :cancel="cancel"
      :confirm="handleDelete"
      text="Có! Mình muốn xóa ^^"
      title="Thông báo!"
      textCancel="Không nha :v"
      description="Bạn có muốn xóa dữ liệu này không ???"
    ></popup>
    <popup
      :show="showDialogUpdate"
      :cancel="cancel"
      :confirm="confirm"
      text="Ok! Mình sẽ vào lại sau"
      title="Thông báo!"
      description="Chức năng này hiện tại vẫn chưa cập nhật???"
    ></popup>
    <popup
      :show="showDialogCreateRequired"
      :cancel="cancel"
      :confirm="confirm"
      text="Ok! Mình sẽ kiểm tra lại"
      title="Thông báo!"
      description="Vui lòng điền đầy đủ thông tin!!"
    ></popup>
    <popup
      :show="showDialogCreateSuccess"
      :cancel="cancel"
      :confirm="confirm"
      text="Oke ^^"
      title="Thông báo!"
      description="Thêm dữ liệu thành công!!"
    ></popup>
    <popup
      :show="showDialogDeleteSuccess"
      :cancel="cancel"
      :confirm="confirm"
      text="Oke ^^"
      title="Thông báo!"
      description="Xoá dữ liệu thành công!!"
    ></popup>
    <popup
      :show="showDialogDuplicateEmail"
      :cancel="cancel"
      :confirm="confirm"
      text="Oke ^^"
      title="Thông báo!"
      description="Email này đã tồn tại!! Vui lòng chọn email khác"
    ></popup>
  </div>
</template>
<script>
// import axios from "axios";
import Popup from "../components/Popup.vue";
export default {
  components: { Popup },
  data() {
    return {
      header: [
        {
          text: "ID",
          value: "id",
          align: "center",
        },
        {
          text: "Email",
          value: "email",
          align: "center",
        },
        {
          text: "Chức Vụ",
          value: "role",
          align: "center",
        },
        {
          text: "Thời Gian Đăng Nhập",
          value: "timeLogin",
          align: "center",
        },
        {
          text: "Chức Năng",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      user: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        position_id: "",
        depart_id: "",
        depart_name: "",
        address: "",
        imgUrl: "",
        timeLogin: "",
      },
      deleteId: 0,
      detailsId: 0,
      account: [],
      search: "",
      dialog: false,
      dialogDetails: false,
      showDialogDelete: false,
      showDialogUpdate: false,
      showDialogCreateRequired: false,
      showDialogCreateSuccess: false,
      showDialogDeleteSuccess: false,
      showDialogDuplicateEmail: false,
      listRole: [],
      detailsItem: {},
    };
  },
  methods: {
    async DetailsUser(item) {
      this.detailsId = item.id;
      const resData = JSON.parse(localStorage.getItem("user"));
      const details = [...resData].find((el) => el.id === this.detailsId);
      this.detailsItem = details;
    },
    handleRow(item) {
      this.deleteId = item.email;
      this.showDialogDelete = true;
    },
    handleDelete() {
      const resDataUser = JSON.parse(localStorage.getItem("user"));
      const resDataEmp = JSON.parse(localStorage.getItem("employee"));
      const indexDel = resDataUser.findIndex((el) => el.email === this.deleteId);
      const index = resDataEmp.findIndex((el) => el.email === this.deleteId);
      resDataEmp.splice(index, 1);
      localStorage.setItem("employee", JSON.stringify(resDataEmp));
      resDataUser.splice(indexDel, 1);
      this.account = resDataUser;
      localStorage.setItem("user", JSON.stringify(resDataUser));
      this.showDialogDelete = false;
      this.showDialogDeleteSuccess = true;
    },
    cancel() {
      this.showDialogDelete = false;
      this.showDialogUpdate = false;
      // this.showDialogCreateRequired = false;
      // this.showDialogCreateSuccess = false;
      // this.showDialogDuplicateEmail = false;
    },
    confirm() {
      this.showDialogDelete = false;
      this.showDialogUpdate = false;
      this.showDialogCreateRequired = false;
      this.showDialogCreateSuccess = false;
      this.showDialogDeleteSuccess = false;
      this.showDialogDuplicateEmail = false;
    },
    userExists(email) {
      const resUser = JSON.parse(localStorage.getItem("user"));
      return resUser.some(function(el) {
        return el.email === email;
      });
    },
    async createUser() {
      if (
        this.user.email == "" ||
        this.user.password == "" ||
        this.user.role == ""
      ) {
        this.showDialogCreateRequired = true;
        this.dialog = false;
      } else {
        if (this.userExists(this.user.email) == true) {
          this.showDialogDuplicateEmail = true;
          this.dialog = false;
        } else {
          const resUser = JSON.parse(localStorage.getItem("user"));
          const detailsIdUser = resUser[resUser.length - 1];
          resUser.push({
            id: detailsIdUser.id + 1,
            email: this.user.email,
            password: this.user.password,
            role: this.user.role,
            timeLogin: this.user.timeLogin,
          });
          this.account = resUser;
          localStorage.setItem("user", JSON.stringify(resUser));
          const resEm = JSON.parse(localStorage.getItem("employee"));
          const detailsIdEm = resEm[resEm.length - 1];
          resEm.push({
            id: detailsIdEm.id + 1,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            password: this.user.password,
            role: this.user.role,
            position_id: this.user.position_id,
            depart_id: this.user.depart_id,
            depart_name: this.user.depart_name,
            address: this.user.address,
            imgUrl: this.user.imgUrl,
          });
          localStorage.setItem("employee", JSON.stringify(resEm));
          this.dialog = false;
          this.showDialogCreateSuccess = true;
        }
      }
    },
  },
  async mounted() {
    const res = JSON.parse(localStorage.getItem("user"));
    this.account = res;
    const resPo = JSON.parse(localStorage.getItem("position"));
    let result = resPo.map((a) => a.role);
    this.listRole = result;
  },
};
</script>
<style scoped>
h1 {
  text-transform: uppercase;
  text-align: center;
  margin: -10px 0 30px;
}
</style>
