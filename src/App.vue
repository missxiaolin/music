<template>
  <div id="app">
    <MHeader></MHeader>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
export default {
  name: 'app',
  components: {
    MHeader
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "common/stylus/variable.styl";

</style>
