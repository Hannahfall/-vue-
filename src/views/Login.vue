<template>
    <el-form ref="form" label-width="70px" :inline="true" class="login-container" :model="form" :rules="rules">
        <h3 class="login-title">系统登录</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Mock from 'mockjs';
import Cookie from 'js-cookie';
import {getMenu} from '../api/index'
export default {
    name: 'Login',
    data(){
        return{
            form:{
                username:'',
                password:''
            },
             rules:{
                username: [
                    {required: true, trigger: 'blur', message:'请输入用户名'}
                ],
                password:[
                    {required: true, trigger: 'blur', message:'请输入密码'}
                ]
            }
        }
    },
    methods:{
        submit(){
            // const token = Mock.Random.guid();
            // Cookie.set('token', token);
            this.$refs.form.validate((valid) => { 
                if(valid){
                    getMenu(this.form).then(({data}) => { 
                        console.log(data);
                        if(data.code === 20000){
                            Cookie.set('token', data.data.token);
                            // 获取菜单数据，并存入store
                            this.$store.commit('setMenu', data.data.menu);
                            this.$store.commit('setRouter', this.$router)
                            this.$router.push('/home');
                        }else{
                            this.$message.error(data.data.message)
                        }
                    })
                }
            })
            
        }
    }
}
</script>

<style lang="less" scoped>
.login-container{
    width: 350px;
    margin: 180px auto;
    border:1px solid #eaeaea;
    padding: 35px;
    padding-left: 15px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    .el-input{
        width: 200px;
    }
    .login-title{
        text-align: center;
        margin-bottom: 40px;
    }
    .el-button{
        margin-left:105px;
    }
}
</style>