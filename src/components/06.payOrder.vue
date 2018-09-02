<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderInfo.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <div id="container2">
                                    <!-- <qrcode value="https://xkeshi.github.io/vue-qrcode/" :options="{ foreground: '#0275d8' }"></qrcode> -->
                                    <qrcode :value="'http://47.106.148.205:8899/site/validate/pay/alipay/'+$route.params.orderid"
                                        :options="{ foreground: 'blue' ,size: 200,}"></qrcode>
                                    <!-- <qrcode value="`http://47.106.148.205:8899/site/validate/pay/alipay/`+$route.params.orderid" :options="{ size: 200 }""></qrcode> -->
                                </div>
                            </div>
                            <!-- <input type="button" value="跳转到支付页" @click="goPayOrder"> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import VueQrcode from '@xkeshi/vue-qrcode';

    // Vue.component(VueQrcode.name, VueQrcode);
    export default {
        name: "PayOrder",
        data: function () {
            return {
                orderInfo: {}
            }
        },
        components: {
            [VueQrcode.name]: VueQrcode
        },
        methods: {
            goPayOrder() {
                window.open(
                    "http://47.106.148.205:8899/site/validate/pay/alipay/" +
                    this.$route.params.orderid
                );
            }
        },
        created() {
            axios.get(`http://47.106.148.205:8899/site/validate/order/getorder/${this.$route.params.orderid}`)
                .then(response => {
                    // console.log(response)
                    this.orderInfo = response.data.message[0]
                })
            //定时器轮询查询是否支付
            let interId = setInterval(() => {
                axios.get(
                        `http://47.106.148.205:8899/site/validate/order/getorder/${this.$route.params.orderid}`
                    )
                    .then(response => {

                        // this.orderInfo = response.data.message[0]
                        if (response.data.message[0].status == 2) {
                            console.log(8888888888)
                            this.$Message.success('支付成功')
                            setTimeout(() => {
                                this.$router.push("/paySuccess/"+this.$route.params.orderid)
                            }, 500);
                            //跳转到下一页
                            clearInterval(interId);
                        } else {
                            //支付失败
                        }
                    });
            }, 1000)
        },


    }
</script>
<style>

</style>