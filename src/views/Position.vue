<template>
  <div class="position">
    <v-container class="container">
      <v-row>
        <v-col cols="12">
          <!-- <h1>employee list</h1> -->
          <v-card>
            <v-card-title class="pb-0">
              DANH SÁCH CHỨC VỤ
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
                <v-btn
                  color="green"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  class="ms-5 my-4"
                >
                  Thêm Mới
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="pt-7">
                  <span class="text-h5">Thêm mới chức vụ</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Mã Chức Vụ"
                          required
                          v-model="positionItem.position_id"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Tên Chức Vụ"
                          required
                          v-model="positionItem.role"
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
                  <v-btn color="blue darken-1" text @click="createPosition">
                    Cập nhật
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-data-table
              :headers="header"
              :items="position"
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
                <v-btn class="ma-2" color="primary" dark>
                  Chi Tiết
                  <v-icon dark right> mdi-eye </v-icon>
                </v-btn>
                <v-btn class="ma-2" color="orange darken-2" dark>
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
import axios from "axios";
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
          text: "Mã Chức Vụ",
          value: "position_id",
          align: "center",
        },
        {
          text: "Tên Chức Vụ",
          value: "role",
          align: "center",
        },
        {
          text: "Chức Năng",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      position: [],
      search: "",
      dialog: false,
      positionItem: {
        position_id: "",
        role: "",
      },
      showDialogDelete: false,
      showDialogDeleteSuccess: false,
      showDialogCreateRequired: false,
      showDialogCreateSuccess: false,
    };
  },
  async mounted() {
    const res = await axios.get(`${process.env.VUE_APP_SERVER_URL}/position`);
    if (res.status === 200) {
      this.position = res.data;
      console.log(this.position);
    }
  },
  methods: {
    async createPosition() {
      if (this.positionItem.position_id == "" || this.positionItem.role == "") {
        this.showDialogCreateRequired = true;
        this.dialog = false;
      } else {
        let res = await axios.post(`${process.env.VUE_APP_SERVER_URL}/position`, {
          position_id: this.positionItem.position_id,
          role: this.positionItem.role,
        });
        console.log(res);
        this.dialog = false;
        this.showDialogCreateSuccess = true;
        setTimeout(() => window.location.reload(), 1500);
      }
    },
    handleRow(item) {
      this.deleteId = item.id;
      this.showDialogDelete = true;
    },
    async handleDelete() {
      await axios.delete(`${process.env.VUE_APP_SERVER_URL}/position/${this.deleteId}`);
      this.showDialogDelete = false;
      this.showDialogDeleteSuccess = true;
      setTimeout(() => window.location.reload(), 1200);
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