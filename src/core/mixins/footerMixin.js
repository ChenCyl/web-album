export default {
  mounted() {
    this.$bus.$on('clickAll', val => {
      console.log('clickAll', val)
      if (val) { this.checkedOptions = this.pageOptions }
      else { this.checkedOptions = [] }
    })
  },
  beforeDestroy() {
    this.$bus.$off('clickAll')
  },
  methods: {
    handleCheckedOptionsChange(val) {
      if (val.length > 0) {
        if (val.length === this.pageOptions.length) {
          this.$bus.$emit('clickOption', {
            footerVisible: true,
            allChecked: true
          })
        } else {
          this.$bus.$emit('clickOption',  {
            footerVisible: true,
            allChecked: false
          })
        }
      }
      else {
        this.$bus.$emit('clickOption', {
          footerVisible: false,
          allChecked: false
        })
      }
    }
  }
}
