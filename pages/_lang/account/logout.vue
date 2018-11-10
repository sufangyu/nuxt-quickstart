<template>
  <p>Signing off...</p>
</template>

<script>
export default {
  mounted () {
    const unsetToken = require('~/utils/auth').unsetToken
    const { lang } = this.$route.params
    unsetToken()
    const redirectUrl = lang ? `/${lang}/` : '/'
    this.$router.replace(redirectUrl)
  }
}
</script>