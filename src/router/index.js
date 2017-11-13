import Vue from 'vue'
import Router from 'vue-router'
// 首页
// import recommend from '@/components/recommend/recommend'
const recommend = (resolve) => {
  import('components/recommend/recommend').then((module) => {
    resolve(module)
  })
}
// 歌手
// import singer from '@/components/singer/singer'
const singer = (resolve) => {
  import('components/singer/singer').then((module) => {
    resolve(module)
  })
}
// 歌手详情
// import singerDetail from '@/components/singer-detail/singer-detail'
const singerDetail = (resolve) => {
  import('components/singer-detail/singer-detail').then((module) => {
    resolve(module)
  })
}
// 歌单页面
// import disc from '@/components/disc/disc'
const disc = (resolve) => {
  import('components/disc/disc').then((module) => {
    resolve(module)
  })
}
// 排行榜页面
// import rank from '@/components/rank/rank'
const rank = (resolve) => {
  import('components/rank/rank').then((module) => {
    resolve(module)
  })
}
// 排行榜详情
// import TopList from '@/components/top-list/top-list'
const TopList = (resolve) => {
  import('components/top-list/top-list').then((module) => {
    resolve(module)
  })
}
// 搜索
// import search from '@/components/search/search'
const search = (resolve) => {
  import('components/search/search').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/recommend',
    name: 'recommend',
    component: recommend
  }, {
    path: '/recommend',
    component: recommend,
    children: [{
      path: ':id',
      name: 'disc',
      component: disc
    }]
  }, {
    path: '/singer',
    name: 'singer',
    component: singer,
    children: [{
      path: '/singer/:id',
      name: 'singerDetail',
      component: singerDetail
    }]
  }, {
    path: '/rank',
    name: 'rank',
    component: rank,
    children: [{
      path: ':id',
      component: TopList
    }]
  }, {
    path: '/search',
    name: 'search',
    component: search,
    children: [{
      path: ':id',
      component: singerDetail
    }]
  }]
})
