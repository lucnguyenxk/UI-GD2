<template>
  <div
    v-click-outside="OnClickOutSide"
    class="autocomplete"
    v-on:keyup.down="KeyDownOnPress"
    v-on:keyup.enter="EnterOnPress"
    v-on:keyup.up="KeyUpOnPress"
    v-on:keydown.tab="HideOptions"
  >
    <div class="select-label">
      <input
        class="label-value"
        v-model="label_value"
        @click="FilterData"
        @input="FilterData"
        ref="focusInput"
        :class="{'emptyValue':isEmptyValue}"
        @focusout="focusOut"
        @mouseleave="mouseLeave"
      />
      <div class="icon-item" @click="ToggleOnClick">
        <div class="icon-toggle"></div>
      </div>
      <div class="icon-blue-add" @click="blueAddOnClick">
          <div class="icon-add"> </div>
      </div>
    </div>
    <div class="select-options" v-if="isShow">
      <div
        ref="option"
        v-for="(item, index) in data_filter"
        :key="index"
        class="optionTable"
        @click="OptionOnClick(item)"
        :class="{
          'is-selecting': index == index_Selecting,
          selected: option_selected == item[value_key],
        }"
        :id="index"
      >
        <div class="option-lable-value">
          {{ item[label_key] }}
        </div> 
        <div class="option-value-priceAdd">
          <money-format
          :disableInput="true"
          :valueMoney="item[label2]"
          />
        </div>
      </div>
      <div class="empty" v-if="is_empty">Không có dữ liệu hiển thị</div>
    </div>
  </div>
</template>

