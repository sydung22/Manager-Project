<template>
  <div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <h2
        class="mb-0
      "
      >
        Trang Chủ
      </h2>
      <v-btn color="success"> Giới Thiệu Công Ty </v-btn>
    </v-subheader>
    <br />
    <v-row>
      <v-col lg="7" cols="12">
        <v-alert dense text type="success">
          Xin Chào Bạn! Chào mừng bạn đến với <strong>Công Ty LH2D</strong>
        </v-alert>
        <v-row>
          <v-col lg="6" cols="12" v-for="(item, index) in activityLog" :key="index">
            <v-card elevation="2" class="rounded-lg">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <strong>{{ item.title }}</strong> <br />
                  <span>Cập nhật 3 tuần trước</span>
                </div>
                <v-avatar
                  size="60"
                  :color="item.color"
                  style="border: 3px solid #444"
                >
                  <span style="color: white">{{ item.amount }} +</span>
                </v-avatar>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between"> </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="5">
        <v-card>
          <v-card-title>Hoạt Động Gần Đây</v-card-title>
          <v-card-text class="py-0">
            <v-timeline align-top dense>
              <v-timeline-item color="indigo" small>
                <strong>5 Phút Trước</strong>
                <div class="text-caption">
                  Phòng Cơ Sở Vật Chất vừa thêm vật dụng mới
                </div>
              </v-timeline-item>
              <v-timeline-item color="green" small>
                <strong>35 Phút Trước</strong>
                <div class="text-caption mb-2">
                  Nhân viên phòng Marketing vừa được Giám Đốc giao nhiệm vụ
                </div>
              </v-timeline-item>

              <v-timeline-item color="indigo" small>
                <strong>44 Phút Trước</strong>
                <div class="text-caption">
                  Phòng Kiểm Toán đã hoàn thành lương cho nhân viên
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-data-table
            caption="Danh Sách Nhân Viên Xuất Xắc"
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:[`item.actions`]="">
              <v-btn color="success" outlined small shaped>View</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <popup
      :show="showAccess"
      :cancel="cancel"
      :confirm="confirm"
      text="Xin chào bạn ^^"
      title="Thông báo?"
      description="Bạn đã đăng nhập thành công !!!"
    ></popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Popup from "../components/Popup.vue";
// import axios from "axios";
export default {
  components: { Popup },
  name: "Dashboard",
  data() {
    return {
      activityLog: [
        {
          title: "Tổng số nhân viên",
          amount: 50,
          icon: "mdi-account",
          color: "cyan lighten-3",
        },
        {
          title: "Tổng số CSVC",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "green darken-2",
        },
        {
          title: "Tổng số phòng ban",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "blue-grey darken-1",
        },
        {
          title: "Tổng số chức vụ",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "deep-orange darken-1",
        },
      ],
      headers: [
        {
          text: "ID",
          align: "center",
          sortable: false,
          value: "id",
        },
        { text: "Tên Nhân Viên", align: "center", value: "nameEm" },
        { text: "Chức Vụ", align: "center", value: "position" },
        { text: "Phòng Ban", align: "center", value: "department" },
        { text: "Email", align: "center", value: "email" },
        { text: "Thành Tích", align: "center", value: "performance" },
      ],
      desserts: [
        {
          id: 1,
          nameEm: "Nguyễn Sỹ Dũng",
          position: "Admin",
          department: "Phòng Cơ Sở Vật Chất",
          email: "sydung@gmail.com",
          performance: "Admin tốt nhất công ty",
        },
        {
          id: 2,
          nameEm: "Trần Hữu Lương",
          position: "Nhân Viên",
          department: "Phòng Cơ Sở Vật Chất",
          email: "luongtran@gmail.com",
          performance: "Nhân Viên năng động nhất công ty",
        },
        {
          id: 3,
          nameEm: "Võ Trung Hiếu",
          position: "Nhân Viên",
          department: "Phòng Cơ Sở Vật Chất",
          email: "hieuvo@gmail.com",
          performance: "Nhân Viên hài hước nhất công ty",
        },
        {
          id: 4,
          nameEm: "Dương Thị Thùy Dung",
          position: "Nhân Viên",
          department: "Phòng Cơ Sở Vật Chất",
          email: "thuydung@gmail.com",
          performance: "Nhân Viên siêng năng nhất công ty",
        },
        {
          id: 5,
          nameEm: "Lê Doãn Chánh",
          position: "Trưởng Phòng",
          department: "Phòng Cơ Sở Vật Chất",
          email: "doanchanh@gmail.com",
          performance: "Trưởng Phòng 5 tốt",
        },
      ],
      emQty: 10,
    };
  },
  mounted() {
    // count employee
    const EmpData = JSON.parse(localStorage.getItem("employee"));
    this.activityLog[0].amount = EmpData.length;
    // count facilities
    const faciData = JSON.parse(localStorage.getItem("facilities"));
    let totalFaci = 0;
    faciData.forEach((el) => {
      totalFaci += Number(el.qty);
    });
    this.activityLog[1].amount = totalFaci;
    // count deparment
    const departData = JSON.parse(localStorage.getItem("departments"));
    this.activityLog[2].amount = departData.length;
    // count position
    const posiData = JSON.parse(localStorage.getItem("position"));
    this.activityLog[3].amount = posiData.length;
    const event = new Date();

    // British English uses day-month-year order and 24-hour time without AM/PM
    console.log(event.toLocaleString("en-GB", { timeZone: "UTC" }));
  },
  methods: {
    onButtonClick(item) {
      console.log("click on " + item.no);
    },
    cancel() {
      this.showAccess = false;
    },
    confirm() {
      this.$store.dispatch("actionSetDialog", false);
    },
  },
  computed: {
    ...mapState({
      showAccess: (state) => state.showDialog,
    }),
  },
};
</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
.elevation-1 {
  padding-top: 20px !important;
}
.v-data-table >>> td:nth-of-type(6) {
  max-width: 200px;
}
.v-data-table >>> td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
