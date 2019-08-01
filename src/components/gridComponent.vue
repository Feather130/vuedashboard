<template>
  <div class="gridComponent">
    <div
      class="header"
      :class="layout[index].setting.titleShow?'header-show':'header-hide'"
      :style="{ background: layout[index].setting.titleColors ,color:getCorrectTextColor(layout[index].setting.titleColors)}"
    >
      <div class="title" v-show="layout[index].setting.titleShow">{{layout[index].setting.title}}</div>
      <div>
        <a-button size="small" shape="circle" icon="close" @click="close()" v-if="isLock"></a-button>
        <a-button
          size="small"
          shape="circle"
          icon="setting"
          @click="() => visible = true"
          v-if="isLock"
        ></a-button>
      </div>
    </div>
    <setting-grid
      :visible="visible"
      @closeAddGrid="setVisible"
      :purpose="purpose"
      :index="index"
    />
    <div :class="layout[index].setting.titleShow?'contenr-show':'contenr-hide'">
      <component :is="layout[index].name" :layout="layout[index]"></component>
    </div>
  </div>
</template>

<style lang="less" scoped>
.gridComponent {
  height: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  .title {
    margin-left: 15px;
  }
  &.header-show {
    height: 30px;
    line-height: 30px;
  }
  &.header-hide {
    height: 0px;
    flex-direction: row-reverse;
  }
}

.contenr-show {
  height: calc(100% - 30px);
}
.contenr-hide {
  height: 100%;
}
</style>

<script>
import { mapState } from "vuex";
import SettingGrid from "./SettingGrid";
import { Color } from "../common";
export default {
  computed: {
    ...mapState("layout", ["isLock", "isUpdate","layout"])
  },
  components: {
    SettingGrid
  },
  props: {
    // layout: Object,
    index: Number
  },
  data() {
    return {
      visible: false,
      purpose: "edit"
    };
  },
  methods: {
    close() {
      if (!this.isUpdate) {
        this.$store.commit("layout/setUpdate", true);
      }
      this.$store.commit("layout/removeLayout", this.index);
    },
    setVisible() {
      this.visible = false;
    },
    getCorrectTextColor(color) {
      return Color.prototype.getCorrectTextColor(color);
    }
  }
};
</script>
