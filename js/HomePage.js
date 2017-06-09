/**
 * Created by pc on 2017/6/1.
 */
Vue.prototype.$echarts = echarts;

var vm = new Vue({
    el:'#container',
    data:{
        items:[
        ],
        charts:{}
    },
    methods:{
        getSingle:function (code) {
            window.location.href = "../pages/SingleStock.html?code=" + code;
        }
    },
    mounted(){
        const self=this;

        var mychart = this.$echarts.init(document.getElementById('bar-chart'));
        mychart.showLoading({
            text:'数据加载中'
        });


        this.$http.get("http://localhost:8080/homepage/allstock/"+"2016-05-17").then(function (response) {
            self.items=response.data.data;
            setTimeout(function () {
                $('#example1').DataTable();
            },0);
        }).catch(function (error) {
            alert("出现了未知的错误！")
        });


        this.$http.get("http://localhost:8080/homepage/market/"+"2016-06-16").then(function (response) {
            self.charts=response.data.data;

            const request = new XMLHttpRequest();
            request.open('GET', "http://localhost:8080/market/"+"2016-06-16", true);
// request.setRequestHeader('Content-Type', 'application/json');
            request.onload = function () {
                if(this.status == 200 || this.status == 304) {

                }
            }
            request.send();
            mychart.title = '';
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line','bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data:['数量']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['成交量','涨停数','跌停数','涨幅超5%','跌幅超5%','开减收>5%*昨日数','开减收<5%*昨日数'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '数量',
                        min: 0,
                        max: 100,
                        interval: 50,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },

                ],
                series: [
                    {
                        name:'数量',
                        type:'bar',
                        data:[self.charts.volume, self.charts.amountOfLimitUp, self.charts.amountOfLimitDown, self.charts.amountOf5PercentUp, self.charts.amountOf5PercentDown, self.charts.amountOf5PercentUptolastClose, self.charts.amountOf5PercentDowntolastClose]
                    }
                    // {
                    //     name:'数量',
                    //     type:'line',
                    //     data:[self.charts.volume, self.charts.amountOfLimitUp, self.charts.amountOfLimitDown, self.charts.amountOf5PercentUp, self.charts.amountOf5PercentDown, self.charts.amountOf5PercentUptolastClose, self.charts.amountOf5PercentDowntolastClose]
                    // }
                ]
            };
            mychart.hideLoading();
            mychart.setOption(option);
        }).catch(function (error) {
            alert("发生了未知的错误！");
        });


        // $(function () {
        //         "use strict";
        //         var bar = new Morris.Bar({
        //             element: 'bar-chart',
        //             resize: true,
        //             data: [
        //                 {y: '成交量', a:self.charts.volume},
        //                 {y: '涨停数', a:self.charts.amountOfLimitUp},
        //                 {y: '跌停数', a: self.charts.amountOfLimitDown},
        //                 {y: '涨幅超5%', a: self.charts.amountOf5PercentUp},
        //                 {y: '跌幅超5%', a: self.charts.amountOf5PercentDown},
        //                 {y: '开减收>5%*', a: self.charts.amountOf5PercentUptolastClose},
        //                 {y: '开减收<5%*昨收数', a: self.charts.amountOf5PercentDowntolastClose}
        //             ],
        //             barColors: ['#f56954'],
        //             xkey: 'y',
        //             ykeys: ['a'],
        //             labels: ['数量'],
        //             hideHover: 'auto'
        //         });
        //     }
        // );

    }
});

