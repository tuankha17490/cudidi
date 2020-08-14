<template>
  <div class="d-flex-center container-search">
    <section class="bg-main-color w-100 position-relative bg-header-page" style="height: 500px" :style="[bgImgHeader ? {backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('${bgImgHeader}')`} : '']">
      <img
        v-if="!bgImgHeader"
        src="@/static/icons/Home-bar-icon.svg"
        class="position-absolute"
        :style="{bottom: '45px', right: '30px'}"
      />
      <div
        class="position-center col-8 d-flex flex-column justify-content-center"
        :style="{height: 'calc(100% - 1rem)'}"
      >
        <slot name="aboveSearchBar"></slot>
        <a-input-group compact v-if="searchBar" class="mt-5">
          <a-select default-value="article" :style="{width: '17%'}">
            <a-select-option value="article">Articles</a-select-option>
          </a-select>
          <a-input-search placeholder="input search text" v-model="textSearch" :style="{width: '57%'}" @search="onSearch" />
        </a-input-group>
        <slot name="belowSearchBar"></slot>
      </div>
    </section>
  </div>
</template>

<style scoped>

.bg-header-page {
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-position: center !important;
}

.container-search >>> .ant-input,
.container-search >>> .ant-select-selection--single {
  height: 60px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.ant-input-group-compact > .ant-select:first-child >>> .ant-select-selection {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.container-search >>> .ant-select-selection__rendered {
  line-height: 55px;
}

.ant-input-affix-wrapper {
  font-size: 23px;
}

</style>
<script>
export default {
  props: ["textHeaderPage", "searchBar", "bgImgHeader"],
  data() {
    return {
      textSearch: this.$route.query.data
    }
  },
  methods: {
    onSearch() {
      this.$router.push({ name: 'search', query: {data: this.textSearch}})
    }
  }
};
</script>
