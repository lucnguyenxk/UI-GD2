<template>
  <div class="dialog-delete">
    <div class="dialog-delete-header">
      <div class="dialog-delete-title noselect">CUKCUK - Quản lý nhà hàng</div>
    </div>
    <div class="dialog-delete-content">
      <div class="dialog-main-content">
        <div class="dialog-icon-question"></div>
        <div class="dialog-content-text">Bạn có chắc chắn muốn xóa thực đơn {{this.inforToDelete}} không?</div>
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-delete {
  width: 400px;
  height: 123px;
  border: 5px solid #0072bc;
  background-color: #fff;
}

.dialog-delete-header {
  position: relative;
  background-color: #0072bc;
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: space-between;
}

.dialog-delete-title {
  color: #fff;
  font-size: 13px;
  font-weight: normal;
  padding-left: 4px;
  padding-top: 3px;
}

.dialog-delete-content {
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
  position: relative;
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
  props:{
    /**
    *Thông tin chung của đối tượng cần xóa
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 15/07/2021
    */
    inforToDelete:{
      type : String
    },
  },
  methods: {
    /**
    * Nhấn vào nút Không
    * @author: lntung
    * CreatedDate: 11/07/2021
    */
    clickNo() {
      this.$emit("confirmDialogDelete", "Deny");
    },

    /**
    * Nhấn vào nút Có
    * @author: lntung
    * CreatedDate: 11/07/2021
    */
    clickYes() {
      this.$emit("confirmDialogDelete","Accept");
    }
  }
}
</script>