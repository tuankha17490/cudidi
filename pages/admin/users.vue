<template>
  <div>
    <div class="mb-3">
      <a-input-search
        placeholder="input username"
        style="width: 200px"
        @search="searchData"
        v-model="query"
      />
    </div>
    <a-table :columns="columns" :data-source="data" :pagination="false">
      <span slot="action" slot-scope="text, record">
        <a-button type="primary" ghost @click="() => showFormEdit(record.key)">Edit</a-button>
        <a-divider type="vertical" />
        <a-button type="danger" ghost @click="showConfirmDelete(record.key)">Delete</a-button>
      </span>
    </a-table>
    <div class="mt-3 float-right">
      <a-button v-if="isNext == true" type="primary" ghost @click="next">Next</a-button>
      <a-input v-model="Page" style="width: 40px" />
      <a-button v-if="Page > 1" @click="prev">Previous</a-button>
    </div>
    <a-modal
      v-model="modalFormEdit"
      :title="`Edit user ${IdUserIsPicked}`"
      :footer="null"
      :destroyOnClose="true"
    >
      <FormEditUser :infoUser="infoUser" :handleSubmit="editByAdmin"></FormEditUser>
    </a-modal>
  </div>
</template>
<script>
import FormEditUser from "@/components/v-form/FormEditUser";
import moment from "moment";
const columns = [
  { title: "ID", width: 70, dataIndex: "ID", key: "ID" },
  { title: "Username", width: 150, dataIndex: "Username", key: "Username" },
  { title: "Birthday", width: 150, dataIndex: "BirthDay", key: "BirthDay" },
  { title: "Email", dataIndex: "Email", key: "Email", width: 150 },
  { title: "Full name", dataIndex: "FullName", key: "Fullname", width: 150 },
  { title: "Address", dataIndex: "Address", key: "Address", width: 150 },
  { title: "Phone", dataIndex: "PhoneNumber", key: "PhonenNumber", width: 150 },
  {
    title: "Action",
    key: "action",
    width: 210,
    scopedSlots: { customRender: "action" }
  }
];

export default {
  layout: "admin",
  middleware: "isAdmin",
  components: {
    FormEditUser
  },
  data() {
    return {
      data: [],
      columns,
      modalFormEdit: false,
      Page: 1,
      query: "",
      infoUser: Object,
      IdUserIsPicked: null,
      isNext: true
    };
  },
  methods: {
    next() {
      this.Page++;
      if(this.query) {
      this.$router.push({ query: { Page: this.Page, data: this.query } });
      }
      else {
      this.$router.push({ query: { Page: this.Page } });
      }
    },
    prev() {
      this.Page--;
      if(this.query) {
      this.$router.push({ query: { Page: this.Page, data: this.query } });
      }
      else {
      this.$router.push({ query: { Page: this.Page } });
      }
    },

    async uploadDataTable() {
      try {
        let response = "";
        if (this.query == "") {
          response = await this.$axios.get(`/user/${this.Page}&10`, {
            headers: {
              authorization: "Bearer " + this.$cookies.get("token")
            }
          });
        } else {
          response = await this.$axios.get(
            `/user/search/${this.Page}&10?data=${this.query}`,
            {
              headers: {
                authorization: "Bearer " + this.$cookies.get("token")
              }
            }
          );
        }
        const listUser = response.data.data.map(item => ({
          key: item.ID,
          ID: item.ID,
          FullName: item.FullName,
          Username: item.Username,
          BirthDay: moment(item.BirthDay).format("YYYY-MM-DD"),
          Email: item.Email,
          PhoneNumber: item.PhoneNumber,
          Address: item.Address
        }));
        this.data = listUser;
        console.log(response.data);
        if(response.data.totalRow < 10 * this.Page) this.isNext = false
      } catch (e) {
        console.log(e);
      }
    },

    async searchData() {
      this.Page = 1;
      this.$router.push({ query: { Page: this.Page, data: this.query } });
      this.uploadDataTable();
    },

    showFormEdit(key) {
      const target = this.data.filter(item => key === item.key)[0];
      this.infoUser = target;
      this.infoUser.PageAdmin = true;
      this.IdUserIsPicked = target.ID;
      this.modalFormEdit = true;
    },

    editByAdmin(form) {
      form.validateFields(async (err, values) => {
        if (!err) {
          try {
            let infoUser = {
              FullName: values.FullName.trim(),
              Email: values.Email.trim(),
              Address: values.Address.trim(),
              Username: values.Username.trim(),
              PhoneNumber: values.PhoneNumber.trim(),
              BirthDay: moment(values.BirthDay).format("YYYY-MM-DD")
            };
            if (values.checkboxEditPassword) {
              infoUser.Password = values.Password;
            }
            const { data } = await this.$axios.put(
              `user/${this.IdUserIsPicked}`,
              infoUser,
              {
                headers: {
                  authorization: "Bearer " + this.$cookies.get("token")
                }
              }
            );
            if (data.status == 200) {
              this.$message.success("Profile update successful!", 8);
              this.uploadDataTable();
              this.modalFormEdit = false;
            } else {
              this.$message.error(data.message, 8);
            }
          } catch (e) {
            console.log(e);
          }
        }
      });
    },

    showConfirmDelete(key) {
      this.IdUserIsPicked = this.data.filter(item => key === item.key)[0].ID;
      this.$confirm({
        title: "Do you want to delete these items?",
        content: "Click ok to submit",
        onOk: async () => {
          const { data } = await this.$axios.delete(
            `user/${this.IdUserIsPicked}`,
            {
              headers: {
                authorization: "Bearer " + this.$cookies.get("token")
              }
            }
          );
          if (data.status == 200) {
            this.$message.success("Delete successful!", 8);
            this.data = this.data.filter(item => item.key !== key);
          } else {
            this.$message.error(data.message, 8);
          }
        },
        onCancel() {}
      });
    }
  },

  created() {
    if (this.$route.query.Page != null) {
      this.Page = this.$route.query.Page;
    }

    if (this.$route.query.data != null) {
      this.query = this.$route.query.data;
    }

    this.uploadDataTable();
  },

  watch: {
    Page() {
      this.uploadDataTable();
    }
  }
};
</script>
