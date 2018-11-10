<template>
  <div
    v-if="users"
    class="user"
  >
    <h2>{{ $t('users.detail.title') }}</h2>
    <ul>
      <li>{{ users.name }}</li>
      <li>@{{ users.username }}</li>
      <li>Email : {{ users.email }}</li>
    </ul>
    <p><nuxt-link to="/users">{{ $t('users.detail.goback') }}</nuxt-link></p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  validate({ params }) {
    return !isNaN(+params.id)
  },
  async asyncData({ params, error }) {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${+params.id}`
      )
      return {
        users: data
      }
    } catch (e) {
      error({ message: 'User not found', statusCode: 404 })
    }
  }
}
</script>

<style scoped>
.user {
  padding: 30px;
}
.user h2 {
  margin-bottom: 20px;
}
.user ul {
  margin-bottom: 20px;
}
</style>
