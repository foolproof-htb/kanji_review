<template>
  <div class="row">
    <div class="col col-4">
      <div class="word-box">
        {{ character }}
      </div>
      <div class="details">
        <table>
          <tr>
            <th>画数</th><td>{{ strokes }}</td>
          </tr>
          <tr>
            <th>音読み</th><td>{{ onyomi }}</td>
          </tr>
          <tr>
            <th>訓読み</th><td>{{ kunyomi }}</td>
          </tr>
          <tr>
            <th>部首</th><td>{{ radical }}</td>
          </tr>
        </table>
      </div>
    </div>
    <v-divider vertical></v-divider>
    <div class="col">
      <Reviews />
    </div>
  </div>
</template>

<script>
import Reviews from '@/components/Reviews.vue'
export default {
  async fetch() {
    await this.$store.dispatch('kanji/fetchKanji', this.$route.params.character)
  },
  components: {
    Reviews
  },
  computed: {
    character() {
      return this.$store.state.kanji.kanji.kanji.character
    },
    strokes() {
      return this.$store.state.kanji.kanji.kanji.strokes.count
    },
    onyomi() {
      const yomi =  this.$store.state.kanji.kanji.kanji.onyomi.katakana
      if (yomi === "n/a") {
        return "なし"
      } else {
        return yomi
      }
    },
    kunyomi() {
      const yomi = this.$store.state.kanji.kanji.kanji.kunyomi.hiragana
      if (yomi === "n/a") {
        return "なし"
      } else {
        return yomi
      }
    },
    radical() {
      return this.$store.state.kanji.kanji.radical.character
    }
  },
}
</script>

<style scoped>
  .kanji {
    display: inline-block;
  }
  .word-box {
    width: 20rem;
    height: 20rem;
    background-color: #e5e5e5;
    font-family: serif;
    font-size: 15rem;
    text-align: center;
    color: #2a2a2a;
  }
  .details {
    margin-top: 2rem;
    font-size: 1.2rem;
  }
  .details th {
    width: 5rem;
    text-align: left;
  }
  .details td {
    width: 10rem;
  }
  .reviews {
    display: inline-block;

  }
</style>
