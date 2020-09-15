<template>
  <div class="page-article" v-if="introductionArticle">
    <HeaderPage :bgImgHeader="introductionArticle.Image">
      <template slot="aboveSearchBar">
        <div class="d-inline-block mb-3">
          <h1 class="text-white" style="width: 900px;">{{ introductionArticle.Title }}</h1>
        </div>
        <div class="d-flex align-items-center">
          <a-avatar
            :size="80"
            class="avatar-header object-fit--contain mr-2"
            :src="author.Avatar ? author.Avatar : ''"
            :icon="author.Avatar ? '' : 'user'"
            style="font-size: 30px;"
          ></a-avatar>
          <span>
            <nuxt-link :to="`/user/${author.Slug}`">
              <h2 class="text-white">{{ author.FullName }}</h2>
            </nuxt-link>
            <p
              class="text-white m-0 font--20"
            >{{ moment(introductionArticle.updated_at).format('YYYY-MM-DD') }}</p>
          </span>
          <div class="ml-auto text-white font--25 text-right">
            <span>
              {{ introductionArticle.Price }}
              <a-icon type="dollar" class="mr-1" />
            </span>
            <span>
              {{ introductionArticle.Duration }}
              <a-icon type="calendar" class="mr-1" />
            </span>
            <span>
              {{ introductionArticle.NumberOfPeople }}
              <a-icon type="user" />
            </span>
            <br />
            <span>
              <a-rate v-model="introductionArticle.AvgRate" allow-half disabled class="mr-2" />
            </span>
          </div>
        </div>
      </template>
    </HeaderPage>
    <div class="body-page-article my-5">
      <div class="row pt-5 justify-content-between">
        <div class="col-8">
          <div class="mb-5 pb-3">
            <h6 class="text-justify" v-html="'<span>'+introductionArticle.Introduce+ '</span>'">{{ introductionArticle.Introduce }}</h6>
          </div>
        </div>
        <div class="col-8" style="padding-top:17px;">
          <div class="mb-5">
            <a-divider>
              <h4>Diary</h4>
            </a-divider>
            <a-tabs>
              <a-tab-pane v-for="item in descriptionArticle" :key="item.ID" :tab="item.Place">
                <span v-html="item.Description"></span>
              </a-tab-pane>
            </a-tabs>
          </div>
          <div>
            <a-divider style="background: black;"></a-divider>
            <a-card class="border-0 mb-3">
              <template slot="actions" class="ant-card-actions">
                <a-popover>
                  <template slot="content">
                    <a-rate
                      allow-half
                      @change="(value) => rateArticle(value, introductionArticle.ID)"
                    />
                  </template>
                  <a-icon key="rate" type="star" class="font--20" />
                </a-popover>
                <a-icon key="comment" type="edit" class="font--20" />
              </template>
            </a-card>
            <div class="col-9 mr-auto ml-auto">
              <comment :IdArticle="introductionArticle.ID" colorText="black"></comment>
            </div>
          </div>
        </div>

        <div class="col-3">
          <div class="container-related-articles position-sticky" style="top: 20px">
            <h5>Related articles</h5>
            <a-divider></a-divider>
            <template v-for="item in articlesRelation">
              <a-popover placement="bottom" :key="item.Slug">
                <template slot="content">
                  <img :src="item.Image" height="200px" width="350px" alt />
                </template>
                <nuxt-link :to="`/article/${item.Slug}`">
                  <h6 class="mb-3">{{ item.Title }}</h6>
                </nuxt-link>
              </a-popover>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import HeaderPage from "@/components/common/HeaderPage";
import comment from "@/components/common/Comment";
export default {
  components: {
    HeaderPage,
    comment
  },
  data() {
    return {
      moment
    };
  },

  methods: {
    checkLogged() {
      if (!this.$store.state.user.authUser) {
        this.$confirm({
          title: "Login to review the article",
          onOk: () => {
            this.$router.push("/auth/login");
          },
          onCancel: () => {

          }
        });
        return false
      }
      return true
    },

    async rateArticle(Rate, Article_Id) {
      if(!this.checkLogged()) {
        this.value = "";
        return
      }
      let value = {
        Rate,
        Article_Id
      };
      const { data } = await this.$axios.post("/rating/create", value, {
        headers: {
          authorization: "Bearer " + this.$cookies.get("token")
        }
      });
      if (data.status == 201) {
        this.introductionArticle.AvgRate = data.data.AvgRate;
      }
    }
  },

  async asyncData({ params, error }) {
    try {
      const infoArticle = await axios.get(`https://cudidi-web.herokuapp.com/article/description/${params.slug}`);
      if (infoArticle.status == 404) {
        error({ statusCode: 404 });
      }
      const infoArticlesRelation = await axios.get(`https://cudidi-web.herokuapp.com/article/relation/${params.slug}`);
      return {
        author: infoArticle.data.data.users,
        introductionArticle: infoArticle.data.data.articles,
        descriptionArticle: infoArticle.data.data.descriptionArticles,
        articlesRelation: infoArticlesRelation.data.data
      };
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
<style scoped>
.anticon {
  vertical-align: 0.125em;
}

.body-page-article {
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
}

.ant-divider-horizontal.ant-divider-with-text-center::before,
.ant-divider-horizontal.ant-divider-with-text-center::after {
  border-top: solid 1px black;
}

.container-related-articles >>> .ant-divider {
  background: black;
}

.page-article >>> .ant-tabs-nav .ant-tabs-tab-active,
.page-article >>> .ant-tabs-nav .ant-tabs-tab:hover {
  color: black;
}

.page-article >>> .ant-tabs-ink-bar {
  background-color: black;
}

.page-article >>> .ant-card-actions {
  border: none;
  background: white;
}

.ant-card-actions > li > span > .anticon {
  font-size: 22px;
}
</style>
