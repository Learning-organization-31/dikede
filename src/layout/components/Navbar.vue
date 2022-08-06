<template>
  <div class="navbar">
    <div class="navbar-login">
      <img src="@/assets/imgs/logo1.png" />
    </div>
    <div class="navbar-user">
      <div class="navbar-userImg">
        <img src="@/assets/imgs/userImg.png" />
      </div>
      <span>欢迎您, {{ userInfoDetailed.loginName }}</span>
      <div class="avatar-container" @click="logout">
        <div class="avatar-wrapper">
          退出
          <i class="el-icon-caret-bottom" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  components: {
    Breadcrumb,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
    ...mapState("user", ["userInfoDetailed"]),
  },
  methods: {
    //退出登录
    logout() {
      this.$store.commit("user/LOGIN", {});
      this.$router.push(`/login`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 60px;
  background: url(~@/assets/imgs/banner.png) no-repeat;
  background-size: cover;
  padding-right: 50px;
  .navbar-login {
    width: 88px;
    height: 36px;
    margin-top: 10px;
    margin-left: 15px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.navbar-user {
  display: flex;
  align-items: center;
  width: 200px;
  .navbar-userImg {
    margin-right: 20px;
  }
  span {
    white-space: nowrap;
    color: #fff;
    font-size: 16px;
    margin-right: 20px;
  }
  .avatar-container {
    margin-right: 20px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    .avatar-wrapper {
      white-space: nowrap;
    }
  }
}
</style>
