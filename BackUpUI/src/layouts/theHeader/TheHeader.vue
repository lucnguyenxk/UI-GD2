<template>
  <div>
    <q-header class="the-header">
      <!-- Phần logo -->
      <div class="logo-side-header">
        <div class="menu-icon shadow-transition" @click="drawNavbar"></div>
        <div class="logo-icon"></div>
      </div>
      <div class="main-header">
        <div class="left-main-header">
          <div class="name-restaurant">
            <div class="input-dropdown">
              <input type="text" class="nameofRestaurant" >
              <div class="icon-dropdown-namerestaurant"></div>
              <div class="icon-filter1"></div>
            </div>
          </div>
        </div>

        <div class="right-main-header">
          <div class="input-dropdown name-language">
              <input type="text" class="nameOflanguage" >
              <div class="icon-dropdown-nameoflanguage"></div>
          </div>
         <div></div>
         <div class="most-question"> Câu hỏi <br> thường gặp</div> 
         <div class="new-call">
           <div class="icon-new-call"></div>
         </div>
         <div class="avatar">
           <div class="avatar-img"></div>
           <div>Nguyễn Lực</div>
         </div>
        </div>
      </div>
    </q-header>
  </div>
</template>

<style lang="scss" scoped>
@import url("TheHeader.scss");
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