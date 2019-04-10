<template>
  <div class="gridComponent">
    <div class="setting">
      <a-button
        size="small"
        shape="circle"
        icon="close"
        @click="close"
        v-show="isDraggable&&isResizable"
      ></a-button>
      <a-button
        size="small"
        shape="circle"
        icon="setting"
        v-show="isDraggable&&isResizable"
      ></a-button>
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
export default {
  props: {
    layout: Object,
    index: Number,
    isDraggable: Boolean,
    isResizable: Boolean
  },
  data() {
    return {
      isConfig: false
    };
  },
  methods: {
    close: function() {
      this.$emit("close", this.index);
    }
  }
};
</script>
