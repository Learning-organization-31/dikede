import { getWorkPeopleListApi } from "@/api/people"; //人员工作量列表
import {getPeopleListApi,rolePeopleApi,areaPeopleApi,getPeopleInfoApi} from '@/api/people' //列表页面
export default {
    namespaced: true,
    state:{
     workList: {}, //接受后台返回来的数据 渲染列表页面数据
     workCountList:{}, //工作量列表数据
     roleList:{},//状态
     areaList:{},//区域列表
     peopleInfo:{}//人员信息
    },
    mutations:{
        //人员信息列表页
    getWorkPeople(state,payload){
        state.workList = payload    
    },
    //工作量列表渲染数据
    getWorkCountList(state,payload){
        state.workCountList = payload
    },
    //获取状态
    getRoleList(state,payload){
        state.roleList = payload
    },
    //获取区域列表
    getAreaList(state,payload){
        state.areaList = payload
    },
    //获取人员信息
    getpeopleInfoList(state,payload){
        state.peopleInfo = payload
    }
    },
    actions:{
        //人员信息列表获取
       async setWorkPeople(context,payload){
        //发送请求获取后台拿回来的数据 ，人员列表页面
        const res = await getPeopleListApi(payload);
        console.log(res);
        context.commit('getWorkPeople',res)
        },
        //工作量列表数据获取
       async setWorkCountList(context,payload){
            const res = await getWorkPeopleListApi(payload)
            console.log(res);
            context.commit('getWorkCountList',res)
        },
          //获取状态
        async setRoleList(context,payload){
            const res = await rolePeopleApi(payload)
            context.commit('getRoleList',res)
        },
        //获取区域列表
        async setAreaList(context,payload){
            const res = await areaPeopleApi(payload)
            console.log(res)
            context.commit('getAreaList',res)
        },
        //获取人员信息
        async setpeopleInfoList(context,payload){
        try {
        const res = await getPeopleInfoApi(payload);
        console.log(res)
        context.commit('getpeopleInfoList',res)
        }catch(err){
            console.log(err);
        }
        }
    },
    getters:{}
}