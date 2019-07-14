// pages/release/release.js
import Toast from 'vant-weapp/toast/toast';
const db = wx.cloud.database(); // 初始化数据库

Page({

  formatDate: function (time) {
    var now = new Date(time);
    var   year = now.getFullYear();
    var   month = now.getMonth() + 1;
    var   date = now.getDate();
    var   hour = now.getHours();
    var   minute = now.getMinutes();
    var   second = now.getSeconds();
    return   year + "-" + month + "-" + date;
  },

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    title: "",
    date: "",
    currentDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    showPopup: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: this.formatDate(new Date().getTime())
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 标题输入回调
   */
  onTitleChange: function (event) {
    const { title } = this.data;
    this.setData({
      title: event.detail
    })
  },

  /**
   * 内容输入回调
   */
  onContentChange: function (event) {
    const { content } = this.data;
    this.setData({
      content: event.detail
    })
  },

  /**
   * 时间选择回调
   */
  onDateConfirm: function (event) {
    this.setData({
      currentDate: event.detail,
      date: this.formatDate(event.detail),
      showPopup: false
    });
  },

  /**
   * 时间取消回调
   */
  onDateCancel: function (event) {
    this.setData({
      showPopup: false
    });
  },

  /**
   * 时间输入框选择回调
   */
  onHandleDate: function (event) {
    this.setData({
      showPopup: true
    });
  },

  onClosePopup: function (event) {
    this.setData({
      showPopup: false
    });
  },

  onSubmit: function (event) {
    const { content, title, date} = this.data;
    if (!content || !title) {
      Toast('请输入');
      return;
    }
    // 插入数据
    wx.showLoading({
      title: '发布中...',
    })
    db.collection('todoList').add({
      data: {
        title,
        content,
        date,
      }
    }).then(res => {
      this.setData({
        content: "",
        title: ""
      })
      wx.hideLoading();
      Toast('发布成功');
      wx.switchTab({
        url: "/pages/home/home"
      })
    }).catch (err => {
      wx.hideLoading();
      console.error(err)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})