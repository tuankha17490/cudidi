<template>
  <div>
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist." v-if="error.statusCode === 404">
      <template #extra>
        <a-button type="primary"><nuxt-link to="/">Back Home</nuxt-link></a-button>
      </template>
    </a-result>
    <a-result status="403" title="403" sub-title="Sorry, you are not authorized to access this page." v-if="error.statusCode === 403">
    <template #extra>
      <a-button type="primary">
        Back Home
      </a-button>
    </template>
  </a-result>
  </div>
</template>
<script>
export default {
  props: ["error"],
  data() {
    return {};
  }
};
</script>
