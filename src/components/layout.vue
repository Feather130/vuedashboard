<template>
  <grid-layout
    :layout.sync="layout"
    :col-num="100"
    :row-height="30"
    :is-draggable="isLock"
    :is-resizable="isLock"
    :is-mirrored="false"
    :vertical-compact="true"
    :margin="[0, 0]"
    :use-css-transforms="true"
    @layout-updated="layoutUpdatedEvent"
  >
    <grid-item
      v-for="(item,index) in layout"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :minW="item.minW"
      :maxW="item.maxW"
      :minH="item.minH"
      :maxH="item.maxH"
      :key="item.i"
    >
      <grid-component :index="index" />
    </grid-item>
  </grid-layout>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import VueGridLayout from "vue-grid-layout";
import GridComponent from "./GridComponent";
export default {
  computed: {
    ...mapState("layout", ["layout", "isLock", "isUpdate"]),
  },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    GridComponent
  },
  methods: {
    layoutUpdatedEvent: function(newLayout) {
      let updateLayout;
      updateLayout = Array.from(newLayout, item => {
        return {
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
          i: item.i,
          name: item.name,
          config: item.config,
          setting: item.setting
        };
      });
      this.$store.commit("layout/updateLayout", updateLayout);
      if (!this.isUpdate) {
        this.$store.commit("layout/setUpdate", true);
      }
    }
  }
};
</script>
