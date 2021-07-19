<template>
  <div>
      <div class="Paginate">
          <button class="btn-Paginate btn-FirstPage" @click="firstPage()"></button>
          <button class="btn-Paginate btn-PrevPage" @click="prevPage()"></button>
          <div class="text-Paginate">Trang</div>
          <div class="input-PageNumber">
              <input type="number" class="PageNumber" v-model="currentPage" @keydown.enter="getPageNumber()"  @focusout="getPageNumber()">
          </div>
          <div class="text-Paginate"> trên {{this.lastPage}}</div>
          <button class="btn-Paginate btn-NextPage" @click="nextPage()" ></button>
          <button class="btn-Paginate btn-LastPage" @click="toLastPage()"></button>
          <button class="btn-Paginate btn-Refresh" @click="refreshPage()"></button>
          <select class="select-PageSize" v-model ="pageSize" @change="getPageSize()" >
            <option v-for="selectPageSize in listPageSize" :key="selectPageSize" :value="selectPageSize">{{selectPageSize}}</option>
          </select>
      </div>
  </div>
</template>


<style>
@import url("Paginate.scss");
</style>


<script>

export default {
  
  props: {
    lastPage: {type: Number ,default :1},
    listPageSize: {type: Array, default: [
    ]},
    refresh : {type : Boolean,default : false}
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 25,
    }
  },
  methods: {
    /**
         * chọn trang đầu tiên
         * created by ndluc(02/07/2021)
         */
      firstPage () {
        if (this.currentPage > 1) {
          this.currentPage = 1;
          this.$emit('getPageNumber', this.currentPage, this.pageSize);
        }
      },

      /**
         * chọn trang trước
         * created by ndluc(02/07/2021)
         */
      prevPage () {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.$emit('getPageNumber', this.currentPage, this.pageSize);
        }
      },

      /**
         * chọn trang kế tiếp
         * created by ndluc(02/07/2021)
         */
      nextPage () {
        if (this.currentPage < this.lastPage) {
          this.currentPage++;
          this.$emit('getPageNumber', this.currentPage, this.pageSize);
        }
      },

      /**
         * chọn trang cuối cùng
         * created by ndluc(02/07/2021)
         */
      toLastPage () {
        if (this.currentPage < this.lastPage) {
          this.currentPage = this.lastPage;
          this.$emit('getPageNumber', this.currentPage, this.pageSize);
        }
      },

      /**
       * chọn trang cần lấy dữ liệu
       *
       */
      getPageNumber () {
        if (this.currentPage > this.lastPage) {
          this.currentPage = this.lastPage;
        }
        if (this.currentPage < 1) {
          this.currentPage = 1;
        }
        this.$emit('getPageNumber', this.currentPage, this.pageSize);
      },

      /**
       * chọn kích cỡ trang
       * created by ndluc(05/07/2021)
       */
      getPageSize () {
        this.currentPage =1;
        this.$emit('getPageNumber', this.currentPage, this.pageSize);

      },

      /**
       * load lại trang
       */
      refreshPage() {
        this.$emit('getPageNumber', this.currentPage, this.pageSize);
      }
  },
  watch:{
    refresh(){
      this.currentPage=1;
    }
  }
}
</script>