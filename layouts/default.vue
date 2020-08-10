<template>
  <div class="d-flex flex-column bg-white">
    <BaseHeader />
    <nuxt :style="{ marginTop: '64px', minHeight: '85vh' }"/>
  </div>
</template>

<script>
import BaseHeader from '~/components/v-layout/BaseHeader'


export default {
  name: 'DefaultLayout',
  components: {
    BaseHeader,
  }
}
</script>
