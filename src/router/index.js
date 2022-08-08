import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  //主页
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home/index"),
        meta: { title: "帝可得", icon: "zhuye" },
      },
    ],
  },
  // 工单管理
  {
    path: "/task",
    component: Layout,
    redirect: "/task/table",
    name: "Example",
    meta: { title: "工单管理", icon: "gongdan" },
    children: [
      {
        path: "business",
        name: "Business",
        component: () => import("@/views/task/components/business"),
        meta: { title: "运营工单" },
      },
      {
        path: "operation",
        name: "Operation",
        component: () => import("@/views/task/components/operation"),
        meta: { title: "运维工单" },
      },
    ],
  },
  // 定位管理
  {
    path: "/node",
    component: Layout,
    redirect: "/node/region",
    name: "Node",
    meta: {
      title: "点位管理",
      icon: "weizhi",
    },
    children: [
      {
        path: "region",
        component: () => import("@/views/node/components/region"), // Parent router-view
        name: "Region",
        meta: { title: "区域管理" },
      },
      {
        path: "node",
        component: () => import("@/views/node/components/node"),
        name: "SonNode",
        meta: { title: "点位管理" },
      },
      {
        path: "partner",
        component: () => import("@/views/node/components/partner"),
        name: "Partner",
        meta: { title: "合作商管理" },
      },
    ],
  },
  // 设备管理
  {
    path: "/vm",
    component: Layout,
    redirect: "/vm/index",
    name: "Vm",
    meta: {
      title: "设备管理",
      icon: "shebei",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/vm/components/index"), // Parent router-view
        name: "Index",
        meta: { title: "设备管理" },
      },
      {
        path: "status",
        component: () => import("@/views/vm/components/status"),
        name: "Status",
        meta: { title: "设备状态" },
      },
      {
        path: "type",
        component: () => import("@/views/vm/components/type"),
        name: "Type",
        meta: { title: "设备类型管理" },
      },
    ],
  },
  // 人员管理
  {
    path: "/user",
    component: Layout,
    redirect: "/user/user-list/index",
    name: "User",
    meta: {
      title: "人员管理",
      icon: "renyuan",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/user/user-list/index"), // Parent router-view
        name: "userIndex",
        meta: { title: "人员列表" },
      },
      {
        path: "user-task-stats",
        component: () => import("@/views/user/user-task-stats"),
        name: "User-task-stats",
        meta: { title: "人效统计" },
      },
      {
        path: "user-work",
        component: () => import("@/views/user/user-work"),
        name: "User-work",
        meta: { title: "工作量列表" },
      },
    ],
  },
  // 商品管理
  {
    path: "/sku",
    component: Layout,
    redirect: "/sku/index",
    name: "Sku",
    meta: {
      title: "商品管理",
      icon: "shangpin",
    },
    children: [
      {
        path: "sku-class",
        component: () => import("@/views/sku/components/sku-class"), // Parent router-view
        name: "Sku-class",
        meta: { title: "商品类型" },
      },
      {
        path: "sku",
        component: () => import("@/views/sku/components/sku"),
        name: "Sonsku",
        meta: { title: "商品管理" },
      },
    ],
  },
  //策略管理
  {
    path: "/policy",
    component: Layout,
    redirect: "/policy/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/policy"), // Parent router-view
        name: "policyIndex",
        meta: {
          title: "策略管理",
          icon: "dengpao",
        },
      },
    ],
  },
  //订单管理
  {
    path: "/order",
    component: Layout,
    redirect: "/order/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/order"), // Parent router-view
        name: "OrderIndex",
        meta: {
          title: "订单管理",
          icon: "dingdan",
        },
      },
    ],
  },
  //对账统计
  {
    path: "/report",
    component: Layout,
    redirect: "/report/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/report"), // Parent router-view
        name: "reportIndex",
        meta: {
          title: "对账统计",
          icon: "zhangdan",
        },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
