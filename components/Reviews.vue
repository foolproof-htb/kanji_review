<template>
  <div>
    <v-card evaluation="2">
      <v-rating
        color="teal"
        hover
        length="5"
        size="30"
      ></v-rating>
      <v-textarea
        solo
        name="review"
        label="ここにレビューを書こう！"
      ></v-textarea>
    </v-card>
    <div class="review-list">
      <v-divider />
      <div
        class="review"
        v-for="item in list"
        :key="item.id"
      >
        <p v-text="item.name"></p>
        <p class="pre" v-text="item.review"></p>
        <v-divider />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          name: 'test',
          review: "test\ntest"
        },
        {
          id: 2,
          name: 'test2',
          review: "test\ntest\ntest\ntest"
        }
      ]
    }
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
</style>
