<script setup lang="ts"></script>

<template>
  <main>
    <h2>Mark Something</h2>
    <div class="typing-area">
      <input type="text" placeholder="Title" />
      <textarea name="" id="" rows="10" placeholder="Typing"></textarea>
      <input type="text" placeholder="By" />
    </div>
    <div class="btn-block">
      <el-button>Save</el-button>
    </div>
  </main>
</template>

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
