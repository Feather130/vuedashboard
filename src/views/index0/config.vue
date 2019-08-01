<template>
  <div>
    <input type="text" placeholder="index0" v-model="config.value" />
  </div>
</template>

<script>
export default {
  name: "index0Config",
  props: {
    target: Object
  },
  data() {
    return {
      config: {
        value: this.target ? this.target.value : null
      }
    };
  },
  methods: {}
};
</script>
