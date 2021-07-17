<template>
  <div>
    <q-header class="the-header">
      <!-- Phần logo -->
      <div class="logo-side-header">
        <div class="menu-icon shadow-transition" @click="drawNavbar"></div>
        <div class="logo-icon"></div>
      </div>
      <div class="main-header">
        <div class="left-main-header"></div>
        <div class="right-main-header"></div>
      </div>
    </q-header>
  </div>
</template>

<style lang="scss" scoped>
.the-header {
  height: 55px;
  background-color: $header-color;
}

.logo-side-header {
  position: absolute;
  left: 0;
  padding-left: 12px;
  height:100%;
  line-height: 100%;
  display: flex;
  width: 230px;
  max-width: 230px;
  box-sizing: border-box;
}

.menu-icon {
  cursor: pointer;
  background: url(../assets/img/icon-left-header.png);
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
  margin-top: 16px;
}

.logo-icon {
  cursor: pointer;
  background: url(../assets/img/logo-text.png);
  background-repeat: no-repeat;
  height: 30px;
  width: 100%;
  margin-left: 10px;
  margin-top: 15px;
}
</style>

<script>
export default {
  methods: {
    /**
    * Mở đóng navbar
    * @author: lntung
    * CreatedDate: 08/07/2021
    */
    drawNavbar() {
      this.$emit("drawNavbar");
    }
  }
}
</script>