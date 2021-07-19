<template>
  <div class="custom-btn" v-bind:style="{'background-color': backgroundColor}" :class="{heightClass, 'disabled-class': disableBoolean}" @click="buttonClick">
    <div class="custom-btn-icon" v-if="iconClass != ''">
      <div :class="iconClass"></div>
    </div>
    <div class="custom-btn-text noselect">{{ text }}</div>
    <q-tooltip v-if="toolTipText != null && disableBoolean == false"
    anchor="bottom middle"
    self="top middle"
    :offset="[5, 5]">
      {{toolTipText}}
    </q-tooltip>
  </div>
</template>

<style scoped>
@import url("CustomButton.css");
</style>

<script>
export default {
  props: {
    text: {type: String, default: ""},
    toolTipText: {type: String, default: null},
    heightClass: {type: String, default: "height-28"},
    iconClass: {type: String, default: ""},
    backgroundColor : {type:String, default: "#ffffff"},
    disableBoolean: {type: Boolean, default: false}
  },
  methods: {
    /**
    * Xử lý sự kiện click ở Parent component
    * @author: lntung
    * CreatedDate: 10/07/2021
    */
    buttonClick() {
      try {
        this.$emit("click");
      } catch (error) {
        console.error();
      }
      
    }
  }
}
</script>