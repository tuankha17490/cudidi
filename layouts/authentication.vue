<template>
  <div class="row m-0">
    <div class="col-7 bg-layout-auth h-100vh">
      <img src="../static/icons/White-Logo.svg" class="mt-4 ml-3">
    </div>
    <div class="col-5 bg--white h-100vh d-flex justify-content-center">
      <nuxt />
    </div>
  </div>
</template>
<style scoped>
.bg-layout-auth {
  background:  linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../static/images/bg-auth.jpeg') no-repeat center;
  background-size: cover;
}
</style>
