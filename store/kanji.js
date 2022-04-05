import axios from 'axios'

export const state = () => ({
  kanjiList: '',
  kanji: ''
})

export const mutations = {
  setKanjiList(state, kanjiList) {
    state.kanjiList = kanjiList
  },
  setKanji(state, kanji) {
    state.kanji = kanji
  }
}

export const actions = {
  async search ({ commit }, word) {
    if (word === '') {
      commit('setKanjiList', '')
      return
    }

    const options = {
      method: 'GET',
      url: 'https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/',
      params: { on: word },
      headers: {
        'x-rapidapi-key': this.$config.apiKey,
        'x-rapidapi-host': this.$config.apiHost
      }
    }

    const data = await axios.request(options)
      .then(res => {
        return res.data.map(datum => datum.kanji.character)
      })
      .catch(error => {
        return error
      })

    commit('setKanjiList', data)
  },

  async fetchKanji({ commit }, kanji) {
    let url = 'https://kanjialive-api.p.rapidapi.com/api/public/kanji/'
    const encode_kanji = encodeURI(kanji)
    const options = {
      method: 'GET',
      url: url + encode_kanji,
      headers: {
        'x-rapidapi-key': this.$config.apiKey,
        'x-rapidapi-host': this.$config.apiHost
      }
    }

    const data = await axios.request(options)
      .then(res => {
        return res.data
      })
      .catch(error => {
        return error
      })

    commit('setKanji', data)
  }
}
