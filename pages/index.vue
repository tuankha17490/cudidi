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
        <template v-for="(item, index) in data">
          <div class="col-7 mb-5" v-if="index == 0" :key="index">
            <img :src="item.Image" alt style="height: 400px;" class="w-100 border-radius--15" />
            <h4 class="mt-3">{{ item.Title }}</h4>
            <div>
              <a-rate v-model="item.Rate" allow-half />
              <p class="d-inline float-right mb-0">2436 Ratings</p>
            </div>
            <p>{{ item.Introduce }}</p>
            <div class="mt-1">
              <span>
                <a-icon type="heart" class="font--25" />
              </span>
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
                  {{ item.People }}
                  <a-icon type="user" class="font--18" />
                </span>
              </div>
            </div>
          </div>
          <div class="col-3 mb-5" v-else :key="index">
            <img :src="item.Image" alt style="height: 400px;" class="w-100 border-radius--15" />
            <h4 class="mt-3">{{ data[1].Title }}</h4>
            <div>
              <a-rate v-model="item.Rate" allow-half />
              <span class="float-right mb-0">1479 Ratings</span>
            </div>
            <p class="mb-0">{{ item.Introduce }}</p>
            <div class="mt-1">
              <span>
                <a-icon type="heart" class="font--25" />
              </span>
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
                  {{ item.People }}
                  <a-icon type="user" class="font--18" />
                </span>
              </div>
            </div>
          </div>
        </template>
        <div class="col-11">
          <a-divider class="my-5">
            <h2>Featured locations</h2>
          </a-divider>
        </div>
        <div class="col-11">
          <a-carousel autoplay :dots="false" arrows>
            <div slot="prevArrow" class="custom-slick-arrow" style="left: 20px;zIndex: 1">
              <a-icon type="left-circle" />
            </div>
            <div slot="nextArrow" class="custom-slick-arrow" style="right: 20px">
              <a-icon type="right-circle" />
            </div>
            <div v-for="item in dataLocations" :key="item.Location">
              <div class="row m-0 align-items-center">
                <div class="img-location col-6" style="height: 400px;">
                  <img :src="item.Image" class="w-100 h-100 border-radius--15 p-0" alt />
                </div>
                <div class="col-6">
                  <h2 class="mb-2">{{item.Location}}, {{item.Nation}}</h2>
                  <p>
                    {{item.Articles}} Articles
                    <a-icon type="edit" />
                    , {{item.Likes}} Likes
                    <a-icon type="heart" />
                  </p>
                  <p class="text-justify mx-5">{{item.Introduce}}</p>
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

export default {
  components: {
    HeaderPage
  },
  data() {
    return {
      data: [
        {
          Image: require("@/static/images/pexels-photo-2253821.jpeg"),
          Title: "Magical Island",
          Rate: 4.5,
          Ratings: 2436,
          Price: 1234,
          Duration: 1,
          People: 5,
          Introduce:
            "City of light, one of the most famous cities in the world is waiting to be explored. Some of the most famous museums, food and landmarks are waiting for you in Paris.City of light, one of the most famous cities in the world is waiting to be explored. Some of the most famous museums, food and landmarks are waiting for you in Paris."
        },
        {
          Image: require("@/static/images/pexels-photo-386009.jpeg"),
          Title: "Along the bus",
          Rate: 3.5,
          Ratings: 2436,
          Price: 2234,
          Duration: 2,
          People: 2,
          Introduce:
            "City of light, one of the most famous cities in the world is waiting to be explored. Some of the most famous museums, food and landmarks are waiting for you in Paris."
        },
        {
          Image: require("@/static/images/pexels-photo-2253821.jpeg"),
          Title: "Magical Island",
          Rate: 3.5,
          Ratings: 2436,
          Price: 3000,
          Duration: 3,
          People: 3,
          Introduce:
            "City of light, one of the most famous cities in the world is waiting to be explored. Some of the most famous museums, food and landmarks are waiting for you in Paris.City of light, one of the most famous cities in the world is waiting to be explored. Some of the most famous museums, food and landmarks are waiting for you in Paris."
        },
        {
          Image: require("@/static/images/pexels-photo-1252500.jpeg"),
          Title: "Alot to travel",
          Rate: 3,
          Ratings: 2436,
          Price: 4000,
          Duration: 4,
          People: 1,
          Introduce:
            "City of light, one of the most famous cities in the world is waiting to be explored. Some of the most famous museums, food and landmarks are waiting for you in Paris.City of light, one of the most famous cities in the world is waiting to be explored. Some of the most famous museums, food and landmarks are waiting for you in Paris."
        },
        {
          Image: require("@/static/images/pexels-photo-2249602.jpeg"),
          Title: "Alot to travel",
          Rate: 3,
          Ratings: 2436,
          Price: 4000,
          Duration: 4,
          People: 1,
          Introduce:
            "City of light, one of the most famous cities in the world is waiting to be explored. Some of the most famous museums, food and landmarks are waiting for you in Paris.City of light, one of the most famous cities in the world is waiting to be explored. Some of the most famous museums, food and landmarks are waiting for you in Paris."
        }
      ],
      dataLocations: [
        {
          Image: require("@/static/images/location1.jpg"),
          Location: "Hoi An",
          Nation: "VietNam",
          Articles: 3000,
          Likes: 7000,
          Introduce:
            "City of light, one of the most famous cities in the world is waiting to be explored. Some of the most famous museums, food and landmarks are waiting for you in Paris.City of light, one of the most famous cities in the world is waiting to be explored. Some of the most famous museums, food and landmarks are waiting for you in Paris."
        },
        {
          Image: require("@/static/images/location2.jpg"),
          Location: "New York",
          Nation: "USA",
          Articles: 2000,
          Likes: 5300,
          Introduce:
            "City of light, one of the most famous cities in the world is waiting to be explored. Some of the most famous museums, food and landmarks are waiting for you in Paris.City of light, one of the most famous cities in the world is waiting to be explored. Some of the most famous museums, food and landmarks are waiting for you in Paris."
        },
        {
          Image: require("@/static/images/location3.jpg"),
          Location: "Paris",
          Nation: "France",
          Articles: 1500,
          Likes: 5000,
          Introduce:
            "City of light, one of the most famous cities in the world is waiting to be explored. Some of the most famous museums, food and landmarks are waiting for you in Paris.City of light, one of the most famous cities in the world is waiting to be explored. Some of the most famous museums, food and landmarks are waiting for you in Paris."
        },
        {
          Image: require("@/static/images/location4.jpg"),
          Location: "London",
          Nation: "UK",
          Articles: 700,
          Likes: 2000,
          Introduce:
            "City of light, one of the most famous cities in the world is waiting to be explored. Some of the most famous museums, food and landmarks are waiting for you in Paris.City of light, one of the most famous cities in the world is waiting to be explored. Some of the most famous museums, food and landmarks are waiting for you in Paris."
        }
      ]
    };
  },

  async created() {
    const { data } = await this.$axios.get('/article/home')
    console.log(data)
  },
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

.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 400px;
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
</style>
