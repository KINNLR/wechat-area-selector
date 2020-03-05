// components/area-selector.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show_area:{
      type:Boolean,
      value:false,
    },
    multiArray:{
      type:Array,
      value:[],
    },
    objectMultiArray:{
      type:Array,
      value:[],
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    multiIndex: [0, 0],
    selectedText:''
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    setTypeOfArr:function(type,newVal){
      console.log('shuju',newVal)
      this.setData({
        [type]:newVal
      })
    },
    /**
     * 确定回调
     */
    bindMultiPickerChange: function (e) {
      let selectedText = this.data.multiArray[0][e.detail.value[0]].label + ',' + this.data.multiArray[1][e.detail.value[1]].label
      this.setData({
        selectedText:selectedText
      })
      let submit={
        provinceCode: (this.data.multiArray[0][e.detail.value[0]]).value,
        cityCode: (this.data.multiArray[1][e.detail.value[1]]).value
      }
      this.triggerEvent('selectValue',submit)
    },
    /**
     * picker滑动
     */
    bindMultiPickerColumnChange: function (e) {
      switch (e.detail.column) {
        case 0:
          let cityList = []
          for (let i = 0; i < this.data.objectMultiArray.length; i++) {   
            if (this.data.objectMultiArray[i].value == this.data.objectMultiArray[e.detail.value].value) {
              cityList = this.data.objectMultiArray[i].children
            }
          }
          this.setData({
            "multiArray[1]": cityList,
            "multiIndex[0]": e.detail.value,
            "multiIndex[1]": 0
          })

      }
    },
    onCancel:function(){
      this.setData({
        selectedText:''
      })
      this.triggerEvent('selectValue',{cancel:true})
    }
  },

})
