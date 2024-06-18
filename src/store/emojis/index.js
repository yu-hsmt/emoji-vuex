const API_URL = 'https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json' //このURLを「API_URL」とする
const requestEmojis = async () => await fetch(API_URL) //API_URLからデータを取得したものを「requestEmojis」とする

export default {
    state: {
        originalEmojis: [], //「originalEmojis」の入れ物を用意
        showEmojis: [], //「showEmojis」の入れ物を用意
    },
    mutations: {
        setEmojis(state, emojis) { //以下を「setEmojis」とする
            state.showEmojis = emojis //emojisをstateのshowEmojisに流す
            state.originalEmojis = emojis //emojisをstateのoriginalEmojisに流す
        },
        setOriginalEmoji(state, search) { //以下を「setOriginalEmojis」とする
            const filtered = search.length > 1 //「search」が2文字以上の場合、次の行を「filtered」とする
            ? state.originalEmojis.filter((emoji) => emoji.aliases[0].includes(search)) //各絵文字のaliases（API内のデータ）にsearchが含まれているものをフィルタリングする
            : [...state.originalEmojis] //「search」が1文字以下の場合、originalEmojisをそのまま「filtered」とする
        state.showEmojis = filtered //filteredをstateのshowEmojisに流す
        }
    },
    actions: {
        async fetchEmojis({ commit }) { //以下を「fetchEmojis」としてmutationsにコミット
            const res = await requestEmojis() //「requesrEmojis」を「res」に格納
            const emojis = await res.json() //resをJSON形式にしたものを「emojis」とする
            commit('setEmojis', emojis) //「setEmojis」にemojis（JSON形式データ）をコミット
        },
        filterEmojis({ commit }, search) { //以下を「filterEmojis」としてmutationsにコミット　？？？searchはどこから出てきた？
            commit('setOriginalEmoji', search) //「setOriginalEmoji」にsearchをコミット
        }
    },
    getters: {
        originalEmojis: (state) => state.originalEmojis, //stateのoriginalEmojisを「originalEmojis」として呼び出せるようにする
        showEmojis: (state) => state.showEmojis, //stateのshowEmojisを「showEmojis」として呼び出せるようにする
    },
}