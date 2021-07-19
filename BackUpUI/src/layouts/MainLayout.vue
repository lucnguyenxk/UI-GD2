<template>
  <div class="full-screen">
    <q-layout view="hHh Lpr lff" container class="main-layout">
      <TheHeader
      @drawNavbar="drawNavbar"/>

      <q-drawer
        v-model="drawerNavbar"
        show-if-above
        :width="230"
        :breakpoint="700"
        elevated
        :content-style="{ backgroundColor: '#0973b9' }"
      >
        <div class="overflow-menu">
            <div class="menu-item noselect">
              <router-link to="/menu-list" class ="menu-link">
                <div class="menu-item-logo"></div>
                <div class="menu-item-text">Thực đơn</div>
              </router-link>
              <q-tooltip transition-show="rotate" transition-hide="rotate"
              content-class="bg-grey-9 text-white shadow-4">Thực đơn</q-tooltip>
            </div>
        </div>
      </q-drawer>

      <q-page-container>
        <q-page style="min-height : 698px">
          <TheContent />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style scoped>
.main-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.full-screen {
  width: 100%;
  height: 100%;
}

.navbar-color {
  background-color: #0087BE!important;
}

.menu-item {
  height: 40px;
  line-height: 40px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  text-decoration: none !important;
  color: #fff;
  border-bottom: 1px solid #016087;
  border-top: 1px solid #016087;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #eb7728;
}

.menu-item-logo {
  margin-left: 12px;
  background: url("../assets/img/menu-icon.png") no-repeat 0 0;
  width: 22px;
  height: 24px;
}
.menu-link{
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-item-text {
  margin-left: 10px;
  font-size: 13px;
}
</style>

<script>
import TheHeader from './TheHeader.vue';
import TheContent from './TheContent.vue';

export default {
  components: {
    TheHeader,
    TheContent
  },
  data () {
    return {
      drawerNavbar: false
    }
  },
  methods: {
    /**
    * Mở/đóng navbar
    * @author: lntung
    * CreatedDate: 08/07/2021
    */
    drawNavbar() {
      this.drawerNavbar = !this.drawerNavbar;
    }
  }
}
</script>