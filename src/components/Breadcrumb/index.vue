<template>
    <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
        <TransitionGroup name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in leverList">
                <!-- <span v-if="item.redirect === 'noredirect' || index === breadcrumb.length - 1"> {{ item.meta.title }}</span> -->
                <a  @click.prevent="handleLink(item)">
                    {{ item.meta.title }}
                </a>
            </el-breadcrumb-item>
        </TransitionGroup>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, onBeforeMount } from 'vue';
import { useRoute, RouteLocationMatched } from 'vue-router';
import { compile } from 'path-to-regexp'
import router from '@/router';


const currentRoute = useRoute();
const pathCompile = (path: string) => {
    const { params } = currentRoute;
    const toPath = compile(path);
    return toPath(params);
}

// 面包屑
const leverList = ref([] as Array<RouteLocationMatched>)
function getBreadCrumb() {
    console.log('currentRoute', currentRoute)
    let matched = currentRoute.matched.filter(item => item.meta && item.meta.title)
console.log(matched)
    const first = matched[0];
    if (!isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: '控制台' } } as any].concat(matched)
    }
    leverList.value = matched.filter(item => {
        return item.meta && item.meta.title && item.meta.breadcrumb != false
    })
}
// 判断是否为控制台
function isDashboard(route: RouteLocationMatched) {
    const name = route && route.name;
    if (!name) {
        return false;
    }
    return (
        name.toString().trim().toLocaleLowerCase() ===
        'Dashboard'.toLocaleLowerCase()
    );
};
function handleLink(item: any) {
    console.warn(item)
    const { redirect, path } = item
    if (redirect) {
        router.push(redirect).catch(err => {
            console.warn(err)
        });
        return
    }
    router.push(pathCompile(path)).catch(err => {
        console.warn(err)
    })

}
onMounted(() => {
    getBreadCrumb()
})
</script>
<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
//   line-height: 50px;
  margin-left: 16px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
