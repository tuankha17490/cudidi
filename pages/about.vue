<template>
  <div class="wrap container-fluid">
    <div class="component row">
      <div class="col-5 col-md-5">
        <div class="header">
          <h1 class="title">Let's Start Your Travel</h1>
          <p
            class="text"
          >Lorem ipsum dolor sit amet, consectetur adipicing elit. Phasellus purus lectus, iaculis non facilicis bibendum, porta in odio</p>
          <button>READ MORE</button>
        </div>
      </div>
      <div class="col-7 col-md-7">
        <img src="@/static/images/AboutUs1.svg" alt="About Us" />
      </div>
    </div>
    <div class="component about_us_2 row">
      <div class="col">
        <img src="@/static/images/AboutUs2.svg" alt="About Us" />
      </div>
      <div class="col">
        <div class="description">
          <h1 class="subtitle">WE HELP EVERYONE MAKE THEIR OWN TRIPS</h1>
          <p
            class="text"
          >Lorem ipsum dolor sit amet, consectetur adipicing elit. Phasellus purus lectus, iaculis non facilicis bibendum, porta in odio.Lorem ipsum dolor sit amet, consectetur adipicing elit. Phasellus purus lectus, iaculis non facilicis bibendum, porta in</p>
        </div>
      </div>
    </div>
    <div class="component about_us_3 row">
      <div class="col">
        <div class="description">
          <h1 class="subtitle">WE HELP EVERYONE MAKE THEIR OWN TRIPS</h1>
          <p
            class="text"
          >Lorem ipsum dolor sit amet, consectetur adipicing elit. Phasellus purus lectus, iaculis non facilicis bibendum, porta in odio.Lorem ipsum dolor sit amet, consectetur adipicing elit. Phasellus purus lectus, iaculis non facilicis bibendum, porta in</p>
        </div>
      </div>
      <div class="col">
        <img src="@/static/images/AboutUs3.svg" alt="About Us" />
      </div>
    </div>
    <div class="component about_us_4 row">
      <div class="col">
        <img src="@/static/images/AboutUs4.svg" alt="About Us" />
      </div>
      <div class="col">
        <div class="description">
          <h1 class="subtitle">ALREADY HAVE A GUIDE FROM SCRATCH</h1>
          <p
            class="text"
          >Lorem ipsum dolor sit amet, consectetur adipicing elit. Phasellus purus lectus, iaculis non facilicis bibendum, porta in odio.Lorem ipsum dolor sit amet, consectetur adipicing elit. Phasellus purus lectus, iaculis non facilicis bibendum, porta in</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div img {
  width: inherit;
}
.about_us_2 img {
  width: 1225px;
  position: relative;
  right: 30%;
}
.about_us_3 {
  margin-bottom: 0;
}
.about_us_3 img {
  height: 890px;
  position: relative;
  bottom: 280px;
}
.about_us_3 .description {
  margin-left: 15%;
  margin-top: 200px;
}
.about_us_4 img {
  width: 1225px;
  position: relative;
  right: 30%;
}
.about_us_4 .subtitle {
  text-align: right;
}
.about_us_2 .description {
  padding-top: 400px;
}
.about_us_4 .description {
  padding-top: 300px;
}
.about_us_4 .text {
  margin-left: 15%;
  margin-top: 100px;
}
.component {
  margin-top: 50px;
  margin-bottom: 100px;
}
.subtitle {
  width: 750px;
  height: 121px;
  font-size: 58px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #454f6b;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.title {
  width: 560px;
  height: fit-content;
  font-family: HelveticaNeue;
  font-size: 110px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;
  color: #454f6b;
}
.text {
  width: 549.1px;
  height: 120.7px;
  font-family: Asap;
  font-size: 22px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.42;
  letter-spacing: normal;
  text-align: left;
  color: #6d6e71;
  margin-top: 50px;
  margin-bottom: 130px;
}
.header {
  padding-left: 15%;
  padding-top: 5%;
  padding-right: 25%;
}
.header button {
  width: 217.5px;
  height: 59.2px;
  background-color: #7bc1ba;
  font-family: Asap;
  font-size: 22px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.18;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  border: none;
  border-radius: 50px;
}
</style>
