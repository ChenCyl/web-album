export default {
  // mounted or created?
  mounted() {
    // console.log('flashContent on')
    this.$bus.$on('flashContent', () => {
      this._getPhoto()
    })
  },
  beforeDestroy() {
    // console.log('flashContent off')
    this.$bus.$off('flashContent')
  }
}
