<template>
  <div class="payment">
    <v-container class="container">
      <v-row>
        <v-col cols="12">
          <!-- <h1>employee list</h1> -->
          <v-card>
            <v-card-title>
              DANH SÁCH TIỀN LƯƠNG
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
                  <span class="text-h5">Thêm mới tiền lương</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          label="Mã Lương"
                          v-model="payList.payment_ID"
                          required
                          class="pt-1"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          label="Mã Nhân Viên"
                          v-model="payList.emp_ID"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          label="Lương Cơ Bản"
                          v-model="payList.amount"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          label="Lương Phụ Cấp"
                          v-model="payList.allowance"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="12" class="pb-0 pt-1">
                        <v-text-field
                          label="Chi Tiết"
                          v-model="payList.description"
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
                  <v-btn color="blue darken-1" text @click="createPayment">
                    Cập nhật
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-data-table
              :headers="header"
              :items="payment"
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
                  <v-dialog max-width="1200" persistent>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                        @click="DetailsPayment(item)"
                        >Chi Tiết <v-icon dark right> mdi-eye </v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:default="dialog">
                      <v-card>
                        <v-card-text class="pb-2">
                          <v-container class="px-0 pt-5 pb-0">
                            <h1 class="px-5 pt-5 pb-5 text-center primary--text">
                              Thông Tin Tiền Lương Nhân Viên
                            </h1>
                            <v-row align="start" justify="center">
                              <v-col cols="12" sm="4" class="text-center">
                                <v-avatar
                                  class="mb-2"
                                  color="grey darken-1"
                                  size="200"
                                  v-if="detailsEmployItem.imgUrl"
                                >
                                  <v-img
                                    aspect-ratio="30"
                                    :src="detailsEmployItem.imgUrl"
                                  />
                                </v-avatar>
                                <v-avatar
                                  class="mb-2"
                                  color="grey darken-1"
                                  size="250"
                                  v-else
                                >
                                  <v-img
                                    aspect-ratio="30"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv_8jyrBjic0ELBWNbA2JH7ufzOb3jkJvN8Q&usqp=CAU"
                                  />
                                </v-avatar>
                                <h2
                                  class="black--text mt-2 mb-6"
                                  v-if="
                                    detailsEmployItem.firstName &&
                                      detailsEmployItem.lastName
                                  "
                                >
                                  {{ detailsEmployItem.lastName }}
                                  {{ detailsEmployItem.firstName }}
                                </h2>
                                <h2 class="black--text mt-2 mb-6" v-else>
                                  Người dùng mới
                                </h2>
                                <v-row
                                  align="center"
                                  justify="center"
                                  v-for="(link, index) in linkUser"
                                  :key="index"
                                  class="mt-0 ms-5"
                                >
                                  <v-col cols="12" sm="2" class="text-end px-0 mb-2">
                                    <v-avatar
                                      class="mb"
                                      color="grey darken-1"
                                      size="30"
                                    >
                                      <v-img aspect-ratio="30" :src="link.imgUrl" />
                                    </v-avatar>
                                  </v-col>
                                  <v-col cols="12" sm="10" class="text-start">
                                    <h4 class="primary--text">
                                      {{ link.titleUrl }}
                                    </h4>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12" sm="4" class="text-center">
                                <v-form>
                                  <v-container>
                                    <v-row>
                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="ID"
                                          :value="detailsPaymentItem.id"
                                          required
                                          class="pt-1"
                                          readonly
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Mã Tiền Lương"
                                          :value="detailsPaymentItem.payment_ID"
                                          required
                                          class="pt-1"
                                          readonly
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Lương Cơ Bản"
                                          :value="detailsPaymentItem.amount"
                                          required
                                          readonly
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Lương Phụ Cấp"
                                          :value="detailsPaymentItem.allowance"
                                          required
                                          readonly
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Tổng Lương"
                                          :value="detailsPaymentItem.amount_total"
                                          required
                                          readonly
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Chi Tiết"
                                          :value="detailsPaymentItem.description"
                                          required
                                          readonly
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Mã Nhân Viên"
                                          :value="detailsPaymentItem.emp_ID"
                                          required
                                          readonly
                                        ></v-text-field>
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-form>
                              </v-col>
                              <v-col cols="12" sm="4" class="text-center">
                                <v-form>
                                  <v-container>
                                    <v-row>
                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Email"
                                          :value="detailsPaymentItem.email"
                                          required
                                          readonly
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Tên Nhân Viên"
                                          :value="detailsPaymentItem.fullName"
                                          required
                                          readonly
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12" md="12" class="pb-0 pt-1">
                                        <v-text-field
                                          label="Chức Vụ"
                                          :value="detailsPaymentItem.role"
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
      :confirm="confirmSuccess"
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
      :confirm="confirmSuccess"
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
          text: "Mã Tiền Lương",
          value: "payment_ID",
          align: "center",
        },
        {
          text: "Email",
          value: "email",
          align: "center",
        },
        {
          text: "Tên Nhân Viên",
          value: "fullName",
          align: "center",
        },
        {
          text: "Chức Vụ",
          value: "role",
          align: "center",
        },
        {
          text: "Tổng Lương",
          value: "amount_total",
          align: "center",
        },
        {
          text: "Chi Tiết",
          value: "description",
          align: "center",
        },
        {
          text: "Chức Năng",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      payment: [],
      listRole: [],
      dialog: false,
      search: "",
      roleEm: "",
      deleteId: 0,
      detailsId: 0,
      detailsPaymentItem: {},
      detailsEmployItem: {},
      employData: {},
      showDialogDelete: false,
      showDialogDeleteSuccess: false,
      showDialogCreateRequired: false,
      showDialogCreateSuccess: false,
      showDialogIdFail: false,
      payList: {
        id: "",
        payment_ID: "",
        emp_ID: "",
        email: "",
        firstName: "",
        amount: "",
        allowance: "",
        amount_total: "",
        role: "",
        description: "",
      },
      linkUser: [
        {
          imgUrl:
            "https://br.atsit.in/vi/wp-content/uploads/2021/06/anh-facebook-khong-tai-hoac-khong-hien-thi-loi-khong-the-ket-noi-bat-len-ban-khong-don-doc.png",
          titleUrl: "https://www.facebook.com/",
        },
        {
          imgUrl:
            "https://is1-ssl.mzstatic.com/image/thumb/Purple118/v4/90/96/fc/9096fc60-7d7f-b8a1-f152-882c02811ddc/AppIcon_v3-85-220-4-2x.png/1200x630bb.png",
          titleUrl: "https://www.google.com/intl/vi/gmail/about/",
        },
        {
          imgUrl:
            "https://cdn.pixabay.com/photo/2017/08/05/11/24/logo-2582757__480.png",
          titleUrl: "https://github.com/",
        },
        {
          imgUrl:
            "https://image.similarpng.com/very-thumbnail/2020/05/Glossy-Instagram-icon-PNG.png",
          titleUrl: "https://www.instagram.com/",
        },
      ],
    };
  },
  async mounted() {
    const dataLogin = JSON.parse(localStorage.getItem("user-info"));
    this.roleEm = dataLogin.role;
    if (dataLogin.role == "Nhân Viên") {
      // const dataPay = JSON.parse(localStorage.getItem("payment"));
      // const resEm = dataPay.filter((el) => el.email === this.detailsItem.email);
      const dataEm = JSON.parse(localStorage.getItem("employee"));
      const detailsEm = dataEm.find((el) => el.email === dataLogin.email);
      const dataPay = JSON.parse(localStorage.getItem("payment"));
      const detailsPay = dataPay.filter((el) => el.emp_ID === detailsEm.emp_ID);
      this.payment = detailsPay;
    } else {
      const res = JSON.parse(localStorage.getItem("payment"));
      this.payment = res;
    }
  },
  methods: {
    async DetailsPayment(item) {
      this.detailsId = item.id;
      const resData = JSON.parse(localStorage.getItem("payment"));
      const details = [...resData].find((el) => el.id === this.detailsId);
      this.detailsPaymentItem = details;
      const dataEm = JSON.parse(localStorage.getItem("employee"));
      const resEm = [...dataEm].find(
        (el) => el.emp_ID === this.detailsPaymentItem.emp_ID
      );
      this.detailsEmployItem = resEm;
    },
    handleRow(item) {
      this.deleteId = item.id;
      this.showDialogDelete = true;
    },
    async handleDelete() {
      const resDataPay = JSON.parse(localStorage.getItem("payment"));
      const indexDel = resDataPay.findIndex((el) => el.id === this.deleteId);
      resDataPay.splice(indexDel, 1);
      this.payment = resDataPay;
      localStorage.setItem("payment", JSON.stringify(resDataPay));
      this.showDialogDelete = false;
      this.showDialogDeleteSuccess = true;
    },
    async createPayment() {
      if (
        this.payList.payment_ID == "" ||
        this.payList.emp_ID == "" ||
        this.payList.amount == "" ||
        this.payList.allowance == "" ||
        this.payList.description == ""
      ) {
        this.showDialogCreateRequired = true;
        this.dialog = false;
      } else {
        // const resEm = await axios.get(
        //   `${process.env.VUE_APP_SERVER_URL}/employee?emp_ID=${this.payList.emp_ID}`
        // );
        // this.employData = resEm.data[0];
        const datalocal = JSON.parse(localStorage.getItem("employee"));
        const resEm = [...datalocal].find((el) => el.emp_ID === this.payList.emp_ID);
        this.employData = resEm;
        if (this.employData) {
          // await axios.post(`${process.env.VUE_APP_SERVER_URL}/payment`, {
          //   payment_ID: this.payList.payment_ID,
          //   emp_ID: this.payList.emp_ID,
          //   email: this.employData.email,
          //   fullName: this.employData.lastName + " " + this.employData.firstName,
          //   amount: this.payList.amount,
          //   allowance: this.payList.allowance,
          //   amount_total:
          //     Number(this.payList.amount) + Number(this.payList.allowance),
          //   role: this.employData.role,
          //   description: this.payList.description,
          // });
          const resPay = JSON.parse(localStorage.getItem("payment"));
          const detailsIdFa = resPay[resPay.length - 1];
          resPay.push({
            id: detailsIdFa.id + 1,
            payment_ID: this.payList.payment_ID,
            emp_ID: this.payList.emp_ID,
            email: this.employData.email,
            fullName: this.employData.lastName + " " + this.employData.firstName,
            amount: this.payList.amount,
            allowance: this.payList.allowance,
            amount_total:
              Number(this.payList.amount) + Number(this.payList.allowance),
            role: this.employData.role,
            description: this.payList.description,
          });
          this.payment = resPay;
          localStorage.setItem("payment", JSON.stringify(resPay));
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
      this.showDialogCreateRequired = false;
      this.showDialogIdFail = false;
    },
    confirmSuccess() {
      this.showDialogCreateSuccess = false;
      this.showDialogDeleteSuccess = false;
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
.v-dialog > .v-card > .v-card__actions {
  padding: 0 26px 20px;
}
</style>
