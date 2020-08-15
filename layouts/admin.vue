<template>
  <div>
    <client-only>
      <a-layout id="components-layout-demo-custom-trigger" style="min-height: 100vh">
        <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
          <div class="text-center my-4">
            <img src="@/static/icons/White-Logo.svg" alt class="logo" />
          </div>
          <a-menu theme="dark" mode="inline">
            <a-menu-item key="users">
              <nuxt-link to="/admin/users">
                <a-icon type="user" />
                <span>Users</span>
              </nuxt-link>
            </a-menu-item>
            <a-menu-item key="articles">
              <nuxt-link to="/admin/articles">
                <a-icon type="video-camera" />
                <span>Articles</span>
              </nuxt-link>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout>
          <a-layout-header style="background: #fff; padding: 0">
            <a-icon
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)"
            />
            <div class="float-right mr-2">
              <a-menu mode="horizontal">
                <a-sub-menu key="sub2" class="float-right mr-2 mt-2">
                  <span slot="title">
                    <a-avatar
                      size="large"
                      :src="$store.state.user.authUser.Avatar"
                      :icon="$store.state.user.authUser.Avatar ? '' : 'user'"
                    ></a-avatar>
                  </span>
                  <a-menu-item key="account">
                    <nuxt-link to="/home">Home</nuxt-link>
                  </a-menu-item>
                  <a-menu-item key="logout" @click="logout">Logout</a-menu-item>
                </a-sub-menu>
              </a-menu>
            </div>
          </a-layout-header>
          <a-layout-content
            :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
          >
            <nuxt />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </client-only>
  </div>
</template>
<script>
export default {
  props: ["current"],
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$cookies.remove("token");
      this.$router.push("/auth/login")
    }
  }
};
</script>
<style scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

.anticon {
  vertical-align: 0.125em;
}

.logo {
  height: 35px;
}

.ant-menu-horizontal > .ant-menu-submenu {
  border: none;
}

.ant-menu {
  background: transparent;
  border: none;
}


</style>
