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