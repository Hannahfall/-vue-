import Cookies from "js-cookie";

export default {
    state:{
        isCollapse: false, // 控制菜单的展开/收起
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
        ], // 面包屑数据
        menu:[],
    },
    mutations:{
        // 修改菜单展开/收起
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑
        selectMenu(state, val){
            console.log('val', val);
            if(val.name !== 'home'){
                const index = state.tabsList.findIndex(i => i.name === val.name);
                if(index < 0) {
                    state.tabsList.push(val)
                }
            }
        },
        // 删除Tag
        deleteTag(state, val){
            const index = state.tabsList.findIndex(i => i.name === val.name);
            state.tabsList.splice(index, 1)
        },
        // 设置菜单
        setMenu(state, val){
            state.menu = val;
            Cookies.set('menu', JSON.stringify(val))
        },
        // 动态注册路由!!!!!!!
        setRouter(state, router){
            if(!Cookies.get('menu'))return;
            const menu = JSON.parse(Cookies.get('menu'));
            state.menu = menu;
            const menuArr = [];
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArr.push(...item.children)
                }else{
                    item.component = () => import(`../views/${item.url}`)
                    menuArr.push(item)
                }
            })
            console.log("000000", menuArr);
            menuArr.forEach(item=> {
                router.addRoute('main', item)
            })
        }
    }
}