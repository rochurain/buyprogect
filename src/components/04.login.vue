<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box" style="width:100%">
                            <input v-model="name" id="txtUserName" style="width:100%" name="txtUserName" type="text"
                                placeholder="用户名/手机/邮箱" maxlength="50" value="admin">
                        </div>
                        <div class="input-box" style="width:100%">
                            <input v-model="password" id="txtPassword" style="width:100%" name="txtPassword" type="password"
                                placeholder="输入登录密码" maxlength="16" value="123">
                        </div>
                        <div class="btn-box">

                            <el-button style="width:100%" type="success" @click="login" id="btnSubmit" name="btnSubmit"
                                value="立即登录" tag="input">
                                立即登录
                            </el-button>



                            <!-- <input id="btnSubmit" name="btnSubmit" type="submit" value="立即登录"> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {

        //在开发者工具中看到组件的名字

        name: "login",
        data: function () {
            return {
                name: "",
                password: ""
            };
        },

        methods: {
            login() {
                //登录的加载动画
                const loading = this.$loading({
                    lock: true,
                    text: '正在登录...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.8)'
                });
                // setTimeout(() => {
                //     loading.close();
                // }, 2500);
                //登录请求
                axios
                    .post("http://47.106.148.205:8899/site/account/login", {
                        user_name: this.name,
                        password: this.password
                    })
                    .then(response => {
                        setTimeout(() => {

                            loading.close();
                            if (response.data.status == 0) {
                                this.$store.commit('changeShowStatus', true);
                                this.$router.push(this.$store.state.fromPath)
                            }
                        }, 1500);
                        console.log(response);
                        // loading.close();
                    });
            },

        }
    }
</script>
<style>
</style>