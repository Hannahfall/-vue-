<template>
    <el-container>
        <el-aside width="auto">
            <common-aside />
        </el-aside>
        <el-container>
            <el-header>
                <common-header />
            </el-header>
            <common-tag />
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue';
import CommonAside from '@/components/CommonAside.vue';
import CommonTag from '@/components/CommonTag.vue';

export default {
    name: 'Main',
    components:{
        CommonAside,
        CommonHeader,
        CommonTag
    }
}
</script>

<style>
.el-header{
    padding: 0;
}
</style>