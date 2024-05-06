<template>
    <el-row>
    <el-col :span="8" style="padding-right: 10px">
        <el-card class="box-card">
            <div class="user">
                <img src="../assets/images/user.png" alt="">
                <div class="userinfo">
                    <p class="name">admin</p>
                    <p class="access">超级管理员</p>
                </div>
            </div>
            <div class="login-info">
                <p>上次登录时间：<span>2022-2-22</span></p>
                <p>上次登录地点：<span>武汉</span></p>
            </div>
        </el-card>
        <el-card style="margin-top:20px; height: 460px">
            <el-table
                :data="tableData"
                style="width: 100%">
                <!-- <el-table-column
                    prop="name"
                    label="课程"
                   >
                </el-table-column>
                <el-table-column
                    prop="todayBuy"
                    label="今日购买"
                   >
                </el-table-column>
                <el-table-column
                    prop="monthBuy"
                    label="本月购买">
                </el-table-column>
                <el-table-column
                    prop="totalBuy"
                    label="总购买">
                </el-table-column> -->
                <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val"></el-table-column>
            </el-table>
        </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
        <div class="num">
            <el-card v-for="item in countData" :key="item.name" :body-style="{display: 'flex', padding: 0}">
                <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
                <div class="detail">
                    <p class="price">￥{{item.value}}</p>
                    <p class="desc">{{item.name}}</p>
                </div>
            </el-card>
        </div>
        <el-card style="height: 280px">
            <!-- 折线图 -->
            <div ref="echarts1" style="height: 280px"></div>
        </el-card>
        <div class="graph">
            <el-card style="height: 260px">
                <div ref="echarts2" style="height: 260px"></div>
            </el-card>
            <el-card style="height: 260px">
                <div ref="echarts3" style="height: 240px"></div>
            </el-card>
        </div>
    </el-col>
    </el-row>      
</template>

<script>
import {getData} from '../api'
import * as echarts from 'echarts'

export default {
    name: 'Home',
    data(){
        return {
            tableData: [],
            tableLabel:{
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: "本月购买",
                totalBuy: "总购买"
            },
            countData: [
                {
                name: "今日支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
                },
                {
                name: "今日收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
                },
                {
                name: "今日未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
                },
                {
                name: "本月支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
                },
                {
                name: "本月收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
                },
                {
                name: "本月未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
                },
            ],
        }
    },
    mounted(){
        getData().then(({data}) => { 
            const {tableData} = data.data;
            this.tableData = tableData;        
            // 折线图
            // 基于准备好的dom，初始化echarts实例
            const echarts1 = echarts.init(this.$refs.echarts1);
            // 指定图表的配置项和数据
            const echarts1Options = {};
            //处理数据xAxis
            const {orderData, userData, videoData} = data.data;
            //console.log(videoData);
            const xAxisData = Object.keys(orderData.data[0]);
            echarts1Options.xAxis = {data: xAxisData};
            echarts1Options.yAxis = {};
            echarts1Options.legend = {data: xAxisData};
            echarts1Options.series = [];
            xAxisData.forEach(key => {
                echarts1Options.series.push({
                    name: key,
                    data: orderData.data.map(i => i[key]),
                    type: 'line'
                })
            })
            // 显示图表
            echarts1.setOption(echarts1Options)

            // 柱状图
            const echarts2 = echarts.init(this.$refs.echarts2);
            const echarts2Options = {
                legend: {
                // 图例文字颜色
                textStyle: {
                    color: "#333",
                },
                },
                grid: {
                left: "20%",
                },
                // 提示框
                tooltip: {
                trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: userData.map(item => item.date),
                    axisLine: {
                        lineStyle: {
                        color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333",
                    },
                },
                yAxis: [
                {
                    type: "value",
                    axisLine: {
                    lineStyle: {
                        color: "#17b3a3",
                    },
                    },
                },
                ],
                color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
                series: [
                    {
                        name: '新增用户',
                        data: userData.map(i => i.new),
                        type: 'bar'
                    },
                    {
                        name: '活跃用户',
                        data: userData.map(i => i.active),
                        type: 'bar'
                    },
                ],
            };
            echarts2.setOption(echarts2Options);

            // 饼状图
            const echarts3 = echarts.init(this.$refs.echarts3);
            const echarts3Options = {
                 tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [
                    {
                        data: videoData,
                        type: 'pie'
                    }
                ]
            };
            echarts3.setOption(echarts3Options)
        })
    }
}
</script>
<style lang="less" scoped>
.user{
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
    .userinfo{
        .name{
            font-size: 32px;
            margin-bottom: 10px;
        }
        .access{
            color: #999999;
        }
    }
}
.login-info{
    p{
        line-height: 28px;
        font-size: 14px;
        color: #999999;
        span{
            color: #666666;
            padding-left: 60px;
        }
    }
}
.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .icon{
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }
    .detail{
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .price{
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }
        .desc{
            font-size: 14px;
            color: #999;
            text-align: center;
        }
    }
    .el-card{
        width: 32%;
        margin-bottom: 20px;
    }
}
.graph{ 
    margin-top: 20px;
    display: flex ;
    justify-content: space-between;
    .el-card{
        width: 48%;       
    }
}
</style>