<script>
import MoneyFormat from '../../moneyFormat/MoneyFormat.vue'
import vClickOutside from "v-click-outside";
export default {
  components:{
    MoneyFormat,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  name: "autocomplete",
  props: {
    /**
    *Xác nhận có cần kiểm tra giá trị null hay không
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 15/07/2021
    */
    checkValueEmpty:{
      type : Boolean,
      default : false
    },

    /**
     * Value
     */
    model_value_prop: {
      default: null,
    },
    // Key (propertype) của Value muốn lấy
    value_key: {
      type: String,
      default: null,
    },

    // Key (propertype) của Text muốn hiển thị
    label_key: {
      type: String,
      default: null,
    },

    // Mảng các options
    options: {
      type: Array,
      default: null,
    },
    validate_class: {
      default: "",
    },
    /**
    *label lấy giá trị 1
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 15/07/2021
    */
    label1:{},
    /**
    *label lấy giá trị 2
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 15/07/2021
    */
   label2:{
     type : String
   },

   /**
   *label lấy giá trị 3
   * @param: {}
   * @return: {}
   * Createdby:ndluc 
   * CreatedDate: 15/07/2021
   */
  label3:{

  },
    /**
    *giá trị gửi lên 1
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 15/07/2021
    */
    valueNumber1:{
    },
    /**
    *giá trị gửi lên 2
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 15/07/2021
    */
    valueNumber2:{

    },
    /**
    *giá trị gửi lên 3
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 15/07/2021
    */
    valueNumber3:{
      
    }
  },
  watch: {
    // options(){
    //   this.GetDefaultValue();
    // },
    model_value_prop() {
      this.GetDefaultValue();
    },
    options(){
      this.GetDefaultValue();
    }
  },
  data() {
    return {
      option_selected: null, // Option nào đang được chọn
      isShow: false, // Ẩn hiện Options
      index_Selecting: -1, // Chỉ số (STT) của thằng đang được chọn
      label_value: null, // Label Text value (Giá trị hiển thị của thằng đang được chọn)
      data_filter: [], // Mảng tìm kiếm
      is_empty: false,
      isEmptyValue : false,
      selected:false,
    };
  },
  // watch:{
  //   model_value_prop(){
  //     // debugger // eslint-disable-line no-debugger
  //     console.log(this.model_value_prop);
  //     this.GetDefaultValue();
  //   }
  // },
  methods: {
    //#region 1. Xử lý các sự kiện
    /**
     * Sự kiện click vào chọn Option
     * Created By: ndluc (07/06/2021)
     */
    OptionOnClick(val) {
      //debugger ;// eslint-disable-line no-debugger
      this.selected = true;
      this.SetValue(val);
      this.HideOptions();
    },
    /**
     * Sự kiện Press vào phím mũi tên đi xuống chọn Option
     * Created By: ndluc (07/06/2021)
     */
    KeyDownOnPress() {
      this.index_Selecting++;
      if (this.index_Selecting > this.data_filter.length - 1) {
        this.index_Selecting = 0;
      }
      this.isShow = true;
    },
    /**
     * Sự kiện Click ra ngoài
     * Created By: ndluc (07/06/2021)
     */
    OnClickOutSide() {
      // debugger // eslint-disable-line no-debugger
      this.HideOptions();
    },
    /**
     * Sự kiện ấn vào nút thêm mới đối tượng trong complete
     */
    blueAddOnClick(){
        this.$emit("iconBlueAddOnClick",this.label_key);

    },

    /**
     * Sự kiện Click vào nút mũi tên trong autocomplete
     * Created By: ndluc (07/06/2021)
     */
    ToggleOnClick() {
      this.data_filter = this.options;
      this.isShow = !this.isShow;
      this.$refs.focusInput.focus();
      this.is_empty = false;
    },

    /**
     * Sự kiện Press vào Enter
     * Created By: ndluc (07/06/2021)
     */
    EnterOnPress() {
      // debugger // eslint-disable-line no-debugger
      if (this.index_Selecting == -1) {
        this.GetDefaultValue();
      } else {
        this.selected = true;
        this.SetValue(this.data_filter[this.index_Selecting]);
      }
      this.HideOptions();
    },

    /**
     * Sự kiện Press mũi tên đi lên chọn Option
     * Created By: ndluc (07/06/2021)
     */
    KeyUpOnPress() {
      this.index_Selecting--;
      if (this.index_Selecting < 0) {
        this.index_Selecting = this.data_filter.length - 1;
      }
      this.isShow = true;
    },
    /**
     * Sự kiện focusOut
     */
    focusOut() {
      this.$emit("focusOut");
    },

    mouseLeave() {
      this.$emit("mouseLeave");
    },
    //#endregion

    //#region 2. Các method, Function
    /**
     * Xử lý thay đổi giá trị value
     * Created By: ndluc (07/06/2021)
     */
    SetValue(val) {
      if (val != null) {
        var valueToUpdate= this.GetValue(val);
        this.$emit('update:valueNumber1', valueToUpdate[this.label1]);
        this.$emit('update:valueNumber2',valueToUpdate[this.label2]);
        this.$emit('update:valueNumber3',valueToUpdate[this.label3]);
        this.label_value = val[this.label_key];
        this.option_selected = val[this.value_key];
      }
    },

    /**
     * Khởi tạo lấy giá trị mặc định được truyền vào
     * Created By: ndluc (07/06/2021)
     */
    GetDefaultValue() {
      // debugger // eslint-disable-line no-debugger

      //1. Gán giá trị mặc định của mảng
      this.data_filter = this.options;

      //2. Lấy giá trị mặc định
      if (this.data_filter != null) {
        if (this.model_value_prop != null)
          this.data_filter.forEach((option) => {
            if (option[this.value_key] == this.model_value_prop) {
              this.label_value = option[this.label_key];
              this.option_selected = option[this.value_key];
            }
          });
        else this.label_value = null;
      }

      // debugger // eslint-disable-line no-debugger
    },

    /**
     * Function lấy Text
     * Created By: ndluc (10/06/2021)
     */
    GetText() {
      return this.label_value;
    },

    /**
     * Function lấy Value
     * Created By: ndluc (10/06/2021)
     */
    GetValue(val) {
      return val;
    },

    /**
     * Hiển thị Options
     * Created By: ndluc (10/06/2021)
     */
    ShowOptions() {
      this.isShow = true;
    },

    /**
     * Ẩn các Options
     * Created By: ndluc (10/06/2021)
     */
    HideOptions() {
      // debugger // eslint-disable-line no-debugger
      try{
        if(this.selected ==false)
        {
          var is_availble = false;
          this.options.forEach((option) => {
            if (option[this.label_key] == this.label_value) {
              // debugger // eslint-disable-line no-debugger
              this.$emit('update:valueNumber1',option[this.label1]);
              this.$emit('update:valueNumber2',option[this.label2]);
              this.$emit('update:valueNumber3',option[this.label3]);
              is_availble = true;
            }
          });
          if(!is_availble){
            this.$emit('update:valueNumber1',this.label_value);
          }
        }
        this.$emit("focusOut");
        this.isShow = false;
        this.index_Selecting = -1;
      }
      catch(error){
        console.error();
      }
    },


    /**
     * Sự kiện click vào autocomplete
     */
    autocompleteOnclick() {
      try {
        this.$emit("p_click");
        this.FilterData();
      } catch (error) {
        console.error();
      }
    },
    /**
     * Hàm tìm kiếm
     * Created By: ndluc (10/06/2021)
     */
    FilterData() {
      //1. Phần tử được chọn đầu tiên
      this.index_Selecting = 0;
      //2. Hiển thị Options
      this.ShowOptions();

      this.selected = false;
      //3. Nếu Trống Thì hiển thị tất cả
      if (this.label_value != null) {
        if (this.label_value.length == 0) {
          this.data_filter = this.options;
        }else {
          this.data_filter = this.options.filter(
            (e) =>
              e[this.label_key]
                .toLowerCase()
                .indexOf(this.label_value.toLowerCase()) != -1
          );
        }
      }else {
        this.data_filter = this.options;
      }
      if (this.data_filter.length == 0) {
        this.is_empty = true;
      } else this.is_empty = false;
    },
    //#endregion

  },
  created() {
    this.selected = true;
    this.GetDefaultValue();
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
@import url("AutoCompleteTable.scss");
</style>