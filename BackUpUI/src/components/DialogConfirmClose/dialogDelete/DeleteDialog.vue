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
@import url("DeleteDialog.css");
</style>

<script>
import CustomButton from '../../CustomButton/CustomButton.vue'
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