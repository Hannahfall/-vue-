<template>
    <div class="manage">
        <el-dialog
            title="{}"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
        >
            <!-- 用户的表单信息 -->
            <el-form :inline='true' :rules="rules" ref="form" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                 <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择性别">
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                       <el-date-picker
                        v-model="form.birth"
                        type="date"
                        placeholder="请选择出生日期"
                         value-format='yyyy-MM-DD'
                        >
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="地址"  prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>    
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button size="middle" type='primary' @click="handleAdd">+ 新增</el-button>
           <!-- form搜索区域 -->
           <el-form inline :model="userform">
                 <el-form-item  prop="name">
                    <el-input placeholder="请输入姓名" v-model="userform.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查 询</el-button>
                </el-form-item>
           </el-form>
        </div>
        <div class="common-table">
            <el-table
                height="90%"
                stripe
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="姓名"
                >
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="性别"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.sex == 1 ? '男':'女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄">
                </el-table-column>
                <el-table-column
                    prop="birth"
                    label="出生日期"                   
                >
                </el-table-column>
                <el-table-column
                    prop="addr"
                    label="地址">
                </el-table-column>
                <el-table-column
                    prop="addr"
                    label="地址">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button> 
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button> 
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagenation">
                <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="handlePage"
                >
                </el-pagination>
        </div>  
        </div>   
    </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from '@/api';

export default {
    name: 'User',
    data() {
        return {
            dialogVisible: false,
            form:{
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: '' 
            },
            userform:{
                name:''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                age: [
                    { required: true, message: '请输入年龄', trigger: 'blur' },
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur' },
                ],
                birth: [
                    { required: true, message: '请选择出生日期', trigger: 'blur' },
                ],
                addr: [
                    { required: true, message: '请输入地址', trigger: 'blur' },
                ],
            },
            tableData: [],
            modalType: 0, // 0新增，1编辑
            total: 0, //当前的总条数
            pageData:{
                page:1,
                limit: 10
            },
        };
    },
    methods:{
        getList(){
            getUser({params: {...this.userform, ...this.pageData}}).then(({data}) => { 
            this.tableData = data.list;
            this.total = data.count || 0;
        })
        },
        onSubmit(){            
            this.$refs.form.validate((valid) => {  
                if(valid){                    
                    if(this.modalType === 0){
                        addUser(this.form).then(() => { 
                            this.getList();
                        })
                    }else{
                        editUser(this.form).then(() => { 
                            this.getList();
                        })
                    };
                    this.handleClose();
                }
            })
        },
        onSearch(){
            this.getList();
        },
        handleClose(){
            this.$refs.form.resetFields();
            this.dialogVisible = false
        },
        handleAdd(){
            this.modalType = 0;
            this.dialogVisible = true
        },
        handleEdit(item){
            this.modalType = 1;
            this.dialogVisible = true;
            // 不能直接赋值
            this.form = JSON.parse(JSON.stringify(item))
        },
        handleDelete(item){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                delUser({id: item.id}).then(() => { 
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getList();
                })                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        handlePage(val){
            console.log("page",val);
            this.pageData.page = val;
            this.getList();
        }
    },
    mounted(){
        this.getList();
    }
}
</script>

<style lang='less' scoped>
.manage{
    height: 90%;
    .manage-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .common-table{
        position: relative;
        height: calc(100% - 62px);
        .pagenation{
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
}
</style>