<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(leftItem, index) in catelist" :key="leftItem.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{leftItem.title}}</span>
                                        <p>
                                            <span v-for="(leftSecondItem, index) in leftItem.subcates" :key="leftSecondItem.id">
                                                {{leftSecondItem.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{leftItem.title}}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html" v-for="(slideSecondList, index) in leftItem.subcates" :key="slideSecondList.id">{{slideSecondList.title}}</a>
                                                <!-- <a href="/goods/43.html">摄影摄像</a>
                                                <a href="/goods/43.html">存储设备</a> -->
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                     
                        <el-carousel :interval="5000" arrow="always">
                            <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                <img :src="item.img_url"></img>
                            </el-carousel-item>
                        </el-carousel>

                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(rightItem, index) in toplist" :key="index">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="rightItem.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{rightItem.title}}</a>
                                    <span>{{rightItem.add_time|filterDate }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>


        <!-- 商品首页按照分类分组获取数据 -->
        <div class="section" v-for="(item, index) in shopListMain" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="(itemSon, index) in item.level2catelist" :key="itemSon.subcateid">{{itemSon.subcatetitle}}</a>
                    <!-- <a href="/goods/43.html">摄影摄像</a> -->
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(itemSon, index) in item.datas" :key="itemSon.artID">
                            <!-- <a href="#/site/goodsinfo/87" class=""> -->
                            <router-link :to="'/goodsInfo/'+itemSon.artID">
                                <div class="img-box">
                                    <img v-lazy="itemSon.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{itemSon.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemSon.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{itemSon.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemSon.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                            <!-- </a> -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from "axios";
    import moment from "moment";

    export default {
        //设置名字
        name: "index",
        data: function () {
            return {
                catelist: [],
                sliderlist: [],
                toplist: [],
                //商品首页按照分类分组获取数据
                shopListMain: []
            };
        },

        beforeCreate() {},
        created() {
            //左侧列表目录渲染
            axios
                .get("http://47.106.148.205:8899/site/goods/gettopdata/goods")
                .then(response => {
                    // console.log(response);
                    this.catelist = response.data.message.catelist;
                    this.sliderlist = response.data.message.sliderlist;
                    this.toplist = response.data.message.toplist;
                    console.log(response.data.message.sliderlist);
                });
            //  右侧列表渲染
            //品首页按照分类分组获取数据
            axios
                .get("http://47.106.148.205:8899/site/goods/getgoodsgroup")
                .then(response => {
                    console.log(response.data.message);
                    this.shopListMain = response.data.message;
                });
        },
        //   filters: {
        //     filterDate(val) {
        //       return moment(val).format("YYYY年MM月DD日");
        //     }
        //   }
    };
</script>

<style>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }

    .el-carousel {
        height: 341px !important;
    }

    .el-carousel__container {
        height: 341px !important;
    }

    .el-carousel__item {
        width: 100% !important;
        height: 100% !important;
    }

    .el-carousel__item img {
        width: 100% !important;
        height: 100% !important;
    }

    body {
        box-sizing: border-box;
    }
</style>