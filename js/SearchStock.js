/**
 * Created by pc on 2017/6/1.
 */

function isChinese(str){
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    return reg.test(str);
}

function isNum(str){
    if(""==str){
        return false;
    }
    var reg = /\D/;
    return str.match(reg)==null;
}


var vm = new Vue({
    el:'#container',
    data:{

    },
    methods: {

        getCookieValue:function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
        },

        search: function () {
            var code = document.getElementById("input").value;
            if(code==null||code==""){
                alert("请输入搜索内容！")
            } else if(!isChinese(code)&&!isNum(code)){
                alert("请输入中文或者数字！")
            }else{
                this.$http.get("http://localhost:8080/check/"+code).then(function (response) {
                    if(response.data.errorCode === 0) {
                        window.location.href = "../pages/SingleStock.html?code=" + code;
                    }else if(response.data.errorCode === 20000001){
                        alert("股票不存在！");
                    }else {
                        alert("出现了未知的错误！");
                    }
                }).catch(function (error) {
                    alert("网络不通畅！请检查网络！");
                });

            }
        }

    },
    mounted(){
        if(this.getCookieValue("phoneNumber") === ""){
            document.getElementById("login").innerHTML = "登录";
        }else{
            document.getElementById("login").innerHTML = "已登录";
            document.getElementById("login").href = "#";
        }

    }
});
