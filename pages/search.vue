<template>
  <div class="page-search">
    <HeaderPage :searchBar="true">
      <template slot="aboveSearchBar">
        <h1 class="text-white">
          Plan for this
          <br />place
        </h1>
      </template>
    </HeaderPage>
    <div class="body-page my-5">
      <div class="row pt-5 justify-content-between">
        <div class="col-3">
          <div class="container-search-range position-sticky" style="top: 100px">
            <h5>Your choice</h5>
            <a-divider></a-divider>
            <div class="mb-3">
              <h6 class="d-inline">Price:</h6>
              <a-slider
                :min="0"
                :max="roundMaxValue(maximumValue.maxPrice)"
                :step="stepSlider(maximumValue.maxPrice)"
                range
                v-model="price"
              />
            </div>
            <div class="mb-3">
              <h6 class="d-inline">Duration:</h6>
              <a-slider
                :min="0"
                :max="roundMaxValue(maximumValue.maxDuration)"
                :step="stepSlider(maximumValue.maxDuration)"
                v-model="duration"
              />
            </div>
            <div class="mb-3">
              <h6 class="d-inline">Peoples:</h6>
              <a-slider
                :min="0"
                :max="roundMaxValue(maximumValue.maxNumberOfPeople)"
                :step="stepSlider(maximumValue.maxNumberOfPeople)"
                v-model="numberOfPeople"
              />
            </div>
            <div>
              <a-button type="primary" ghost @click="turnOnLimitedSearch">Take it</a-button>
              <a-button type="primary" ghost @click="resetSearchRange" class="ml-2">Reset</a-button>
            </div>
          </div>
        </div>

        <div class="col-9">
          <div>
            <a-divider>
              <h2>Featured articles</h2>
            </a-divider>
          </div>
          <div class="row">
            <template v-for="(item, index) in listArticles">
              <div class="col-6 mb-5" :key="index">
                <nuxt-link :to="`/article/${item.Slug}`">
                  <img :src="item.Image" alt style="height: 400px;" class="w-100 border-radius--15" />
                  <h5 class="mt-3">{{ item.Title }}</h5>
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
                  <div>
                    <a-rate v-model="item.AvgRate" allow-half disabled />
                    <span class="float-right mb-0">{{ item.RateAmount }} Ratings</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <client-only>
            <infinite-loading spinner="spiral" @infinite="infiniteScroll" ref="InfiniteLoading">
              <span slot="no-more">No more data</span>
            </infinite-loading>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderPage from "@/components/common/HeaderPage";
export default {
  components: {
    HeaderPage
  },
  data() {
    return {
      lastIdArticle: 0,
      listArticles: [],
      price: [0, 0],
      numberOfPeople: 0,
      duration: 0,
      limitedSearch: false,
      searchRange: {}
    };
  },

  methods: {
    roundMaxValue(val) {
      return (
        Math.ceil(val / Math.pow(10, val.toString().length - 1)) *
        Math.pow(10, val.toString().length - 1)
      );
    },
    stepSlider(val) {
      if (val > 100)
        return (
          (Math.ceil(val / Math.pow(10, val.toString().length - 1)) *
            Math.pow(10, val.toString().length - 1)) /
          100
        );
      else return 1;
    },

    async infiniteScroll($state) {
      setTimeout(async () => {
        try {
          let response = "";
          if (!this.limitedSearch) {
            response = await this.$axios.get(
              `/article/home/search/${this.lastIdArticle}&6`,
              {
                params: this.$route.query
              }
            );
          } else {
            this.searchRange.data = this.$route.query.data;
            response = await this.$axios.get(
              `/article/sort/${this.lastIdArticle}&6`,
              {
                params: {
                  data: this.searchRange.data,
                  Price: JSON.stringify(this.searchRange.Price),
                  Duration: JSON.stringify(this.searchRange.Duration),
                  NumberOfPeople: JSON.stringify(this.searchRange.NumberOfPeople)
                }
              }
            );
          }
          console.log(response.data)
          if (response.data.status == 200 && response.data.data.length > 0) {
            response.data.data.forEach(item => {
              this.listArticles.push(item);
            });
            this.lastIdArticle = response.data.lastId;
            $state.loaded();
          } else {
            $state.complete();
          }
        } catch (e) {
          console.log(e);
        }
      }, 500);
    },

    turnOnLimitedSearch() {
      this.searchRange = {
        Duration: this.duration,
        Price: this.price.slice(),
        NumberOfPeople: this.numberOfPeople
      };
      this.limitedSearch = true;
      this.lastIdArticle = 0;
      this.listArticles = [];
      this.$refs.InfiniteLoading.stateChanger.reset();
    },

    resetSearchRange() {
      this.limitedSearch = false;
      this.duration = 0;
      this.price = [0, 0];
      this.numberOfPeople = 0;
      this.searchRange = {};
      this.lastIdArticle = 0;
      this.listArticles = [];
      this.$refs.InfiniteLoading.stateChanger.reset();
    }
  },

  watch: {
    $route() {
      this.limitedSearch = false;
      this.duration = 0;
      this.price = [0, 0];
      this.numberOfPeople = 0;
      this.searchRange = {};
      this.lastIdArticle = 0;
      this.listArticles = [];
      this.$refs.InfiniteLoading.stateChanger.reset();
    }
  },

  async asyncData({ $axios }) {
    let { data } = await $axios.get("/article/slider");
    const maximumValue = data.data;
    return {
      maximumValue
    };
  }
};
</script>
<style scoped>
.body-page {
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
}

.container-search-range >>> .ant-divider {
  background: black;
}

.ant-divider-horizontal.ant-divider-with-text-center {
  margin: 27px 0;
}

.ant-divider-horizontal.ant-divider-with-text-center::before,
.ant-divider-horizontal.ant-divider-with-text-center::after {
  border-top: solid 2px black;
}

.container-search-range >>> .ant-slider-handle {
  border: solid 2px rgba(0, 0, 0, 0.85);
}

.container-search-range >>> .ant-slider-track {
  background-color: black;
}
.container-search-range
  >>> .ant-slider:hover
  .ant-slider-handle:not(.ant-tooltip-open) {
  border-color: black;
}
.container-search-range >>> .ant-slider-handle:focus {
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2);
}
.anticon {
  vertical-align: 0.125em;
}

.ant-btn-background-ghost.ant-btn-primary {
  color: black;
  border-color: black;
}
</style>
