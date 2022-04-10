<template>
  <div>
    <v-form v-model="valid">
      <v-card evaluation="2">
        <v-container>
          <v-row>
            <v-rating
              v-model="review.rate"
              color="teal"
              hover
              length="5"
              size="30"
            ></v-rating>
          </v-row>
          <v-row>
            <v-textarea
              v-model="review.comment"
              solo
              name="review"
              label="ここにレビューを書こう！"
            ></v-textarea>
          </v-row>
          <v-row>
            <v-spacer />
            <v-btn
              elevation="2"
              @click="postReview"
              color="primary"
            >
              送信
            </v-btn>
          </v-row>
        </v-container>
      </v-card>
      <div class="review-list">
        <v-divider />
        <div
          class="review"
          v-for="item in list"
          :key="item.id"
        >
          <span class="name" v-text="item.name" />
          <span class="updatedAt" v-text="item.updatedAt" />
          <v-rating
            readonly
            color="teal"
            hover
            length="5"
            size="20"
            :value="item.rate"
          ></v-rating>
          <p class="pre" v-text="item.comment" />
          <v-btn
            elevation="2"
            @click="deleteReview(item.id)"
            color="red"
            small
          >
            削除
          </v-btn>
        </div>
        <v-divider />
      </div>
    </v-form>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      valid: '',
      review: {
        kanji: this.$store.state.kanji.kanji.kanji.character,
        name: 'user1',
        rate: 0,
        comment: '',
        updatedAt: ''
      },
      list: [],
    }
  },

  methods: {
    reset() {
      this.review =
        {
          kanji: this.$store.state.kanji.kanji.kanji.character,
          name: 'user1',
          rate: 0,
          comment: '',
          updatedAt: ''
        }
    },
    postReview() {
      const db = getFirestore()
      this.review.updatedAt = new Date()
      addDoc(collection(db, 'reviews'), this.review)
      this.reset()
    },
    getReview() {
      const db = getFirestore()
      const q = query(collection(db, 'reviews'),
                where('kanji', '==', this.$store.state.kanji.kanji.kanji.character))
      onSnapshot(q, querySnapshot => {
        let docList = []
        querySnapshot.forEach(doc => {
          const date = doc.data().updatedAt.toDate()
          const updatedAt =
            `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日
            ${date.toLocaleTimeString()}`

          docList.push({
            id: doc.id,
            name: doc.data().name,
            rate: doc.data().rate,
            comment: doc.data().comment,
            updatedAt: updatedAt
          })
        })

        this.list = docList.sort((a, b) => {
          return (a.updatedAt > b.updatedAt) ? -1 : 1
        })
      })
    },
    deleteReview(id) {
      const db = getFirestore()
      deleteDoc(doc(db, 'reviews', id))
    }
  },

  mounted() {
    this.getReview()
  }
}
</script>

<style>
  .review-list {
    margin-top: 10px;
  }
  .pre {
    white-space: pre-wrap;
  }
  .review {
    margin-bottom: 30px;
  }
  .name {
    font-weight: bold;
    font-size: 1.1em;
  }
  .updatedAt {
    color: #bbb;
    font-size: 0.9em;
  }
</style>
