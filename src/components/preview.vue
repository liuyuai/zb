<template>
  <el-container>
    <!--<el-header></el-header>-->
    <el-main id="preview">
      <el-row>
        <div class="title-style">
          工作周报
        </div>
      </el-row>
      <el-row>
        <div class="userInfo-style">
          <div class="userInfo-item">组别:{{userInfo.group}}</div>
          <div class="userInfo-item">汇报人:{{userInfo.user}}</div>
          <div class="userInfo-item">周期:{{userInfo.time}}</div>
        </div>
      </el-row>

      <el-row v-for="(v,i) in tableshow.colums" v-show="v.show">
        <el-table :data="v.tableData" border style="width: 100%">
          <el-table-column align="center" v-for="item in v.title"  :label="item.title" :width="item.width">
            <template slot-scope="scope">
              <span>{{scope.row[item.filed]}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
</template>

<script>
    export default {
        name: "preview",
      props:{
        previewDta:{
          type:Object
        }
      },
      created (){
          console.log(this.previewDta);
          this.tableshow.colums[0].show = this.previewDta.btnBox.work;
          this.tableshow.colums[0].tableData =this.previewDta.weekly.workData;

          this.tableshow.colums[1].show = this.previewDta.btnBox.summary;
          this.tableshow.colums[1].tableData =this.previewDta.weekly.summaryData;

          this.tableshow.colums[2].show = this.previewDta.btnBox.plan;
          this.tableshow.colums[2].tableData =this.previewDta.weekly.planData;
      },
      data() {
        return {
          tableshow:{
            colums:[
              {filed:'work',
                title:[
                  {filed:'type',title:'事项/模块',width:180},
                  {filed:'content',title:'本周问题及总结'},
                ],
                tableData: [{
                  date: '2016-05-02',
                  type: '王小虎',
                  content: '上海市普陀区金沙江路 1518 弄'
                }, {
                  date: '2016-05-04',
                  type: '王小虎',
                  content: '上海市普陀区金沙江路 1517 弄'
                }]
              },
              {filed:'sumary',
                title:[
                  {filed:'content',title:'本周问题及总结'}
                ],
                tableData: [{
                  date: '2016-05-02',
                  type: '王小虎',
                  content: '上海市普陀区金沙江路 1518 弄'
                }]
              },
              {filed:'plan',
                title:[
                  {filed:'type',title:'事项/模块',width:180},
                  {filed:'content',title:'下周工作计划'},
                ],
                tableData: [{
                  date: '2016-05-02',
                  type: '王小虎',
                  content: '上海市普陀区金沙江路 1518 弄'
                }, {
                  date: '2016-05-04',
                  type: '王小虎',
                  content: '上海市普陀区金沙江路 1517 弄'
                }]
              },
            ]
          },
          userInfo:{
            group:'',
            user:'',
            time:''
          }
        }
      },
      methods:{
      }
    }
</script>

<style>
  .el-container{
    max-width: 1140px;
    margin: 0 auto;
  }
  #preview .el-table{
    border: 1px solid black;
    border-bottom: none;
  }
  #preview .el-table:last-child{
    border-bottom: 1px solid black;
  }
  #preview .el-table th{
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    background-color: rgba(153,51,0)!important;
    color: white;
  }
  #preview .el-table td{
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }
  .title-style{
    width: 99.8%;
    border: 1px solid black;
    height: 48px;
    line-height: 48px;
    font-size: 18px;
    color: black;
    font-weight: bold;
    background-color: rgba(91,155,213);
    border-bottom: none;
  }
  .userInfo-style{
    display: flex;
    height: 48px;
    line-height: 48px;
    border: 1px solid black;
    border-bottom: none;
    border-right: none;
  }
  .userInfo-item{
    text-align: left;
    flex: 1;
    border-right: 1px solid black;
    padding-left: 10px;
  }

</style>
