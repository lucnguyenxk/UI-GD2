<template>
  <div>
    <div class="filter-type" @click.prevent="toggleOption">
      {{ curruntText }}
    </div>
    <div
      class="dropdown-content"
      ref="autofocus"
      tabindex="0"
      @focusout="closeDropdown"
      v-if="isShow"
    >
      <div
        class="dropdown-item"
        v-for="(option, index) in optionFilter"
        :key="index"
        @click="selectOption(option)"
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * Kiểu lọc
     * created by ndluc(13/07/2021)
     */
    optionFilter: {
      type: Array,
    },
    /**
     * tên của giá trị cần lấy type
     * created by ndluc(13/07/2021)
     */
    name :{
      type : String,
    }
  },
  data: () => ({
    /**
     * Hiển thị Dropdown
     */
    isShow: false,
    currunt: 1,
    curruntText: "",
  }),
  methods: {
    /**
     * Thay đổi trạng thái dropdown
     */
    toggleOption() {
      this.isShow = !this.isShow;
    },
    closeDropdown() {
      setTimeout(() => {
        this.isShow = false;
      }, 200);
    },
    selectOption(option) {
      this.currunt = option.value;
      this.curruntText = option.text.slice(0, 1);
      this.$emit("getTypeFilter",this.currunt,this.name);
      this.closeDropdown();
    },
  },
  watch: {
    isShow: function () {
      if (this.isShow) {
        setTimeout(() => {
          this.$refs.autofocus.focus();
        }, 100);
      }
    },
  },
  mounted() {
    this.curruntText = this.optionFilter[0].text.slice(0, 1);
  },
};
</script>


<style scoped>
/* .filter-type {
  height: 24px;
  line-height: 24px;
  width: 24px;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-weight: 400;
}

.filter-type:hover {
  border-color: #eb7728;
  background-color: #eef6fb;
}

.filter-type:active {
  border-color: #0071c1 !important;
}

.filter-type-focus {
  border-color: #0071c1 !important;
  box-shadow: 0px 4px 8px #c0c0c0;
}

.filter-type-content {
  border-radius: 3px;
  font-weight: 400;
  background-color: #fff;
  box-shadow: 0px 4px 8px #c0c0c0;
  z-index: 20;
  position: absolute;
  margin-top: 3px;
  padding: 1px;
  width: 120px;
}

.filter-type-content:focus {
  outline: none;
}

.filter-type-item {
  cursor: pointer;
  height: 24px;
  line-height: 24px;
  padding-right: 12px;
  padding-left: 16px;
}

.filter-type-item:hover {
  background-color: #D7E9F4;
} */
.filter-type {
  height: 24px;
  line-height: 24px;
	 width: 24px;
	 background-color: #fff;
	 text-align: center;
	 cursor: pointer;
	 border: 1px solid #dfe3e8;
	 font-weight: 400;
   box-sizing: border-box;
}
 .filter-type ~ div {
	 border-radius: 3px;
	 font-weight: 400;
	 background-color: #fff;
	 box-shadow: 0px 4px 8px #c0c0c0;
	 z-index: 20;
	 position: absolute;
	 margin-top: 1px;
	 padding: 1px;
}
 .filter-type ~ div:focus {
	 outline: none;
}
 .filter-type ~ div .dropdown-item {
   display: flex;
	 cursor: pointer;
	 height: 30px;
	 line-height: 30px;
	 padding-right: 12px;
	 padding-left: 16px;
   justify-content: left;
   min-width: 50px;
}
 .filter-type ~ div .dropdown-item:hover {
	 background-color: #6b6f9d;
	 color: #fff;
}
.dropdown-content{
  min-width: 170px !important;
  width: fit-content;
}
 
</style>

