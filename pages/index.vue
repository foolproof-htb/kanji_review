<template>
  <div>
    <SearchBox />
    <v-container v-if="kanjis.length">
      <v-row>
        <v-col
          v-for="kanji in kanjis"
          :key="kanji"
        >
          <nuxt-link :to="`/kanji_details/${kanji}`">
            <div class="word-box">
              {{ kanji }}
            </div>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
    <div v-else>
      検索結果はありません。
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue'
export default {
  name: 'IndexPage',
  components: {
    SearchBox
  },
  computed: {
    kanjis() {
      return this.$store.state.kanji.kanjiList
    }
  }
}
</script>

<style scoped>
  .col a {
    text-decoration: none;
  }
  .word-box {
    width: 4rem;
    height: 4rem;
    border: #555555 solid 1px;
    font-family: serif;
    font-size: 2rem;
    text-align: center;
    line-height: 200%;
    color: #e5e5e5;
  }
</style>
