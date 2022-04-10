<template>
  <demo-wrap
    no-padding
    name="field"
  >
    <p class="filed-demo-label">
      单行输入
    </p>
    <esc-field
      label="姓名"
      block
      v-model="name"
    />
    <p class="filed-demo-label">
      多行输入高度自增
    </p>
    <esc-field
      label="详细地址"
      v-model="address"
      type="textarea"
      auto-size
      show-length
      block
      max-length="8"
    />
    <p class="filed-demo-label">
      数字输入框 - 精确到2位
    </p>
    <esc-field
      v-model="money"
      label="金额"
      :fixed="2"
    />
    <p class="filed-demo-label">
      数字输入框 - 电话号码
    </p>
    <esc-field
      v-model="phone"
      label="电话号码"
      :fixed="0"
    />
    <p class="filed-demo-label">
      数字加减器 - 精确度1位
    </p>
    <esc-field
      v-model="val"
      label="购买数量"
      :fixed="1"
      is-input-number
    />
    <p class="filed-demo-label">
      输入框组合
    </p>
    <esc-cell-group>
      <esc-field
        v-model="phone"
        label="电话号码"
        :fixed="0"
      />
      <esc-field
        v-model="val"
        label="购买数量"
        :fixed="1"
        is-input-number
      />
    </esc-cell-group>
    <p class="filed-demo-label">
      11
    </p>
  </demo-wrap>
</template>

<script>
import EscField from '../index'
import EscCellGroup from '../../cell-group/index'
import DemoWrap from '@/components/DemoWrap.vue'

export default {
  name: 'InputNumber',

  components: {
    EscField,
    DemoWrap,
    EscCellGroup
  },

  data () {
    return {
      name: '大头的赞美',
      address: '杭州市西湖区',
      phone: '18358185826',
      money: 100,
      val: '1.0'
    }
  },

  watch: {
    val (v) {
      console.log(v)
    }
  }
}
</script>

<style lang="stylus">
@import '../index.styl'
@import '~@@/cell-group/index.styl'
.filed-demo-label
  padding-left 10px
  color #666
</style>
