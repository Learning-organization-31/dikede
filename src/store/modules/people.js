import { getWorkPeopleListApi } from "@/api/people"; //人员工作量列表
import {getPeopleListApi} from '@/api/people' //列表页面
export default {
    namespaced: true,
    state:{
     workList: {}, //接受后台返回来的数据 渲染列表页面数据
     workCountList:{} //工作量列表数据
    },
    mutations:{
        //人员信息列表页
    getWorkPeople(state,payload){
        state.workList = payload    
    },
    //工作量列表渲染数据
    getWorkCountList(state,payload){
        state.workCountList = payload
    }
    },
    actions:{
        //人员信息列表获取
       async setWorkPeople(context,payload){
        //发送请求获取后台拿回来的数据 ，人员列表页面
        const res = await getPeopleListApi(payload);
        context.commit('getWorkPeople',res)
        },
        //工作量列表数据获取
       async setWorkCountList(context,payload){
            const res = await getWorkPeopleListApi(payload)
            console.log(res);
            context.commit('getWorkCountList',res)
        }
    },
    getters:{}
}