<template>
  <div class="form-add">
    <div class="dialog-close-header">
      <div class="dialog-close-title noselect">CUKCUK - Quản lý nhà hàng</div>
      <div class="detail-header-close">
        <div class="header-icon-close" @click="clickCancel"></div>
      </div>
    </div>
    <div class="dialog-add-content">
      <div class="menuName-detail add-data">
        <div class="label-input-add menuName">Mã nhóm <span class="require">(*)</span></div>
        <div class="inputBox">
            <input type="text" class="inputValue" v-model="menuGroup.menuGroupCode" :class="{'boderErr':(menuGroup.menuGroupCode!=null && menuGroup.menuGroupCode.trim().length==0 )|| missingCode==true}" @input="missingCode=false" >
        </div>
        <div class="error-input" :class="{'displayNone':(menuGroup.menuGroupCode==null|| menuGroup.menuGroupCode.trim().length!=0)&&missingCode==false}">
            <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">Trường này không được để trống</q-tooltip>
        </div>
        </div>
         <div class="menuName-detail add-data">
        <div class="label-input-add menuName">Tên nhóm <span class="require">(*)</span></div>
        <div class="inputBox">
            <input type="text" class="inputValue" v-model="menuGroup.menuGroupName" :class="{'boderErr':(menuGroup.menuGroupName!=null&&menuGroup.menuGroupName.trim().length==0)|| missingName==true}" @input="missingName=false" >
        </div>
        <div class="error-input" :class="{'displayNone':(menuGroup.menuGroupName==null || menuGroup.menuGroupName.trim().length!=0) && missingName==false} " >
            <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">Trường này không được để trống</q-tooltip>
        </div>
        </div>
        <div class="menuName-detail add-data description">
        <div class="label-input-add menuName">Diễn giải</div>
        <div class="inputBox">
            <input type="text" class="inputValue"  v-model="menuGroup.description" >
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
            @click="addMenuGroup"/>
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


<script>
import axios from 'axios';
import CustomButton from '../../components/CustomButton/CustomButton.vue'
export default {
    props:{
      menuGroup:{type:Object}
    },
  components: {
    CustomButton
  },
  methods: {
    /**
    * Click vào nút hủy bỏ
    * @author: lntung
    * CreatedDate: 10/07/2021
    */
    clickCancel() {
      this.$emit("closeFormMenuGroup","cancel");
    },

    /**
    * Click vào nút có
    * @author: lntung
    * CreatedDate: 10/07/2021
    */
    clickYes() {
      this.$emit("save");
    },

    /**
    * Click vào nút cất
    * @author: lntung
    * CreatedDate: 10/07/2021
    */
   addMenuGroup(){
     var isValidate = true;
     if(this.menuGroup.menuGroupName==null || this.menuGroup.menuGroupName.trim().length ==0){
       this.missingName = true;
       isValidate = false;
     }
     if(this.menuGroup.menuGroupCode == null|| this.menuGroup.menuGroupCode.trim().length==0){
       this.missingCode =true;
       isValidate = false;
     }
     if(isValidate){
        axios
        .post("https://localhost:44313/api/v1/MenuGroups",this.menuGroup)
        .then(res=>{
          if(res.data.statusCode==200){
              this.$emit("closeFormMenuGroup","succed")
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
        missingName : false,
        missingCode : false
      }
  }
}
</script>
<style scoped>
@import url("MenuGroupForm.css");
</style>
