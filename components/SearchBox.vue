<template>
  <div>
    <v-text-field
      type="text"
      v-model="searchWord"
      placeholder="漢字を入力して検索"
      filled
      rounded
      @keypress.enter="search"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchWord: ''
    }
  },
  methods: {
    search() {
      this.$store.dispatch('kanji/search', this.searchWord)
    }
  }
}
</script>

<style>

</style>
