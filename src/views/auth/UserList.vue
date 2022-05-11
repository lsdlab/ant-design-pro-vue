<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="搜索用户">
                <a-input v-model="queryParam.search" placeholder="邮箱/用户名"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="resetSearchForm">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <simple-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >
        <span slot="is_superuser" slot-scope="text">
          <a-badge v-if="text" status="success" text="是" />
          <a-badge v-else status="error" text="否" />
        </span>
        <span slot="is_staff" slot-scope="text">
          <a-badge v-if="text" status="success" text="是" />
          <a-badge v-else status="error" text="否" />
        </span>
        <span slot="is_active" slot-scope="text">
          <a-badge v-if="text" status="success" text="是" />
          <a-badge v-else status="error" text="否" />
        </span>
        <span slot="date_joined" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="last_login" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
      </simple-table>

    </a-card>
  </page-header-wrapper>
</template>

<script>
import { SimpleTable, Ellipsis } from '@/components'
import { queryUsers } from '@/api/api'

const columns = [
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: '超级用户',
    dataIndex: 'is_superuser',
    scopedSlots: { customRender: 'is_superuser' }
  },
  {
    title: '普通用户',
    dataIndex: 'is_staff',
    scopedSlots: { customRender: 'is_staff' }
  },
  {
    title: '使用中',
    dataIndex: 'is_active',
    scopedSlots: { customRender: 'is_active' }
  },
  {
    title: '注册时间',
    dataIndex: 'date_joined',
    scopedSlots: { customRender: 'date_joined' }
  },
  {
    title: '最后登录时间',
    dataIndex: 'last_login',
    scopedSlots: { customRender: 'last_login' }
  }
]

export default {
  name: 'UserList',
  components: {
    SimpleTable,
    Ellipsis
  },
  data () {
    this.columns = columns
    return {
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const params = Object.assign({}, parameter, this.queryParam)
        // console.log('loadData request parameters:', params)
        return queryUsers(params)
          .then(res => {
            return res
          })
      }
    }
  },
  created () {
  },
  methods: {
    resetSearchForm () {
      this.queryParam = {
        page: 1,
        page_size: 20
      }
      this.$refs.table.refresh(true)
    }
  }
}
</script>
