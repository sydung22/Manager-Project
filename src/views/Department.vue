<template>
  <div class="department">
    <v-container class="container">
      <v-row>
        <v-col cols="12">
          <!-- <h1>employee list</h1> -->
          <v-card>
            <v-card-title class="pb-0">
              DANH SÁCH PHÒNG BAN
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
                  <span class="text-h5">Thêm mới phòng ban</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Mã Phòng Ban"
                          required
                          v-model="departmentItem.depart_id"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Tên Phòng Ban"
                          required
                          v-model="departmentItem.depart_name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Địa Chỉ"
                          required
                          v-model="departmentItem.depart_address"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Link Hình Ảnh"
                          required
                          v-model="departmentItem.depart_image"
                        ></v-text-field>
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
                  <v-btn color="blue darken-1" text @click="createDepartment">
                    Cập nhật
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-data-table
              :headers="header"
              :items="department"
              :items-per-page="10"
              class="elevation-1 text-center"
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
                <div v-if="roleEm !== 'Trưởng Phòng'">
                  <v-dialog max-width="1000" persistent>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                        @click="DetailsUser(item)"
                        >Chi Tiết <v-icon dark right> mdi-eye </v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:default="dialog">
                      <v-card class="pb-3">
                        <v-card-text class="pb-0">
                          <v-container class="px-0 pt-13 pb-0">
                            <h1 class="px-5 py-0 pb-5 text-center primary--text">
                              Thông Tin Phòng Ban
                            </h1>
                            <v-row align="center" justify="center" class="">
                              <v-col cols="12" sm="6" class="text-center">
                                <div class="mb-8" v-if="detailsItem.depart_image">
                                  <v-img
                                    aspect-ratio="30"
                                    :src="detailsItem.depart_image"
                                    height="300px"
                                  />
                                </div>
                                <div class="mb-8" v-else>
                                  <v-img
                                    aspect-ratio="30"
                                    src="https://png.pngtree.com/png-clipart/20190925/original/pngtree-office-icon-for-your-project-png-image_4897910.jpg"
                                    height="300px"
                                  />
                                </div>
                                <h1 class="black--text mt-2 mb-6">
                                  {{ detailsItem.depart_name }}
                                </h1>
                              </v-col>
                              <v-col cols="12" sm="6" class="text-center pt-0">
                                <v-form>
                                  <v-container>
                                    <v-row>
                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="ID"
                                          :value="detailsItem.id"
                                          required
                                          class="pt-1"
                                          readonly
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Mã Phòng Ban"
                                          :value="detailsItem.depart_id"
                                          required
                                          readonly
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Tên Phòng Ban"
                                          :value="detailsItem.depart_name"
                                          required
                                          readonly
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Số Lượng Nhân Viên"
                                          :value="qtyDepartment.length"
                                          required
                                          readonly
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Địa Chỉ Phòng Ban"
                                          :value="detailsItem.depart_address"
                                          required
                                          readonly
                                        ></v-text-field>
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-form>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                          <v-btn text @click="dialog.value = false" color="primary"
                            >Đóng</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                  <v-btn class="ma-2" color="orange darken-2" dark>
                    Sửa
                    <v-icon dark right> mdi-pencil </v-icon>
                  </v-btn>
                  <v-btn class="ma-2" color="red" dark @click="handleRow(item)">
                    Xóa
                    <v-icon dark right> mdi-delete </v-icon>
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn class="ma-2" color="primary" dark>
                    Chi Tiết
                    <v-icon dark right> mdi-eye </v-icon>
                  </v-btn>
                </div>
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
      :show="showDialogDeleteSuccess"
      :cancel="cancel"
      :confirm="confirm"
      text="Oke ^^"
      title="Thông báo!"
      description="Xoá dữ liệu thành công!!"
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
          text: "Mã Phòng Ban",
          value: "depart_id",
          align: "center",
        },
        {
          text: "Tên Phòng Ban",
          value: "depart_name",
          align: "center",
        },
        {
          text: "Địa Chỉ",
          value: "depart_address",
          align: "center",
        },
        {
          text: "Chức Năng",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      department: [],
      search: "",
      dialog: false,
      roleEm: "",
      detailsId: 0,
      detailsItem: {},
      departmentItem: {
        id: "",
        depart_id: "",
        depart_name: "",
        depart_address: "",
        depart_image: "",
      },
      showDialogDelete: false,
      showDialogDeleteSuccess: false,
      showDialogCreateRequired: false,
      showDialogCreateSuccess: false,
      qtyDepartment: [],
    };
  },
  async mounted() {
    const res = JSON.parse(localStorage.getItem("departments"));
    this.department = res;
    const dataDe = JSON.parse(localStorage.getItem("user-info"));
    this.roleEm = dataDe.role;
  },
  methods: {
    async createDepartment() {
      if (
        this.departmentItem.depart_id == "" ||
        this.departmentItem.depart_name == "" ||
        this.departmentItem.depart_address == "" ||
        this.departmentItem.depart_image == ""
      ) {
        this.showDialogCreateRequired = true;
        this.dialog = false;
      } else {
        const resDe = JSON.parse(localStorage.getItem("departments"));
        const detailsIdDe = resDe[resDe.length - 1];
        resDe.push({
          id: detailsIdDe.id + 1,
          depart_id: this.departmentItem.depart_id,
          depart_name: this.departmentItem.depart_name,
          depart_address: this.departmentItem.depart_address,
          depart_image: this.departmentItem.depart_image,
        });
        this.department = resDe;
        localStorage.setItem("departments", JSON.stringify(resDe));
        this.dialog = false;
        this.showDialogCreateSuccess = true;
      }
    },
    async DetailsUser(item) {
      this.detailsId = item.id;
      const resData = JSON.parse(localStorage.getItem("departments"));
      const details = [...resData].find((el) => el.id === this.detailsId);
      this.detailsItem = details;
      const dataEm = JSON.parse(localStorage.getItem("employee"));
      const detailsQty = dataEm.filter(
        (el) => el.depart_name === this.detailsItem.depart_name
      );
      this.qtyDepartment = detailsQty;
    },
    handleRow(item) {
      this.deleteId = item.id;
      this.showDialogDelete = true;
    },
    async handleDelete() {
      const resDataDe = JSON.parse(localStorage.getItem("departments"));
      const indexDel = resDataDe.findIndex((el) => el.id === this.deleteId);
      resDataDe.splice(indexDel, 1);
      this.department = resDataDe;
      localStorage.setItem("departments", JSON.stringify(resDataDe));
      this.showDialogDelete = false;
      this.showDialogDeleteSuccess = true;
    },
    cancel() {
      this.showDialogDelete = false;
      this.showDialogCreateRequired = false;
      this.showDialogCreateSuccess = false;
    },
    confirm() {
      this.showDialogDelete = false;
      this.showDialogDeleteSuccess = false;
      this.showDialogCreateRequired = false;
      this.showDialogCreateSuccess = false;
    },
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
