<template>
  <div>
    <el-container class="container">
      <el-aside style="max-width: 200px;height: 100vh;background-color: #304156;" :class="{'collapse': state.isActive}">
        <siderbar :collapse="isActive"></siderbar>
      </el-aside>
      <el-container>
        <el-header>
          <div class="navbar">
            <div class="flex alifn-center margin-top justify-center">
              <hamburger :isActive="state.isActive" @toggleClick="toggleSideBar"></hamburger>
              <breadcrumb class=" margin-left-lg"></breadcrumb>
            </div>
            <el-dropdown class="avatar-container">
              <div class="avatar-wrapper">
                <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                  class="user-avatar">
                <i class="el-icon-caret-bottom" />
              </div>
              <template #dropdown>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                  <router-link to="/dashboard">
                    <el-dropdown-item>
                      首页
                    </el-dropdown-item>
                  </router-link>
                  <a target="_blank">
                    <el-dropdown-item>个人资料</el-dropdown-item>
                  </a>
                  <el-dropdown-item divided @click.native="logout">
                    <span style="display:block;">退出登录</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
 
<script setup lang="ts">
import breadcrumb from '@/components/BreadCrumb/index.vue'
import router from '@/router';
import { ref, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
// 侧边栏组件
import Siderbar from './siderbar.vue'
import Hamburger from '@/components/Hamburger/index.vue'
const userMenuShow = ref<boolean>(false);
const state = reactive({
  isActive: false
})
const { isActive } = toRefs(state)

function logout() {
  router.push({
    path: '/login'
  })
}

function toggleSideBar() {
  state.isActive = !state.isActive
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%
}
.collapse{
  width: 70px;
}
.el-header {
  width: 100%;
  height: 60px;
  // line-height: 60px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  flex-direction: row-reverse;
  background-color: #f5f5f7;

  .user-info {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 100px;
    cursor: pointer;
    padding: 0 12px;

    img {
      margin-right: 10px;
      width: 24px;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      margin-top: 5px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}

.navbar {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>