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
    <a-table
      :columns="columns"
      :data-source="dataIntroArticle"
      :pagination="false"
      :scroll="{x: 2170}"
      :row-key="(record) => record.ID"
      :loading="loading"
    >
      <span slot="action" slot-scope="text, record">
        <a-button type="primary" ghost>
          <nuxt-link :to="`/article/edit/${record.Slug}`">Edit</nuxt-link>
        </a-button>
        <a-divider type="vertical" />
        <a-button type="danger" ghost @click="deleteArticle(record.ID)">Delete</a-button>
      </span>
    </a-table>
    <div class="mt-3 float-right">
      <a-button v-if="isNext == true" type="primary" ghost @click="next">Next</a-button>
      <a-input v-model="page" style="width: 40px" />
      <a-button v-if="page > 1" @click="prev">Previous</a-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const columns = [
  { title: "ID", width: 70, dataIndex: "ID" },
  { title: "Author ID", width: 100, dataIndex: "User_Id" },
  { title: "Location", width: 150, dataIndex: "Location" },
  { title: "Background", dataIndex: "Image", width: 200 },
  { title: "Title", dataIndex: "Title", width: 220 },
  { title: "Slug", dataIndex: "Slug", width: 150 },
  { title: "Duration", dataIndex: "Duration", width: 100 },
  { title: "Price", dataIndex: "Price", width: 120 },
  { title: "Introduce", dataIndex: "Introduce", width: 250 },
  {
    title: "Number of people",
    dataIndex: "NumberOfPeople",
    width: 100
  },
  { title: "Avg rate", dataIndex: "AvgRate", width: 100 },
  {
    title: "Rate Amount",
    dataIndex: "RateAmount",
    width: 100
  },
  {
    title: "Created at",
    dataIndex: "created_at",
    width: 150
  },
  {
    title: "Updated at",
    dataIndex: "updated_at",
    width: 150
  },
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
  data() {
    return {
      columns,
      loading: false,
      page: 1,
      dataIntroArticle: [],
      query: "",
       isNext: true
    };
  },

  methods: {
    next() {
      this.page++;
      if (this.query) {
        this.$router.push({ query: { page: this.page, data: this.query } });
      } else {
        this.$router.push({ query: { page: this.page } });
      }
    },
    prev() {
      this.page--;
      if (this.query) {
        this.$router.push({ query: { page: this.page, data: this.query } });
      } else {
        this.$router.push({ query: { page: this.page } });
      }
    },

    async uploadData() {
      try {
        let response = "";
        if (this.query == "") {
          response = await axios.get(
            `https://cudidi-web.herokuapp.com/article/${this.page}&6`,
            {
              headers: {
                authorization: "Bearer " + this.$cookies.get("token")
              }
            }
          );
        } else {
          response = await this.$axios.get(
            `/article/search/${this.page}&6?data=${this.query}`,
            {
              headers: {
                authorization: "Bearer " + this.$cookies.get("token")
              }
            }
          );
        }
        if (response.data.status == 200 && response.data.data.length <= 0) {
          this.dataIntroArticle = response.data.data;
          return false;
        } else if (response.data.status == 200) {
          this.dataIntroArticle = response.data.data;
          console.log(response.data);
          if(response.data.totalRow < 10 * this.page) this.isNext = false
          return true;
        } else {
          this.$message.error(response.data.message, 8);
        }
      } catch (e) {
        console.log(e);
      }
    },

    searchData() {
      this.page = 1;
      this.$router.push({ query: { page: this.page, data: this.query } });
      this.uploadData();
    },

    async deleteArticle(IdArticle) {
      this.$confirm({
        title: "Do you want to delete this article?",
        content: "Click ok to submit",
        onOk: async () => {
          try {
            const { data } = await this.$axios.delete(`/article/${IdArticle}`, {
              headers: {
                authorization: "Bearer " + this.$cookies.get("token")
              }
            });
            if (data.status == 200) {
              this.dataIntroArticle = this.dataIntroArticle.filter(
                item => item.ID !== IdArticle
              );
            } else {
              this.$message.error(data.message, 8);
            }
          } catch (e) {
            console.log(e);
          }
        },
        onCancel() {}
      });
    }
  },

  watch: {
    async page(newVal, oldVal) {
      this.loading = true;
      const status = await this.uploadData();
      if (!status) {
        this.$info({
          title: "No more data",
          onOk: () => {
            this.page = oldVal;
          }
        });
      }
      if (this.query) {
        this.$router.push({ query: { page: this.page, data: this.query } });
      } else {
        this.$router.push({ query: { page: this.page } });
      }
      this.loading = false;
    }
  },

  async created() {
    this.loading = true;
    if (this.$route.query.page != null) {
      this.page = this.$route.query.page;
    }
    if (this.$route.query.data != null) {
      this.query = this.$route.query.data;
    }
    const status = await this.uploadData();
    if (!status) {
      this.page = 1;
    }
    this.loading = false;
  }
};
</script>
