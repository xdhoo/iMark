<template>
  <div>
    <div class="typing-area">
      <template v-if="!editing">
        <h2>{{ formData.title }}</h2>
        <div class="content" style="white-space: pre-wrap">{{ formData.content }}</div>
        <div class="btn-block">
          <el-button type="success" @click="handleBack">Back</el-button>
          <el-button type="primary" @click="editing = true">Edit</el-button>
        </div>
      </template>
      <template v-else>
        <div>
          <input type="text" placeholder="Title" v-model="formData.title" />
        </div>
        <div>
          <textarea
            name=""
            id=""
            rows="15"
            placeholder="Typing"
            v-model="formData.content"
          ></textarea>
        </div>
        <div class="btn-block">
          <el-button @click="editing = false">Cancel</el-button>
          <el-button type="success" @click="handleArticleSave">Save</el-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticle, saveArticle } from '../services'

const route = useRoute()
const router = useRouter()

const formData = ref({ title: '', content: '' })
const editing = ref(false)

onMounted(() => {
  getArticle(route.params.id)
    .then((res) => {
      formData.value = res.data
    })
    .catch((error) => {
      console.log(error)
    })
})

const handleArticleSave = () => {
  saveArticle(formData.value)
    .then((res) => {
      console.log('response', res)
      editing.value = false
    })
    .catch((err) => console.log('err', err))
}

const handleBack = () => {
  router.push({ path: '/articles' })
}
</script>
<style scoped lang="scss">
.typing-area {
  .content {
    width: 620px;
  }
  input {
    border: none;
    outline: none;
    width: 620px;
    padding: 10px;
    border-bottom: 1px solid #dedede;
    margin-bottom: 12px;
  }
  textarea {
    border: none;
    outline: none;
    width: 620px;
    padding: 10px;
    border: 1px solid #dedede;
    border-radius: 12px;
  }
}
.btn-block {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
