<template>
  <div>
    <el-menu :default-active="$route.path" class="el-menu-vertical" mode="vertical" :collapse="props.collapse"
      background-color="#304156" text-color="#bfcbd9" active-text-color="#409eff" :unique-opened="true"
      :collapse-transition="false">
      <div class="logo">信息</div>
      <siderBarItem v-for="(item, index) in menuList" :key="index" :item="item" :base-path="item.path"></siderBarItem>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import siderBarItem from './sidebarItem.vue'
const props = defineProps({
  collapse: {
    default: false,
    type: Boolean
  }
})
const state = reactive({
  router: true,
  menuList: [
    {
      path: "/dashboard",
      component: "Layout",
      alwaysShow: true,
      meta: {
        'title': "控制台",
        'hidden': false
      },
      children: [
        {
          'path': "/dashboard",
          'alwaysShow': false,
          'meta': {
            'title': "控制台",
            'icon': "House",
            'hidden': false
          }
        }
      ]
    },
    {
      "path": "/system",
      "component": "Layout",
      "alwaysShow": true,
      'meta': {
        'title': "常规管理",
        'icon': "Aim",
      },
      "children": [
        {
          "path": "/file",
          "alwaysShow": false,
          "meta": {
            "title": "附件管理",
            "icon": "Document",
            hidden: false,
            "roles": [
              "sys:file"
            ]
          }
        },
        {
          "path": "/user",
          "alwaysShow": false,
          "meta": {
            "title": "个人资料",
            "icon": "User",
            "roles": [
              "sys:user"
            ]
          }
        },
        {
          "path": "/banner",
          "alwaysShow": false,
          "meta": {
            "title": "banner管理",
            "icon": "Search",
            "roles": [
              "sys:banner"
            ]
          }
        },
        {
          "path": "/sysconf",
          "alwaysShow": false,
          "meta": {
            "title": "系统配置",
            "icon": "Aim",
            "roles": [
              "sys:system"
            ]
          }
        }
      ]
    },
    {
      "path": "/boxs",
      "component": "Layout",
      "alwaysShow": true,
      "meta": {
        "title": "盲盒管理",
        "icon": "el-icon-present",
        "roles": [
          "sys:boxs"
        ]
      },
      "children": [
        {
          "path": "/tabulation",
          "alwaysShow": false,
          "meta": {
            "title": "盲盒列表",
            "icon": "el-icon-search",
            "roles": [
              "sys:boxs:tabulation"
            ]
          }
        },
        {
          "path": "/tabulate",
          "alwaysShow": false,
          "meta": {
            "title": "盲盒产品列表",
            "icon": "el-icon-search",
            "roles": [
              "sys:boxs:tabulate"
            ]
          }
        }
      ]
    },
    {
      "path": "/trends",
      "component": "Layout",
      "alwaysShow": true,
      "meta": {
        "title": "动态信息管理",
        "icon": "House",
        "roles": [
          "sys:trends"
        ]
      },
      "children": [
        {
          "path": "/message",
          "alwaysShow": false,
          "meta": {
            "title": "动态信息列表",
            "icon": "el-icon-search",
            "roles": [
              "sys:trends:message"
            ]
          }
        }
      ]
    }
  ]
})
const { router, menuList } = toRefs(state)
</script>

<style>
.logo {
  padding-left: 25px;
  height: 60px;
  line-height: 60px;
  font-weight: bold;
  font-size: 18px;
  color: #bfcbd9;
}

.el-menu {
  /* height: 100vh; */
  /* background: #d3dce6; */
  border-right: 0;
}

/*由于 element-ui 的<el-menu>标签本身希望里面嵌套的是<el-menu-item>,<el-submenu>,<el-menu-item-group>之一，但是却嵌套了<div>,而导致收折就隐藏不了文字*/
/*隐藏文字*/
.el-menu--collapse .el-sub-menu .el-sub-menu__title .title {
  display: none !important;
}

/*隐藏 > */
.el-menu--collapse .el-sub-menu .el-sub-menu__title .el-sub-menu__icon-arrow {
  display: none !important;
}
</style>