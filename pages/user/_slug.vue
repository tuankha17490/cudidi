<template>
  <div class="container-profile">
    <HeaderPage :searchBar="true">
      <template slot="aboveSearchBar">
        <h1 class="text-white">Profile</h1>
      </template>
    </HeaderPage>
    <div class="text-center mb-5">
      <a-avatar
        :size="180"
        class="avatar-header"
        :src="profile.Avatar ? profile.Avatar : ''"
        :icon="`${profile.Avatar ? '' : 'user'}`"
        style="margin-top: -90px; font-size: 70px;"
      ></a-avatar>
      <h2 class="mt-3">{{ profile.FullName }}</h2>
    </div>

    <div class="container mb-5">
      <div class="row">
        <div class="col-5">
          <div class="position-sticky" style="top: 20px;">
            <a-card
              title="Activity"
              class="w-100 border-radius--10 bg-main-color"
              :headStyle="{color: 'white', fontSize: '21px'}"
              :bodyStyle="{color: 'white', fontSize: '18px'}"
            >
              <div style="margin-bottom: 1em;">
                20 Articles
                <a-divider type="vertical" />3222 Like
                <a-divider type="vertical" />140 Ratings
              </div>

              <div style="margin-bottom: 0.75em;">
                20 Locations
                <a-divider type="vertical" />70 Days
              </div>
              <div style="margin-bottom: 1em;">
                <a-rate :default-value="2.5" allow-half disabled />
              </div>
            </a-card>
            <br />
            <a-card
              title="Profile"
              class="w-100 border-radius--10 bg-main-color"
              :headStyle="{color: 'white', fontSize: '21px'}"
              :bodyStyle="{color: 'white', fontSize: '18px'}"
            >
              <p v-if="profile.Address">
                <a-icon type="home" />
                {{ profile.Address }}
              </p>
              <p v-if="profile.BirthDay">
                <a-icon type="calendar" />
                {{ moment(profile.BirthDay).format('YYYY-MM-DD') }}
              </p>
              <p v-if="profile.Email">
                <a-icon type="mail" />
                {{ profile.Email }}
              </p>
              <p v-if="profile.PhoneNumber">
                <a-icon type="phone" />
                {{ profile.PhoneNumber }}
              </p>
              <p  v-if="profile.linkFacebook">
                <a-icon type="facebook" />
                <a style="color:white" :href="profile.linkFacebook" target="_blank">Visit profile of you on facebook</a>
              </p>
            </a-card>
          </div>
        </div>

        <div class="col-7">
          <nuxt-link to="/article/create">
            <a-card
              class="w-100 border-radius--10 bg-main-color"
              :bodyStyle="{color: 'white', fontSize: '18px', textAlign: 'center'}"
            >
              <p class="mb-0 d-inline">
                Let start a new trip
                <a-icon class="ml-1" type="right-circle" />
              </p>
            </a-card>
          </nuxt-link>
          <br />

          <div v-for="item in listArticles" :key="item.Slug">
            <a-card class="w-100 border-radius--10 bg-main-color" :bodyStyle="{color: 'white'}">
              <div class="d-flex align-items-center mb-3">
                <a-avatar
                  size="large"
                  :src="profile.Avatar ? profile.Avatar : ''"
                  :icon="`${profile.Avatar ? '' : 'user'}`"
                  class="mr-2"
                ></a-avatar>
                <span>
                  <h6 class="text-white">{{ profile.FullName }}</h6>
                  <p class="mb-0">{{ moment(item.created_at).fromNow() }}</p>
                </span>
                <div class="ml-auto text-right" v-if="$store.state.user.authUser && profile.ID == $store.state.user.authUser.ID">
                  <a-popover placement="right">
                    <template slot="content">
                      <a-button ghost type="link" class="text-dark mb-2">
                        <nuxt-link :to="`/article/edit/${item.Slug}`" class="text-dark">Edit article</nuxt-link>
                      </a-button>
                      <br />
                      <a-button
                        ghost
                        type="link"
                        class="text-dark"
                        @click="deleteArticle(item.ID)"
                      >Delete article</a-button>
                    </template>
                    <a-button ghost type="link">
                      <a-icon type="ellipsis" class="font--35" />
                    </a-button>
                  </a-popover>
                </div>
              </div>

              <nuxt-link :to="`/article/${item.Slug}`">
                <img :src="item.Image" class="w-100 img-article" />
              </nuxt-link>
              <div class="p-4 mb-3 border container-introduce">
                <nuxt-link :to="`/article/${item.Slug}`">
                  <h5 class="text-white mb-2">{{ item.Title }}</h5>
                </nuxt-link>
                <p class="font--18 mb-0">{{ item.Introduce }}</p>
              </div>
              <div>
                <span class="font--18">
                  {{ item.AvgRate }}/5
                  <a-icon type="star"></a-icon>
                </span>

                <div class="float-right font--18">
                  <span>
                    {{ item.Price }}
                    <a-icon type="dollar" class="mr-1" />
                  </span>
                  <span>
                    {{ item.Duration }}
                    <a-icon type="calendar" class="mr-1" />
                  </span>
                  <span>
                    {{ item.NumberOfPeople }}
                    <a-icon type="user" />
                  </span>
                </div>
              </div>
              <template slot="actions" class="ant-card-actions">
                <a-popover>
                  <template slot="content">
                    <a-rate allow-half @change="(value) => rateArticle(value, item.ID)" />
                  </template>
                  <a-icon key="rate" type="star" class="text-white" />
                </a-popover>
                <a-icon key="comment" type="edit" class="text-white" />
              </template>
            </a-card>

            <div class="container-comment">
              <a-card
                class="w-100 bg-main-color"
                :bodyStyle="{color: 'white'}"
                style="min-height: 30px;"
              >
                <div class="text-center">
                  <comment :IdArticle="item.ID" colorText="white"></comment>
                </div>
              </a-card>
            </div>
            <br />
          </div>
          <client-only>
            <infinite-loading spinner="spiral" @infinite="infiniteScroll">
              <span slot="no-more">No more data</span>
            </infinite-loading>
          </client-only>
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
      profile: "",
      listArticles: [],
      lastIdArticle: 0,
      moment
    };
  },

  async asyncData({ params, error }) {
    try {
      const { data } = await axios.get(
        `https://cudidi-web.herokuapp.com/user/article/${params.slug}&0&2`
      );
      if (data.status == 200) {
        const profile = data.data.user;
        let listArticles = data.data.articles;
        const lastIdArticle = data.data.lastID;
        return {
          profile,
          listArticles,
          lastIdArticle
        };
      } else if (data.status == 400) {
        error({ statusCode: 404 });
      }
    } catch (e) {
      console.log(e);
    }
  },

  methods: {
    infiniteScroll($state) {
      setTimeout(async () => {
        try {
          const { data } = await this.$axios.get(
            `user/article/${this.$route.params.slug}&${this.lastIdArticle}&2`
          );
          if (data.status == 200 && data.data.articles.length > 0) {
            data.data.articles.forEach(item => {
              this.listArticles.push(item);
            });
            this.lastIdArticle = data.data.lastID;
            $state.loaded();
          } else {
            $state.complete();
          }
        } catch (e) {
          console.log(e);
        }
      }, 500);
    },

    async deleteArticle(IdArticle) {
      try {
        const { data } = await this.$axios.delete(`/article/${IdArticle}`, {
          headers: {
            authorization: "Bearer " + this.$cookies.get("token")
          }
        });
        if (data.status == 200) {
          this.listArticles = this.listArticles.filter(
            item => item.ID !== IdArticle
          );
        } else {
          this.$message.error(data.message, 8);
        }
      } catch (e) {
        console.log(e);
      }
    },

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
        for (let i = 0; i < this.listArticles.length; i++) {
          if (this.listArticles[i].ID == data.data.Article_Id) {
            this.listArticles[i].AvgRate = data.data.AvgRate;
            return;
          }
        }
      }
    }
  }
};
</script>
<style scoped>
.avatar-header {
  border-radius: 100%;
  border: solid 7px white;
}

.container-profile >>> .anticon {
  vertical-align: 0.125em;
}

.anticon-right-circle {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  animation: leftToRight 1s linear 0s infinite alternate;
}

.container-profile >>> .ant-card-actions {
  background: #5bd0c3;
}

.ant-card-actions > li > span > .anticon {
  font-size: 22px;
}

.img-article {
  height: 350px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.container-comment >>> .ant-card-bordered,
.container-introduce {
  border-top: none !important;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

@keyframes leftToRight {
  0% {
    left: calc(50% + 95px);
  }
  50% {
    left: calc(50% + 85px);
  }
  100% {
    left: calc(50% + 95px);
  }
}
</style>


