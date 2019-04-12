<template>
  <div id="app">
    <setting/>
    <!-- <layout/> -->
  </div>
</template>

<script>
import setting from "./components/setting";
// import layout from "./components/layout";

export default {
  name: "app",
  components: {
    setting,
    // layout
  },
  mounted() {
    this.$inventory
      .list({
        fragmentType: "dashboard!name!home"
      })
      .then(list => {
        if (list.managedObjects.length === 0) {
          return this.$inventory
            .create({
              "dashboard!name!home": {}
            })
            .then(detail => {
              this.$store.commit("setDashboardId", detail.id);
            });
        } else {
          this.$store.commit(
            "layout/setDashboardId",
            list.managedObjects[0].id
          );
        }
      });
  },
  methods: {
    // isLock: function(val) {
      // this.$store.commit("setLock", detail.id);
    // this.isDraggable = val.isDraggable;
    // this.isResizable = val.isResizable;
    // this.$message.success(
    //   val.isResizable && val.isDraggable ? "编辑已解锁" : "编辑已锁定"
    // );
    // }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
