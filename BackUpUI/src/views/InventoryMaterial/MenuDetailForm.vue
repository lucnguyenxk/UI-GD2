<template>
  <div class="detail-form">
    <div class="detail-header">
      <div class="detail-header-title noselect">{{this.titleDetailForm}}</div>
      <div class="detail-header-close">
        <div class="header-icon-close" @click="clickCloseButton"></div>
      </div>
    </div>
    <div class="detail-body">
        <!-- #region bodyheader-->
        <div class="detail-body-header">
            <div class="btn-detail-toolbar general-information">
              <button class="btn-body-header" :class="{'optionActive': this.showOptionDetail=='General'}" @click="setOptionDetail('General')">Thông tin chung</button>
            </div>
            <div class="btn-detail-toolbar service-hobby">
              <button class="btn-body-header" :class="{'optionActive': this.showOptionDetail=='ServiceHobby'}" @click="setOptionDetail('ServiceHobby')">Sở thích phục vụ</button>
            </div>
        </div>        
        <!-- #endregion -->
        <!-- #region bodyheader-->
        <div class="detail-body-mid">
          <!-- #region General-information-->
          <div class="general-information-detail" :class="{'isDisplayOptionDetail' : this.showOptionDetail!='General'}">
            <div class="detail-body-mid-left">
              <div class="menuName-detail importData">
                <div class="label-input menuName">Tên món <span class="require">(*)</span></div>
                <div class="inputBox">
                  <input type="text" class="inputValue" v-model="menu.menuName" @input="isMissingMenuName=false" :class="{'boderErr':(menu.menuName !=undefined && ( menu.menuName.trim().length==0))||isMissingMenuName==true}" ref="focusMenuName">
                </div>
                <div class="error-input" :class="{'isMissing': (menu.menuName ==undefined ||( menu.menuName.trim().length!=0) )&&isMissingMenuName==false}">
                  <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">Trường này không được để trống</q-tooltip>
                </div>
              </div>
              <div class="menuName-detail importData">
                <div class="label-input menuName">Mã món <span class="require">(*)</span></div>
                <div class="inputBox">
                  <input type="text" class="inputValue" v-model="menu.menuCode" @blur="checkValueInput('MenuCode')" @input="isMissingMenuCode= false" :class="{'boderErr':(menu.menuCode !=undefined &&( menu.menuCode.trim().length==0))||isMissingMenuCode==true}">
                </div>
                <div class="error-input" :class="{'isMissing' :(menu.menuCode ==undefined ||( menu.menuCode.trim().length!=0) )&& isMissingMenuCode==false}">
                  <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">Trường này không được để trống</q-tooltip>
                </div>
              </div>
              <div class="menuName-detail importData">
                <div class="label-input menuName">Nhóm thực đơn</div>
                <div class="inputBox" >
                  <!-- <input type="text" class="inputValue"> -->
                  <AutocompleteAndAdd
                  :options="this.listMenuGroup"
                  value_key= "menuGroupId"
                  label_key= "menuGroupName"
                  :model_value_prop.sync="menu.menuGroupId"
                  @iconBlueAddOnClick="iconBlueAddOnClick"
                  
                  />
                </div>
              </div>
              <div class="menuName-detail importData">
                <div class="label-input menuName">Đơn vị tính <span class="require">(*)</span></div>
                <div class="inputBox">
                  <!-- <input type="text" class="inputValue"> -->
                  <AutocompleteAndAdd
                  :options="this.listUnit"
                  value_key="unitId"
                  label_key="unitName"
                  :model_value_prop.sync="menu.unitId"
                  :checkValueEmpty="true"
                  @iconBlueAddOnClick="iconBlueAddOnClick"
                  
                  />
                </div>
                <div class="error-input" :class="{'isMissing':!this.isMissingUnit ||menu.unitId!=null}">
                  <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">Trường này không được để trống</q-tooltip>
                </div>
              </div>
              <div class="menuName-detail importData money">
                <div class="label-input menuName">Giá bán <span class="require">(*)</span></div>
                <div class="inputBox">
                  <!-- <input type="number" class="inputValue"  v-model.number="menu.priceSell" @blur="checkValueInput('PriceSell')" :class="{'boderErr': ((menu.priceSell!=undefined ) && (menu.priceSell<0||menu.priceSell.length==0))||isMissingPriceSell==true}"  @input="isMissingPriceSell=false"> -->
                    <MoneyFormat
                  :valueMoney.sync="menu.priceSell"
                  :errValue="((menu.priceSell!=undefined ) && (menu.priceSell<0||menu.priceSell.length==0))"  
                  />
                </div>
                <div class="error-input" :class="{'isMissing':(menu.priceSell ==undefined || (menu.priceSell >=0&&menu.priceSell.length!=0 ) ) }">
                  <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">Giá bán phải lớn hơn hoặc bằng 0</q-tooltip>
                </div>
              </div>
              <div class="menuName-detail importData money">
                <div class="label-input menuName">Giá vốn </div>
                <div class="inputBox">
                  <!-- <input type="number" class="inputValue" v-model.number="menu.priceCost"> -->
                  <MoneyFormat
                  :valueMoney.sync="menu.priceCost"
                />
                </div>
              </div>
              <div class="menuName-detail importData description">
                <div class="label-input ">Mô tả </div>
                <div class="inputBox">
                  <input type="text" class="inputValue" v-model="menu.description">
                </div>
              </div>
              <div class="menuName-detail importData">
                <div class="label-input menuName">Chế biến tại</div>
                <div class="inputBox">
                  <!-- <input type="text" class="inputValue"> -->
                  <AutocompleteAndAdd
                  :options="this.listProcessArea"
                  value_key="processAreaId"
                  label_key="processAreaName"
                  :model_value_prop.sync="menu.processAreaId"
                  @iconBlueAddOnClick="iconBlueAddOnClick"
                  />
                </div>
              </div>
              <div class="menuName-detail importData">
                <div class="label-input menuName"></div>
                <div class="inputBox inputCheckbox">
                  <input type="checkbox" class="isShowOnMenu" name="isShowOnMenu" v-model="menu.isShowOnMenu">
                  <label for="isShowOnMenu">Không hiển thị trên thực đơn</label>
                </div>
                <input @focus="focusTransshipment" class="focusTransshipment" style=" width : 0; height : 0; border: none"/>
              </div>
            </div>
            <div class="detail-body-mid-right">
                <div class="title-img">Ảnh đại diện</div>
                <div class="select-img">
                  <div class="Img-file">
                    <div class="select-icon">
                      <div class="select-icon-menu"></div>
                      <div>Biểu tượng</div>
                    </div>
                  </div>
                  <div class="imgHandler"></div>
                  <div class="text-rule-img">
                  <div>Chọn các ảnh có định dạng <br> <b class="file-imgselect">(.jpg,.jpeg,.png,.gif)</b></div>
                  </div>
                </div>
                <div class="button-option-img">
                  <div class="click-to-select-img"><div class="three-dot">....</div></div>
                  <div class="click-to-remove-img"><div class="icon-cancel">x</div></div>
                </div>

            </div>
          </div>
          <!-- #endregion -->
          <!-- #region ServiceHobby-->
          <div class="service-hobby-detail" :class="{'isDisplayOptionDetail' : this.showOptionDetail!='ServiceHobby'}">
            <div class="serviceHobby-Tittle"> Món ăn: </div>
            <div class="intro-ServiceHobby">
              <div class="imgIntro-ServiceHobby"></div>
              <div class="intro-ServiceHobby-Text"> Ghi lại những sở thích của khách hàng giúp nhân viên phục vụ chọn nhanh order. <br> VD: không cay/ít hành/thêm phomai...</div>
            </div>
            <!-- #region table -->
            <div class="detail-grid">
              <div style="width: 100%; height: calc(100% - 1px)">
              <!-- #region unit convert table -->
              <table class="table noselect detail-table">
                <thead>
                  <tr class="detail-head-tr">
                    <th class="detail-th left-boder-detail title-detail-tableServiceHobby serviceHobby-width" >Sở thích phục vụ</th>
                    <th class="detail-th left-boder-detail title-detail-tableServiceHobby">Thu thêm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="detail-body-tr back-ground-white" v-for="(service,index) in menu.listServiceHobby" :key="index" @click="getIndexServiceHobbySelected(index)">
                    <td class="detail-td left-boder-detail serviceHobby-width" style="overflow :inherit"> 
                      <!-- <input type="text" v-model="service.serviceHobbyName" class="inputServiceHobby">  --> 
                      <AutocompleteTable
                       :options="allServiceHobby" 
                      value_key="serviceHobbyId"
                      label_key="serviceHobbyName"
                      label1="serviceHobbyName"
                      label2="priceAdd"
                      label3="serviceHobbyId"
                      :model_value_prop="service.serviceHobbyId"
                      :valueNumber1.sync="service.serviceHobbyName"
                      :valueNumber2.sync="service.priceAdd"
                      :valueNumber3.sync="service.serviceHobbyId"
                      tabindex="0"
                      @iconBlueAddOnClick="iconBlueAddOnClick"
                      />
                      </td>
                    <td class="detail-td left-boder-detail">
                      <!-- <input type="number" v-model.number="service.priceAdd" class="inputPriceAdd"> -->
                      <MoneyFormat
                      :valueMoney.sync="service.priceAdd"
                      class="inputPriceAdd"
                      />
                    </td>
                  </tr>
                </tbody>
              </table> 
              <!-- <div class="detail-head-tr">
                    <div class="detail-th left-boder-detail title-detail-tableServiceHobby serviceHobby-width" >Sở thích phục vụ</div>
                    <div class="detail-th left-boder-detail title-detail-tableServiceHobby">Thu thêm</div>
              </div> -->
              <!-- #endregion -->
              </div>
              <div class="table-line"></div>
            </div>
            <!-- #endregion -->
            <!-- #region button function -->
            <div class="detail-grid-button">
              <div>
                <CustomButton heightClass="height-24" iconClass="insert-icon" text="Thêm dòng" toolTipText="Ctrl + Insert" @click="addNewRowServiceHobby"/>
              </div>
              <div style="margin-left: 8px">
                <CustomButton heightClass="height-24" iconClass="delete-icon" text="Xóa dòng" toolTipText="Ctrl + Delete"
                v-bind:disableBoolean="this.deleteUnitDisable"
                @click="deleteServiceHobby"/>
              </div>
            </div>
            <!-- #endregion -->

          </div>
          <!-- #endregion -->

        </div>
        <!-- #endregion -->
        <!-- #region bottom-->
        <div class="detail-bottom">
          <div>
            <div>
              <CustomButton heightClass="height-25" iconClass="help-icon" text="Giúp" toolTipText="F1"/>
            </div>
          </div>
          <div style="display:flex;">
            <div>
              <CustomButton heightClass="height-25" iconClass="save-icon" text="Cất" toolTipText="Ctrl + S"
              @click="saveMenu"
              />
            </div>
            <div style="margin-left: 8px">
              <CustomButton heightClass="height-25" iconClass="saveAndAdd-icon" text="Cất & Thêm" toolTipText="Ctrl + Shift + S"
              @click="saveAndAddMenu"
              />
            </div>
            <div style="margin-left: 8px">
              <CustomButton heightClass="height-25" iconClass="cancel-icon" text="Hủy Bỏ" toolTipText="Ctrl + B"
              @click="closeForm"/>
            </div>
          </div>
        </div>
        <!-- #endregion -->
    </div>
    <!-- #region Dialog Close -->
    <q-dialog
      v-model="showCloseDialog"
      persistent
    >
      <DialogConfirmClose
      @closeDialogCloseForm="closeDialogCloseForm"
      />
    </q-dialog>
    
    <!-- #endregion -->

    <q-dialog
    v-model="this.showMenuGroupForm"
      persistent
    >
    <MenuGroupForm
    @closeFormMenuGroup="closeFormMenuGroup"
    :menuGroup="this.menuGroup"
    @openWarningForm="openWarningForm"
    />
    </q-dialog>
    <q-dialog
    v-model="this.showUnitForm"
      persistent
    >
    <UnitForm
    :unit="this.unit"
    @closeUnitForm="closeUnitForm"
    />
    </q-dialog>
    <q-dialog
    v-model="this.showProcessAreaForm"
      persistent
    >
    <ProcessAreaForm
    :processArea="this.processArea"
    @closeProcessAreaForm="closeProcessAreaForm"
    />
    </q-dialog>
    <q-dialog
      persistent
      v-model="this.showServiceHobbyForm"
    >
    <ServiceHobbyForm
    :serviceHobby ="this.serviceHobby"
    @closeServiceHobbyForm="closeServiceHobbyForm" 
    />
    </q-dialog>
    <q-dialog
    v-model="this.showWarnigForm"
      persistent
    >
    <DialogWarning
    :warningText="warningText"
    @closeWarningForm="closeWarningForm"
    />
    </q-dialog>
  </div>
