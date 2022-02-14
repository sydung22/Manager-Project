<template>
  <div class="facilities">
    <v-container class="container">
      <v-row>
        <v-col cols="12">
          <!-- <h1>employee list</h1> -->
          <v-card>
            <v-card-title class="pb-0">
              DANH SÁCH CƠ SỞ VẬT CHẤT
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Tìm Kiếm"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-dialog
              v-model="dialog"
              persistent
              max-width="600px"
              v-if="roleEm !== 'Nhân Viên'"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="green" dark v-bind="attrs" v-on="on" class="ms-5 my-4">
                  Thêm Mới
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="pt-7">
                  <span class="text-h5">Thêm mới cơ sở vật chất</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          label="Mã Cơ Sở Vật Chất"
                          v-model="facilitiesItem.facilities_id"
                          required
                          class="pt-1"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          label="Tên Cơ Sở Vật Chất"
                          v-model="facilitiesItem.title"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          label="Giá Tiền"
                          v-model="facilitiesItem.price"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          label="Số Lượng"
                          v-model="facilitiesItem.qty"
                          required
                          type="number"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          label="Link Hình Ảnh"
                          v-model="facilitiesItem.image"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          label="Thời Gian Nhập Hàng"
                          v-model="facilitiesItem.innitiated_date"
                          required
                          type="date"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          label="Mã Nhân Viên Quản Lý"
                          v-model="facilitiesItem.emp_ID"
                          required
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
                  <v-btn color="blue darken-1" text @click="createFacilities">
                    Cập nhật
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-data-table
              :headers="header"
              :items="facilities"
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
                <div v-if="roleEm !== 'Nhân Viên'">
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
                            <h1 class="px-5 pt-0 pb-5 text-center primary--text">
                              Thông Tin Cơ Sở Vật Chất
                            </h1>
                            <v-row align="center" justify="center" class="">
                              <v-col cols="12" sm="6" class="text-center">
                                <div class="mb-5" v-if="detailsFaItem.image">
                                  <v-img
                                    aspect-ratio="30"
                                    :src="detailsFaItem.image"
                                    height="300px"
                                    contain
                                  />
                                </div>
                                <div class="mb-5" v-else>
                                  <v-img
                                    aspect-ratio="30"
                                    src="https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg"
                                    height="300px"
                                  />
                                </div>
                                <h1 class="black--text mt-0 mb-12">
                                  {{ detailsFaItem.title }}
                                </h1>
                                <v-row>
                                  <v-col cols="12" sm="3">
                                    <v-avatar
                                      size="155px"
                                      class="text-left float-left"
                                    >
                                      <img
                                        alt="Avatar"
                                        :src="detailsEmployItem.imgUrl"
                                        style="object-fit: cover;"
                                      /> </v-avatar
                                  ></v-col>
                                  <v-col
                                    cols="12"
                                    sm="7"
                                    class="text-left ms-15 black--text d-flex flex-column justify-center col-infoEm"
                                  >
                                    <h2 class="mb-4">Nhân Viên Quản Lý</h2>
                                    <v-row>
                                      <v-col cols="12" sm="6" class="pe-0 pb-2">
                                        <p class="mb-0">Tên Nhân Viên:</p>
                                      </v-col>
                                      <v-col cols="12" sm="6" class="ps-0 pb-2">
                                        <p class="mb-0">
                                          {{ detailsEmployItem.lastName }}
                                          {{ detailsEmployItem.firstName }}
                                        </p>
                                      </v-col>
                                      <v-col cols="12" sm="6" class="pe-0 pb-2 pt-0">
                                        <p class="mb-0">Chức Vụ:</p>
                                      </v-col>
                                      <v-col cols="12" sm="6" class="ps-0 pb-2 pt-0">
                                        <p class="mb-0">
                                          {{ detailsEmployItem.role }}
                                        </p>
                                      </v-col>
                                      <v-col cols="12" sm="6" class="pe-0 pb-2 pt-0">
                                        <p class="mb-0">Phòng Ban:</p>
                                      </v-col>
                                      <v-col cols="12" sm="6" class="ps-0 pb-2 pt-0">
                                        <p class="mb-0">
                                          {{ detailsEmployItem.depart_name }}
                                        </p>
                                      </v-col>
                                      <v-col cols="12" sm="6" class="pe-0 pb-2 pt-0">
                                        <p class="mb-0">Số Điện Thoại:</p>
                                      </v-col>
                                      <v-col cols="12" sm="6" class="ps-0 pb-2 pt-0">
                                        <p class="mb-0">
                                          0346996951
                                        </p>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12" sm="6" class="text-center">
                                <v-form>
                                  <v-container>
                                    <v-row>
                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="ID"
                                          :value="detailsFaItem.id"
                                          required
                                          class="pt-1"
                                          readonly
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Mã Cơ Sở Vật Chất"
                                          :value="detailsFaItem.facilities_id"
                                          required
                                          readonly
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Tên Cơ Sở Vật Chất"
                                          :value="detailsFaItem.title"
                                          required
                                          readonly
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Giá Tiền"
                                          :value="detailsFaItem.price"
                                          required
                                          readonly
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Số Lượng"
                                          :value="detailsFaItem.qty"
                                          required
                                          readonly
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Ngày Nhập"
                                          :value="detailsFaItem.innitiated_date"
                                          required
                                          readonly
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Mã Nhân Viên"
                                          :value="detailsFaItem.emp_ID"
                                          required
                                          readonly
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Email Nhân Viên"
                                          :value="detailsEmployItem.email"
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
    <popup
      :show="showDialogIdFail"
      :cancel="cancel"
      :confirm="confirm"
      text="Ok! Mình sẽ kiểm tra lại"
      title="Thông báo!"
      description="Không có nhân viên này trong danh sách!!"
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
          text: "Mã CSVC",
          value: "facilities_id",
          align: "center",
        },
        {
          text: "Tên CSVC",
          value: "title",
          align: "center",
        },
        {
          text: "Giá Tiền",
          value: "price",
          align: "center",
        },
        {
          text: "Số Lượng",
          value: "qty",
          align: "center",
        },
        {
          text: "Ngày Nhập",
          value: "innitiated_date",
          align: "center",
        },
        {
          text: "Nhân Viên Quản Lý",
          value: "fullName",
          align: "center",
        },
        {
          text: "Chức Năng",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      facilities: [],
      search: "",
      roleEm: "",
      deleteId: 0,
      detailsId: 0,
      detailsFaItem: {},
      detailsEmployItem: {},
      employData: {},
      dialog: false,
      facilitiesItem: {
        facilities_id: "",
        title: "",
        price: "",
        qty: "",
        image: "",
        innitiated_date: "",
        fullName: "",
        emp_ID: "",
      },
      showDialogDelete: false,
      showDialogDeleteSuccess: false,
      showDialogCreateRequired: false,
      showDialogCreateSuccess: false,
      showDialogIdFail: false,
    };
  },
  async mounted() {
    const dataLogin = JSON.parse(localStorage.getItem("user-info"));
    this.roleEm = dataLogin.role;
    if (dataLogin.role == "Nhân Viên") {
      const dataEm = JSON.parse(localStorage.getItem("employee"));
      const detailsEm = dataEm.find((el) => el.email === dataLogin.email);
      const dataFa = JSON.parse(localStorage.getItem("facilities"));
      const detailsFa = dataFa.filter((el) => el.emp_ID === detailsEm.emp_ID);
      this.facilities = detailsFa;
      console.log(detailsFa);
    } else {
      const res = JSON.parse(localStorage.getItem("facilities"));
      this.facilities = res;
    }
  },
  methods: {
    async DetailsUser(item) {
      this.detailsId = item.id;
      const resData = JSON.parse(localStorage.getItem("facilities"));
      const details = [...resData].find((el) => el.id === this.detailsId);
      this.detailsFaItem = details;
      const dataEm = JSON.parse(localStorage.getItem("employee"));
      const resEm = [...dataEm].find(
        (el) => el.emp_ID === this.detailsFaItem.emp_ID
      );
      this.detailsEmployItem = resEm;
    },
    handleRow(item) {
      this.deleteId = item.id;
      this.showDialogDelete = true;
    },
    async handleDelete() {
      const resDataFa = JSON.parse(localStorage.getItem("facilities"));
      const indexDel = resDataFa.findIndex((el) => el.id === this.deleteId);
      resDataFa.splice(indexDel, 1);
      this.facilities = resDataFa;
      localStorage.setItem("facilities", JSON.stringify(resDataFa));
      this.showDialogDelete = false;
      this.showDialogDeleteSuccess = true;
    },
    async createFacilities() {
      if (
        this.facilitiesItem.facilities_id == "" ||
        this.facilitiesItem.title == "" ||
        this.facilitiesItem.price == "" ||
        this.facilitiesItem.qty == "" ||
        this.facilitiesItem.emp_ID == "" ||
        this.facilitiesItem.innitiated_date == ""
      ) {
        this.showDialogCreateRequired = true;
        this.dialog = false;
      } else {
        // const resEm = await axios.get(
        //   `${process.env.VUE_APP_SERVER_URL}/employee?emp_ID=${this.facilitiesItem.emp_ID}`
        // );
        const datalocal = JSON.parse(localStorage.getItem("employee"));
        const resEm = [...datalocal].find(
          (el) => el.emp_ID === this.facilitiesItem.emp_ID
        );
        this.employData = resEm;
        if (this.employData) {
          // const resFa = await axios.post(
          //   `${process.env.VUE_APP_SERVER_URL}/facilities`,
          //   {
          //     facilities_id: this.facilitiesItem.facilities_id,
          //     title: this.facilitiesItem.title,
          //     price: this.facilitiesItem.price,
          //     qty: this.facilitiesItem.qty,
          //     image: this.facilitiesItem.image,
          //     innitiated_date: this.facilitiesItem.innitiated_date,
          //     emp_ID: this.facilitiesItem.emp_ID,
          //     fullName: this.employData.lastName + " " + this.employData.firstName,
          //   }
          // );
          // console.log(resFa);
          const resFa = JSON.parse(localStorage.getItem("facilities"));
          const detailsIdFa = resFa[resFa.length - 1];
          resFa.push({
            id: detailsIdFa.id + 1,
            facilities_id: this.facilitiesItem.facilities_id,
            title: this.facilitiesItem.title,
            price: this.facilitiesItem.price,
            qty: this.facilitiesItem.qty,
            image: this.facilitiesItem.image,
            innitiated_date: this.facilitiesItem.innitiated_date,
            emp_ID: this.facilitiesItem.emp_ID,
            fullName: this.employData.lastName + " " + this.employData.firstName,
          });
          this.facilities = resFa;
          localStorage.setItem("facilities", JSON.stringify(resFa));
          this.dialog = false;
          this.showDialogCreateSuccess = true;
        } else {
          this.showDialogIdFail = true;
          this.dialog = false;
        }
      }
    },
    cancel() {
      this.showDialogDelete = false;
      this.showDialogCreateRequired = false;
      this.showDialogCreateSuccess = false;
      this.showDialogIdFail = false;
    },
    confirm() {
      this.showDialogDelete = false;
      this.showDialogDeleteSuccess = false;
      this.showDialogCreateRequired = false;
      this.showDialogCreateSuccess = false;
      this.showDialogIdFail = false;
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
.col-infoEm p {
  font-size: 15.5px;
}
</style>
