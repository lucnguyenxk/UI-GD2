<template>
  <!-- #region input -->
  <input
    class="input-filter"
    :class="{ 'has-icon': hasIcon }"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @blur="$emit('getValueInput',$event.target.value,name)"
    @keydown.enter="$emit('getValueInput',$event.target.value,name)"
  />
  <!-- #endregion -->
</template>

<script>
//#region export
export default {
  //#region props
  props: {
    /**
     * Xác định có icon không
     */
    hasIcon: {
      type: Boolean,
      default: false,
    },
    /**
     * Placeholder của input
     */
    placeholder: {
      type: String,
      default: "",
    },
    /**
     * Type của input
     */
    type: {
      type: String,
      default: "text",
    },
    /**
     * Giá trị của input
     */
    value: {
      type: String,
      default: "",
    },

    /**
     * Tên của của giá trị
     * created by ndluc(13/07/2021)
     */
    name : {
      type : String,
      default : "",
    }
  },
  //#endregion
};
//#endregion
</script>

<style scoped>
@import url("InputFilter.css");
</style>