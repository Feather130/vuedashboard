<template>
  <div class="setting">
    <a-button
      size="small"
      shape="circle"
      icon="plus"
      @click="() => visible = true"
      v-show="this.$store.state.layout.isDraggable&&this.$store.state.layout.isResizable"
    ></a-button>
    <a-button
      size="small"
      shape="circle"
      icon="lock"
      @click="isLock(!this.$store.state.layout.isDraggable)"
    ></a-button>
    <a-modal
      title="添加小部件"
      centered
      v-model="visible"
      @ok="add"
      :destroyOnClose="true"
      :maskClosable="false"
      :okButtonProps="{ props: {disabled: selectItem===null?true:false} }"
    >
      <a-select
        showSearch
        placeholder="搜索小部件"
        optionFilterProp="children"
        style="width: 100%"
        :filterOption="filterOption"
        @change="handleChange"
      >
        <a-select-option v-for="item in list" :key="item" :value="item">{{item}}</a-select-option>
      </a-select>
      <component :is="configSelect"></component>
    </a-modal>
  </div>
</template>

<style lang="less" scoped>
.setting {
  position: fixed;
  top: 10px;
  right: 30px;
  z-index: 1;
}
</style>


<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      visible: false,
      list: window.componentList,
      selectItem: null,
      configSelect: null
    };
  },
  methods: {
    ...mapMutations({
      isLock: "setLock"
    }),
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleChange: function(value) {
      this.selectItem = value;
      if (window.componentAll.indexOf(value + "Config") > -1) {
        this.configSelect = value + "Config";
      } else {
        this.configSelect = value;
      }
    },
    add: function() {
      this.$store.commit("setLatout", this.selectItem);
      this.visible = false;
    }
  }
};
</script>
