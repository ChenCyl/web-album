import { mapMutations } from "vuex"

export default {
  watch: {
    // 使store中的值同步
    checkedOptions(val) {
      this.updateCheckedOptionsCopy(val)
    },
    // 改变页码、筛选条件、路由时都初始化底栏
    pageOptions() {
      this.checkedOptions = []
      this.$bus.$emit('clickOption', {
        footerVisible: false,
        allChecked: false
      })
    }
  },
  // mounted or created?
  mounted() {
    this.$bus.$on('clickAll', val => {
      console.log('clickAll', val)
      if (val) {
        this.checkedOptions = this.pageOptions.map(item => item.id)
      }
      else {
        this.checkedOptions = []
      }
    })
  },
  beforeDestroy() {
    this.$bus.$off('clickAll')
  },
  methods: {
    ...mapMutations(['updateCheckedOptionsCopy']),
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
