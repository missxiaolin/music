<template>
  <div ref="wrapper" class="wrapper">
    <slot></slot>
    <slot name="top">
      <div class="pulldownWrapper" :style="pullDownStyle" v-if="pulldown && beforePullDown">
        <bubble :y="bubbleY"></bubble>
      </div>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Bubble from './bubble.vue'

export default {
  props: {
    // 监听滚动事件
    probeType: {
      type: Number,
      default: 1
    },
    // 是否点击
    click: {
      type: Boolean,
      default: true
    },
    // 当数据变化的时候
    data: {
      type: Array,
      default: null
    },
    // 是否派发顶部下拉的事件，用于下拉刷新
    pulldown: {
      type: Boolean,
      default: false
    },
    // 是否需要下啦动画
    beforePullDown: {
      type: Boolean,
      default: false
    },
    // 是否监听滚动时间
    listenScroll: {
      type: Boolean,
      default: false
    },
    // 上啦
    pullup: {
      type: Boolean,
      default: false
    },
    // 滚动开始会派发一个 beforeScroll 事件
    beforeScroll: {
      type: Boolean,
      default: false
    },
    // 多少毫秒计算高度
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      // 下啦参数
      bubbleY: 0,
      pullDownStyle: '',
      isPullingDown: false,
      pullDownInitTop: -50,
      isRebounding: false
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    // 初始化组件
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })

      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on('touchend', pos => {
          // 下拉动作
          if (pos.y > 50) {
            this.isRebounding = true
            setTimeout(() => {
              // 动画
              this.isRebounding = false
            }, 500)
            this.$emit('pulldown')
          }
        })
      }

      // 监听滚动事件
      if (this.listenScroll) {
        let me = this

        this.scroll.on('scroll', pos => {
          if (this.beforePullDown) {
            me.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
            this.pullDownStyle = `top:${Math.min(
              pos.y + this.pullDownInitTop,
              10
            )}px`
          } else {
            me.bubbleY = 0
          }
          if (this.isRebounding) {
            me.pullDownStyle = `top:-50px`
          }

          me.$emit('scroll', pos)
        })
      }

      // 监听上啦
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit('scrollToEnd')
          }
        })
      }

      // 滚动开始会派发一个 beforeScroll 事件
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    disable() {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable()
    },
    enable() {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable()
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    },
    // 滚动到相应位置
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    // 滚动到相应位置
    scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  },
  components: {
    Bubble
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.wrapper {
  position: relative;

  .pulldownWrapper {
    position: absolute;
    width: 100%;
    text-align: center;
    top: -50px;
    padding-bottom: 20px;
  }
}
</style>
