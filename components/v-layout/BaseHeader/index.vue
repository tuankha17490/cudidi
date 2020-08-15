<template>
  <div class="d-flex align-items-center border-bottom container-header" style="height: 60px">
    <img src="@/static/icons/Black-logo.svg" class="mx-2" />
    <a-menu v-model="current" mode="horizontal" :style="{ width: 'calc(100% - 12px)' }">
      <a-menu-item key="home"><nuxt-link to="/home">Home</nuxt-link></a-menu-item>
      <a-menu-item key="review"><nuxt-link to="/">About us</nuxt-link></a-menu-item>
      <a-menu-item class="float-right mr-2" v-if="!$store.state.user.isLoggedIn">
        <nuxt-link to="/auth/login">Login</nuxt-link>
      </a-menu-item>
      <a-sub-menu key="sub2" class="float-right mr-2" v-else>
        <span slot="title">

          <a-avatar size="large" :src="$store.state.user.authUser.Avatar" :icon="$store.state.user.authUser.Avatar ? '' : 'user'"></a-avatar>
        </span>
        <a-menu-item key="profile">
          <nuxt-link :to="`/user/${$store.state.user.authUser.Slug}`">Profile</nuxt-link>
        </a-menu-item>
        <a-menu-item key="account">
          <nuxt-link to="/user/editprofile">Account</nuxt-link>
        </a-menu-item>
        <a-menu-item key="admin" v-if="$store.state.user.authUser.roles.ID == 1 || $store.state.user.authUser.roles.ID == 2">
          <nuxt-link to="/admin/users">Admin</nuxt-link>
        </a-menu-item>
        <a-menu-item key="logout" @click="logout">Logout</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<style scoped>
@import url("./style.scss");
</style>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      current: ["home"]
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$cookies.remove("token");
      this.$router.push("/auth/login");
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
        })
        .catch(function(error) {
          // An error happened.
          console.log(error);
        });
    }
  }
};
</script>
