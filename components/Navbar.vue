<template>
  <header class="header">
    <div class="logo">
      <h1>Nuxt</h1>
    </div>
    <nav class="nav">
      <nuxt-link
        v-for="item in nav"
        v-if="show(item)"
        :key="item.to"
        :exact="item.isExact"
        :to="$i18n.path(item.to.substr(1))"
      >
        {{ $t(item.name) }}
      </nuxt-link>
    </nav>
    <div class="languages">
      <nuxt-link
        v-if="$i18n.locale === 'zh'"
        :to="`/en` + $route.fullPath"
        active-class="none"
        exact
      >
        {{ `[ ${ $t('links.en') } ]` }}
      </nuxt-link>
      <nuxt-link
        v-else
        :to="$route.fullPath.replace(/^\/[^\/]+/, '')"
        active-class="none"
        exact
      >
        {{ `[ ${ $t('links.zh') } ]` }}
      </nuxt-link>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { log } from 'util';

export default {
  props: {
    nav: {
      type: Array,
      required: true,
    },
  },
  computed: mapGetters(['isAuthenticated']),
  methods: {
    show(navItem) {
      // 登录后才显示 
      if (navItem.loggedShow) {
        return this.isAuthenticated;
      }

      // 登录后隐藏
      if (navItem.loggedHide) {
        return this.isAuthenticated ? false : true;
      }

      return true;
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  background-color: #2e2f30;
  color: #fff;
  height: 60px;
  line-height: 60px;
  padding: 0 15px;
}
a {
  font-size: 15px;
  color: inherit;
  text-decoration: none;
  text-transform: uppercase;
  transition: color .25s;
  font-weight: 400;
  line-height: normal;
  opacity: 0.7;
}
a:hover {
  opacity: 1;
}
.logo h1 {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 24px;
  color: inherit;
  letter-spacing: 1px;
}
.nav {
  flex: 1;
  text-align: right;

  a {
    margin-left: 20px;

    &.nuxt-link-active {
      opacity: 1;
      font-weight: 600;
    }
  }
}
.languages {
  margin-left: 30px;
}
</style>
