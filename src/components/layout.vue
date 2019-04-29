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
      <gridComponent :layout="item" :index="index"/>
    </grid-item>
  </grid-layout>
</template>

<script>
import { mapState } from "vuex";
import VueGridLayout from "vue-grid-layout";
import gridComponent from "./gridComponent";
export default {
  computed: mapState({
    layout: state => state.layout.layout,
    isLock: state => state.layout.isLock,
    isUpdate: state => state.layout.isUpdate
  }),
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    gridComponent
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
          name: item.name
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
