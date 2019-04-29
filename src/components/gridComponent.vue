<template>
  <div class="gridComponent">
    <div class="setting">
      <a-button size="small" shape="circle" icon="close" @click="close()" v-if="isLock"></a-button>
      <a-button size="small" shape="circle" icon="setting" v-if="isLock"></a-button>
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
import { mapState } from "vuex";
export default {
  computed: mapState({
    isLock: state => state.layout.isLock,
    isUpdate: state => state.layout.isUpdate
  }),
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
    close: function() {
      if (!this.isUpdate) {
        this.$store.commit("layout/setUpdate", true);
      }
      this.$store.commit("layout/removeLayout", this.index);
    }
  }
};
</script>
