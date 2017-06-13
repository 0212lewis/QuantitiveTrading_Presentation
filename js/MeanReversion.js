/**
 * Created by cyz on 2017/6/12.
 */
var vm = new Vue({
   el:'#container',
    data:{
       createDays:'',
       holdDays:'',
       beginDate:'',
       endDate:'',

       items:[

       ],
        chosens:[

        ],
        backup:[

        ]

    },
    methods:{
       add:function (code,name,sector) {
               this.chosens.push({
                   "code":code,
                   "name":name,
                   "sector":sector
               });
           // window.alert(this.items.length);
           // window.alert("haha");
           for(var i=0;i<this.items.length;i+=1){
                   if(this.items[i].code == code&&this.items[i].name == name&&this.items[i].sector == sector){
                       this.items.splice(i,1);
                   }
           }
           // window.alert(this.items.length);
       },
        myDelete:function (code,name,sector){
            for(var i=0;i<this.chosens.length;i++){
               if(this.chosens[i].code==code && this.chosens[i].name==name &&this.chosens[i].sector==sector) {
                   this.chosens.splice(i, 1);
               }
            }
            this.items.push({
                "code":code,
                "name":name,
                "sector":sector
            });
        },
        addAll:function () {
            alert("实现添加所有股票");
        },
        deleteAll:function () {

            this.chosens=[];
            this.items=this.backup;
        }
    },
    mounted(){
       this.$http.get("http://localhost:8080/stockWithSector/"+"2016-03-02").then(function (response) {

           this.items = response.data.data;
           this.backup = this.items;
           // var dt = $('#table1').DataTable();
           // dt.destroy();
           setTimeout(function () {
              $('#table1').DataTable();
           },0);
           // $('#table1').DataTable.destroy();

       }).catch(function (error) {
           alert("发生了未知的错误！");
       })

    }
});