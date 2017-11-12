import {mapGetters, mapMutations} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from "common/js/util";

/**
 * 自适应高度
 */
export const playlistMixin = {
  computed: {
    ...mapGetters(['playlist'])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

/**
 * playlist player 公用逻辑
 */
export const playerMixin = {
  computed: {
    // 播放顺序
    iconMode() {
      return this.mode === playMode.sequence
        ? 'icon-sequence'
        : this.mode === playMode.loop
          ? 'icon-loop'
          : 'icon-random'
    },
    ...mapGetters(['sequenceList', 'playlist', 'currentSong', 'mode'])
  },
  methods: {
    // 改变播放顺序
    changMode() {
      const mode = (this.mode + 1) % 3;
      this.setPlayMode(mode);
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this.resetCurrentIndex(list);
      this.setPlaylist(list);
    },
    // 当前歌曲对应的索引
    resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id == this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    // 引入
    ...mapMutations({setPlayingState: "SET_PLAYING_STATE", setCurrentIndex: "SET_CURRENT_INDEX", setPlayMode: "SET_PLAY_MODE", setPlaylist: "SET_PLAYLIST"})
  }
}
