<template>
    <div class="tabs">
        <el-tag
            v-for="(item, index) in tags"
            size="small"
            :key="item.path"
            :closable="item.name !== 'home'"
            :effect="item.name === $route.name ? 'dark':'plain'"
            @click="changeMenu(item)"
            @close="handleClose(item, index)"
        >
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    name: 'CommonTag',
    data(){
        return{

        }
    },
    computed:{
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    methods:{
        changeMenu(item){
            this.$router.push({name: item.name})
        },
        handleClose(item, index){
                       this.$store.commit('deleteTag', item);
            if(item.name !== this.$route.name )return;
            if(index === this.tags.length){
                // console.log("deletee", index, this.tags);
                this.$router.push({name: this.tags[index-1].name})
            }else{
                this.$router.push({name: this.tags[index].name})
            }
        }
    }
}
</script>
<style lang="less" scoped>
.tabs{
    padding: 20px;
    padding-bottom: 0;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>

