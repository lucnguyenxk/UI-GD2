<template>
  <div class="inventory-material">
    <!-- #region Detail Form-->
    <q-dialog
      v-model="detailDialogShow"
      persistent
    >
      <MenuDetailForm @closeDetailForm="closeDetailForm"
      :menu="this.menu"
      :cloneMenu ="this.cloneMenu"
      :mode="this.mode"
      ref="MenuDetailForm"
      />
    </q-dialog>
    <q-dialog
      v-model="showDialogDeleteConfirm"
      persistent
    >
    <DialogDeleteConfirm @confirmDialogDelete ="confirmDialogDelete"
    :inforToDelete="this.inforToDelete"
    />
    </q-dialog>
    <!-- #endregion -->

    <!-- #region header -->
    <div class="page-header">
      <div class="title noselect">Thực đơn</div>
      <div class="right-side">
        <CustomButton heightClass="height-28" iconClass="report-icon" text="Phản hồi" />
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region main content -->
    <div class="page-content">
      <!-- #region toolbar-->
      <div class="table-toolbar">
        <div>
          <TableToolbar
            text="Thêm"
            iconClass="insert-icon"
            @click="insertMaterial"
          />
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">Ctrl + 1</q-tooltip>
        </div>

        <div>
          <TableToolbar
            text="Nhân bản"
            iconClass="clone-icon"
            @click="cloneMaterial"
          />
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">Ctrl + 2</q-tooltip>
        </div>

        <div>
          <TableToolbar text="Sửa" iconClass="edit-icon" @click="editMenu" />
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">Ctrl + E</q-tooltip>
        </div>

        <div>
          <TableToolbar
            text="Xóa"
            iconClass="delete-icon"
            @click="deleteMaterial"
          />
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">Ctrl + D</q-tooltip>
        </div>

        <div>
          <TableToolbar
            text="Nạp"
            iconClass="refresh-icon"
            @click="refreshPage"
          />
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">Ctrl + Y</q-tooltip>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region table-->
      <div class="table-content">
        <table class="table noselect" ref="table">
          <!-- #region table header -->
          <thead>
            <tr>
              <th class="border-right-none border-left-none">
                <div class="th-title">
                  <div class="th-title-text">Mã món</div>
                  <div class="th-title-sort"></div>
                </div>
                <div class="th-search">
                  <div class="th-search-type">
                    <FilterType :optionFilter="optionFilter"
                    @getTypeFilter="getTypeFilter"
                    name ="MenuCode" 
                    />
                  </div>
                  <div class="th-search-text">
                    <InputFilter style="width: 100%"
                    @getValueInput="getValueInput"
                    name ="MenuCode" 
                    />
                  </div>
                </div>
              </th>
              <th class="border-right-none">
                <div class="th-title">
                  <div class="th-title-text">Tên món</div>
                  <div class="th-title-sort"></div>
                </div>
                <div class="th-search">
                  <div class="th-search-type">
                    <FilterType :optionFilter="optionFilter"
                    @getTypeFilter="getTypeFilter"
                    name ="MenuName" 
                    />
                  </div>
                  <div class="th-search-text">
                    <InputFilter style="width: 100%" 
                    name ="MenuName"
                     @getValueInput="getValueInput" 
                    />
                  </div>
                </div>
              </th>
              
              <th class="border-right-none">
                <div class="th-title">
                  <div class="th-title-text">Nhóm thực đơn</div>
                  <div class="th-title-sort"></div>
                </div>
                <div class="th-search">
                  <div class="th-search-type">
                    <FilterType :optionFilter="optionFilter"
                    @getTypeFilter="getTypeFilter"
                    name ="MenuGroupName"
                    />
                  </div>
                  <div class="th-search-text">
                    <InputFilter style="width: 100%"
                    @getValueInput="getValueInput" 
                     name ="MenuGroupName"
                     />
                  </div>
                </div>
              </th>
              <th class="border-right-none">
                <div class="th-title">
                  <div class="th-title-text">Đơn vị tính</div>
                  <div class="th-title-sort"></div>
                </div>
                <div class="th-search">
                  <div class="th-search-type">
                    <FilterType :optionFilter="optionFilter"
                     name ="UnitName"
                    @getTypeFilter="getTypeFilter"
                    />
                  </div>
                  <div class="th-search-text">
                    <InputFilter style="width: 100%"
                    @getValueInput="getValueInput" 
                     name ="UnitName"
                     />
                  </div>
                </div>
              </th>
              <th class="border-right-none">
                <div class="th-title">
                  <div class="th-title-text">Giá bán</div>
                  <div class="th-title-sort"></div>
                </div>
                <div class="th-search">
                  <div class="th-search-type">
                    <FilterType :optionFilter="optionFilterNumber"
                    @getTypeFilter="getTypeFilter"
                     name ="PriceSell"
                    />
                  </div>
                  <div class="th-search-text">
                    <InputFilter style="width: 100%" 
                      type="number"
                      @getValueInput="getValueInput" 
                       name ="PriceSell"
                    />
                  </div>
                </div>
              </th>
              <th class="border-right-none">
                <div class="th-title">
                  <div class="th-title-text" >Hiển thị trên thực đơn</div>
                  <div class="th-title-sort"></div>
                </div>
                <div class="th-search">
                  <AutoComplete
                      :options="optionFilterIsShow"
                      :value_key="'value'"
                      :label_key="'text'"
                      :model_value.sync="filterByIsShowOnMenu.filterValue"
                      ref="autocomplete"
                      
                    />
                </div>
              </th>
            </tr>
          </thead>
          <!-- #endregion -->
          <!-- #region table body -->
          <tbody> 
            <tr v-for="(menu,index) in this.listMenu" :key='menu.menuId' 
            :class="{'grey-row': index % 2 == 0,'selectedRecord':idRecordSelect == menu.menuId}" @click ="selectRecordOnClick(menu.menuId,menu.menuName,menu.menuCode)" @dblclick="rowOndbClick(menu.menuId)" >
              <td class="border-right-none border-left-none">{{ menu.menuCode }}</td>
              <td class="border-right-none">{{menu.menuName}}</td>
              <td class="border-right-none">{{menu.menuGroupName}}</td>
              <td class="border-right-none">{{menu.unitName}}</td>
              <td class="border-right-none">{{menu.priceSell}}</td>
              <td class="border-right-none"><div class="checkbox-showOnMenu"><input type="checkbox" v-model="menu.isShowOnMenu" disabled></div></td>
            </tr>
          </tbody>
          <!-- #endregion -->
        </table>
      </div>
      <!-- #endregion -->

      <!-- #region paginate-->
      <div class="bottom-content">
        <div class="bottom-left-side">
          <Paginate
          :lastPage="this.lastPage"
          :listPageSize="this.listPageSize"
          @getPageNumber="getPageNumber"
           />
        </div>
        <div class="bottom-right-side">
          Hiển thị {{(this.currentPage-1)*this.pageSize +1}} - {{getIndexOfReCord()}} trên {{this.totalRecord}} Kết quả    
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </div>
</template>


