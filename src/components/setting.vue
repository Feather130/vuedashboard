<template>
  <div class="setting">
    <a-button size="small" shape="circle" icon="save" @click="save()" v-if="isLock&&isUpdate"></a-button>
    <a-button
      size="small"
      shape="circle"
      icon="plus"
      @click="() => visible = true"
      v-if="isLock"
    ></a-button>
    <a-button size="small" shape="circle" :icon="isLock?'unlock':'lock'" @click="setLock()"></a-button>
    <add-grid :visible="visible" @closeAddGrid="setVisible()"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddGrid from "./AddGrid";
export default {
  computed: {
    ...mapState("layout", ["isLock", "isUpdate", "dashboardId", "layout"])
  }, 
  components: {
    AddGrid
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    setLock() {
      this.$store.commit("layout/setLock", !this.isLock);
      this.$message.success(this.isLock ? "编辑已解锁" : "编辑已锁定");
    },
    save: function() {
      this.$store.commit("layout/setUpdate", false);
      this.$inventory.update({
        id: this.dashboardId,
        dashLayout: this.layout
      });
    },
    setVisible: function() {
      this.visible = false;
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
