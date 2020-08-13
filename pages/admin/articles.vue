<template>
  <div>
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
      <a-button type="primary" ghost @click="next">Next</a-button>
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
    title: "Peoples",
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
      dataIntroArticle: []
    };
  },

  methods: {
    next() {
      this.page++;
    },
    prev() {
      this.page--;
    },

    async uploadData() {
      try {
        const { data } = await axios.get(
          `https://cudidi-web.herokuapp.com/article/${this.page}&6`,
          {
            headers: {
              authorization: "Bearer " + this.$cookies.get("token")
            }
          }
        );
        if (data.status == 200 && data.data.length <= 0) {
          this.dataIntroArticle = data.data;
          return false;
        } else if (data.status == 200) {
          this.dataIntroArticle = data.data;
          return true;
        } else {
          this.$message.error(data.message, 8);
        }
      } catch (e) {
        console.log(e);
      }
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
      this.$router.push({ query: { page: this.page } });
      this.loading = false;
    }
  },

  async created() {
    this.loading = true;
    if (this.$route.query.page != null) {
      this.page = this.$route.query.page;
    }
    const status = await this.uploadData();
    if (!status) {
      this.page = 1;
    }
    this.loading = false;
  }
};
</script>
