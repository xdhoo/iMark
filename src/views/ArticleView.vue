<template>
  <div class="wrapper">
    <div class="typing-area">
      <div class="back-btn">
        <el-button :icon="DArrowLeft" circle @click="handleBack" />
      </div>
      <template v-if="!editing">
        <h2 class="title">{{ formData.title }}</h2>
        <div class="content" style="white-space: pre-wrap">{{ formData.content }}</div>
        <div class="btn-block">
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
    <div class="note-area">
      <h2 class="title">
        Notes
        <el-button type="info" @click="dialogVisible = true" size="small" style="margin-left: 10px"
          >+ Add Note</el-button
        >
      </h2>
      <div class="note-area-content">
        <template v-for="note in notes" :key="note._id">
          <div class="note-item">
            <h3 @click="handleNoteEdit(note)">{{ note.text }} {{ note.property }}</h3>
            <span>{{ note.en_explain }}</span>
            <div v-if="note.related">
              <span style="color: #00bf19">Similar:</span> {{ note.related }}
            </div>
            <div>{{ note.others }}</div>
          </div>
        </template>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" title="Add Note" width="600">
      <el-form :model="noteForm" :rules="rules" ref="noteFormRef">
        <el-form-item label="Text" :label-width="100" prop="text">
          <el-input v-model="noteForm.text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Property" :label-width="100" prop="property">
          <el-select v-model="noteForm.property">
            <el-option label="其他" value="" />
            <el-option label="n. 名词" value="n." />
            <el-option label="v. 动词" value="v." />
            <el-option label="adj. 形容词" value="adj." />
            <el-option label="pron. 代词" value="pron." />
            <el-option label="adv. 副词" value="adv." />
            <el-option label="num. 数词" value="num." />
            <el-option label="art. 冠词" value="art." />
            <el-option label="prep. 介词" value="prep." />
            <el-option label="conj. 连词" value="conj." />
            <el-option label="int. 感叹词" value="int." />
          </el-select>
        </el-form-item>
        <el-form-item label="Explain" :label-width="100" prop="en_explain">
          <el-input v-model="noteForm.en_explain" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Related" :label-width="100" prop="related">
          <el-input v-model="noteForm.related" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Description" :label-width="100" prop="others">
          <el-input type="textarea" v-model="noteForm.others" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="noteSaveHandle(noteFormRef)"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addNote, getArticle, saveArticle } from '../services'
import type { FormInstance } from 'element-plus'
import type { Note } from '../../types/index'
import { DArrowLeft } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const formData = ref({ title: '', content: '' })
const editing = ref(false)
const notes = ref<Note[]>([])
const dialogVisible = ref(false)
let noteForm = reactive<Note>({
  _id: '',
  text: '',
  property: '',
  related: '',
  en_explain: '',
  others: ''
})

const rules = reactive({
  text: [{ required: true, trigger: 'blur' }]
})
const noteFormRef = ref<FormInstance>()

onMounted(() => {
  if (route.params.id) {
    fetchArticle()
  } else {
    editing.value = true
  }
})

const fetchArticle = () => {
  getArticle(route.params.id as string)
    .then((res) => {
      formData.value = res.data
      notes.value = res.data.notes
    })
    .catch((error) => {
      console.log(error)
    })
}

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

const noteSaveHandle = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      addNote({ id: route.params.id as string, note: noteForm }).then((res) => {
        dialogVisible.value = false
        fetchArticle()
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleNoteEdit = (note: Note) => {
  noteForm = note
  dialogVisible.value = true
}
</script>
<style scoped lang="scss">
.wrapper {
  display: flex;
  h2.title {
    font-weight: 700;
    margin-bottom: 10px;
  }
  .typing-area {
    position: relative;
    .back-btn {
      position: absolute;
      left: -43px;
      top: 3px;
    }
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

  .note-area {
    width: 580px;
    margin-left: 30px;
    border-left: 1px solid #dadada;
    padding-left: 16px;

    &-content {
      .note-item {
        margin-bottom: 12px;
        h3 {
          cursor: pointer;
          font-weight: 600;
        }
        h3:hover {
          color: #07a6f0;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
