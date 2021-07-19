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
        {{option.text}}
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
@import url("FilterType.css"); 
</style>

