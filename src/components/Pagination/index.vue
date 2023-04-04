<template>
    <div :class="{ 'hidden': hidden }" class="pagination-container">
        <el-pagination :background="background" :current-page.sync="currentPage" :page-size.sync="pageSize" :layout="layout"
            :page-sizes="pageSizes" :total="total" v-bind="$attrs" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
const props = defineProps({
    total: {
        required: true,
        type: Number as PropType<number>,
        default: 0
    },
    page: {
        type: Number,
        default: 1
    },
    limit: {
        type: Number,
        default: 20
    },
    pageSizes: {
        type: Array as PropType<number[]>,
        default() {
            return [10, 20, 30, 50];
        }
    },
    layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
        type: Boolean,
        default: true
    },
    autoScroll: {
        type: Boolean,
        default: true
    },
    hidden: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['update:page', 'update:limit', 'pagination'])
// 当前页数
const currentPage = computed<number | undefined>({
    get: () => props.page,
    set: val => {
        emit('update:page', val)
    }
})
// 每页容量
const pageSize = computed<number | undefined>({
    get() {
        return props.limit;
    },
    set: val => {
        emit('update:limit', val)
    }
})

// 改变页容量
function handleSizeChange(size: number) {
    emit('pagination', {page: currentPage, limit: size})
}

// 改变当前页数
function handleCurrentChange(page: number) {
    currentPage.value = page
    emit('pagination', {page: page, limit: props.limit})
}
</script>

<style scoped>
.pagination-container {
    background: #fff;
    padding: 32px 16px;
}

.pagination-container.hidden {
    display: none;
}
</style>
