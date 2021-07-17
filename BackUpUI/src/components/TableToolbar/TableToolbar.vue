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
.table-toolbar-item {
  display: flex;
  border: 1px solid transparent;
  height: 22px;
  line-height: 22px;
  box-sizing: border-box;
  background-color: inherit;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  padding-left: 4px;
  padding-right: 4px;
  cursor: pointer;
}

.table-toolbar-item:hover {
  border-color: #0071c1;
  background-color: #ffffff;
}

.custom-toolbar-text {
  padding-left: 5px;
  padding-right: 5px;
}

.insert-icon {
  background: url(../../assets/img/iconSprite.png) no-repeat;
  background-position: 0 -2648px;
  width: 16px;
  height: 16px;
}

.clone-icon {
  background: url(../../assets/img/iconSprite.png) no-repeat;
  background-position: 0 -1888px;
  width: 16px;
  height: 16px;
}

.edit-icon {
  background: url(../../assets/img/Edit16.png) no-repeat 50% 50%!important;
  width: 16px;
  height: 16px;
  background-color: transparent;
  background-repeat: no-repeat;
}

.delete-icon {
  background: url(../../assets/img/iconSprite.png) no-repeat;
  background-position: 0 -2680px;
  width: 16px;
  height: 16px;
}

.refresh-icon {
  background: url(../../assets/img/iconSprite.png) no-repeat;
  background-position: 0 -2584px;
  width: 16px;
  height: 16px;
}

</style>
