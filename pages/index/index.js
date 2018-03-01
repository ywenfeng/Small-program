//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    navbar: ['推荐', '排行榜', '搜索'],
    currentTab: 0,
    slider: [],
    swiperCurrent: 0,
    topList: [],
    radioList: [],
    hotkey: [],
    special: '',
    searchKeyword: '',
    searchSongList: [],
    zhida: {},
    searchPageNum: 1,
    searchLoading: false,
    isFromSearch: true,
    searchLoadingComplete: false
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    wx.scanCode({
      success: function (e) {
        console.log(e)
      }
    })
    console.log('index onLoad');
    var that = this;
    //推荐频道
    util.getRecommend(function (data) {
      that.setData({
        slider: data.data.slider,
        radioList: data.data.radioList,
        songList: data.data.songList
      })
    });

    //搜索频道
    util.getHotSearch(function (data) {
      that.setData({
        hotkey: data.data.hotkey,
        special: data.data.special_key
      })
    });

    //更新排行榜数据
    util.getToplist(function (data) {
      that.setData({
        topList: data.data.topList
      })
    });
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  // onPullDownRefresh: function(){
  //   console.log('页面相关事件处理函数--监听用户下拉动作')
  // },
  // onReachBottom: function(){
  //   console.log('页面上拉触底事件的处理函数');
  //   let that = this;
  //   if(that.data.searchLoading == true){
  //     that.setData({
  //       searchPageNum: that.data.searchPageNum+1
  //     });
  //     that.formSubmit();
  //   }
  // },
  onShareAppMessage: function () {
    return {
      title: 'QQ音乐',
      desc: '中国最新最全免费正版高品质音乐平台！',
      path: ''
    }
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  //排行榜
  toplistTap: function (e) {
    app.setGlobalData({
      topListId: e.currentTarget.dataset.id
    });
    wx.navigateTo({
      url: '../toplist/toplist'
    });
  },
  //搜索
  fetchSearchList: function () {
    let that = this;
    let searchKeyword = that.data.searchKeyword,
      searchPageNum = that.data.searchPageNum;
    util.getSearchMusic(searchKeyword, searchPageNum, function (data) {
      console.log(data)
      if (data.data.song.curnum != 0) {
        let searchList = [];
        that.data.isFromSearch ? searchList = data.data.song.list : searchList = that.data.searchSongList.concat(data.data.song.list)
        that.setData({
          searchSongList: searchList,
          zhida: data.data.zhida,
          searchLoading: true
        });
      } else {
        that.setData({
          searchLoadingComplete: true,
          searchLoading: false
        });
      }
    })
  },
  bindKeywordInput: function (e) {
    this.setData({
      searchPageNum: 1,
      isFromSearch: true
    })
    this.setData({
      searchKeyword: e.detail.value
    })
  },
  keywordSearch: function (e) {
    this.fetchSearchList();
  },
  searchScrollLower: function () {
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        searchPageNum: that.data.searchPageNum + 1,
        isFromSearch: false
      });
      that.fetchSearchList();
    }
  },
  playsongTap: function (e) {
    app.setGlobalData({
      songData: e.currentTarget.dataset.data
    });
    wx.navigateTo({
      url: '../playsong/playsong'
    });
  },
  hotkeyTap: function (e) {
    let word = e.currentTarget.dataset.text;
    this.setData({
      searchKeyword: e.currentTarget.dataset.text
    });
    this.fetchSearchList();
  }
})



// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })


