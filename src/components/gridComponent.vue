<template>
  <div class="gridComponent">
    <div class="setting">
      <a-button
        size="small"
        shape="circle"
        icon="close"
        @click="close(index)"
        v-show="this.$store.state.layout.isLock"
      ></a-button>
      <a-button size="small" shape="circle" icon="setting" v-show="this.$store.state.layout.isLock"></a-button>
    </div>
    <component :is="layout.name" :isConfig="isConfig"></component>
  </div>
</template>

<style lang="less" scoped>
.gridComponent {
  height: 100%;
}
.setting {
  position: absolute;
  bottom: 0;
}
</style>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    layout: Object,
    index: Number
  },
  data() {
    return {
      isConfig: false
    };
  },
  methods: {
    ...mapMutations({
      close: "layout/delLayout"
    })
  }
};
</script>
