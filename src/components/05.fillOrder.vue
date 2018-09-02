<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <el-form :model="orderForm" status-icon :rules="rules" ref="ruleForm2" label-width="100px"
                            class="demo-ruleForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <div class="form-box address-info">
                                    <el-form-item label="收货人姓名" prop="accept_name">
                                        <el-input v-model="orderForm.accept_name" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区" prop="">
                                        <v-distpicker province="广东省" city="广州市" area="海珠区"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址" prop="address">
                                        <el-input v-model="orderForm.address" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="mobile">
                                        <el-input v-model="orderForm.mobile" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系电话">
                                        <el-input v-model="orderForm.phone" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱" prop="email">
                                        <el-input v-model="orderForm.email" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码" prop="post_code">
                                        <el-input v-model="orderForm.post_code" style="width:500px"></el-input>
                                    </el-form-item>
                                </div>




                                <!-- 支付方式 -->
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio v-model="orderForm.payment_id" label="6">在线支付</el-radio><em>手续费：0.00元</em>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio @change="changePrice(50)" v-model="orderForm.express_id" label="1">顺丰快递</el-radio><em>费用：50元</em>
                                        &nbsp;
                                        &nbsp;
                                        <el-radio @change="changePrice(30)" v-model="orderForm.express_id" label="2">圆通快递</el-radio><em>费用：30元</em>
                                        &nbsp;
                                        &nbsp;
                                        <el-radio @change="changePrice(10)" v-model="orderForm.express_id" label="3">韵达快递</el-radio><em>费用：10元</em>

                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item, index) in message" :key="item.id">
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.totalamount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <el-form-item label="订单备注(100字符以内)" prop="post_code" style="width:100px">
                                                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="orderForm.message"
                                                    style="width:500px"></el-input>
                                            </el-form-item>
                                            <!-- <dt>订单备注(100字符以内)</dt>
                                            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="orderForm.message">
                                            </el-input> -->
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp;
                                            商品金额：￥
                                            <label id="goodsAmount" class="price">{{orderForm.goodsAmount}}</label>
                                            元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{orderForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{orderForm.goodsAmount+orderForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <router-link to="/index">返回购物车</router-link>
                                            <a id="btnSubmit" class="btn submit" @click="sureOrder">确认提交</a>
                                            
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>
<script>
    import axios from "axios";
    //导入省市联动组件
    import VDistpicker from 'v-distpicker'


    export default {
        components: {
            VDistpicker
        },
        name: "order",
        data: function () {

            //判断手机号
            var checkMobile = (rule, value, callback) => {
                setTimeout(() => {
                    // 定义正则规则
                    let exec =
                        /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                    if (exec.test(value) == true) {
                        callback();
                    } else {
                        callback(new Error("你的手机号不对"));
                    }
                }, 500)
            };
            // 邮箱
            var checkEmail = (rule, value, callback) => {
                // 如果value 不为空 格式验证
                // console.log(value);
                if (value.trim().length != 0) {
                    // 验证
                    // 邮箱的正则
                    let exec = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                    if (exec.test(value.trim()) == true) {
                        callback();
                    } else {
                        callback(new Error("请输入正确邮箱"));
                    }
                } else {
                    callback();
                }
            };
            // 邮编
            var checkPostCode = (rule, value, callback) => {
                if (value.trim().length != 0) {
                    // 验证
                    // 邮箱的正则
                    let exec = /^[1-9]\d{5}(?!\d)$/;
                    if (exec.test(value.trim()) == true) {
                        callback();
                    } else {
                        callback(new Error("请输入正确邮编"));
                    }
                } else {
                    callback();
                }
            };

            return {
                orderForm: {
                    goodsAmount: 0, //总商品金额
                    expressMoment: 50,
                    accept_name: "Moshi Moshi", // 收货人姓名,
                    //省市联动
                    area: {
                        "province": {
                            code: '440000',
                            value: '广东省'
                        },
                        "city": {
                            code: "440300",
                            value: "深圳市"
                        },
                        "area": {
                            code: "440306",
                            value: "宝安区"
                        }
                    },
                    address: "深圳经济100大厦", // 详细地址
                    mobile: '13086889955', // 手机号
                    phone: "8283738783", // 联系电话
                    email: "1234455@qq.com", // 邮箱
                    post_code: "100888", // 邮编

                    //在线支付
                    payment_id: "6",
                    //快递选择
                    express_id: "1",
                    //订单备注
                    message: "快递费好贵呀",
                    goodsids: "",
                    cargoodsobj: {},
                    // phone: "1008611" // 联系电话
                },
                //商品列表数据
                message: [],

                rules: {
                    //   需要跟字段相对应
                    accept_name: [
                        // required 是否必须  message 提示消息 trigger 触发的方式
                        {
                            required: true,
                            message: "请输入收货人姓名",
                            trigger: "blur"
                        },
                        // min 最短 max 最长 少数民族
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1 到 20 个字符",
                            trigger: "change"
                        }
                    ],
                    // 地址的验证规则
                    address: [{
                        required: true,
                        message: "请输入地址,没有我送给谁呀",
                        trigger: "blur"
                    }],
                    // 手机号验证
                    mobile: [{
                        validator: checkMobile,
                        trigger: "blur"
                    }],
                    // 邮箱验证
                    email: [{
                        validator: checkEmail,
                        trigger: "blur"
                    }],
                    // 邮编验证
                    post_code: [{
                        validator: checkPostCode,
                        trigger: "blur"
                    }]
                }
            };
        },

        //计算属性
        computed: {
           
            //计算商品总数量
            totalCount() {
                let totalCount = 0;
                this.message.forEach(v => {
                    totalCount += v.buycount;
                });
                return totalCount;
            }

        },
        methods: {

            //省市联动修改省市区会触发下面的方法
            selected(value) {
                this.orderForm.area = value;
            },
            //修改快递选项会触发,并且接收传递过来的值
            changePrice(price) {
                this.orderForm.expressMoment = price
            },
            //提交订单,清空购物车
            sureOrder() {
                // console.log(888888888)
                axios.post(`http://47.106.148.205:8899/site/validate/order/setorder`, this.orderForm)
                    .then(response => {
                        console.log(response);
                        let orderid=response.data.message.orderid;
                        this.$router.push('/payOrder/'+orderid);
                        //删除购物车记录
                        this.message.forEach(v=>{
                            this.$store.commit('deleteGoods',v.id);
                        })
                    })
            }

        },




        // 生命周期函数中判断是否登陆
        //   因为只是登陆判断 不需要让用户看到页面 直接在beforeCreate中即可
        beforeCreate() {
            axios.get('http://47.106.148.205:8899/site/account/islogin').then(response => {
                // console.log(response);
                //   如果没有登陆 打回 登录页
                if (response.data.code == 'nologin') {
                    // 编程式导航
                    this.$router.push('/login');
                }
            })
        },
        created() {
             // 保存goodsids
            this.orderForm.goodsids = this.$route.params.ids;
            //渲染商品列表数据
            axios.get(`http://47.106.148.205:8899/site/validate/order/getgoodslist/${this.$route.params.ids}`)
                .then(response => {
                    ////总商品总价
                    console.log(response);
                    let goodsAmount = 0;
                    let cargoodsobj = {};
                    response.data.message.forEach(v => {
                        //v.id数字,为store存储数量前面的属性
                        v.buycount = this.$store.state.cartDate[v.id]
                        //计算单件商品总价
                        v.totalamount = v.buycount * v.sell_price;
                        //计算总商品总价
                        goodsAmount += v.totalamount;

                        cargoodsobj[v.id] = v.buycount;

                    })
                    this.message = response.data.message;
                    this.orderForm.goodsAmount = goodsAmount;

                    this.orderForm.cargoodsobj = cargoodsobj;
                    // console.log(response)
                    // console.log(this.message)
                })
        },
    };
</script>
<style>
</style>