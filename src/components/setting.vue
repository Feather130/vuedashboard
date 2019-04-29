<template>
  <div class="setting">
    <a-button size="small" shape="circle" icon="save" @click="save()" v-if="isLock&&isUpdate"></a-button>
    <a-button size="small" shape="circle" icon="plus" @click="() => visible = true" v-if="isLock"></a-button>
    <a-button size="small" shape="circle" :icon="isLock?'unlock':'lock'" @click="setLock()"></a-button>
    <a-modal
      title="添加小部件"
      centered
      v-model="visible"
      @ok="add"
      @cancel="cancel"
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

<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    isLock: state => state.layout.isLock,
    isUpdate: state => state.layout.isUpdate,
    dashboardId: state => state.layout.dashboardId,
    layout: state => state.layout.layout
  }),
  data() {
    return {
      visible: false,
      list: window.componentList,
      selectItem: null,
      configSelect: null
    };
  },
  methods: {
    setLock() {
      this.$store.commit("layout/setLock", !this.isLock);
      this.$message.success(this.isLock ? "编辑已解锁" : "编辑已锁定");
    },
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
      if (!this.isUpdate) {
        this.$store.commit("layout/setUpdate", true);
      }
      this.$store.commit("layout/addLayout", this.selectItem);
      this.visible = false;
      this.selectItem = null;
      this.configSelect = null;
    },
    cancel: function() {
      this.selectItem = null;
      this.configSelect = null;
    },
    save: function() {
      this.$store.commit("layout/setUpdate", false);
      this.$inventory.update({
        id: this.dashboardId,
        dashLayout: this.layout
      });
    }
  }
};
</script>

<style lang="less" scoped>
.setting {
  position: fixed;
  top: 10px;
  right: 30px;
  z-index: 1;
}
</style>
