<template>
  <div class="dialog-close">
    <div class="dialog-close-header">
      <div class="dialog-close-title noselect">CUKCUK - Quản lý nhà hàng</div>
    </div>
    <div class="dialog-close-content">
      <div class="dialog-main-content">
        <div class="dialog-icon-question"></div>
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



<script>
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
}
</script>
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
  background: url(../../../assets/img/icon-warning.png) no-repeat;
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