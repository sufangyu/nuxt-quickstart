<template>
  <div class="users">
    <h2>{{ $t('users.list.title') }}</h2>
    <ul class="list">
      <li
        v-for="user in users"
        :key="user.id"
      >
        <nuxt-link :to="$i18n.path(`/users/${user.id}`.substr(1))">
          {{ user.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData() {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
    return {
      users: data
    }
  }
}
</script>

<style scoped>
.users {
  padding: 30px 20px 0;
}
.users h2 {
  font-size: 22px;
  margin-bottom: 20px;
}
.list li a {
  display: block;
  border-bottom: 1px #ddd solid;
  padding: 10px;
  text-align: left;
  color: #222;
  text-decoration: none;
}
.list li a:hover {
  color: #41b883;
}
</style>
