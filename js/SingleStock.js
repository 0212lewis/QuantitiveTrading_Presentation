/**
 * Created by pc on 2017/6/1.
 */
/**
 * Created by cyz on 2017/5/16.
 */

function changeTag() {
    var temp=document.getElementById("select").value;
    if(temp == "opt1"){
        document.getElementById("changeColumn").innerHTML="涨幅";
        document.getElementById("涨幅").style.display="";
        document.getElementById("成交量").style.display="none";
        document.getElementById("换手").style.display="none";
        document.getElementById("量比").style.display="none";
        document.getElementById("市盈率").style.display="none";
        document.getElementById("跌幅").style.display="none";
    }
    if(temp == "opt2"){
        document.getElementById("changeColumn").innerHTML="跌幅";
        document.getElementById("涨幅").style.display="none";
        document.getElementById("成交量").style.display="none";
        document.getElementById("换手").style.display="none";
        document.getElementById("量比").style.display="none";
        document.getElementById("市盈率").style.display="none";
        document.getElementById("跌幅").style.display="";
    }
    if(temp=="opt3"){
        document.getElementById("changeColumn").innerHTML="成交量";
        document.getElementById("涨幅").style.display="none";
        document.getElementById("跌幅").style.display="none";
        document.getElementById("换手").style.display="none";
        document.getElementById("量比").style.display="none";
        document.getElementById("市盈率").style.display="none";
        document.getElementById("成交量").style.display="";
    }
    if(temp=="opt4"){
        document.getElementById("涨幅").style.display="none";
        document.getElementById("成交量").style.display="none";
        document.getElementById("跌幅").style.display="none";
        document.getElementById("量比").style.display="none";
        document.getElementById("市盈率").style.display="none";
        document.getElementById("换手").style.display="";
    }
    if(temp=="opt5"){
        document.getElementById("涨幅").style.display="none";
        document.getElementById("成交量").style.display="none";
        document.getElementById("换手").style.display="none";
        document.getElementById("跌幅").style.display="none";
        document.getElementById("市盈率").style.display="none";
        document.getElementById("量比").style.display="";
    }
    if(temp=="opt6"){
        document.getElementById("涨幅").style.display="none";
        document.getElementById("成交量").style.display="none";
        document.getElementById("换手").style.display="none";
        document.getElementById("量比").style.display="none";
        document.getElementById("市盈率").style.display="";
        document.getElementById("跌幅").style.display="none";
    }
}



Vue.prototype.$echarts = echarts

