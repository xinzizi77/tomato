var local_picture=[
  {
    url:"http://193.112.31.67/images/bg1.jpg",
    pictureId:"0"
  }, {
    url: "http://193.112.31.67/images/bg2.jpg",
    pictureId: "1"
  }, {
    url: "http://193.112.31.67/images/bg3.jpeg",
    pictureId: "2"
  }, {
    url: "http://193.112.31.67/images/bg4.jpeg",
    pictureId: "3"
  }, {
    url: "http://193.112.31.67/images/bg5.jpeg",
    pictureId: "4"
  }, {
    url: "http://193.112.31.67/images/bg6.jpeg",
    pictureId: "5"
  }
]
var local_music=[
  {
    url:"http://193.112.31.67/music/music1.mp3",
    music_name:"高山流水",
    musicId:"0"
  }, {
    url: "http://193.112.31.67/music/music2.mp3",
    music_name: "雨声淅淅",
    musicId: "1",
    num:10,
    unlock:true,
    lock:false
  },{
    url: "http://193.112.31.67/music/music3.mp3",
    music_name: "雷雨交加",
    musicId: "2",
    num:20,
    unlock: true,
    lock: false
  }, {
    url: "http://193.112.31.67/music/music4.mp3",
    music_name: "深谷水淌",
    musicId: "3",
    num:40,
    unlock: true,
    lock: false
  }, {
    url: "http://193.112.31.67/music/music5.mp3",
    music_name: "晨鸟之歌",
    musicId: "4",
    num:80,
    unlock: true,
    lock: false
  }
]
var local_music1 = [
{
    url: "http://193.112.31.67/music/music2.mp3",
    music_name: "雨声淅淅",
    musicId: "1",
    num: 10,
    unlock: true,
    lock: false
  }, {
    url: "http://193.112.31.67/music/music3.mp3",
    music_name: "雷雨交加",
    musicId: "2",
    num: 20,
    unlock: true,
    lock: false
  }, {
    url: "http://193.112.31.67/music/music4.mp3",
    music_name: "深谷水淌",
    musicId: "3",
    num: 40,
    unlock: true,
    lock: false
  }, {
    url: "http://193.112.31.67/music/music5.mp3",
    music_name: "晨鸟之歌",
    musicId: "4",
    num: 80,
    unlock: true,
    lock: false
  }
]
var local_picture1 = [
  {
    url: "http://193.112.31.67/images/bg2.jpg",
    pictureId: "1",
    num:"5",
    unlock: true,
    lock: false
  }, {
    url: "http://193.112.31.67/images/bg3.jpeg",
    pictureId: "2",
    num: "15",
    unlock: true,
    lock: false    
  }, {
    url: "http://193.112.31.67/images/bg4.jpeg",
    pictureId: "3",
    num: "25",
    unlock: true,
    lock: false    
  }, {
    url: "http://193.112.31.67/images/bg5.jpeg",
    pictureId: "4",
    num: "50",
    unlock: true,
    lock: false    
  }, {
    url: "http://193.112.31.67/images/bg6.jpeg",
    pictureId: "5",
    num: "70",
    unlock: true,
    lock: false    
  }
]
module.exports = {//把数据传出去
  pictureList: local_picture,
  musicList:local_music,
  musicList1: local_music1,
  pictureList1: local_picture1,    
}