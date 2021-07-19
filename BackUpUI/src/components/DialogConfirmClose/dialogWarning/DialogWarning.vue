<template>
  <div class="dialog-close" ref="dialogWarning">
    <div class="dialog-close-header">
      <div class="dialog-close-title noselect">CUKCUK - Quản lý nhà hàng</div>
    </div>
    <div class="dialog-close-content">
      <div class="dialog-main-content">
        <div class="dialog-icon-warning"></div>
        <div class="dialog-content-text">{{this.warningText}}</div>
      </div>
      <div class="dialog-bottom-content">
        <div style="margin-left: 8px">
          <CustomButton heightClass="height-24" text="Đồng ý" backgroundColor="#f2f2f2"
          @click="clickAccept"/>
        </div>
      </div>
    </div>
  </div>
</template>



<script  >
import CustomButton from '../../CustomButton/CustomButton.vue'
export default {

    props:{
        warningText:{
            type : String,
            default :"Mã <A027> đã tồn tại trên một trong các danh sách sau: Món ăn, đồ uống, combo, món khác, dịch vụ tính tiền theo thời gian."
        }
    },
  components: {
    CustomButton
  },
  methods: {
    /**
    *click đồng ý warning
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 16/07/2021
    */
   clickAccept(){
       this.$emit("closeWarningForm");
   }
  },
  mounted() {
      // let recaptchaScript = document.createElement('script')
      // recaptchaScript.setAttribute("src", "../dialogWarning/DialogWaring.js")
      // recaptchaScript.setAttribute("data-transaction-amount", "14.90")
      // this.$refs.dialogWarning.appendChild(recaptchaScript)
    },
}
</script>
<style scoped>
@import url("DialogWarning.css");
</style>