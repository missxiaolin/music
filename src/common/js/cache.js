import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'

/**
 * 插入数据
 * @param {*} arr
 * @param {*} val
 * @param {*} compare
 * @param {*} maxLen
 */
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

/**
 * 删除缓存
 * @param {*} arr
 * @param {*} compare
 */
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

/**
 * 存储搜索列表
 * @param {*} query
 */
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}

/**
 * 删除缓存
 * @param {*} query
 */
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

/**
 * 读取缓存
 */
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

/**
 * 清除缓存
 */
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

/**
 * 最近播放列表
 */
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

/**
 * 播放历史
 * @param {*} song
 */
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
