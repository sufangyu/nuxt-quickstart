<template>
  <div>
    <navbar :nav="nav" />
    <nuxt />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      nav: [
        { name: 'links.home', to: '/', isExact: true },
        { name: 'links.about', to: '/about' },
        { name: 'links.news', to: '/news' },
        { name: 'links.user', to: '/users' },
        { name: 'links.message', to: '/messages' },
        { name: 'links.order', to: '/orders', loggedShow: true },
        { name: 'links.login', to: '/account/login', loggedHide: true },
        { name: 'links.logout', to: '/account/logout', loggedShow: true },
      ],
    }
  },
}
</script>

<style>
</style>
