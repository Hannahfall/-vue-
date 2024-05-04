<template>
  <div id="app">
    <!-- <el-row>
  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
</el-row> -->
 <!-- <el-select v-model="valueOne"  filterable multiple>
    <el-option
         v-for="item in selectionOne"
          :key="item.value"
          :label="item.label"
          :value="item.value"
    />
</el-select> -->
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
   data() {
    return {
      valueOne: [],
      selectionOne: [
        {
          value: "选项1",
          label: "黄金糕",
          key:1
        },
        {
          value: "选项2",
          label: "双皮奶",
          key:2
        },
        {
          value: "选项3",
          label: "蚵仔煎",
          key:3
        },
        {
          value: "选项4",
          label: "龙须面",
          key:4
        },
        {
          value: "选项5",
          label: "北京烤鸭",
          key:5
        }
      ]
    };
  },
  watch:{
    valueOne: function () {
    }
  },
    created() {
      this.selectionOne.map((i, index) => {
         this.valueOne.push(this.selectionOne[index].value);
      })
  }

}
</script>

<style lang="less" >
  html, body, h3, p{
    margin: 0;
    padding: 0;
  } 
</style>
