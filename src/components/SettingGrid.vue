<template>
  <a-modal
    :title="purpose==='add'?'添加小部件':'编辑小部件'"
    centered
    :visible="visible"
    @ok="purpose==='add'?add():put()"
    @cancel="cancel"
    :destroyOnClose="true"
    :maskClosable="false"
    :afterClose="afterClose"
    :okButtonProps="{ props: {disabled: okButtonProps()} }"
  >
    <a-form layout="vertical">
      <a-form-item label="标题">
        <a-input placeholder="请输入标题" v-model="title" />
      </a-form-item>
      <a-form-item label="选择小部件">
        <a-select
          showSearch
          placeholder="搜索小部件"
          :defaultValue="purpose==='add' ?undefined: layout[index].name"
          :disabled="!!index"
          optionFilterProp="children"
          style="width: 100%"
          @change="handleChange"
        >
          <a-select-option v-for="item in list" :key="item" :value="item">{{item}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <keep-alive>
          <component
            :is="configSelect"
            ref="componentChild"
            :target="purpose==='add' ?null: layout[index].config"
          ></component>
        </keep-alive>
      </a-form-item>
      <a-form-item>
        <a-collapse :bordered="false">
          <a-collapse-panel header="自定义小部件样式" key="1" :style="{'border-bottom':'none'}">
            <a-form-item label="宽度">
              <a-input-number :min="1" :max="100" v-model="width" style="width:100%" />
            </a-form-item>
            <a-form-item label="高度">
              <a-input-number :min="1" v-model="height" style="width:100%" />
            </a-form-item>
            <a-form-item label="标题可见性">
              <a-radio-group name="showTitle" :defaultValue="titleShow" v-model="titleShow">
                <a-radio :value="true">显示</a-radio>
                <a-radio :value="false">隐藏</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="标题颜色">
              <chrome v-model="titleColors" @input="updateValue" />
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
    
<script>
import { mapState } from "vuex";
import { Chrome } from "vue-color";
export default {
  computed: {
    ...mapState("layout", ["dashboardId", "layout"])
  },
  components: {
    Chrome
  },
  props: {
    visible: Boolean,
    purpose: String,
    index: Number
  },
  data() {
    return {
      list: window.componentList,
      selectItem: null,
      configSelect: null,
      width: 10,
      height: 1,
      title: null,
      titleColors: "#FFFFFF",
      titleShow: true
    };
  },
  watch: {
    visible(n, o) {
      if (n && this.purpose === "edit") {
        this.defaultData();
      }
    }
  },
  methods: {
    /**
     * @description: 判断模态窗是否可以提交
     * @return: Boolean
     */
    okButtonProps() {
      return this.selectItem === null ? true : false;
    },

    /**
     * @description: 判断选择的组件是否有配置页
     * @param {String} name #组件名
     * @return: 动态组件名
     */
    configSelectName(name) {
      if (window.componentAll.includes(name + "Config")) {
        return name + "Config";
      } else {
        return name;
      }
    },

    updateValue(value) {
      this.titleColors = value.hex;
    },

    defaultData() {
      this.selectItem = this.layout[this.index].name;
      this.configSelect = this.configSelectName(this.layout[this.index].name);
      this.width = this.layout[this.index].w;
      this.height = this.layout[this.index].h;
      this.title = this.layout[this.index].setting.title;
      this.titleColors = this.layout[this.index].setting.titleColors;
      this.titleShow = this.layout[this.index].setting.titleShow;
    },

    handleChange(value) {
      this.selectItem = value;
      this.configSelect = this.configSelectName(value);
    },

    add() {
      if (!this.isUpdate) {
        this.$store.commit("layout/setUpdate", true);
      }
      this.$store.commit("layout/addLayout", {
        name: this.selectItem,
        width: this.width,
        height: this.height,
        config: this.$refs.componentChild.config,
        setting: {
          title: this.title,
          titleColors: this.titleColors,
          titleShow: this.titleShow
        }
      });
      this.$emit("closeAddGrid");
    },

    put() {
      if (!this.isUpdate) {
        this.$store.commit("layout/setUpdate", true);
      }
      this.$store.commit("layout/putLayout", {
        index: this.index,
        x: this.layout[this.index].x,
        y: this.layout[this.index].y,
        i: this.layout[this.index].i,
        name: this.layout[this.index].name,
        w: this.width,
        h: this.height,
        config: this.$refs.componentChild.config,
        setting: {
          title: this.title,
          titleColors: this.titleColors,
          titleShow: this.titleShow
        }
      });
      this.$emit("closeAddGrid");
    },

    afterClose() {
      this.selectItem = null;
      this.configSelect = null;
      this.width = 10;
      this.height = 1;
      this.title = null;
      this.titleColors = "#FFFFFF";
      this.titleShow = true;
    },

    cancel() {
      this.$emit("closeAddGrid");
    }
  }
};
</script>
