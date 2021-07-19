<template>
  <div class="v-money-input">
      <div class="input-money">
      <!-- <input type="text" v-model="displayValue" @input="getValueDisplay()"> -->
      <Money
      v-bind ="money"
      v-model="displayValue"
      @input="getValueMoney"
      class="v-money"
      :class="{'boderErr':errValue==true}"
      :disabled="disableInput"
      />
      </div>
  </div>
</template>

<script>
import {Money} from 'v-money'
export default {
    
    components:{
        Money,
    },
    created(){
        this.displayValue=this.valueMoney;
    },
    props:{ 
        /**
        *nhận giá trị tiền gửi vào
        * @param: {}
        * @return: {}
        * Createdby:ndluc 
        * CreatedDate: 19/07/2021
        */
        valueMoney : {type : Number , default : 0},
        /**
        *xác nhận kiểm tra giá trị không hợp lệ
        * @param: {}
        * @return: {}
        * Createdby:ndluc 
        * CreatedDate: 19/07/2021
        */
        errValue :{type:Boolean,default:false},

        /**
        *xác nhận có cho nhập tay hay không
        * @param: {}
        * @return: {}
        * Createdby:ndluc 
        * CreatedDate: 19/07/2021
        */
        disableInput:{type:Boolean,default:false}
    },
    data(){
        return{
            /**
            *Giá trị hiển thị trên input
            * @param: {}
            * @return: {}
            * Createdby:ndluc 
            * CreatedDate: 19/07/2021
            */
            displayValue : 0,
            /**
            *định nghĩa kiểu hiển thị

            * @param: {}
            * @return: {}
            * Createdby:ndluc 
            * CreatedDate: 19/07/2021
            */
            money:{
                decimal: ".",
                thousands: ".",
                prefix: " ",
                precision:0,
                masked: false, // doesn't work with directive
                // Waiting on https://github.com/vuejs-tips/v-money/pull/51 to be merged
                allowBlank: true,
            }
        }
    },
    methods:{
        /**
        *lấy giá trị tiền gửi ra cho componet cha
        * @param: {}
        * @return: {}
        * Createdby:ndluc 
        * CreatedDate: 19/07/2021
        */
        getValueMoney(){
            this.$emit("update:valueMoney",this.displayValue);
        }
    },
    watch:{
        /**
        *kiểm tra khi giá trị đầu vào thay đổi thì cập nhật
        * @param: {}
        * @return: {}
        * Createdby:ndluc 
        * CreatedDate: 19/07/2021
        */
        valueMoney(){
            this.displayValue = this.valueMoney;
        }
    }
}
</script>

<style>
.input-money{
    width: 100%;
    height: 100%;
}
.v-money{
    width: 100%;
    height: 100%;
    outline: none;
    text-align-last: right;
}
.v-money-input{
    width: 100%;
    height: 100%;
}
.boderErr{
    border: 1px solid red !important;
}
.input-money input:disabled{
    color: #000;
    background: none;
    border: none;
    opacity: 1 !important;
}
</style>