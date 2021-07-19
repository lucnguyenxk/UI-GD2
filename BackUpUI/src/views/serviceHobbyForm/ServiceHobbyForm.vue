<template>
  <div class="form-add-unit">
    <div class="dialog-close-header">
      <div class="dialog-close-title noselect">CUKCUK - Quản lý nhà hàng</div>
      <div class="detail-header-close">
        <div class="header-icon-close" @click="clickCancel"></div>
      </div>
    </div>
    <div class="dialog-add-content">
      <div class="menuName-detail add-data-serviceHobby description">
        <div class="label-input-add menuName"> Sở thích phục vụ<span class="require">(*)</span></div>
        <div class="inputBox">
            <input type="text" class="inputValue" v-model="serviceHobby.serviceHobbyName" :class="{'boderErr':(serviceHobby.serviceHobbyName!=null && serviceHobby.serviceHobbyName.trim().length==0 )|| missingServiceHobbyName==true}" @input="missingServiceHobbyName=false">
        </div>
        <div class="error-input" :class="{'displayNone':(serviceHobby.serviceHobbyName==null|| serviceHobby.serviceHobbyName.trim().length!=0)&&missingServiceHobbyName==false}" >
            <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">Trường này không được để trống</q-tooltip>
        </div>
        </div>
        <div class="menuName-detail add-data-serviceHobby ">
        <div class="label-input-add menuName">Thu thêm</div>
        <div class="inputBox">
            <input type="number" class="inputValue" v-model="serviceHobby.priceAdd">
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
            @click="addServiceHobby"/>
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
        serviceHobby :{type : Object}
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
      this.$emit("closeServiceHobbyForm","cancel");
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
    * Click vào cất
    * @author: ndluc
    * CreatedDate: 10/07/2021
    */
    addServiceHobby() {
      var isvalid = true;
      if(this.serviceHobby.serviceHobbyName ==null || this.serviceHobby.serviceHobbyName.trim().length == 0){
        this.missingServiceHobbyName = true;
        isvalid = false;
      }
      if(this.serviceHobby.priceAdd < 0){
        this.serviceHobby.priceAdd=0;
      }
      if(isvalid){
        axios
        .post("https://localhost:44313/api/v1/ServiceHobbys", this.serviceHobby)
        .then(res=>{
          if(res.data.statusCode==200){
              this.$emit("closeServiceHobbyForm","succed")
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
          missingServiceHobbyName: false,
      }
  }
}
</script>
<style scoped>
@import url("ServiceHobbyForm.css");
</style>
