<template>
  <div class="table-toolbar-item noselect" @click="toolbarClick">
    <div class="custom-toolbar-icon">
      <div class="toolbar-icon">
        <div :class="iconClass"></div>
      </div>
    </div>
    <div class="custom-toolbar-text">{{ text }}</div>
  </div>
</template>


<script>
export default {
  props: {
    text: {type: String, default: ""},
    iconClass: {type: String, default: ""}
  },
  methods: {
    /**
    * Xử lý sự kiện click ở Parent component
    * @author: lntung
    * CreatedDate: 08/07/2021
    */
    toolbarClick() {
      this.$emit("click");
    }
  }
}
</script>
<style scoped>
@import url("TableToolbar.css");
</style>
