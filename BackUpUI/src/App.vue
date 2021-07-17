<template>
  <div id="q-app">
    <router-view></router-view>
  </div>
</template>

<style>
/*@import url(./css/common components/Button.css);*/
@import url(./css/commonComponents/Table.css);
@import url(./css/commonComponents/Input.css);
@import url(./css/commonComponents/TextArea.css);
html,body {
  margin:0;
  padding:0;
  height:100%;
  width:100%;
  font-family: tahoma;
  line-height: inherit;
}

a:-webkit-any-link {
  color: inherit;
  cursor: pointer;
  text-decoration: none;
}

#q-app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
</style>
