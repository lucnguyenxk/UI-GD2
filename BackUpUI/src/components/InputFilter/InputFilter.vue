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
.input-filter {
    height: 24px;
    line-height: 24px;
    border: 1px solid #ccc;
    padding-left: 5px;
    padding-right: 5px;
    width: 100%;
    outline: none;
}

.input-filter:focus {
  border-color: #0071c1;
  box-shadow: 0px 4px 8px #c0c0c0;
}

.input-filter .has-icon {
  padding-right: 28px;
}
</style>