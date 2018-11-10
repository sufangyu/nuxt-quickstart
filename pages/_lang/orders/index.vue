<template>
  <div
    v-if="account"
    class="container"
  >
    <div class="tip">
      <h2>{{ $t('orders.hi') }} {{ account.loginname }}!</h2>
      <p>{{ $t('orders.introduction') }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'authenticated',
  computed: mapGetters(['account'])
}
</script>

<style>
</style>
