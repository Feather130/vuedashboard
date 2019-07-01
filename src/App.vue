<template>
  <div id="app">
    <setting/>
    <layout/>
  </div>
</template>

<script>
import Setting from "./components/Setting";
import Layout from "./components/Layout";

export default {
  name: "app",
  components: {
    Setting,
    Layout
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
              this.$store.commit("layout/setDashboardId", detail.id);
            });
        } else {
          this.$store.commit(
            "layout/setDashboardId",
            list.managedObjects[0].id
          );
          if (list.managedObjects[0].dashLayout) {
            this.$store.commit(
              "layout/updateLayout",
              list.managedObjects[0].dashLayout
            );
          }
        }
      });
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
