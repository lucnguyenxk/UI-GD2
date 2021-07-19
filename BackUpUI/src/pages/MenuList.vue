<template>
  <div class="inventory-material" 
  @keydown.ctrl.49.prevent.stop.exact="insert" 
  @keydown.ctrl.83.prevent.stop.exact="closeDetailFormTest"
  tabindex="0" ref="setFocusPage">  
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

    <div class="update-infor">
      <div class="title-update">Vui lòng cập nhật thông tin nhà hàng để chúng tôi phục vụ quý khách tốt hơn.</div>
      <div class ="option-update">
        <div class="icon-remindUpdate"></div>
        <div class="link-title-update">Cập nhật ngay</div>
      </div>
    </div>

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
                <div class="th-title" @click="sortByPropertyName('MenuCode')">
                  <div class="th-title-text">Mã món</div>
                  <div class="th-title-sort" :class="{'sort-desc' : this.propertyNameSort=='MenuCode' && this.typeSort=='Desc','sort-asc': this.propertyNameSort=='MenuCode' && this.typeSort=='Asc'}"></div>
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
                <div class="th-title" @click="sortByPropertyName('MenuName')">
                  <div class="th-title-text">Tên món</div>
                  <div class="th-title-sort" :class="{'sort-desc' : this.propertyNameSort=='MenuName' && this.typeSort=='Desc','sort-asc': this.propertyNameSort=='MenuName' && this.typeSort=='Asc'}"></div>
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
                <div class="th-title" @click="sortByPropertyName('MenuGroupName')">
                  <div class="th-title-text">Nhóm thực đơn</div>
                  <div class="th-title-sort" :class="{'sort-desc' : this.propertyNameSort=='MenuGroupName' && this.typeSort=='Desc','sort-asc': this.propertyNameSort=='MenuGroupName' && this.typeSort=='Asc'}"></div>
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
                <div class="th-title" @click="sortByPropertyName('UnitName')">
                  <div class="th-title-text">Đơn vị tính</div>
                  <div class="th-title-sort" :class="{'sort-desc' : this.propertyNameSort=='UnitName' && this.typeSort=='Desc','sort-asc': this.propertyNameSort=='UnitName' && this.typeSort=='Asc'}"></div>
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
                <div class="th-title" @click="sortByPropertyName('PriceSell')">
                  <div class="th-title-text">Giá bán</div>
                  <div class="th-title-sort" :class="{'sort-desc' : this.propertyNameSort=='PriceSell' && this.typeSort=='Desc','sort-asc': this.propertyNameSort=='PriceSell' && this.typeSort=='Asc'}"></div>
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
              <td class="border-right-none">
                <MoneyFormat
                :valueMoney.sync="menu.priceSell"
                :disableInput="true"
                />
              </td>
              <td class="border-right-none"><div class="checkbox-showOnMenu"><input type="checkbox" v-model="menu.isShowOnMenu" style="pointer-events: none; opacity: 0.5" ></div></td>
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
          :refresh="this.refresh"
           />
        </div>
        <div class="bottom-right-side">
          Hiển thị {{getIndexOfFirstRecord()}} - {{getIndexOfLastReCord()}} trên {{this.totalRecord}} Kết quả    
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
import AutoComplete from "../components/Autocomplete/autoComplete/Autocomplete.vue"
import DialogDeleteConfirm from "../components/DialogConfirmClose/dialogDelete/DeleteDialog.vue"
import axios from 'axios'
import { types } from 'util';
import { type } from 'os';

