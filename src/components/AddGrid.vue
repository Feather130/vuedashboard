<template>
  <a-modal
    title="添加小部件"
    centered
    :visible="this.visible"
    @ok="add"
    @cancel="cancel"
    :destroyOnClose="true"
    :maskClosable="false"
    :afterClose="afterClose"
    :okButtonProps="{ props: {disabled: selectItem===null?true:false} }"
  >
    宽度：
    <a-input-number :min="1" :max="100" v-model="width" />高度：
    <a-input-number :min="1" v-model="height" />选择小部件：
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
</template>
    
<script>
export default {
  props: {
    visible: Boolean
  },
  data() {
    return {
      list: window.componentList,
      selectItem: null,
      configSelect: null,
      width: 10,
      height: 1
    };
  },
  methods: {
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
    afterClose: function() {
      this.selectItem = null;
      this.configSelect = null;
      this.width = 10;
      this.height = 1;
    },
    add: function() {
      if (!this.isUpdate) {
        this.$store.commit("layout/setUpdate", true);
      }
      this.$store.commit("layout/addLayout", {
        name: this.selectItem,
        width: this.width,
        height: this.height
      });

      this.$emit("closeAddGrid");
    },
    cancel: function() {
      this.$emit("closeAddGrid");
    }
  }
};
</script>
