<template>
  <section class="container">
    <div class="tip">
      <p>{{ $t('messages.title') }}</p>
      <p>{{ $t('messages.introduction') }}</p>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'authenticated',
  components: {},
}
</script>

<style>
</style>
