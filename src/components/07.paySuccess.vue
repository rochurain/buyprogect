<template>
    <div class="center">
            <div class="el-row">
                <div class="el-col el-col-24">
                    <div class="comp">
                        <div class="goodsinfo routeanimate">
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
                                        <div class="msg-tips">
                                            <div class="icon">
                                                <i class="iconfont icon-check"></i>
                                            </div>
                                            <div class="info">
                                                <strong>订单已支付成功！</strong><span><span style='color:yellowgreen;font-size:30px'>{{time}}</span>秒后去订单详情页</span>
                                                <p>您可以点击这里进入
                                                    <router-link to="/vipCenter/">会员中心</router-link>查看订单状态！</p>
                                                <p>如有其它问题，请立即与我们客服人员联系。</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
export default {
    name:"PaySuccess",
    data:function(){
        return{
            time:5
        }
    },
    // 创建之前 
    beforeCreate() {
        
    },
    //页面渲染出来后
    mounted(){
        let interid=setInterval(()=>{
            this.time--;
            if(this.time==0){
                clearInterval(interid);
                // this.$router.push('/vipCenter')
                this.$router.push('/orderDetail/'+this.$route.params.id)
            }
        },1000)
    }

}
</script>
