<template>
  <div>
    <div class="typing-area">
      <input type="text" placeholder="Title" v-model="formData.title" />
      <textarea name="" id="" rows="10" placeholder="Typing" v-model="formData.content"></textarea>
    </div>

    <div class="btn-block">
      <el-button @click="handleArticleSave">Save</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const formData = ref({ title: '', content: '' })

onMounted(() => {
  console.log(route.params)
  const id = route.params.id
  axios
    .get('api/article', { params: { id } })
    .then((res) => {
      formData.value = res.data
    })
    .catch((error) => {
      console.log(error)
    })
})

const handleArticleSave = () => {
  console.log(formData.value)

  axios
    .post('api/article', formData.value)
    .then((res) => {
      console.log('response', res)
    })
    .catch((err) => console.log('err', err))
}
</script>
<style scoped lang="scss">
.typing-area {
  input,
  textarea {
    border: none;
    outline: none;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #dedede;
  }
}
.btn-block {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
