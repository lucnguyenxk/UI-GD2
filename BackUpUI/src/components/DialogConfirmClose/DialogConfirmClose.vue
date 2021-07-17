<template>
  <div class="dialog-close">
    <div class="dialog-close-header">
      <div class="dialog-close-title noselect">CUKCUK - Quản lý nhà hàng</div>
    </div>
    <div class="dialog-close-content">
      <div class="dialog-main-content">
        <div class="dialog-icon-question"></div>
        <div class="dialog-content-text">Dữ liệu đã bị thay đổi, bạn có muốn cất không?</div>
      </div>
      <div class="dialog-bottom-content">
        <div>
          <CustomButton heightClass="height-24" text="Có" backgroundColor="#f2f2f2"
          @click="clickYes"/>
        </div>
        <div style="margin-left: 8px">
          <CustomButton heightClass="height-24" text="Không" backgroundColor="#f2f2f2"
          @click="clickNo"/>
        </div>
        <div style="margin-left: 8px">
          <CustomButton heightClass="height-24" text="Hủy bỏ" backgroundColor="#f2f2f2"
          @click="clickCancel"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-close {
  width: 400px;
  height: 140px;
  border: 5px solid #0072bc;
  background-color: #fff;
}

.dialog-close-header {
  position: relative;
  background-color: #0072bc;
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: space-between;
}

.dialog-close-title {
  color: #fff;
  font-size: 13px;
  font-weight: normal;
  padding-left: 4px;
  padding-top: 3px;
}

.dialog-close-content {
  position: relative;
  display: block;
  width: 100%;
  height: calc(100% - 25px);
}

.dialog-main-content {
  display: flex;
  width: 100%;
  height: 52px;
  padding: 10px;
}

.dialog-icon-question {
  background: url(../../assets/img/icon-question-32.png) no-repeat;
  min-width: 32px;
  height: 32px;
}

.dialog-content-text {
  margin-left: 12px;
  font-size: 13px;
  font-weight: normal;
}

.dialog-bottom-content {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 36px;
  padding: 6px;
}
</style>

<script>
import CustomButton from '../CustomButton/CustomButton.vue'
export default {
  components: {
    CustomButton
  },
  methods: {
    /**
    * Click vào nút hủy bỏ
    * @author: ndluc
    * CreatedDate: 10/07/2021
    */
    clickCancel() {
      this.$emit("closeDialogCloseForm","cancel");
    },

    /**
    * Click vào nút có
    * @author: ndluc
    * CreatedDate: 10/07/2021
    */
    clickYes() {
      this.$emit("closeDialogCloseForm","save");
    },

    /**
    * Click vào nút không
    * @author: ndluc
    * CreatedDate: 10/07/2021
    */
    clickNo() {
      this.$emit("closeDialogCloseForm","notSave");
    }
  },
}
</script>