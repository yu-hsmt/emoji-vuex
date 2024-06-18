<template>
	<div class="container">
		<h1>Search Emoji</h1>

		<input 
			type="search"
			placeholder="Type to search Emoji..."
			class="searchInput"
			:value="searchInput"
			@input="searchEmoji"
		/>

		<div class="emojiLength">
			<div class="emojiWrapper">
				<div
					class="emojiItem"
					v-for="emoji in showEmojis"
					:key="emoji.emoji"
				>
					{{ emoji.emoji }}&nbsp;&nbsp;
					<span class="emoji-alias">
						:{{ emoji.aliases[0] }};
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const originEmojis = computed(() => store.getters.originalEmojis) //originalEmojisをリアクティブに取得して「originEmojis」とする
const showEmojis = computed(() => store.getters.showEmojis) //showEmojisをリアクティブに取得して「showEmojis」とする
const searchInput = ref('') //searchInputを空のref関数とする

const searchEmoji = (e) => { //以下をsearchEmojiとする
	searchInput.value = e.target.value //検索ボックスに入力された文字列をsearchInput.valueとする
	store.dispatch('filterEmojis', e.target.value) //検索ボックスに入力された値に対して「filterEmojis」を実行
}

onMounted(async () => store.dispatch('fetchEmojis')) //fetchEmojisを実行
</script>

<style lang="scss">
body {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
	  Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	background: #20232a;
	color: #fff;
  }
  
  .container {
	width: 90%;
	margin: 0 auto;
  }
  
  .searchInput {
	padding: 10px 12px;
	width: 90%;
	min-width: 300px;
	border-radius: 8px;
	border: 1px solid #a49b9b;
	margin: 1em 0;
	font-size: 16px;
	outline: 0;
  }
  
  .emojiLength {
	margin-bottom: 1em;
	font-size: 16px;
	font-weight: bold;
  }
  
  .emojiWrapper {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	text-align: left;
  }
  
  .emojiItem {
	width: 100%;
	padding-bottom: 10px;
	cursor: pointer;
  }
  
  .emojiAlias:hover {
	zoom: 1.1;
  }
  
  .isSelected {
	color: #79d70f;
	zoom: 0.9 !important;
  }
  
  @media screen and (min-width: 600px) {
	.emojiItem {
	  width: 50%;
	}
  }
  
  @media screen and (min-width: 1000px) {
	.emojiItem {
	  width: 30%;
	}
  }
  
  @media screen and (min-width: 1200px) {
	.emojiItem {
	  width: 25%;
	}
  }
</style>