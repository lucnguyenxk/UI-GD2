<template>
  <div class="form-add-unit">
    <div class="dialog-close-header">
      <div class="dialog-close-title noselect">CUKCUK - Quản lý nhà hàng</div>
      <div class="detail-header-close">
        <div class="header-icon-close" @click="clickCancel"></div>
      </div>
    </div>
    <div class="dialog-add-content">
      <div class="menuName-detail add-data-unit">
        <div class="label-input-add menuName"> Đơn vị tính <span class="require">(*)</span></div>
        <div class="inputBox">
            <input type="text" class="inputValue" v-model="unit.unitName" :class="{'boderErr':(unit.unitName!=null && unit.unitName.trim().length==0 )|| missingUnitName==true}" @input="missingUnitName=false"  >
        </div>
        <div class="error-input" :class="{'displayNone':(unit.unitName==null|| unit.unitName.trim().length!=0)&&missingUnitName==false}">
            <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">Trường này không được để trống</q-tooltip>
        </div>
        </div>
        <div class="menuName-detail add-data-unit description">
        <div class="label-input-add menuName">Diễn giải</div>
        <div class="inputBox">
            <input type="text" class="inputValue"  v-model="unit.description" >
        </div>
        </div>
      <div class="dialog-bottom-content">
        <div>
          <CustomButton heightClass="height-25" iconClass="help-icon" text="Giúp" toolTipText="F1"
          @click="clickYes"/>
        </div>
        <div class="btn-form-add-right">
            <div style="margin-left: 8px">
            <CustomButton heightClass="height-25" iconClass="save-icon" text="Cất" toolTipText="Ctrl + S"
            @click="addUnit"/>
            </div>
            <div style="margin-left: 8px">
            <CustomButton heightClass="height-25" iconClass="cancel-icon" text="Hủy Bỏ" toolTipText="Ctrl + B"
            @click="clickCancel"/>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script  >

import axios from 'axios';
import CustomButton from '../../components/CustomButton/CustomButton.vue'
export default {
    props:{
        unit:{type :Object}
    },
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
      this.$emit("closeUnitForm","cancel");
    },

    /**
    * Click vào nút có
    * @author: ndluc
    * CreatedDate: 10/07/2021
    */
    clickYes() {
      this.$emit("save");
    },

    /**
    * Click vào nút không
    * @author: ndluc
    * CreatedDate: 10/07/2021
    */
    addUnit() {
      var isValid =true;
      if(this.unit.unitName == null|| this.unit.unitName.trim().length==0){
        isValid = false;
        this.missingUnitName=true;
      }
      if(isValid){
        axios.post("https://localhost:44313/api/v1/Units", this.unit)
        .then(res=>{
          if(res.data.statusCode==200){
              this.$emit("closeUnitForm","succed")
          }
          else if(res.data.statusCode==400){
            this.$emit("openWarningForm",res.data.userMessage)
          }
        })
        .catch(res =>{
          console.log(res);
        })

      }
    }
  },
  data(){
      return{
         missingUnitName: false,
      }
  }
}
</script>
<style scoped>
@import url("UnitForm.css");
</style>
