import T from 'ant-design-vue/es/table/Table'

export default {
  data () {
    return {
      needTotalList: [],
      localLoading: false,
      localDataSource: [],
      localPagination: Object.assign({}, this.pagination)
    }
  },
  props: Object.assign({}, T.props, {
    rowKey: {
      type: [String, Function],
      default: 'key'
    },
    data: {
      type: Function,
      required: true
    },
    pageNum: {
      type: Number,
      default: 1
    },
    page_size: {
      type: Number,
      default: 20
    },
    showSizeChanger: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    showPagination: {
      type: String | Boolean,
      default: 'auto'
    }
  }),
  watch: {
    pageNum (val) {
      Object.assign(this.localPagination, {
        current: val
      })
    },
    page_size (val) {
      Object.assign(this.localPagination, {
        page_size: val
      })
    },
    showSizeChanger (val) {
      Object.assign(this.localPagination, {
        showSizeChanger: val
      })
    }
  },
  created () {
    const { page } = this.$route.params
    const localPageNum = (page && parseInt(page)) || this.pageNum
    this.localPagination = ['auto', true].includes(this.showPagination) && Object.assign({}, this.localPagination, {
      current: localPageNum,
      page_size: this.page_size,
      showSizeChanger: this.showSizeChanger
    }) || false
    this.needTotalList = this.initTotalList(this.columns)
    this.loadData()
  },
  methods: {
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh (bool = false) {
      bool && (this.localPagination = Object.assign({}, {
        current: 1, page_size: this.page_size
      }))
      this.loadData()
    },
    /**
     * 加载数据方法
     * @param {Object} pagination 分页选项器
     */
    loadData (pagination) {
      this.localLoading = true
      const parameter = Object.assign({
        page: (pagination && pagination.current) ||
          this.showPagination && this.localPagination.current || this.pageNum,
        page_size: (pagination && pagination.page_size) ||
          this.showPagination && this.localPagination.page_size || this.page_size
      })
      const result = this.data(parameter)
      // 对接自己的通用数据接口需要修改下方代码中的 r.pageNo, r.totalCount, r.data
      // eslint-disable-next-line
      if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
        result.then(r => {
          this.localPagination = this.showPagination && Object.assign({}, this.localPagination, {
            // current: r.page, // 返回结果中的当前分页数
            total: r.count, // 返回结果中的总记录数
            showSizeChanger: this.showSizeChanger,
            page_size: (pagination && pagination.page_size) ||
              this.localPagination.page_size
          }) || false
          // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
          // if (r.results.length === 0 && this.showPagination && this.localPagination.current > 1) {
          //   this.localPagination.current--
          //   this.loadData()
          //   return
          // }

          // 这里用于判断接口是否有返回 r.totalCount 且 this.showPagination = true 且 page 和 page_size 存在 且 totalCount 小于等于 page * page_size 的大小
          // 当情况满足时，表示数据不满足分页大小，关闭 table 分页功能
          // try {
          //   if ((['auto', true].includes(this.showPagination) && r.count <= (r.page * this.localPagination.page_size))) {
          //     this.localPagination.hideOnSinglePage = true
          //   }
          // } catch (e) {
          //   this.localPagination = false
          // }
          this.localDataSource = r.results // 返回结果中的数组数据
          this.localLoading = false
        })
      }
    },
    initTotalList (columns) {
      const totalList = []
      columns && columns instanceof Array && columns.forEach(column => {
        if (column.needTotal) {
          totalList.push({
            ...column,
            total: 0
          })
        }
      })
      return totalList
    }
  },

  render () {
    const props = {}
    const localKeys = Object.keys(this.$data)

    Object.keys(T.props).forEach(k => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`
      if (localKeys.includes(localKey)) {
        props[k] = this[localKey]
        return props[k]
      }
      this[k] && (props[k] = this[k])
      return props[k]
    })
    const table = (
      <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }} onChange={this.loadData} onExpand={ (expanded, record) => { this.$emit('expand', expanded, record) } }>
        { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) }
      </a-table>
    )

    return (
      <div class="table-wrapper">
        { table }
      </div>
    )
  }
}
