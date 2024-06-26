import Mock from 'mockjs';
import homeApi from './mockServeData/home';
import userApi from './mockServeData/user';
import permission from './mockServeData/permission';

Mock.mock('/api/home/getData', homeApi.getStatisticalData)

// 用户列表的数据
Mock.mock('/api/user/add','post', userApi.createUser);
Mock.mock('/api/user/edit','post', userApi.updateUser);
Mock.mock('/api/user/del','post', userApi.deleteUser);
Mock.mock(/api\/user\/getUser/, userApi.getUserList);

Mock.mock(/api\/permission\/getMenu/, 'post',permission.getMenu);