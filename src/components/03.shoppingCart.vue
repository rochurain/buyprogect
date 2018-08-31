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
                                <li>
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
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="(item, index) in message" :key="item.id">
                                    <td>

                                        <el-switch v-model="item.selected" active-color="rgb(64, 158, 255)" inactive-color="#ccc">
                                        </el-switch>
                                    </td>
                                    <td>
                                        <img style="width:50px" :src="item.img_url" alt="">
                                    </td>
                                    <td>{{item.title}}</td>
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <el-input-number :min="0" size="small" v-model="item.buycount" @change="numChange($event,item.id)"></el-input-number>
                                    </td>

                                    <td>{{item.sell_price*item.buycount}}</td>
                                    <td>
                                        <el-button @click="delOne(item.id)" type="primary">删除</el-button>
                                    </td>

                                </tr>
                                <tr v-if="message.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/index" tag="button" class="button">
                                继续购物
                            </router-link>


                            <button class="submit" @click="checkAndSubmit">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    export default {
        // 在开发者工具中看到组件的名字
        name: "shoppingCart",
        data: function () {
            return {
                message: [],
            };
        },
        created() {
            let cartDate = this.$store.state.cartDate;
            // console.log(cartDate)
            let ids = "";
            for (var key in cartDate) {
                // console.log(key)
                // console.log(cartDate[key])
                ids += key;
                ids += ",";
            }
            ids = ids.slice(0, -1)
            // console.log(ids)
            axios.get(
                    `http://47.106.148.205:8899/site/comment/getshopcargoods/${ids}`)
                .then(response => {
                    // console.log(response.data.message);
                    response.data.message.forEach(v => {
                        // console.log(v)
                        //将需要处理的商品信息的购买数量存进去,用cateDate里面的数字id存
                        v.buycount = cartDate[v.id];
                        //设置是否被选中
                        v.selected = true;
                    });
                    //数据处理修改后赋值给message
                    this.message = response.data.message;
                    console.log(this.message)

                })
        },
        //计算属性
        computed: {
            //总金额
            totalPrice() {
                let totalPrice = 0;
                this.message.forEach(v => {

                    if (v.selected == true) {
                        totalPrice += v.sell_price * v.buycount;
                    }
                });
                return totalPrice;
            },
            //计算商品总数量
            totalCount() {
                let totalCount = 0;
                this.message.forEach(v => {

                    if (v.selected == true) {
                        totalCount += v.buycount;
                    }
                });
                return totalCount;
            },
        },
        methods: {
            numChange(num, id) {
                // console.log(event)
                console.log(num, id);
                this.$store.commit("updateGoodsNum", {
                    goodId: id,
                    goodNum: num
                });
            },
            delOne(id) {
                this.$store.commit("deleteGoods", id);
                this.message.forEach((v, index) => {
                    if (v.id == id) {
                        this.message.splice(index, 1)
                    }
                })
            },



            //验证登录,跳转登录页
            checkAndSubmit() {

                if (this.totalCount == 0) {
                    this.$message.error('买点东西呗');
                    return
                }

                //直接跳转到order页面,会进入导航守卫进行登录判断
                let ids="";
                this.message.forEach(v=>{
                    if(v.selected==true){
                        ids+=v.id;
                        ids+=","
                    }
                })
                ids=ids.slice(0,-1);
                this.$router.push(`/order/${ids}`);

                

                //判断是否登录
            //    axios.get(`http://47.106.148.205:8899/site/account/islogin`)
            //     .then(response=>{
            //         console.log(response);
            //         if(response.data.code=="nologin"){
            //             this.$router.push('/login')
            //         }else{
            //             this.$router.push('/order')
            //         }
                   
            //     })
                // let ids = "";
                // this.message.forEach(v => {
                //     if (v.selected == true) {
                //         ids += v.id;
                //         ids += ","
                //     }
                // })
                // ids = ids.slice(0, -1);
                // this.$router.push(`/order/${ids}`);
                //判断是否登录
                // axios.get(`http://47.106.148.205:8899/site/account/islogin`)
                // .then(response=>{
                //     console.log(response);
                //     if(response.data.code=="nologin"){
                //         this.$router.push("/login");
                //     }else{
                //         this.$router.push("/order");
                //     }
                // })
            }
        }
    };
</script>
<style>
</style>