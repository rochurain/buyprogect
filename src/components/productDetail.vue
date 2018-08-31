<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <!-- 放大镜填充图片数据 -->
                                <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images" :base-zoomer-options="zoomerOptions">
                                </ProductZoomer>
                            </div>
                            <div class="goods-spec">

                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount" @change="buyCountChange" :min="0" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addToCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="showDisscuss=false" :class="{selected:!showDisscuss}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="showDisscuss=true" :class="{selected:showDisscuss}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" v-show="showDisscuss==false" v-html="goodsinfo.content">

                            </div>
                            <div class="tab-content" v-show="showDisscuss==true">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="commentInfo" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="submitComment" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="comments.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:58:59</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page :total="totalCount" show-sizer show-elevator placement="top" :page-size-opts="[5, 10, 15, 20,40]" @on-change="pageChange"
                                            @on-page-size-change="pageSizeChange" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">

                                            <router-link :to="'/goodsInfo/' +item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- <a href="#/site/goodsinfo/90" class="">
                                                <img :src="item.img_url">
                                            </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsInfo/' +item.id">
                                                {{item.title}}
                                            </router-link>
                                            <span>{{item.add_time|filterDate}}</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 回到顶部 -->
        <BackTop></BackTop>
        <!-- 购物车图片动画 -->
        <img id="imgmove" :src="imageMoveUrl" alt="">

    </div>
</template>
<script>
    import axios from "axios";
    import moment from "moment";
    import $ from "jquery";

    export default {
        //设置名字
        name: "productDetail",
        data: function () {
            return {
                hotgoodslist: [],
                goodsinfo: {},
                buyCount: 0,
                productId: undefined,

                //评论和商品详情切换显示
                showDisscuss: false,

                //放大镜设置

                zoomerOptions: {
                    zoomFactor: 2,
                    pane: "container-round",
                    hoverDelay: 300,
                    namespace: "container-zoomer",
                    move_by_click: true,
                    scroll_items: 4,
                    choosed_thumb_border_color: "#ff3d00"
                },
                //放大镜数据设置
                images: {
                    normal_size: []
                },
                // 分页设置
                // 页码
                pageNum: 1,
                // 页容量
                pageSize: 10,
                //评论数
                comments: [],
                // 总评论条数
                totalCount: 0,

                //文本域的输入内容
                commentInfo: "",

                //点击购买图片假如购物车动画
                imageMoveUrl:"",

            };
        },
        methods: {
            buyCountChange(value) {
                //   console.log(value);
                //   console.log("改变啦");
            },
            //当右侧列表的数据改变的时候,重新渲染页面
            getProductDetail() {
                this.productId = this.$route.params.id;
                axios
                    .get(
                        `http://47.106.148.205:8899/site/goods/getgoodsinfo/${
                            this.productId
                            }`
                    )
                    .then(response => {
                        console.log(response);
                        this.hotgoodslist = response.data.message.hotgoodslist;
                        this.goodsinfo = response.data.message.goodsinfo;
                        this.imglist = response.data.message.imglist;
                        this.imageMoveUrl=response.data.message.imglist[0].original_path;

                        //处理放大镜数据
                        let temArr = [];
                        this.imglist.forEach((v, i) => {
                            temArr.push({
                                id: v.id,
                                url: v.original_path
                            });
                        });
                        this.images.normal_size = temArr;

                    });
            },
            //获取评论的方法
            getComments() {
                axios.get(
                    `http://47.106.148.205:8899/site/comment/getbypage/goods/${
                    this.productId
                }?pageIndex=${this.pageNum}&pageSize=${this.pageSize}`
                ).then(response => {
                    console.log(response);
                    this.comments = response.data.message;
                    this.totalCount = response.data.totalcount;
                });
            },
            //页码改变获取页码和页容量
            pageChange(page) {
                // console.log(this.pageSize);
                this.pageNum = page;
                this.getComments();
            },
            pageSizeChange(pageSize) {
                // console.log(pageSize)
                this.pageSize = pageSize;
                if (this.pageNum == 1) {
                    this.getComments();
                }
            },

            //发表评论,点击提交
            submitComment() {
                if (this.commentInfo == "") {
                    //输入为空的话,弹框提示
                    this.$Message.error('请输入内容');
                    return;
                };
                //调用评论接口
                axios.post(
                    `http://47.106.148.205:8899/site/validate/comment/post/goods/${
                    this.productId
                }`, {
                        "commenttxt": this.commentInfo,
                    }).then(response => {
                    // console.log(response);
                    this.$Message.success(response.data.message);
                    this.getComments();
                    this.commentInfo="";
                })
            },
            //点击加入购物车动画
            addToCart(){
                let cartLastOffset=$("#buyButton .add").offset();
                let targetOffset=$('.iconfont').offset();
                $("#imgmove").show().css(cartLastOffset).animate(targetOffset,function(){
                    $(this).hide();
                });
                
                 this.$store.commit('addGoods',{
                     goodId:this.productId,
                     goodNum:this.buyCount,
                 });  
                 console.log(this.buyCount)      
            }
        },
        created() {
            //左侧列表目录渲染
            this.getProductDetail();
            //获取评论
            this.getComments()
        },

        //观察数据的改变
        watch: {
            $route(val, oldVal) {
                // console.log(val, oldVal);
                console.log(val);
                this.images.normal_size = [];
                // // 重新渲染
                this.getProductDetail();
                this.getComments();
            }
        }

    };
</script>
<style lang="less">
    .top {
        padding: 10px;
        background: rgba(0, 153, 229, 0.7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }

    .tab-content img {
        display: block;
        width: 100%;
        height: 100%;
    }

    .tab-content p {
        font-size: 16px;
    }

    /* 放大镜相关样式 */

    .pic-box {
        width: 395px;
    }


    /* 放大镜相关样式 */

    .pic-box {
        width: 395px;
        .control-box .thumb-list {
            display: flex;
            justify-content: center;
            img {
                width: 80px;
                height: 80px;
                margin: 2px;
            }
        }
        .control {
            //   text-align:center;
            display: flex; // 主轴
            justify-content: center; // 纵轴 副轴 侧轴
            align-items: center;
        }
    }

    .drift-zoom-pane {
        width: 300px !important;
        height: 300px !important;
        border-radius: 50% !important;
    }

    /* 返回顶部效果 */
    // 图片加入购物车图片动画
    #imgmove{
        position: absolute;
        width: 50px;

    }
</style>