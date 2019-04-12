<template>
  <grid-layout
    :layout.sync="this.$store.state.layout.layout"
    :col-num="100"
    :row-height="30"
    :is-draggable="this.$store.state.layout.isDraggable"
    :is-resizable="this.$store.state.layout.isResizable"
    :is-mirrored="false"
    :vertical-compact="true"
    :margin="[0, 0]"
    :use-css-transforms="true"
  >
    <grid-item
      v-for="(item,index) in this.$store.state.layout.layout"
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
      <gridComponent :layout="item" :index="index" @close="close"/>
    </grid-item>
  </grid-layout>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import gridComponent from "./gridComponent";
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    gridComponent
  },
  methods:{
    close:function(val){
      // this.layout.splice(val,1)
    }
  }
};
</script>
