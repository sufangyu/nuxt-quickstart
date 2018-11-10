<template>
  <section class="container">
    <div class="tip">
      <h2>{{ pageName }}</h2>
      <p>{{ user.name ? user.name : '' }}</p>
      <p>{{ user.username ? user.username : '' }}</p>
      <p>{{ user.email ? user.email : '' }}</p>
      <nuxt-link :to="$i18n.path(`news?page=1`)">{{ $t('news.pagination.first') }}</nuxt-link>
      <nuxt-link :to="$i18n.path(`news?page=2`)">{{ $t('news.pagination.second') }}</nuxt-link>
      <nuxt-link :to="$i18n.path(`news?page=3`)">{{ $t('news.pagination.three') }}</nuxt-link>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import local from './local';
const pageName = 'news';

export default {
  data() {
    return {
      pageName: this.$t('news.pageName')
    }
  },
  watchQuery: ['page'],
  head() {
    return {
      title: this.$t('news.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('news.meta.description')
        }
      ]
    }
  },
  async asyncData({ query }) {
    const page = query.page || 1

    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users?page=${page}`)
    console.log(`page ${page}\'s data`, data[0])
    return {
      user: data[0]
    }
  },
  created() {
    // 没有全局配置, 合并当前语言配置
    if (!this.$i18n.getLocaleMessage('zh')[pageName].pagination) {
      this.$i18n.mergeLocaleMessage('zh', local.zh);
      this.$i18n.mergeLocaleMessage('en', local.en);
    }
  },
}
</script>

<style>
</style>
