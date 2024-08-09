<template>
  <div class="articles-list">
    <div class="article-item" v-for="article in articles" :key="article.title">
      <div class="title" @click="handleArticle(article._id)">{{ article.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getArticles } from '../services/index'

const router = useRouter()
const articles = ref([])

onMounted(() => {
  getArticles()
    .then((res) => {
      articles.value = res.data
      console.log(res)
    })
    .catch((err) => {
      console.log('err', err)
    })
})

const handleArticle = (id: string) => {
  router.push({ path: `article/${id}` })
}
</script>

<style lang="scss" scoped>
.articles-list {
  display: flex;
  .article-item {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    border: 1px solid #dadada;
    width: 200px;
    height: 100px;
    margin: 10px;

    .title {
      font-size: 24px;
      font-weight: 600;
    }
  }
}
</style>
