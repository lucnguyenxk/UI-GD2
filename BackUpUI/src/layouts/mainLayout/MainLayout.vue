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
@import url("MainLayout.css");
</style>

<script>
import TheHeader from '../theHeader/TheHeader.vue';
import TheContent from '../theContent/TheContent.vue';

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