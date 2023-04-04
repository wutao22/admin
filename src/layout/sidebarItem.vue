<template>
    <div v-if="!item.meta || !item.meta.hidden">
        <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
            (!item.meta || !item.meta.alwaysShow)">
            <div>
                <appLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
                    <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
                        <el-icon :size="16" color="#000000" v-if="onlyOneChild.meta.icon">
                            <component :is="onlyOneChild.meta.icon"></component>
                        </el-icon>
                        <template #title>
                            <div class="title">
                                {{ item.meta.title }}
                            </div>
                        </template>
                    </el-menu-item>
                </appLink>
            </div>
        </template>
        <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" teleported>
            <template #title>
                <el-icon :size="16" v-if="item.meta.icon">
                    <component :is="item.meta.icon" />
                </el-icon>
                <div class="title">
                    {{ item.meta.title }}
                </div>

            </template>
            <sidebarItem v-for="child in item.children" :item="child" :base-path="resolvePath(child.path)" :isNest="true"
                class="nest-menu">
            </sidebarItem>
        </el-sub-menu>
    </div>
</template>
<script setup lang="ts">
import appLink from './link.vue'
import { ref } from 'vue';
import path from 'path-browserify';
import { isExternal } from '@/utils/validate';
const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    isNest: {
        type: Boolean,
        required: false
    },
    basePath: {
        type: String,
        required: true
    }
});
const onlyOneChild = ref();
function hasOneShowingChild(children = [] as any, parent: any) {
    if (!children) {
        children = []
    }
    const showingChildren = children.filter((item: any) => {
        if (item.meta && item.meta.hidden) {
            return false
        } else {
            onlyOneChild.value = item
            return true
        }
    })
    if (showingChildren.length === 1) {
        return true
    }
    if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
    } else {
        return false
    }
}
function resolvePath(routePath: string) {
    if (isExternal(routePath)) {
        return routePath
    }
    if (isExternal(props.basePath)) {
        return props.basePath
    }
    return path.resolve(props.basePath, routePath)
}
</script>
<style>
/*由于 element-ui 的<el-menu>标签本身希望里面嵌套的是<el-menu-item>,<el-submenu>,<el-menu-item-group>之一，但是却嵌套了<div>,而导致收折就隐藏不了文字*/
/*隐藏文字*/
.el-menu--collapse .el-submenu__title .title {
    display: none;
}

/*隐藏 > */
.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
    display: none;
}
</style>