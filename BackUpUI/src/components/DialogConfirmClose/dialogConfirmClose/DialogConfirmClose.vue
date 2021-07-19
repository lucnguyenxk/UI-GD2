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
@import url("DialogConfirmClose.css");
</style>

<script>
import CustomButton from '../../CustomButton/CustomButton.vue'
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