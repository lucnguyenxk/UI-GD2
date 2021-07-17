<template>
  <div
    class="autocomplete"
    v-click-outside="OnClickOutSide"
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
        class="option"
        @click="OptionOnClick(item)"
        :class="{
          'is-selecting': index == index_Selecting,
          selected: option_selected == item[value_key],
        }"
        :id="index"
      >
        {{ item[label_key] }}
      </div>
      <div class="empty" v-if="is_empty">Không có dữ liệu hiển thị</div>
    </div>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
export default {
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
        console.log(valueToUpdate);
        this.$emit("update:model_value_prop", valueToUpdate);
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
      return val[this.value_key];
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
      var is_availble = false;
      this.options.forEach((option) => {
        if (option[this.label_key] == this.label_value) {
          // debugger // eslint-disable-line no-debugger
          this.$emit("update:model_value_prop", option[this.value_key]);
          is_availble = true;
        }
      });
      if (
        this.label_value != null &&
        this.label_value != "" &&
        is_availble == false
      ) {
        this.$emit("update:model_value_prop", null); // eslint-disable-line no-debugger
        this.label_value = "";
      } else if (this.label_value == null || this.label_value == "") {
        this.$emit("update:model_value_prop", null);
      }
      this.$emit("focusOut");
      this.isShow = false;
      this.index_Selecting = -1;
    },


    /**
     * Sự kiện click vào autocomplete
     */
    autocompleteOnclick() {
      this.$emit("p_click");
      this.FilterData();
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
      //3. Nếu Trống Thì hiển thị tất cả
      if (this.label_value != null) {
        if (this.label_value.length == 0) {
          this.data_filter = this.options;
        } else {
          this.data_filter = this.options.filter(
            (e) =>
              e[this.label_key]
                .toLowerCase()
                .indexOf(this.label_value.toLowerCase()) != -1
          );
        }
      } else {
        this.data_filter = this.options;
      }
      if (this.data_filter.length == 0) {
        this.is_empty = true;
      } else this.is_empty = false;
    },
    //#endregion

    Test() {
      alert(1);
    },
  },
  created() {
    this.GetDefaultValue();
  },
  mounted() {
    // this.GetDefaultValue();
    // console.log(this.model_value);
  },
};
</script>

<style lang="scss" scoped>

/********************
* Declare
**********************/

// chiều dài của thẻ:
$width: 100%;
// Chiều cao của thẻ:
$height: 25px;
// Background Default:
$background-default: #ffffff;
// Background Hover:
$background-hover: #d6e8f6;
// Background Selected:
$background-selected: blue;
// Màu chữ default:
$color-default: #000000;
// Màu chữ hover:
$color-hover: #000;
// border chung
$border: 1px solid #babec5;
// border khi focus vào
$border-focus: 1px solid blue;
// Icon toggle:
$icon-toggle: url("");

/**************************************
* Mixin Method
***************************************/
// Thuộc tính icon toggle cho thẻ

@mixin Icon {
  background: url("../../assets/img/dropdown-icon.png") no-repeat -51px -9px;
	width: 8px;
	height: 4px;
}

// Size Đồng bộ chung
@mixin common-size {
  width: $width;
  height: $height;
}
// Size
@mixin Size($w, $h) {
  width: $w !important;
  height: $h;
}

// Flex Box (Center, Center)
@mixin Flex-Center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/*************************
* autocomplete CSS
***************************/
.autocomplete {
  @include common-size;
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  /* ------- Select_label----------- */
  .select-label {
    position: absolute;
    @include Size(100%, 100%);
    @include Flex-Center;

    .label-value {
      position: absolute;
      display: flex;
      align-items: center;
      padding-left: 8px;
      box-sizing: border-box;
      left: 0;
      color: $color-default;
      @include Size(100%, 100%);
        border-color: #c1c1c1 #d9d9d9 #d9d9d9 !important;
        border-width: 1px;
        border-style: solid;
      
      &:focus {
        outline: none;
        border: $border-focus;
      }
    }
    .icon-item {
      position: absolute;
      right: 23px;
      top: 1px;
      height: 22px !important;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      cursor: pointer;
      @include Flex-Center;
      @include Size(22px, 100%);
      
      .icon-toggle {
        @include Icon;
      }
    }
    .icon-blue-add{
        height: 22px;
        width: 22px;
        top : 1px;
        position: absolute;
        right: 1px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-add{
            background : url("../../assets/img/add-blue-icon.png") no-repeat 0 0;
            width: 15px;
            height: 15px;
        }
    }
  }

  /* -------- Select_options---------- */
  .select-options {
    position: absolute;
    @include Size(100%, auto) ;
    top: $height + 2px;
    left: -1px;
    background: $background-default;
    border-radius: 2px;
    z-index: 10;
    max-height: 150px;
    overflow-y: auto;
    // max-height: 250px;
    // overflow-y: auto;
    border: 1px solid #d3d3d3;
    box-shadow: 0 1px 1px 1px #d3d3d3;
    // box-sizing: border-box;
    /* -------- option ---------- */
    .option {
      @include Size(100%, $height);
      width: calc(100%);
      @include Flex-Center;
      justify-content: unset;
      text-align: left;
      border-radius: 2px;
      color: $color-default;
      cursor: pointer;
      padding-left: 16px;
      &:hover {
        background: $background-hover;
        color: $color-hover;
      }
    }
    // Thằng nào đang được chọn
    .is-selecting {
      background: $background-hover;
      color: $color-hover;
    }
    .empty {
      @include Size(100%, $height);
      @include Flex-Center;
      background: #f7f7f7;
      border-radius: 2px;
    }
  }
}

.selected {
  background-color: #d6e8f6 !important;
  color: #000 !important;
}

.validate {
  border-color: red !important;
}
.emptyValue{
  border: 1px solid red !important ;
}
</style>