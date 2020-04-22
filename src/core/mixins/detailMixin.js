export default {
  // mounted or created
  mounted() {
    console.log('flashDetail on')
    this.$bus.$on('flashDetail', () => {
      this._getDetail()
    })
  },
  beforeDestroy() {
    console.log('flashDetail off')
    this.$bus.$off('flashDetail')
  }
}
