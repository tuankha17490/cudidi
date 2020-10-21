<template>
  <div>
    <HeaderPage :searchBar="true">
      <template slot="aboveSearchBar">
        <h1 class="text-white">
          Explore everywhere
          <br />you want
        </h1>
      </template>
    </HeaderPage>
    <div class="container-fuild m-5">
      <div class="row justify-content-around mx-5 py-5">
        <div class="col-11">
          <a-divider class="mb-5">
            <h2>Featured articles</h2>
          </a-divider>
        </div>
        <template v-for="(item, index) in listFeaturedArticles">
          <div :class="`${index == 0 ? 'col-7 mb-5' : 'col-3 mb-5'}`" :key="index">
            <nuxt-link :to="`/article/${item.Slug}`">
              <img :src="item.Image" alt style="height: 400px;" class="w-100 border-radius--15" />
              <h4 class="mt-3">{{ item.Title }}</h4>
            </nuxt-link>
            <div class="mt-1">
              <h5 class="d-inline">{{item.Location}}</h5>
              <div class="float-right text-danger">
                <span>
                  {{ item.Price }}
                  <a-icon type="dollar" class="font--18" />
                </span>
                <span>
                  {{ item.Duration }}
                  <a-icon type="calendar" class="font--18" />
                </span>
                <span>
                  {{ item.NumberOfPeople }}
                  <a-icon type="user" class="font--18" />
                </span>
              </div>
              <p class="mb-0 line-clamp">{{ item.Introduce }}</p>
              <div>
                <a-rate v-model="item.AvgRate" allow-half disabled />
                <span class="float-right mb-0">{{ item.RateAmount }} Ratings</span>
              </div>
            </div>
          </div>
        </template>

        <div class="col-11">
          <a-divider class="my-5">
            <h2>Latest articles</h2>
          </a-divider>
        </div>
        <div class="col-11 container-slide-latest-articles">
          <a-carousel :dots="false" autoplay arrows>
            <div slot="prevArrow" class="custom-slick-arrow" style="left: 20px;zIndex: 1">
              <a-icon type="left-circle" />
            </div>
            <div slot="nextArrow" class="custom-slick-arrow" style="right: 20px">
              <a-icon type="right-circle" />
            </div>
            <div v-for="(slide, indexSlide) in (listLatestArticles.length / 3)" :key="slide.ID">
              <div class="row m-0">
                <template v-for="(item, indexItem) in listLatestArticles">
                  <div
                    class="col-4 mb-5"
                    :key="indexItem"
                    v-show="(indexItem < indexSlide * 3 + 3) && (indexItem >= indexSlide * 3)"
                  >
                    <nuxt-link :to="`/article/${item.Slug}`">
                      <img
                        :src="item.Image"
                        alt
                        style="height: 400px;"
                        class="w-100 border-radius--15"
                      />
                      <h5 v-html="item.Title" class="mt-3">{{ item.Title }}</h5>
                    </nuxt-link>
                    <div class="mt-1">
                      <h6 class="d-inline">{{item.Location}}</h6>
                      <div class="float-right text-danger">
                        <span>
                          {{ item.Price }}
                          <a-icon type="dollar" class="font--18" />
                        </span>
                        <span>
                          {{ item.Duration }}
                          <a-icon type="calendar" class="font--18" />
                        </span>
                        <span>
                          {{ item.NumberOfPeople }}
                          <a-icon type="user" class="font--18" />
                        </span>
                      </div>
                      <p class="mb-0 line-clamp">{{ item.Introduce }}</p>
                      <div>
                        <a-rate v-model="item.AvgRate" allow-half disabled />
                        <span class="float-right mb-0">{{ item.RateAmount }} Rating</span>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </a-carousel>
        </div>

        <div class="col-11">
          <a-divider class="my-5">
            <h2>Featured locations</h2>
          </a-divider>
        </div>
        <div class="col-11 container-slide-location">
          <a-carousel autoplay :dots="false" arrows>
            <div slot="prevArrow" class="custom-slick-arrow" style="left: 20px;zIndex: 1">
              <a-icon type="left-circle" />
            </div>
            <div slot="nextArrow" class="custom-slick-arrow" style="right: 20px">
              <a-icon type="right-circle" />
            </div>
            <div v-for="item in listFeaturedLocation" :key="item.Location">
              <div class="row m-0 align-items-center">
                <div class="img-location col-6" style="height: 400px;">
                  <nuxt-link :to="`/search/?data=${item.Location}`"><img :src="item.Image" class="w-100 h-100 border-radius--15 p-0" alt /></nuxt-link>
                </div>
                <div class="col-6">
                  <nuxt-link :to="`/search/?data=${item.Location}`"><h2 class="mb-2">{{item.Location}}</h2></nuxt-link>
                  <p>
                    {{item.ArticleAmount}} Articles
                    <a-icon type="edit" />
                  </p>
                  <p class="text-justify introduce mx-5">{{item.Introduce}}</p>
                </div>
              </div>
            </div>
          </a-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderPage from "@/components/common/HeaderPage";
import axios from "axios";

export default {
  components: {
    HeaderPage
  },
  data() {
    return {
      listFeaturedLocation: {}
    };
  },

  async asyncData({ $axios }) {
    let listFeaturedLocation = {}
    const { data } = await $axios.get("/article/home");
    if (data.status == 200) {
      listFeaturedLocation = data.data.popularLocation
      for(let i = 0; i < listFeaturedLocation.length; i++) {
      let titleLocation = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&srsearch=${encodeURI(listFeaturedLocation[i].Location)}`);
      let descriptionLocation = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&titles=${encodeURI(titleLocation.data.query.search[0].title)}&formatversion=2&exsentences=4&exlimit=1&explaintext=1`);
      listFeaturedLocation[i].Introduce = descriptionLocation.data.query.pages[0].extract
    }
      return {
        listFeaturedArticles: data.data.popularArticles,
        listLatestArticles: data.data.latestArticles,
        listFeaturedLocation
      };
    }
  }
};
</script>

<style scoped>
.anticon {
  vertical-align: 0.125em;
}

.ant-divider-horizontal.ant-divider-with-text-center::before,
.ant-divider-horizontal.ant-divider-with-text-center::after {
  border-top: solid 2px black;
}

.container-slide-location >>> .ant-carousel .slick-slider {
  text-align: center;
  background: #fff;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: black;
  opacity: 0.4;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.img-location {
  background-size: cover;
  background-position: center;
}

.introduce {
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

</style>
