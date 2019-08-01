<template>
  <div class="setting">
    <a-button size="small" shape="circle" icon="save" @click="save()" v-if="isLock&&isUpdate"></a-button>
    <a-button size="small" shape="circle" icon="plus" @click="() => visible = true" v-if="isLock"></a-button>
    <a-button size="small" shape="circle" :icon="isLock?'unlock':'lock'" @click="setLock"></a-button>
    <setting-grid :visible="visible" @closeAddGrid="setVisible" :purpose="purpose" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import SettingGrid from "./SettingGrid";
export default {
  computed: {
    ...mapState("layout", ["isLock", "isUpdate", "dashboardId", "layout"])
  },
  components: {
    SettingGrid
  },
  data() {
    return {
      visible: false,
      purpose: "add"
    };
  },
  methods: {
    setLock() {
      this.$store.commit("layout/setLock", !this.isLock);
      this.$message.success(this.isLock ? "编辑已解锁" : "编辑已锁定");
    },
    async save() {
      try {
        await this.$inventory.update({
          id: this.dashboardId,
          dashLayout: this.layout
        });
        this.$store.commit("layout/setUpdate", false);
        this.$message.success("保存成功");
      } catch (error) {
        this.$message.error("保存失败");
      }
    },
    setVisible() {
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
