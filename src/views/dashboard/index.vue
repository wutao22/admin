<template>
    <el-card>
    index
        <!-- <div class="glass" style="width: 100px;height: 120px;background-color: cornflowerblue;">

        </div> -->
        <!-- <div>
            <input type="text" v-model="todoMsg">
            <button @click="add">添加</button>
            <button @click="clear">清理</button>
        </div>
        <div v-if="lists.length">
            <div v-for="(item, index) in lists" :key="index">
                <input type="checkbox" v-model="item.done">
                <span :class="{ done: item.done }">{{ item.msg }}</span>
                <span @click="deleteItem(index)">X</span>
            </div>
        </div>
        <div>
            <span>全选</span>
            <input type="checkbox" v-model='allDone'>
            <span>{{ hasDone }} / {{ lists.length }}</span>
        </div> -->
    </el-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
// interface TodoItem {
//     msg: string,
//     done: boolean
// }
// const todoMsg = ref<string>('')
// const lists = ref<TodoItem[]>([
//     { msg: '睡觉', done: false },
//     { msg: '睡觉', done: false },
//     { msg: '睡觉', done: false },
//     { msg: '睡觉', done: false }
// ])

// const hasDone = computed(() => lists.value.filter(item => item.done).length)
// const allDone = computed<boolean>({
//     get() {
//         return hasDone.value === lists.value.length
//     },
//     set(value: boolean) {
//         lists.value.forEach(item => {
//             item.done = value
//         })
//     }
// })
// const add = () => {
//     if(todoMsg.value) {
//         lists.value.push({
//             msg: '111',
//             done: false
//         })
//         todoMsg.value = ''
//     }
// }
// const deleteItem = (index: number) => {
//     lists.value.splice(index, 1)
// }
</script>

<style>
/* .done {
    text-decoration: line-through;
    color: gray;
}
.glass {
    position: relative;
    overflow: hidden;
}
.glass::after {
    content: '';
    width: 150px;
    height: 220px;
    background-color: aliceblue;
    position: absolute;
    top: -100%;
    left: -30%;
    animation: rotates 3s linear infinite;
    border-radius: 65% 80% 80% 70%;
}
@keyframes rotates {
    0%{
        transform: rotate(50deg);
    }
    50%{
        transform: rotate(180deg);
    }
    100%{
        transform: rotate(360deg);
    }
} */
</style>