import MoneyFormat from '../components/moneyFormat/MoneyFormat.vue'
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
    DialogDeleteConfirm,
    MoneyFormat,
  },
  methods: {
    insert(){
      console.log("test thử thôi")
    },
    closeDetailFormTest(){
      console.log(1);
      this.detailDialogShow=false;
    },

    //#region các sự kiện click, dbclic để lựa chọn
    /**
     * Nhấn vào thêm mới vật liệu
     * @author: ndluc
     * CreatedDate: 08/07/2021
     */
      insertMaterial() {
        try {
          this.mode = "Add"
          this.getNewCode();
          this.menu = {
            menuCode: this.menu.menuCode,
            listServiceHobby: [],
            priceSell : 0,
            priceCost:0,
            isShowOnMenu: false,
            unitId:0,
          }
          this.cloneMenu = {
            menuCode: this.menu.menuCode,
            listServiceHobby: [],
            priceSell : 0,
            priceCost:0,
            isShowOnMenu:false,
            unitId:0
          }
          
          this.detailDialogShow = true;
          
        } catch (error) {
          console.error();
        }
    },

    /**
     * Nhấn vào nhân bản dữ liệu
     * @author: ndluc
     * CreatedDate: 08/07/2021
     */
    cloneMaterial() {
      try{
        this.mode ="Add",
        this.getMenuById(this.idRecordSelect);
      }
      catch(error){
        console.error();
      }
    },

    /**
     * Nhấn vào sửa dữ liệu
     * @author: ndluc
     * CreatedDate: 08/07/2021
     */
    editMenu() {
      try {
        this.mode="Update"
        this.getMenuById(this.idRecordSelect);
        this.detailDialogShow = true;
      } catch (error) {
        console.error();
      }
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
    refreshPage() {
      try{
        this.refresh = !this.refresh;
        this.currentPage = 1;
        this.getPaging();
      }
      catch(error){
        console.error();
      }
      
    },
    /**
    *nhấn đúp vào bản ghi
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 15/07/2021
    */
    rowOndbClick(menuID){
      try {
        this.menu.menuId= menuID;
        this.editMenu();
      } catch (error) {
        console.error();
      }
        
    },
    /**
    *click vào các tiêu đề để lựa chọn sort
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 18/07/2021
    */
    sortByPropertyName(propertyName){
      this.propertyNameSort=propertyName;
      this.getDataSort(this.filterByMenuCode,propertyName);
      this.getDataSort(this.filterByMenuName,propertyName);
      this.getDataSort(this.filterByUnit,propertyName);
      this.getDataSort(this.filterByMenuGroupName,propertyName);
      this.getDataSort(this.filterByPriceSell,propertyName);
      this.getPaging();
    },
    /**
    *Lấy dữ liệu sort cho từng trường
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 18/07/2021
    */
   getDataSort(obbjectSort,propertyName){
     if(obbjectSort.filterProperty == propertyName){
       obbjectSort.isSort = true;
       if(obbjectSort.sortType==""||obbjectSort.sortType=="Desc"){
         obbjectSort.sortType="Asc"
         this.typeSort="Asc"
       }
       else{
         obbjectSort.sortType="Desc"
         this.typeSort="Desc"
       }
     }
     else {
       obbjectSort.isSort=false;
       obbjectSort.sortType="";
     }

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
      try {
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
        this.getPaging();
      } catch (error) {
        console.error();
      }
        

    },
    /**
     * lấy kiểu lọc của từng trường cần lọc
     * created by ndluc(13/07/2021)
     */
    getTypeFilter(typevalue,nameProperty){
      try {
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
          this.getPaging();
      } catch (error) {
        console.error();
      }
          
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
          priceSell:0,
          unitId:0
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
     * Lấy thứ tự của bản ghi cuối
     * created by ndluc(13/07/2021)
     */
    getIndexOfLastReCord(){
      if(this.currentPage < this.lastPage){
        return (this.currentPage-1)*this.pageSize + this.pageSize;
      }
      else {
        return (this.currentPage-1)*this.pageSize + (this.totalRecord-(this.lastPage-1)*this.pageSize)
      }
    },
    /**
    *lấy vị trí bản ghi đầu của trang
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 19/07/2021
    */
    getIndexOfFirstRecord(){
      if(this.totalRecord>0){
        return (this.currentPage-1)*this.pageSize +1
      }
      else return 0
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

    //#region : disable phím tắt mặc định chorme
    /**
    *disable các phím tắt của chorme
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 19/07/2021
    */
    disabledDefaultKey() {
      document.addEventListener("keydown", function (e) {
      e = e || window.event;
      if (e.ctrlKey) {
        var c = e.which || e.keyCode;
        switch (c) {
          case 83://Block Ctrl+S
            e.preventDefault();
            e.stopPropagation();
            break;
          case 49:
            e.preventDefault();
            e.stopPropagation();
            break;
        }
      }
      });
    },
    //#endregion
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
            this.menu.isShowOnMenu = !this.menu.isShowOnMenu;
            this.cloneMenu.isShowOnMenu = this.menu.isShowOnMenu;
            
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
        sortType : ""
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
        sortType : ""
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
        sortType : ""
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
        sortType : ""
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
        sortType : ""
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
    /**
    *lựa chọn thuộc tính để sort
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 18/07/2021
    */
   propertyNameSort: "" ,
   /**
   *lựa chọn kiểu sort
   * @param: {}
   * @return: {}
   * Createdby:ndluc 
   * CreatedDate: 18/07/2021
   */
  typeSort :"",

    /**
  *Biến xác nhận nạp lại dữ liệu
  * @param: {}
  * @return: {}
  * Createdby:ndluc 
  * CreatedDate: 18/07/2021
  */
  refresh : false
    }
    
  },
  created(){
      this.$nextTick(() => this.$refs.setFocusPage.focus())
      this.disabledDefaultKey();
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
@import url("MenuList.css");

</style>