<script>
import CustomButton from "../components/CustomButton/CustomButton.vue";
import TableToolbar from "../components/TableToolbar/TableToolbar.vue";
import FilterType from "../components/FilterType/FilterType.vue";
import InputFilter from "../components/InputFilter/InputFilter.vue";
import Paginate from "../components/Paginate/Paginate.vue";
import MenuDetailForm from "../views/InventoryMaterial/MenuDetailForm.vue"
import AutoComplete from "../components/Autocomplete/Autocomplete.vue"
import DialogDeleteConfirm from "../components/DialogConfirmClose/DeleteDialog.vue"
import axios from 'axios'
import { types } from 'util';
import { type } from 'os';
//import ColumnResizer from "../components/Table/ColumnResizer.js"
export default {
  components: {
    CustomButton,
    TableToolbar,
    FilterType,
    InputFilter,
    Paginate,
    MenuDetailForm,
    AutoComplete,
    DialogDeleteConfirm
  },
  methods: {

    //#region các sự kiện click, dbclic để lựa chọn
    /**
     * Nhấn vào thêm mới vật liệu
     * @author: ndluc
     * CreatedDate: 08/07/2021
     */
      insertMaterial() {
      this.mode = "Add"
      this.getNewCode();
      this.menu = {
        menuCode: this.menu.menuCode,
        listServiceHobby: [],
        priceSell : 0
      }
      this.cloneMenu = {
        menuCode: this.menu.menuCode,
        listServiceHobby: [],
        priceSell : 0
      }
      
      this.detailDialogShow = true;
      
       
    },

    /**
     * Nhấn vào nhân bản dữ liệu
     * @author: ndluc
     * CreatedDate: 08/07/2021
     */
    cloneMaterial() {
      this.mode ="Add",
      this.getMenuById(this.idRecordSelect);
      
    },

    /**
     * Nhấn vào sửa dữ liệu
     * @author: ndluc
     * CreatedDate: 08/07/2021
     */
    editMenu() {
      this.mode="Update"
      this.getMenuById(this.idRecordSelect);
       this.detailDialogShow = true;
    },

    /**
     * Nhấn vào xóa dữ liệu
     * @author: ndluc
     * CreatedDate: 08/07/2021
     */
    deleteMaterial() {
      this.showDialogDeleteConfirm = true; 
    },

    /**
     * Nhấn vào nạp lại dữ liệu
     * @author: ndluc
     * CreatedDate: 08/07/2021
     */
    refreshPage() {},
    /**
    *nhấn đúp vào bản ghi
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 15/07/2021
    */
    rowOndbClick(menuID){
        this.menu.menuId= menuID;
        this.editMenu();
    },

    /**
     * Sự kiện click vào 1 dòng trên bảng : chọn bản ghi
     * created by ndluc(13/07/2021)
     */
    selectRecordOnClick(idSelected,menuNameSelected,menuCodeSelected){
        this.idRecordSelect = idSelected;
        this.inforToDelete = "<< " + menuCodeSelected +" - "+menuNameSelected + " >>"
    },
    //#region 



    /**
    *ĐÓng dialog xác nhận xóa
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 15/07/2021
    */
    confirmDialogDelete(mode){
        if(mode =="Deny"){
            this.showDialogDeleteConfirm = false;
        }
        else if(mode == "Accept"){
          this.deleteMenuById();
        }
    },
    //#region :xử lí các sự kiện lọc dữ liệu
    /**
     * Tạo list các trường cần lọc
     * created by ndluc(13/07/2021)
     */
    createdListObjectFilter(){
      this.listFilter.push(this.filterByMenuCode);
      this.listFilter.push(this.filterByMenuName)
      this.listFilter.push(this.filterByMenuGroupName);
      this.listFilter.push(this.filterByUnit);
      this.listFilter.push(this.filterByPriceSell);
      this.listFilter.push(this.filterByIsShowOnMenu);
      this.ObjectFilterData.ListFilterData = this.listFilter;
    },


    /**
     * lấy dữ liệu lọc - giá trị lọc
     * created by ndluc(13/07/2021)
     */
    getValueInput(inputValue,nameProperty){
        console.log(inputValue);
        console.log(nameProperty);
        if(nameProperty =="MenuCode"){
          this.filterByMenuCode.filterValue = inputValue;
        }
        else if(nameProperty =="MenuName"){
          this.filterByMenuName.filterValue = inputValue;
        }
        else if(nameProperty == "MenuGroupName"){
          this.filterByMenuGroupName.filterValue = inputValue;
        }
        else if(nameProperty == "UnitName"){
          this.filterByUnit.filterValue = inputValue;
        }
        else if(nameProperty == "PriceSell"){
          this.filterByPriceSell.filterValue = parseInt(inputValue);
        }
        console.log(this.listFilter);
        this.getPaging();

    },
    /**
     * lấy kiểu lọc của từng trường cần lọc
     * created by ndluc(13/07/2021)
     */
    getTypeFilter(typevalue,nameProperty){
      console.log("type" + typevalue);
      console.log(nameProperty);
      if(nameProperty =="MenuCode"){
          this.filterByMenuCode.filterType = typevalue;
        }
        else if(nameProperty =="MenuName"){
          this.filterByMenuName.filterType = typevalue;
        }
        else if(nameProperty == "MenuGroupName"){
          this.filterByMenuGroupName.filterType = typevalue;
        }
        else if(nameProperty == "UnitName"){
          this.filterByUnit.filterType = typevalue;
        }
        else if(nameProperty == "PriceSell"){
          this.filterByPriceSell.filterType = typevalue;
        }
        console.log(this.listFilter);
        this.getPaging();
    },
    //#endregion

    

    /**
    * Đóng form detail
    * @author: ndluc
    * CreatedDate: 09/07/2021
    */
    closeDetailForm(isClose) {
      if(isClose==false){
          this.detailDialogShow = false;
          this.getPaging();
      }
      else{
        this.mode ="Add";
        this.getNewCode();
        this.menu = {
          menuCode : this.menu.menuCode,
          listServiceHobby:[],
          priceSell:0
        };
        
      }
      
    },

    /**
    *nhân bản đối tượng để check thay đổi dữ liệu
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 18/07/2021
    */
   cloneObject(objectClone,newObject){
      var propsSelectedEmp = Object.getOwnPropertyNames(objectClone);
      for(var i = 0; i < propsSelectedEmp.length; i++){
          var propName = propsSelectedEmp[i];
          newObject[propName] = objectClone[propName];    
      }
   },


    /**
     * Lấy thứ tự của bản ghi 
     * created by ndluc(13/07/2021)
     */
    getIndexOfReCord(){
      if(this.currentPage < this.lastPage){
        return (this.currentPage-1)*this.pageSize + this.pageSize;
      }
      else {
        return (this.currentPage-1)*this.pageSize + (this.totalRecord-(this.lastPage-1)*this.pageSize)
      }
    },
    /**
     * lấy dữ liệu phân trang : trang hiện tại, kích cỡ trang
     * created by ndluc(12/07/2021)
     */
    getPageNumber(currentPage, pageSize){
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.getPaging();
    },    
  //#region : gọi dữ liệu từ server
    /**
    *Lấy dữ liệu có phân trang, lọc , tìm kiếm
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 17/07/2021
    */
    getPaging(){
      axios
      .post("https://localhost:44313/api/v1/Menus/GetPaging?PageSize="+ this.pageSize+"&PageNumber="+this.currentPage,this.ObjectFilterData)
      .then((res) =>{
        if(res.data.statusCode==200){
          this.listMenu = res.data.data;
          this.idRecordSelect = this.listMenu[0].menuId;
          this.inforToDelete= "<< " + this.listMenu[0].menuCode+" - "+this.listMenu[0].menuName + ">>"
          this.totalRecord = res.data.totalRecord;
          if(this.totalRecord % this.pageSize ==0){
            this.lastPage = this.totalRecord/this.pageSize
          }
          else{
            this.lastPage = parseInt(this.totalRecord/this.pageSize) +1;
          }
        }
        else if(res.data.statusCode==204){
          this.listMenu = [];
          this.lastPage =1;
          this.totalRecord = 0;
        }
      })
      .catch((res) =>{
        console.log(res);
        
      })
    },
    /**
     * lấy dữ liệu menu theo id
     * created by ndluc(13/07/2021)
     */
     getMenuById(MenuId){
      axios
      .get("https://localhost:44313/api/v1/Menus/"+MenuId)
      .then(res =>{
          if(res.data.statusCode ==200){
            this.menu =res.data.data;
            // var propsSelectedEmp = Object.getOwnPropertyNames(this.menu);
            // for(var i = 0; i < propsSelectedEmp.length; i++){
            //     var propName = propsSelectedEmp[i];
            //     this.cloneMenu[propName] = this.menu[propName];    
            // }
            this.cloneObject(this.menu, this.cloneMenu);
            this.cloneMenu.listServiceHobby=[];
            this.menu.listServiceHobby.forEach(option => {
              var newObject = {};
              this.cloneObject(option,newObject);
              this.cloneMenu.listServiceHobby.push(newObject);
            });
            if(this.mode=="Add"){
               this.getNewCode();
            }
            this.cloneMenu.menuCode = this.menu.menuCode;
            
            this.detailDialogShow = true;
          }
          else if(res.data.statusCode ==204){
            console.log("Nothing")
          }
      })
      .catch(res=>{
        console.log(res);
      })
    },

    /**
    *Xóa đối tượng theo id được chọn
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 17/07/2021
    */
    deleteMenuById(){
      axios
      .delete("https://localhost:44313/api/v1/Menus/"+this.idRecordSelect)
      .then(res =>{
          if(res.data.statusCode ==200){
            this.getPaging();
            this.showDialogDeleteConfirm = false;
          }
          else if(res.data.statusCode ==204){
            console.log("Nothing")
          }
      })
      .catch(res=>{
        console.log(res);
      })

    },

    /**
    *Lấy Code mới cho đối tượng.
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 17/07/2021
    */
    getNewCode(){
      axios
      .get("https://localhost:44313/api/v1/Menus/GetNewCode")
      .then(res=>{
        if(res.data.statusCode==200){
          this.menu.menuCode = res.data.data
          this.cloneMenu.menuCode = res.data.data
        }
      })

    }
    //#endregion
  },
  mounted() {
    //this.resizeTable();
  },
  data() {
    return {
      /**
      *Trạng thái thêm hoặc Sửa đối tượng
      * @param: {}
      * @return: {}
      * Createdby:ndluc 
      * CreatedDate: 15/07/2021
      */
      mode:  "",
      /**
       * id của bản ghi được lựa chọns
       */
      idRecordSelect : null,

      optionFilter: [
        { value: 1, text: "*: Chứa" },
        { value: 2, text: "+: Bắt đầu bằng"},
        { value: 3, text: "-: Kết thúc bằng" },
        { value: 4, text: "=: Bằng"},
        { value: 5, text: "!: Không chứa" },
      ],
      optionFilterNumber : [
        { value : 6 , text :"<= : Nhỏ hơn hoặc bằng"},
        { value : 7 , text :"< : Nhỏ hơn"},
        { value : 8 , text :"= : Bằng"},
        { value : 9 , text :">= : Lớn hơn hoặc bằng"},
        { value : 10 , text :"> : Lớn hơn"}
      ],
      /**
       * Lựa chọn có show thực đơn trên màn hay không
       * created by ndluc(13/07/2021)
       */
      optionFilterIsShow: [
        {
          value : true, text : "Có",
        },
        {
          value : false, text : "Không",
        },
      ],
      /**
      *kiểm tra ẩn hiện form chi tiết
      * @param: {}
      * @return: {}
      * Createdby:ndluc 
      * CreatedDate: 14/07/2021
      */
      detailDialogShow: false,
      /**
      *Ẩn hiện form xác nhận xóa
      * @param: {}
      * @return: {}
      * Createdby:ndluc 
      * CreatedDate: 15/07/2021
      */
      showDialogDeleteConfirm: false,
      /**
      *Trang cuối - Tổng số trang
      * @param: {}
      * @return: {}
      * Createdby:ndluc 
      * CreatedDate: 14/07/2021
      */
      lastPage : 1,
      /**
      * Danh sách các kích cỡ trang được lựa chọn
      * @param: {}
      * @return: {}
      * Createdby:ndluc 
      * CreatedDate: 14/07/2021
      */
      listPageSize : [
        25,
        50,
        100
      ],
      isShowOnMenu : null,

      /**
       * Danh sách thực đơn lấy về từ Api
       * created by ndluc(12/07/2021)
       */
      listMenu :new Array ,

      /**
       * Lọc theo mã món
       * created by ndluc(13/07/2021)
       */
      filterByMenuCode :{
        filterProperty : "MenuCode",
        filterValue : "",
        filterType : 1,
        isSort : false,
        sortType : "1"
      },

      /**
       * Lọc theo tên món
       * created by ndluc(13/07/2021)
       */
      filterByMenuName :{
        filterProperty : "MenuName",
        filterValue : "",
        filterType : 1,
        isSort : false,
        sortType : "1"
      },

      /**
       * Lọc theo nhóm món
       * created by ndluc(13/07/2021)
       */
      filterByMenuGroupName :{
        filterProperty : "MenuGroupName",
        filterValue : "",
        filterType : 1,
        isSort : false,
        sortType : "1"
      },

      /**
       * Lọc theo đơn vị tính
       * created by ndluc(13/07/2021)
       */
      filterByUnit :{
        filterProperty : "UnitName",
        filterValue : "",
        filterType : 1,
        isSort : false,
        sortType : "1"
      },

      /**
       * Lọc theo giá bán
       * created by ndluc(13/07/2021)
       */
      filterByPriceSell :{
        filterProperty : "PriceSell",
        filterValue : null,
        filterType : 6,
        isSort : false,
        sortType : "1"
      },

      /**
       * Lọc theo có được hiện trên menu hay không
       * created by ndluc(13/07/2021)
       */
      filterByIsShowOnMenu :{
        filterProperty : "IsShowOnMenu",
        filterValue : null,
        filterType : 8,
        isSort : false,
        sortType : "1"
      },
      /**
       * 
       */
      ObjectFilterData:{
        ListFilterData:[],
      },
      /**
       * trang hiện tại
       * created by ndluc(12/07/2021)
       */
      currentPage : 1,
      /**
       * Kích cỡ trang
       * created by ndluc(12/07/2021)
       */
      pageSize :25,
      /**
       * list chứa các đối tượng và giá trị lọc
       * created by ndluc(13/07/2021)
       */
      listFilter:[],
      /**
       * Tổng số bản ghì
       * created by ndluc(13/07/2021)
       */
      totalRecord : 0,

      /**
       * Đối tượng thực đơn
       * created by ndluc(13/07/2021)
       */
      menu : {
        
      },
      /**
      *Đối tượng thực đơn được clone để check thay đổi dữ liệu
      * @param: {}
      * @return: {}
      * Createdby:ndluc 
      * CreatedDate: 17/07/2021
      */
      cloneMenu:{

      },
      
      /**
     * Thông tin chung đối tượng cần xóa
     * @param: {}
     * @return: {}
     * Createdby:ndluc 
     * CreatedDate: 15/07/2021
     */
    inforToDelete :"",
    newCode: null,
    }
  },
  created(){
      this.getPaging();
      this.createdListObjectFilter();
  },
  watch : {
    filterByIsShowOnMenu:{
        deep : true,
        handler(){
          this.getPaging();
        }
    }
  }
  
};
</script>
<style scoped>
.inventory-material {
  width: 100%;
  height: 100%;
}

.page-header {
  width: 100%;
  height: 28px;
  justify-content: space-between;
  display: flex;
}

.page-header .title {
  height: 28px;
  line-height: 28px;
  box-sizing: border-box;
  font-size: 22px;
  color: #000000;
  font-weight: normal;
}

.report-icon {
  background: url(../assets/img/viewEmail.png) no-repeat;
  width: 16px;
  height: 16px;
}

.page-content {
  box-sizing: border-box;
  width: 100%;
  margin-top: 8px;
  height: calc(100% - 36px);
}

.table-toolbar {
  height: 27px;
  line-height: 27px;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  background-color: #ededed;
  display: flex;
  align-items: center;
}

.table-content {
  width: 100%;
  height: calc(100% - 28px - 27px);
  overflow: auto;
}

.bottom-content {
  display: flex;
  width: 100%;
  height: 30px;
  justify-content: space-between;
  border: 1px solid #d9d9d9 ;
  align-items: center;
}
.bottom-right-side{
  padding-right: 15px;
  font-size: 13px;
}
.selectedRecord{
  background-color: #e2eff8;
}
</style>
