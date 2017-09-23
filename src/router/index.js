import Vue from 'vue'
import Router from 'vue-router'
// 首页
import recommend from '@/components/recommend/recommend'
// 歌手
import singer from '@/components/singer/singer'
// 歌手详情
import singerDetail from '@/components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    }, {
      path: '/singer',
      name: 'singer',
      component: singer,
      children: [
        {
          path: '/singer/:id',
          name: 'singerDetail',
          component: singerDetail
        }
      ]
    }
  ]
})
