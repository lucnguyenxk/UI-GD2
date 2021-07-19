import axios from 'axios';
import CustomButton from '../../components/CustomButton/CustomButton.vue'
import UnitForm from './UnitForm';
export default UnitForm({
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
})