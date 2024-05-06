<template>
    <div class="header-container">
        <div class="l-content">
            <el-button @click="handleMenu" icon="el-icon-menu" size="mini" />
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tabs" :key="item.name"  :to="{ path: item.path}">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleClick">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/user.png" />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import Cookie from 'js-cookie';

export default {
    data(){
        return {}
    },
    computed: {
        ...mapState({
            tabs: state => state.tab.tabsList
        })
    },
    // mounted(){
    //     console.log('tabs',this.tabs);
    // },
    methods:{
        handleMenu(){
            this.$store.commit('collapseMenu')
        },
        handleClick(command){
            if( command="logout"){
                console.log("logouttttt");
                Cookie.remove('token');
                Cookie.remove('menu');
                this.$router.push('/login')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.header-container{
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .text{
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }
}
.l-content{
    display: flex;
    align-items: center;
    .el-button{
        margin-right: 20px;
    }
    /deep/ .el-breadcrumb__item{
        .el-breadcrumb__inner{
            font-weight: normal;
            &.is-link{
                color: #666;
            }
        }
        &:last-child{
            .el-breadcrumb__inner{
                color: #fff;
            }
        }
    }

}
.r-content{
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}

</style>