</template>

<style scoped>
@import url(./MenuDetailForm.css);
</style>

<script>
import CustomButton from '../../components/CustomButton/CustomButton.vue';
import DialogConfirmClose from '../../components/DialogConfirmClose/DialogConfirmClose.vue';
import AutocompleteAndAdd from '../../components/Autocomplete/AutocompleteAndAdd.vue';
import AutocompleteTable from '../../components/Autocomplete/autocompleteOptionTable/AutoCompleteTable.vue'
import MenuGroupForm from '../menuGroupForm/MenuGroupForm.vue'
import UnitForm from '../unitForm/UnitForm.vue'
import ProcessAreaForm from '../processAreaForm/ProcessAreaForm.vue'
import ServiceHobbyForm from '../serviceHobbyForm/ServiceHobbyForm.vue'
import DialogWarning from '../../components/DialogConfirmClose/dialogWarning/DialogWarning.vue'
import axios from 'axios';
import MoneyFormat from '../../components/moneyFormat/MoneyFormat.vue'
export default {
  components: {
    CustomButton,
    DialogConfirmClose,
    AutocompleteAndAdd,
    AutocompleteTable,
    MenuGroupForm,
    UnitForm,
    ProcessAreaForm,
    ServiceHobbyForm,
    DialogWarning,
    MoneyFormat,
  },
  props:{
    
    /**
    *đói tượng thực đơn
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 18/07/2021
    */
    menu:{ type: Object, default: null},

    /**
    *Đối tượng thực đơn đc clone để check thay đổi dữ liệu
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 18/07/2021
    */
    cloneMenu:{type : Object,default: null},

    /**
    *trang thái của đối tượng : thêm , sửa
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 18/07/2021
    */
    mode:{type :String,default :null },


  },
  created() {
    this.$nextTick(() => this.$refs.focusMenuName.focus())
    this.getMenuGroup();
    this.getUnit(); 
    this.getPocessArea();
    this.getServiceHobby();

    if (this.serviceHobby != "") {
      this.deleteUnitDisable = false;
    }

    if(this.mode=="Add"){
      this.titleDetailForm="Thêm món mới";
    }
    else if(this.mode =="Update") {
      this.titleDetailForm="Sửa món"
    }


  },
  methods: {
    /**
    * Reset tất cả giá trị trong data về mặc định
    * @author: ndluc
    * CreatedDate: 10/07/2021
    */
    resetData() {
      this.serviceHobby = [];
      this.showCloseDialog = false;
      this.deleteUnitDisable = true;
    },
    //#region : xử lí sự kiện các nút chức năng
    /**
    * Đóng form trục tiếp
    * @author: ndluc
    * CreatedDate: 09/07/2021
    */
    closeForm() {
      // Reset giá trị data về mặc định
      this.resetData();
      // Đóng các form con
      this.closeConfirmDialog();

      this.addMore = false;
      // Thực hiện đóng
      this.$emit("closeDetailForm",this.addMore);
    },

    /**
    *ấn lưu đối tượng
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 15/07/2021
    */
    saveMenu(){
        this.addMore =false;
        var isValid= this.validateMenu();
        if(isValid){
          this.menu.isShowOnMenu = !this.menu.isShowOnMenu;
          if(this.mode=="Add"){
            this.addNewMenu();
          }
          else if(this.mode=="Update"){
            this.updateMenu();
          }
        }
    },

    /**
    *Cất và thêm đối tượng
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 15/07/2021
    */
    saveAndAddMenu(){
      this.addMore = true;
      var isValid = this.validateMenu();
      if(isValid){
        this.menu.isShowOnMenu = !this.menu.isShowOnMenu;
        if(this.mode=="Add"){
            this.addNewMenu();
          }
          else if(this.mode=="Update"){
            this.updateMenu();
          }
          this.showOptionDetail="General"
          //this.$refs.focusMenuName.focus();
          this.$nextTick(() => this.$refs.focusMenuName.focus())
      }


    },
    //#endregion

    /**
    *xử lí autôFocus
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 18/07/2021
    */
   focusTransshipment(){
     this.$refs.focusMenuName.focus();
   },

    //#region : đóng form cảnh báo thay đối dữ liệu
    closeDialogCloseForm(option){
      if(option=="cancel"){
        this.showCloseDialog=false;
      }
      else if(option=="save"){
        this.showCloseDialog = false;
        this.saveMenu();
      }
      else if(option=="notSave"){
        this.showCloseDialog=false;
        this.$emit("closeDetailForm",false);
      }

    },
    //#endregion

    /**
    *Check xem hai đối tượng có giống nhau hay không
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 18/07/2021
    */
   checkObjectChange(object,newObject){
      //biến kiểm tra 2 đối tượng có giống nhau hay không
      var checkChange = false;
      var empProperty = Object.getOwnPropertyNames(newObject);
      // Kiểm tra xem dữ liệu có bị thay đổi hay không?
      for (var i = 0; i < empProperty.length; i++) {
        var propName = empProperty[i];
        if(propName!="listServiceHobby"){
            if (
            (object[propName] == undefined && (newObject[propName] == ""||newObject[propName]==null))
          ||(object[propName] == "00000000-0000-0000-0000-000000000000" && newObject[propName]==null)
          ) {
            checkChange = false;
          } else if (
            newObject[propName] != object[propName] &&
            propName != "__ob__"
          ) {
            checkChange = true;
            break;
          }
        }
      }
      return checkChange;
   },
    /**
    * Nhấn nút X ở góc
    * Kiểm tra thay đổi dữ liệu, Hiển thị dialog xác nhận
    * @author: ndluc
    * CreatedDate: 10/07/2021
    */
    clickCloseButton() {
      // Kiểm tra thay đổi dữ liệu
      if(this.menu.listServiceHobby.length != this.cloneMenu.listServiceHobby.length){
        this.showCloseDialog= true;
      }
      else{
          var checkChange = this.checkObjectChange(this.cloneMenu,this.menu);
          if(!checkChange){
            var countOfList = this.menu.listServiceHobby.length;
            for(var i=0; i<countOfList;i++){
              var checkListChange = this.checkObjectChange(this.cloneMenu.listServiceHobby[i],this.menu.listServiceHobby[i])
              if(checkListChange){
                checkChange=true;
                break;
              }
            }
          }
          // Nếu có thay đổi dữ liệu thì hiển thị confirm dialog
          // Không có thay đổi thì thoát form
          if (checkChange) {
            this.showCloseDialog = true;
          }
          else {
            this.closeForm();
          }
      }
      
    },
    //#region :Sự kiện trả ra từ autoCompleteAndAdd , componet
    /**
    *sự kiện thêm mới các đối tượng: nhóm thực đơn, đơn vị tính, nơi chế biến
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 16/07/2021
    */
   iconBlueAddOnClick(nameOfObjectAdd){
     if(nameOfObjectAdd=="menuGroupName"){
       this.showMenuGroupForm =  true;
     }
     else if(nameOfObjectAdd=="unitName"){
       this.showUnitForm=true;
     }
     else if(nameOfObjectAdd=="processAreaName")
     {
       this.showProcessAreaForm= true;
     }
     else if(nameOfObjectAdd=="serviceHobbyName"){
       this.showServiceHobbyForm = true
     }
   },
  //#region : xử lí sự kiện đóng mở form cảnh báo lỗi
   /**
   *mở form warning báo lỗi
   * @param: {}
   * @return: {}
   * Createdby:ndluc 
   * CreatedDate: 17/07/2021
   */
  openWarningForm(warningText){
    this.showWarnigForm = true;
    this.warningText=warningText;
  },
  /**
  *Đóng form cảnh báo
  * @param: {}
  * @return: {}
  * Createdby:ndluc 
  * CreatedDate: 17/07/2021
  */
  closeWarningForm(){
      this.showWarnigForm = false;
  },
  //#endregion

   /**
   *sự kiện đóng form thêm mới nhóm thực đơn
   * @param: {}
   * @return: {}
   * Createdby:ndluc 
   * CreatedDate: 16/07/2021
   */
   closeFormMenuGroup(status){
     if(status =="succed"){
       this.getMenuGroup();
       this.showMenuGroupForm = false;
       this.menuGroup={};
     }
     else if(status =="cancel")
      this.showMenuGroupForm = false;
       this.menuGroup={};
     },
     /**
     *sự kiện đóng form thêm mới đơn vị
     * @param: {}
     * @return: {}
     * Createdby:ndluc 
     * CreatedDate: 16/07/2021
     */
    closeUnitForm(status){
      if(status =="succed"){
       this.getUnit();
       this.showUnitForm = false;
       this.unit={};
     }
     else if(status =="cancel")
      this.showUnitForm = false;
       this.unit={};
    },

    /**
    *sự kiện đóng form thêm mới nơi chế biến
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 16/07/2021
    */ 
   closeProcessAreaForm(status){

     if(status =="succed"){
       this.getPocessArea();
       this.showProcessAreaForm = false;
       this.processArea={};
     }
     else if(status =="cancel")
      this.showProcessAreaForm = false;
       this.processArea={};
   },
   /**
   *sự kiện đóng form thêm mới sở thích phục vụ
   * @param: {}
   * @return: {}
   * Createdby:ndluc 
   * CreatedDate: 16/07/2021
   */
   closeServiceHobbyForm(status){
     if(status =="succed"){
       this.getServiceHobby();
       this.showServiceHobbyForm = false;
       this.serviceHobby={};
     }
     else if(status =="cancel")
        this.showServiceHobbyForm = false;
       this.serviceHobby={};
   },

     
   
    //#endregion
    /**
    * Đóng close confirm dialog
    * @author: ndluc
    * CreatedDate: 10/07/2021
    */
    closeConfirmDialog() {
      this.showCloseDialog = false;
    },

    /**
    * Xóa 1 sở thích phục vụ
    * @author: ndluc
    * CreatedDate: 10/07/2021
    */
    deleteServiceHobby() {
      if(this.indexServiceHobby >=0  && this.indexServiceHobby<this.menu.listServiceHobby.length){
        this.menu.listServiceHobby.splice(this.indexServiceHobby,1);
        this.indexServiceHobby=this.menu.listServiceHobby.length-1;
      }
      else {
        var countServiceHobby=this.menu.listServiceHobby.length
        this.menu.listServiceHobby.splice(countServiceHobby-1,1)
      }
    },

    /**
     * thêm một dòng sở thích phục vụ mới
     * created by ndluc(12/07/2021)
     */
    addNewRowServiceHobby(){
        var newServiceHobby = {
          serviceHobbyName : "",
          priceAdd : 0,
        }
        this.menu.listServiceHobby.push(newServiceHobby);
        console.log(this.menu.listServiceHobby);
    },

    /**
     * lựa chọn form chi tiết thông tin chung hoặc form chi tiết sở thích phục vụ
     * created by ndluc(12/07/2021)
     */
    setOptionDetail(type){
      if(type == 'General'){
        this.showOptionDetail = 'General';
      }
      else if(type == 'ServiceHobby'){
        this.showOptionDetail = 'ServiceHobby'
      }
    },
    /**
     * ấn click chọn sở thích phục vụ,
     * created by ndluc(12/07/2021)
     */
    getIndexServiceHobbySelected(index){
        this.indexServiceHobby = index;
        console.log(index);
    },

    //#region : validate đối tượng , kiểm tra trống 

    checkValueInput(nameOfPropery){
      console.log(nameOfPropery);
      console.log(this.menu.menuName);
    },
    /**
    * Validate đối tượng trước khi thêm hoặc sửa
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 15/07/2021
    */
    validateMenu(){
     if(this.validateGeneralInfor()){
       return this.validateServiceHobby();
     }
     else {
       this.showOptionDetail="General"
       return this.validateGeneralInfor();
      }
    },
    /**
    *validate thông tin chung của thực đơn.
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 15/07/2021
    */
   validateGeneralInfor(){
     var correct = true;
        if(this.menu.menuName == undefined || this.menu.menuName.trim().length ==0){
          this.isMissingMenuName = true;
          correct = false;
        }
        if(this.menu.menuCode ==undefined || this.menu.menuCode.trim().length==0){
          this.isMissingMenuCode= true;
          correct = false;
        }
        if(this.menu.priceSell == undefined || this.menu.priceSell.length==0|| this.menu.priceSell < 0){
          this.isMissingPriceSell =  true;
          correct = false
        }
        if(this.menu.unitId ==undefined || this.menu.unitId == null){
          this.isMissingUnit = true;
          correct= false;
        }
        else{
          this.isMissingUnit=false;
        }
        if(this.menu.menuGroupId==null){
          this.menu.menuGroupId ="00000000-0000-0000-0000-000000000000"
        }
        if(this.menu.processAreaId ==null){
          this.menu.processAreaId = "00000000-0000-0000-0000-000000000000"
        }
        return correct;
    },

    /**
    *Validate dữ liệu của sở thích phục vụ
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 16/07/2021
    */
   validateServiceHobby(){
     var lenght = this.menu.listServiceHobby.length;
     //thực hiện xóa những dòng trống.
    for(var i = 0; i <lenght; i++){
        if((this.menu.listServiceHobby[i].serviceHobbyName==null || this.menu.listServiceHobby[i].serviceHobbyName.trim()=="") && (this.menu.listServiceHobby[i].priceAdd==0)){
         this.menu.listServiceHobby.splice(i,1);
         i--;
         lenght--;
         }
         else if((this.menu.listServiceHobby[i].serviceHobbyName==null || this.menu.listServiceHobby[i].serviceHobbyName.trim()=="") && (this.menu.listServiceHobby[i].priceAdd>0)){
           this.openWarningForm("Sở thích phục vụ không được trống khi có thu thêm");
           this.showOptionDetail="ServiceHobby"
           return false;
         }
    }
    for(var i = 0; i< lenght; i++){
      for( var j =i+1;j<lenght; j++ ){
        if(this.menu.listServiceHobby[i].serviceHobbyName ==this.menu.listServiceHobby[j].serviceHobbyName && this.menu.listServiceHobby[i].priceAdd==this.menu.listServiceHobby[j].priceAdd){
          this.openWarningForm("Sở thích phục vụ"+" <" +this.menu.listServiceHobby[i].serviceHobbyName+" - "+ this.menu.listServiceHobby[i].priceAdd+"> " +"đã bị trùng. Vui lòng kiểm tra lại.");
          this.showOptionDetail="ServiceHobby"
          return false;
        }
      }
    }

     return true;
   },
    //#endregion

    //#region Lấy các dữ liệu chung từ server: thông tin nhóm thực đơn, đơn vị tính, nơi chế biến

    /**
     * lấy dữ liệu nhóm khác hàng
     * created by ndluc(14/07/2021)
     */
    getMenuGroup(){
      axios
      .get("https://localhost:44313/api/v1/MenuGroups")
      .then(res =>{
        this.listMenuGroup = res.data.data
        console.log(this.listMenuGroup);
      })
      .catch(res =>{
        console.log(res);
      })
    },
    /**
     * Lấy dữ liệu thông tin đơn vị
     * created by ndluc(14/07/2021)
     */
    getUnit(){
      axios.get("https://localhost:44313/api/v1/Units")
      .then(res=>{
        this.listUnit = res.data.data;
      })
      .catch(res =>{
        console.log(res);
      })
    },
    /**
     * Lấy dữ liệu thông tin nơi chế biến
     * created ndluc(14/07/2021)
     */
    getPocessArea(){
      axios.get("https://localhost:44313/api/v1/ProcessAreas")
      .then(res=>{
        this.listProcessArea = res.data.data;
      })
      .catch(res =>{
        console.log(res);
      })
    },

    /**
    *Lấy toàn bộ sở thích phục vụ
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 18/07/2021
    */
    getServiceHobby(){
      axios.get("https://localhost:44313/api/v1/ServiceHobbys")
      .then(res=>{
        this.allServiceHobby = res.data.data;
      })
      .catch(res =>{
        console.log(res);
      })
    },
    /**
    *gọi api thêm mới thực đơn
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 18/07/2021
    */
    addNewMenu(){
      axios.post("https://localhost:44313/api/v1/Menus",this.menu)
      .then(res=>{
        if(res.data.statusCode==200 ){
          this.$emit("closeDetailForm",this.addMore);
        }
        else if(res.data.statusCode==400){
          this.openWarningForm(res.data.userMessage)
          this.showOptionDetail="General"
        }
      
      })
      .catch(res =>{
        console.log(res);
      })
    },

    /**
    *Gọi Api cập nhật thực đơn
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 18/07/2021
    */
    updateMenu(){
      axios.put("https://localhost:44313/api/v1/Menus/"+this.menu.menuId,this.menu)
      .then(res=>{
        if(res.data.statusCode==200){
          this.$emit("closeDetailForm",this.addMore);
        }
        else if(res.data.statusCode==400){
          this.openWarningForm(res.data.userMessage);
          this.showOptionDetail="General"
        }
      })
      .catch(res =>{
        console.log(res);
      })
    },
    
    //#endregion

  },
  watch: {
    serviceHobby: function() {
      if (this.serviceHobby.length > 0) {
        this.deleteUnitDisable = false;
      }
      else {
        this.deleteUnitDisable = true;
      }
    },

    /**
    *Kiểm tra sự thay đổi của mode để thay đổi tiêu đề
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 18/07/2021
    */
    mode(){
      if(this.mode=="Add"){
      this.titleDetailForm="Thêm món mới";
      }
      else if(this.mode =="Update") {
        this.titleDetailForm="Sửa món"
      }
    }
    
  },
  data() {
    return {
      valueMoneytest:1000,
      /**
      *Biến kiểm tra trường thông tin tên thực đơn có bị bỏ trống hay không
      * @param: {}
      * @return: {}
      * Createdby:ndluc 
      * CreatedDate: 15/07/2021
      */
      isMissingMenuName: false,

      /**
      *Biến kiểm tra trường thông tin mã thực đơn có bị trống hay không
      * @param: {}
      * @return: {}
      * Createdby:ndluc 
      * CreatedDate: 15/07/2021
      */
      isMissingMenuCode: false,

      /**
      *Biến kiểm tra đơn vị tính bị bỏ trống
      * @param: {}
      * @return: {}
      * Createdby:ndluc 
      * CreatedDate: 15/07/2021
      */
      isMissingUnit : false,

      /**
      *Biến kiểm tra giá bán bị bỏ trống.
      * @param: {}
      * @return: {}
      * Createdby:ndluc 
      * CreatedDate: 15/07/2021
      */
      isMissingPriceSell : false,

      /**
       * danh sách các sở thích phục vụ của từng thực đơn
       * created by ndluc(12/07/2021)
       */
      serviceHobby:[
        {
          serviceHobbyId : 1,
          serviceHobbyName : "Đá",
          priceAdd : 0
        },
        {
          serviceHobbyId : 2,
          serviceHobbyName : "Đá 1",
          priceAdd : 10
        },
        {
          serviceHobbyId : 3,
          serviceHobbyName : "Đá 2",
          priceAdd : 20
        }
      ],
      // Trạng thái mở/đóng close dialog (true/false)
      showCloseDialog: false,
      // Disable button xóa dòng. True: hiển thị/False: không hiển thị
      deleteUnitDisable: true,

      /**
      *xác nhận việc cất và thêm
      * @param: {}
      * @return: {}
      * Createdby:ndluc 
      * CreatedDate: 17/07/2021
      */
     addMore : false,
      /**
       * lựa chọn mục thông tin chung hay sở thích phục vụ hoặc bất kì 1 option nào khác
       * created by ndluc(12/07/2021)
       */
      showOptionDetail : "General",
      /**
       * Lựa chọn sở thích phục vụ trong danh sách,
       * created by ndluc(12/07/2021)
       */
      indexServiceHobby:-1,
      /**
       * 
       * Danh sách nhóm thực đơn
       */
      listMenuGroup : new Array,

      /**
       * danh sách đơn vị
       */
      listUnit :new Array,

      /**
       * danh sách nơi chế biến
       */
      listProcessArea : new Array,
      /**
      *Toàn bộ danh sách sở thích phục vụ
      * @param: {}
      * @return: {}
      * Createdby:ndluc 
      * CreatedDate: 15/07/2021
      */
      allServiceHobby : new Array,
      /**
      *xác nhận mở form thêm mới nhóm hàng hóa
      * @param: {}
      * @return: {}
      * Createdby:ndluc 
      * CreatedDate: 16/07/2021
      */
     showMenuGroupForm : false,

     /**
     *xác nhận mở form thêm mới đơn vị tính
     * @param: {}
     * @return: {}
     * Createdby:ndluc 
     * CreatedDate: 16/07/2021
     */
      showUnitForm :false,

      /**
      *xác nhận mở form thêm mới nơi chế biến
      * @param: {}
      * @return: {}
      * Createdby:ndluc 
      * CreatedDate: 16/07/2021
      */
     showProcessAreaForm: false,

     /**
     *
     * @param: {}
     * @return: {}
     * Createdby:ndluc 
     * CreatedDate: 16/07/2021
     */

    showServiceHobbyForm :false,

    /**
    *xác nhận mở form cảnh bảo
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 17/07/2021
    */
    showWarnigForm: false,

    /**
    *Thông báo đến người dùng
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 17/07/2021
    */
   warningText:"",
     /**
     *nhóm thực đơn mới
     * @param: {}
     * @return: {}
     * Createdby:ndluc 
     * CreatedDate: 16/07/2021
     */
    menuGroup:{},

    /**
    *Đơn vị tính mới
    * @param: {}
    * @return: {}
    * Createdby:ndluc 
    * CreatedDate: 16/07/2021
    */
   unit: {},

   /**
   *nơi chế biến mới
   * @param: {}
   * @return: {}
   * Createdby:ndluc 
   * CreatedDate: 16/07/2021
   * 
   */
  processArea:{},
  /**
  *sở thích phục vụ mới
  * @param: {}
  * @return: {}
  * Createdby:ndluc 
  * CreatedDate: 16/07/2021
  */
 serviceHobby:{},

/**
*Tiêu đề của form chi tiết
* @param: {}
* @return: {}
* Createdby:ndluc 
* CreatedDate: 18/07/2021
*/
titleDetailForm :"",



    }
  },
}
</script>