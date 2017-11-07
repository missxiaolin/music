import {playMode} from 'common/js/config'
import {loadSearch} from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1, // 当前播放索引
  disc: {}, // 歌单
  topList: {}, // 排行榜详情
  searchHistory: loadSearch() // 搜索历史
}

export default state
