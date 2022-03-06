<template>
  <div class="create-article">
    <a-spin :spinning="spinning">
      <Header-page>
        <template slot="aboveSearchBar">
          <h1 class="text-white mb-5">
            Edit your own
            <br />trip
          </h1>
        </template>
        <template slot="belowSearchBar">
          <a-steps :current="current" @change="onChange">
            <a-step v-for="(item, index) in 4" :key="index + 1"></a-step>
          </a-steps>
        </template>
      </Header-page>
      <div class="container mt-5">
        <FormCreateArticleGeneral
          @updateStepAndCurrent="updateStepAndCurrent"
          v-show="current == 0"
        ></FormCreateArticleGeneral>
        <FormEditLocation v-if="current == 1" @updateCurrent="current = $event"></FormEditLocation>
        <template v-if="$store.state.article.articleIntroduction">
          <template v-for="(item, index) in $store.state.article.articleIntroduction.Duration">
            <Form-by-day
              :key="index"
              v-if="current == 2 && location == index + 1"
              :day="index + 1"
              @updateLocation="location = $event"
            ></Form-by-day>
          </template>
        </template>
        <div v-if="current == 3" class="text-center">
          <h3 class="mb-4">Now! Share your trip to everyone</h3>
          <a-button size="large" type="primary" @click="submitArticle">Share your trip</a-button>
        </div>
      </div>
    </a-spin>
  </div>
</template>
<style scoped>
.ant-steps {
  display: block;
}
.create-article >>> .ant-steps-item {
  margin-right: 0;
}

.create-article >>> .ant-steps-item-icon {
  border-radius: 10px;
  height: 45px;
  width: 45px;
  line-height: 45px;
  margin-right: 0;
  border: 0;
}
.ant-steps-item-process >>> .ant-steps-item-icon {
  background: #e56d62;
}
</style>
<script>
import axios from "axios";
import HeaderPage from "@/components/common/HeaderPage";
import FormCreateArticleGeneral from "@/components/v-form/FormCreateArticleGeneral";
import FormByDay from "@/components/v-form/FormByDay";
import FormEditLocation from "@/components/v-form/FormEditLocation";
export default {
  components: {
    HeaderPage,
    FormCreateArticleGeneral,
    FormByDay,
    FormEditLocation
  },
  middleware: "authenticated",
  data() {
    return {
      current: 0,
      location: 1,
      spinning: false
    };
  },

  async asyncData({ params, store, error, $axios }) {
    try {
      const { data } = await $axios.get(
        `/article/description/${params.slug}`
      );
      if (data.status == 200) {
        if (
          store.state.user.authUser.ID == data.data.users.ID ||
          store.state.user.authUser.ID == 1
        ) {
          store.dispatch("setIntroductionArticle", data.data.articles);
          store.dispatch("setContentArticle", data.data.descriptionArticles);
          return {
            steps: data.data.articles.Duration + 1,
            oldDuration: data.data.articles.Duration
          };
        } else {
          error({ statusCode: 403 });
        }
      } else if (data.status == 404) {
        error({ statusCode: 404 });
      }
    } catch (e) {
      console.log(e);
    }
  },

  methods: {
    onChange(current) {
      this.current = current;
    },
    updateStepAndCurrent(...args) {
      [this.current, this.steps] = args;
    },
    changeSpinning() {
      this.spinning = !this.spinning;
    },
    async submitArticle() {
      let IntroArticle = this.$store.state.article.articleIntroduction;
      try {
        this.changeSpinning();
        const { data } = await this.$axios.put(
          `/article/${this.$route.params.slug}`,
          IntroArticle,
          {
            headers: {
              authorization: "Bearer " + this.$cookies.get("token")
            }
          }
        );

        if (data.status == 200) {
          this.postDescriptionArticle(data.data.ID);
        } else {
          this.$message.error('a', data.message, 8);
          this.changeSpinning();
        }
      } catch (e) {
        this.$message.error(e, 8);
        this.changeSpinning();
      }
    },

    async postDescriptionArticle(ArticleId) {
      let descriptions = this.$store.state.article.articleDescription;
      descriptions.forEach((item, index) => {
        descriptions[index].Day = index + 1;
      });
      const values = {
        descriptions
      }
        try {
          const { data } = await this.$axios.put(
            `/description-article/${ArticleId}`,
            values,
            {
              headers: {
                authorization: "Bearer " + this.$cookies.get("token")
              }
            }
          );
          console.log('c', data)
          if(data.status == 201) {
            this.postArticleSuccess()
          }
          else {
            this.$message.error(data.message, 8);
          }
        } catch (e) {
          this.$message.error(e, 8);
        }
      this.changeSpinning();
    },

    postArticleSuccess() {
      this.$success({
        title: "Your article has been uploaded",
        onOk: () => {
          this.$router.push("/home");
        },
        okText: "Go to Homepage"
      });
    }
  },

  watch: {
    location(val) {
      if (val == 0) {
        this.current = 1;
        this.location = 1;
      }
      if (val > this.$store.state.article.articleIntroduction.Duration) {
        this.current = 3;
      }
    }
  },

  beforeDestroy() {
    this.$store.dispatch("clearDataArticle");
  }
};
</script>
