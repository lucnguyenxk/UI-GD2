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
        <div class="label-input-add menuName"> Nơi chế biến <span class="require">(*)</span></div>
        <div class="inputBox">
            <input type="text" class="inputValue" v-model="processArea.processAreaName" :class="{'boderErr':(processArea.processAreaName!=null && processArea.processAreaName.trim().length==0 )|| missingProcessAreaName==true}" @input="missingProcessAreaName=false"  >
        </div>
        <div class="error-input" :class="{'displayNone':(processArea.processAreaName==null|| processArea.processAreaName.trim().length!=0)&&missingProcessAreaName==false}" >
            <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">Trường này không được để trống</q-tooltip>
        </div>
        </div>
        <div class="menuName-detail add-data-unit description">
        <div class="label-input-add menuName">Diễn giải</div>
        <div class="inputBox">
            <input type="text" class="inputValue"  v-model="processArea.description" >
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
            @click="addProcessArea"/>
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
        processArea :{type : Object}
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
      this.$emit("closeProcessAreaForm","cancel");
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
    * Click vào cất
    * @author: ndluc
    * CreatedDate: 10/07/2021
    */
    addProcessArea() {
      var isvalid = true;
      if(this.processArea.processAreaName ==null || this.processArea.processAreaName.trim().length == 0){
        this.missingProcessAreaName = true;
        isvalid = false;
      }
      if(isvalid){
        axios
        .post("https://localhost:44313/api/v1/ProcessAreas", this.processArea)
        .then(res=>{
          if(res.data.statusCode==200){
              this.$emit("closeProcessAreaForm","succed")
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
          missingProcessAreaName: false,
      }
  }
}
</script>
<style scoped>
@import url("ProcessAreaForm.css");
</style>
