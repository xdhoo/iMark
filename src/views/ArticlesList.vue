<template>
  <div>
    <div class="articles-list">
      <div
        class="article-item"
        v-for="article in articles"
        :key="article.title"
        @click="handleArticle(article._id)"
      >
        <div class="title">{{ article.title }}</div>
      </div>
    </div>
    <div class="btn">
      <el-button @click="handleAddNew">+ Add New Article</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Article } from '../../types'
import { getArticles } from '../services/index'

const router = useRouter()
const articles = ref<Article[]>([])

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

const handleArticle = (id?: string) => {
  router.push({ path: `article/${id}` })
}

const handleAddNew = () => {
  router.push({ name: 'article' })
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
    cursor: pointer;

    &:hover {
      border-width: 2px;
      border-color: #09a9b1;
      color: #09a9b1;
      box-shadow: 2px 2px #09a9b1;
    }

    .title {
      font-size: 24px;
      font-weight: 600;
    }
  }
}

.btn {
  padding: 12px;
  text-align: right;
}
</style>