var vm = new Vue({
    el:'#app',
    data:{

        testUrl:"http://www.baidu.com",

        stockname:'顺络电子',
        stockCode:'',
        quote_change:'',
        quote_change_per:'',

        location:'',
        range:'',
        business:'',
        date:'',
        propertyperstock:'',
        incomeperstock:'',
        income:'',
        incomeincrease:'',
        marincome:'',
        cashperstock:'',
        fundsperstock:'1.34',
        notprofit:'000',
        total:'10000',
        flowstock:'900',

        topenprice:'',
        thighprice:'',
        tlowprice:'',
        pprice:'',
        price:'',
        tvolume:'',
        ttotal:'',
        market:'',



        newstitle1:'',
        newstitle2:'',
        newstitle3:'',
        newstitle4:'',
        newstitle5:'',
        newstitle6:'',
        newstitle7:'',
        newstitle8:'',
        newsurl1:'',
        newsurl2:'',
        newsurl3:'',
        newsurl4:'',
        newsurl5:'',
        newsurl6:'',
        newsurl7:'',
        newsurl8:'',
        newsdate1:'',
        newsdate2:'',
        newsdate3:'',
        newsdate4:'',
        newsdate5:'',
        newsdate6:'',
        newsdate7:'',
        newsdate8:'',

        announcementtitle1:'',
        announcementtitle2:'',
        announcementtitle3:'',
        announcementtitle4:'',
        announcementtitle5:'',
        announcementtitle6:'',
        announcementtitle7:'',
        announcementtitle8:'',

        announcementurl1:'',
        announcementurl2:'',
        announcementurl3:'',
        announcementurl4:'',
        announcementurl5:'',
        announcementurl6:'',
        announcementurl7:'',
        announcementurl8:'',
        announcementdate1:'',
        announcementdate2:'',
        announcementdate3:'',
        announcementdate4:'',
        announcementdate5:'',
        announcementdate6:'',
        announcementdate7:'',
        announcementdate8:''

    },
    methods:{
    },
    mounted:function () {

        var thisUrl = document.URL;
        var getVal = thisUrl.split('?')[1];
        var code = getVal.split('=')[1];
        this.stockCode = code;
        var klineData;
        const self = this;

        this.$http.get("htttp://localhost:8080/company/details/"+code).then(function (response) {
            self.topenprice = response.data.data.open;
            self.thighprice = response.data.data.high;
            self.tlowprice = response.data.data.low;
            self.pprice = response.data.data.close;
            self.price = response.data.data.currentPrice;
            self.tvolume = response.data.data.volume;
            self.ttotal = response.data.data.turnover;
            self.market = response.data.data.market;
        }).catch(function (error) {
            alert("出现了未知的错误！")
        });



        this.$http.get("http://localhost:8080/company/info/"+code).then(function (response) {
            // console.log(response.data);
            self.location = response.data.data.area;
            self.range = response.data.data.concept;
            self.business = response.data.data.businessDetail.substring(0,15);
            self.date = response.data.data.listingDate;
            self.propertyperstock = response.data.data.netAssetPerShare;
            self.incomeperstock = response.data.data.incomePerShare;
            self.income = response.data.data.profit;
            self.incomeincrease = response.data.data.growthRate_profit;
            self.marincome = response.data.data.incomeAll;
            self.cashperstock = response.data.data.cashFlowPerShare;

            self.fundsperstock = response.data.data.fundPerShare;
            self.notprofit = response.data.data.undistributedProfitPerShare;
            self.total = response.data.data.totalShareCapital;
            self.flowstock = response.data.data.outstandingShares;
        }).catch(function (error) {
            alert("出现了未知的错误");
        });

        this.$http.get("http://localhost:8080/company/news/"+code).then(function (response) {

            self.newstitle1=response.data.data[0].title;
            self.newsurl1=response.data.data[0].link;
            self.newsdate1=response.data.data[0].date;

            self.newstitle2=response.data.data[1].title;
            self.newsurl2=response.data.data[1].link;
            self.newsdate2=response.data.data[1].date;

            self.newstitle3=response.data.data[2].title;
            self.newsurl3=response.data.data[2].link;
            self.newsdate3=response.data.data[2].date;

            self.newstitle4=response.data.data[3].title;
            self.newsurl4=response.data.data[3].link;
            self.newsdate4=response.data.data[3].date;

            self.newstitle5=response.data.data[4].title;
            self.newsurl5=response.data.data[4].link;
            self.newsdate5=response.data.data[4].date;

            self.newstitle6=response.data.data[5].title;
            self.newsurl6=response.data.data[5].link;
            self.newsdate6=response.data.data[5].date;

            self.newstitle7=response.data.data[6].title;
            self.newsurl7=response.data.data[6].link;
            self.newsdate7=response.data.data[6].date;

            self.newstitle8=response.data.data[7].title;
            self.newsurl8=response.data.data[7].link;
            self.newsdate8=response.data.data[7].date;

        }).catch(function (response) {
            alert("出现了未知的错误！");
        });

        this.$http.get("http://localhost:8080/company/announcement/"+code).then(function (response) {
            self.announcementtitle1=response.data.data[0].title.substring(0,18);
            self.announcementurl1=response.data.data[0].link;
            self.announcementdate1=response.data.data[0].date;

            self.announcementtitle2=response.data.data[1].title.substring(0,18);
            self.announcementurl2=response.data.data[1].link;
            self.announcementdate2=response.data.data[1].date;

            self.announcementtitle3=response.data.data[2].title.substring(0,18);
            self.announcementurl3=response.data.data[2].link;
            self.announcementdate3=response.data.data[2].date;

            self.announcementtitle4=response.data.data[3].title.substring(0,18);
            self.announcementurl4=response.data.data[3].link;
            self.announcementdate4=response.data.data[3].date;

            self.announcementtitle5=response.data.data[4].title.substring(0,18);
            self.announcementurl5=response.data.data[4].link;
            self.announcementdate5=response.data.data[4].date;

            self.announcementtitle6=response.data.data[5].title.substring(0,18);
            self.announcementurl6=response.data.data[5].link;
            self.announcementdate6=response.data.data[5].date;

            self.announcementtitle7=response.data.data[6].title.substring(0,18);
            self.announcementurl7=response.data.data[6].link;
            self.announcementdate7=response.data.data[6].date;

            self.announcementtitle8=response.data.data[7].title.substring(0,18);
            self.announcementurl8=response.data.data[7].link;
            self.announcementdate8=response.data.data[7].date;
        }).catch(function (response) {
            alert("出现了未知的错误！");
        });

        this.$http.get("http://localhost:8080/exhibition/kline/"+code,{
            params:{
                beginDate:'2012-03-02',
                endDate:'2012-05-03'
            }
        }).then(function (response) {
            self.stockname = response.data.data.stockName;
            klineData = response.data.data.klineData;
            var mychart = this.$echarts.init(document.getElementById('kline'));

            // console.log(klineData);
            // var data = splitData([['2015-10-16',18.4,18.58,18.33,18.79,67.00,1,0.04,0.11,0.09],['2015-10-19',18.56,18.25,18.19,18.56,55.00,0,-0.00,0.08,0.09],['2015-10-20',18.3,18.22,18.05,18.41,37.00,0,0.01,0.09,0.09],['2015-10-21',18.18,18.69,18.02,18.98,89.00,0,0.03,0.10,0.08],['2015-10-22',18.42,18.29,18.22,18.48,43.00,0,-0.06,0.05,0.08],['2015-10-23',18.26,18.19,18.08,18.36,46.00,0,-0.10,0.03,0.09],['2015-10-26',18.33,18.07,17.98,18.35,65.00,0,-0.15,0.03,0.10],['2015-10-27',18.08,18.04,17.88,18.13,37.00,0,-0.19,0.03,0.12],['2015-10-28',17.96,17.86,17.82,17.99,35.00,0,-0.24,0.03,0.15],['2015-10-29',17.85,17.81,17.8,17.93,27.00,0,-0.24,0.06,0.18],['2015-10-30',17.79,17.93,17.78,18.08,43.00,0,-0.22,0.11,0.22],['2015-11-02',17.78,17.83,17.78,18.04,27.00,0,-0.20,0.15,0.25],['2015-11-03',17.84,17.9,17.84,18.06,34.00,0,-0.12,0.22,0.28],['2015-11-04',17.97,18.36,17.85,18.39,62.00,0,-0.00,0.30,0.30],['2015-11-05',18.3,18.57,18.18,19.08,177.00,0,0.07,0.33,0.30],['2015-11-06',18.53,18.68,18.3,18.71,95.00,0,0.12,0.35,0.29],['2015-11-09',18.75,19.08,18.75,19.98,202.00,1,0.16,0.35,0.27],['2015-11-10',18.85,18.64,18.56,18.99,85.00,0,0.09,0.29,0.25],['2015-11-11',18.64,18.44,18.31,18.64,50.00,0,0.06,0.27,0.23],['2015-11-12',18.55,18.27,18.17,18.57,43.00,0,0.05,0.25,0.23],['2015-11-13',18.13,18.14,18.09,18.34,35.00,0,0.05,0.24,0.22],['2015-11-16',18.01,18.1,17.93,18.17,34.00,0,0.07,0.25,0.21],['2015-11-17',18.2,18.14,18.08,18.45,58.00,0,0.11,0.25,0.20],['2015-11-18',18.23,18.16,18.0,18.45,47.00,0,0.13,0.25,0.19],['2015-11-19',18.08,18.2,18.05,18.25,32.00,0,0.15,0.24,0.17],['2015-11-20',18.15,18.15,18.11,18.29,36.00,0,0.13,0.21,0.15],['2015-11-23',18.16,18.19,18.12,18.34,47.00,0,0.11,0.18,0.13],['2015-11-24',18.23,17.88,17.7,18.23,62.00,0,0.03,0.13,0.11],['2015-11-25',17.85,17.73,17.56,17.85,66.00,0,-0.03,0.09,0.11],['2015-11-26',17.79,17.53,17.5,17.92,63.00,0,-0.10,0.06,0.11],['2015-11-27',17.51,17.04,16.9,17.51,67.00,0,-0.16,0.05,0.13],['2015-11-30',17.07,17.2,16.98,17.32,55.00,0,-0.12,0.09,0.15],['2015-12-01',17.28,17.11,16.91,17.28,39.00,0,-0.09,0.12,0.16],['2015-12-02',17.13,17.91,17.05,17.99,102.00,0,-0.01,0.17,0.18],['2015-12-03',17.8,17.78,17.61,17.98,71.00,0,-0.09,0.14,0.18],['2015-12-04',17.6,17.25,17.13,17.69,51.00,0,-0.18,0.10,0.19],['2015-12-07',17.2,17.39,17.15,17.45,43.00,0,-0.19,0.12,0.22],['2015-12-08',17.3,17.42,17.18,17.62,45.00,0,-0.23,0.13,0.24],['2015-12-09',17.33,17.39,17.32,17.59,44.00,0,-0.29,0.13,0.28],['2015-12-10',17.39,17.26,17.21,17.65,44.00,0,-0.37,0.13,0.32],['2015-12-11',17.23,16.92,16.66,17.26,114.00,1,-0.44,0.15,0.37],['2015-12-14',16.75,17.06,16.5,17.09,94.00,0,-0.44,0.21,0.44],['2015-12-15',17.03,17.03,16.9,17.06,46.00,0,-0.44,0.28,0.50],['2015-12-16',17.08,16.96,16.87,17.09,30.00,0,-0.40,0.36,0.56],['2015-12-17',17.0,17.1,16.95,17.12,50.00,0,-0.30,0.47,0.62],['2015-12-18',17.09,17.52,17.04,18.06,156.00,0,-0.14,0.59,0.66],['2015-12-21',17.43,18.23,17.35,18.45,152.00,1,0.02,0.69,0.68],['2015-12-22',18.14,18.27,18.06,18.32,94.00,0,0.08,0.72,0.68],['2015-12-23',18.28,18.19,18.17,18.71,108.00,0,0.13,0.73,0.67],['2015-12-24',18.18,18.14,18.01,18.31,37.00,0,0.19,0.74,0.65],['2015-12-25',18.22,18.33,18.2,18.36,48.00,0,0.26,0.75,0.62],['2015-12-28',18.35,17.84,17.8,18.39,48.00,0,0.27,0.72,0.59],['2015-12-29',17.83,17.94,17.71,17.97,36.00,0,0.36,0.73,0.55],['2015-12-30',17.9,18.26,17.55,18.3,71.00,1,0.43,0.71,0.50],['2015-12-31',18.12,17.99,17.91,18.33,72.00,0,0.40,0.63,0.43],['2016-01-04',17.91,17.28,17.16,17.95,37.00,1,0.34,0.55,0.38],['2016-01-05',17.17,17.23,17.0,17.55,51.00,0,0.37,0.51,0.33],['2016-01-06',17.2,17.31,17.06,17.33,31.00,0,0.37,0.46,0.28],['2016-01-07',17.15,16.67,16.51,17.15,19.00,0,0.30,0.37,0.22],['2016-01-08',16.8,16.81,16.61,17.06,60.00,0,0.29,0.32,0.18],['2016-01-11',16.68,16.04,16.0,16.68,65.00,0,0.20,0.24,0.14],['2016-01-12',16.03,15.98,15.88,16.25,46.00,0,0.20,0.21,0.11],['2016-01-13',16.21,15.87,15.78,16.21,57.00,0,0.20,0.18,0.08],['2016-01-14',15.55,15.89,15.52,15.96,42.00,0,0.20,0.16,0.05],['2016-01-15',15.87,15.48,15.45,15.92,34.00,1,0.17,0.11,0.02],['2016-01-18',15.39,15.42,15.36,15.7,26.00,0,0.21,0.10,-0.00],['2016-01-19',15.58,15.71,15.35,15.77,38.00,0,0.25,0.09,-0.03],['2016-01-20',15.56,15.52,15.24,15.68,38.00,0,0.23,0.05,-0.07],['2016-01-21',15.41,15.3,15.28,15.68,35.00,0,0.21,0.00,-0.10],['2016-01-22',15.48,15.28,15.13,15.49,30.00,0,0.21,-0.02,-0.13],['2016-01-25',15.29,15.48,15.2,15.49,21.00,0,0.20,-0.06,-0.16],['2016-01-26',15.33,14.86,14.78,15.39,30.00,0,0.12,-0.13,-0.19],['2016-01-27',14.96,15.0,14.84,15.22,51.00,0,0.13,-0.14,-0.20],['2016-01-28',14.96,14.72,14.62,15.06,25.00,0,0.10,-0.17,-0.22],['2016-01-29',14.75,14.99,14.62,15.08,36.00,0,0.13,-0.17,-0.24],['2016-02-01',14.98,14.72,14.48,15.18,27.00,0,0.10,-0.21,-0.26],['2016-02-02',14.65,14.85,14.65,14.95,18.00,0,0.11,-0.21,-0.27],['2016-02-03',14.72,14.67,14.55,14.8,23.00,0,0.10,-0.24,-0.29],['2016-02-04',14.79,14.88,14.69,14.93,22.00,0,0.13,-0.24,-0.30],['2016-02-05',14.9,14.86,14.78,14.93,16.00,0,0.12,-0.26,-0.32],['2016-02-15',14.5,14.66,14.47,14.82,19.00,0,0.11,-0.28,-0.34],['2016-02-16',14.77,14.94,14.72,15.05,26.00,0,0.14,-0.28,-0.35],['2016-02-17',14.95,15.03,14.88,15.07,38.00,0,0.12,-0.31,-0.37],['2016-02-18',14.95,14.9,14.87,15.06,28.00,0,0.07,-0.35,-0.39],['2016-02-19',14.9,14.75,14.68,14.94,22.00,0,0.03,-0.38,-0.40]]);
            var data = splitData(klineData);
//数组处理
            function splitData(rawData) {
                var datas = [];
                var times = [];
                var vols = [];
                var macds = []; var difs = []; var deas = [];
                for (var i = 0; i < rawData.length; i++) {
                    datas.push(rawData[i]);
                    times.push(rawData[i].splice(0, 1)[0]);
                    vols.push(rawData[i][4]);
                    macds.push(rawData[i][6]);
                    difs.push(rawData[i][7]);
                    deas.push(rawData[i][8]);
                }
                return {
                    datas: datas,
                    times: times,
                    vols: vols,
                    macds: macds,
                    difs: difs,
                    deas: deas
                };
            }

//分段计算
            function fenduans(){
                var markLineData = [];
                var idx = 0; var tag = 0; var vols = 0;
                for (var i = 0; i < data.times.length; i++) {
                    //初始化数据
                    if(data.datas[i][5] != 0 && tag == 0){
                        idx = i; vols = data.datas[i][4]; tag = 1;
                    }
                    if(tag == 1){ vols += data.datas[i][4]; }
                    if(data.datas[i][5] != 0 && tag == 1){
                        markLineData.push([{
                            xAxis: idx,
                            yAxis: data.datas[idx][1]>data.datas[idx][0]?(data.datas[idx][3]).toFixed(2):(data.datas[idx][2]).toFixed(2),
                            value: vols
                        }, {
                            xAxis: i,
                            yAxis: data.datas[i][1]>data.datas[i][0]?(data.datas[i][3]).toFixed(2):(data.datas[i][2]).toFixed(2)
                        }]);
                        idx = i; vols = data.datas[i][4]; tag = 2;
                    }

                    //更替数据
                    if(tag == 2){ vols += data.datas[i][4]; }
                    if(data.datas[i][5] != 0 && tag == 2){
                        markLineData.push([{
                            xAxis: idx,
                            yAxis: data.datas[idx][1]>data.datas[idx][0]?(data.datas[idx][3]).toFixed(2):(data.datas[idx][2]).toFixed(2),
                            value: (vols/(i-idx+1)).toFixed(2)+' M'
                        }, {
                            xAxis: i,
                            yAxis: data.datas[i][1]>data.datas[i][0]?(data.datas[i][3]).toFixed(2):(data.datas[i][2]).toFixed(2)
                        }]);
                        idx = i; vols = data.datas[i][4];
                    }
                }
                return markLineData;
            }

//MA计算公式
            function calculateMA(dayCount) {
                var result = [];
                for (var i = 0, len = data.times.length; i < len; i++) {
                    if (i < dayCount) {
                        result.push('-');
                        continue;
                    }
                    var sum = 0;
                    for (var j = 0; j < dayCount; j++) {
                        sum += data.datas[i - j][1];
                    }
                    result.push((sum / dayCount).toFixed(2));
                }
                return result;
            }

            var option = {
                title: {
                    text: '',
                    left: 0
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line'
                    }
                },
                legend: {
                    data: ['KLine', 'MA5','MA10','MA20','MA30','MA60','MA120']
                },
                grid: [           {
                    left: '3%',
                    right: '1%',
                    top:'7%',
                    height: '60%'
                },{
                    left: '8%',
                    right: '1%',
                    top: '73%',
                    height: '10%'
                },{
                    left: '3%',
                    right: '1%',
                    top: '82%',
                    height: '14%'
                }],
                xAxis: [{
                    type: 'category',
                    data: data.times,
                    scale: true,
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    splitLine: { show: false },
                    splitNumber: 20,
                    min: 'dataMin',
                    max: 'dataMax'
                },{
                    type: 'category',
                    gridIndex: 1,
                    data: data.times,
                    axisLabel: {show: false}
                },{
                    type: 'category',
                    gridIndex: 2,
                    data: data.times,
                    axisLabel: {show: false}
                }],
                yAxis: [{
                    scale: true,
                    splitArea: {
                        show: false
                    }
                },{
                    gridIndex: 1,
                    splitNumber: 3,
                    axisLine: {onZero: false},
                    axisTick: {show: false},
                    splitLine: {show: false},
                    axisLabel: {show: true}
                },{
                    gridIndex: 2,
                    splitNumber: 4,
                    axisLine: {onZero: false},
                    axisTick: {show: false},
                    splitLine: {show: false},
                    axisLabel: {show: true}
                }],
                dataZoom: [{
                    type: 'inside',
                    xAxisIndex: [0, 0],
                    start: 20,
                    end: 100
                },{
                    show: true,
                    xAxisIndex: [0, 1],
                    type: 'slider',
                    top: '97%',
                    start: 20,
                    end: 100
                },{
                    show: false,
                    xAxisIndex: [0, 2],
                    type: 'slider',
                    start: 20,
                    end: 100
                }],
                series: [{
                    name: '',
                    type: 'candlestick',
                    data: data.datas,
                    itemStyle: {
                        normal: {
                            color: '#ef232a',
                            color0: '#14b143',
                            borderColor: '#ef232a',
                            borderColor0: '#14b143'
                        }
                    },
                    markArea: {
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: 'Honeydew'
                            }
                        },
                        data: fenduans()
                    },
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    }
                    /*
                    * ,
                     markLine: {
                     label: {
                     normal: {
                     position: 'middle',
                     textStyle:{color:'Blue',fontSize: 15}
                     }
                     },
                     data: fenduans(),
                     symbol: ['circle', 'none']

                     }*/
                }, {
                    name: 'MA5',
                    type: 'line',
                    data: calculateMA(5),
                    smooth: true,
                    lineStyle: {
                        normal: {
                            opacity: 0.5
                        }
                    }
                },{
                    name:'MA10',
                    type:'line',
                    data:calculateMA(10),
                    smooth:true,
                    lineStyle:{
                        normal:{
                            opacity:0.5
                        }
                    }
                },{
                    name:'MA20',
                    type:'line',
                    data:calculateMA(20),
                    smooth:true,
                    lineStyle:{
                        normal:{
                            opacity:0.5
                        }
                    }
                },
                    {
                        name:'MA30',
                        type:'line',
                        data:calculateMA(30),
                        smooth:true,
                        lineStyle:{
                            normal:{
                                opacity:0.5
                            }
                        }
                    },
                    {
                        name:'MA60',
                        type:'line',
                        data:calculateMA(60),
                        smooth:true,
                        lineStyle:{
                            normal:{
                                opacity:0.5
                            }
                        }
                    },
                    {
                        name:'MA120',
                        type:'line',
                        data:calculateMA(120),
                        smooth:true,
                        lineStyle:{
                            normal:{
                                opacity:0.5
                            }
                        }
                    },
                    {
                        name: 'Volumn',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: data.vols,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList;
                                    if (data.datas[params.dataIndex][1]>data.datas[params.dataIndex][0]) {
                                        colorList = '#ef232a';
                                    } else {
                                        colorList = '#14b143';
                                    }
                                    return colorList;
                                },
                            }
                        }
                    },{
                        name: 'MACD',
                        type: 'bar',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        data: data.macds,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList;
                                    if (params.data >= 0) {
                                        colorList = '#ef232a';
                                    } else {
                                        colorList = '#14b143';
                                    }
                                    return colorList;
                                },
                            }
                        }
                    },{
                        name: 'DIF',
                        type: 'line',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        data: data.difs
                    },{
                        name: 'DEA',
                        type: 'line',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        data: data.deas
                    }
                ]
            };
            mychart.setOption(option);

        });

    }
})