<template>
  <el-container>
    <el-header>
      Header
    </el-header>
    <el-main>

      <div class="bottom20 sendInfo">
        <el-row class="bottom20" v-for="(v,i) in sendinfo.colums">
          <el-col :span="v.span">
            <div style="height: 40px;line-height: 40px;text-align: left">
              {{v.title}}:
            </div>
          </el-col>
          <el-col :span="24-v.span">
            <el-input v-model="sendinfo[v.field]" placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
      </div>

      <div class="btn-box bottom20">
        <el-row>
          <el-col :span="24" align="left">
            <el-button v-for="(v,i) in btnBox.colums" @click="showTemplate(v.type)" type="primary">{{btnBox[v.type]?v.unlabel:v.label}}</el-button>
          </el-col>
        </el-row>
      </div>


      <!--本周内容区-->
      <el-row class="bottom20" v-show="btnBox.work">
        <el-col :span="24">
          <el-table
            :data="weekly.workData"
            style="width: 100%" border>
            <el-table-column type="index" align="center"></el-table-column>

            <el-table-column v-for="(v,i) in weekly.workcolumns" :label="v.title" :width="v.width" align="center">
              <template slot-scope="scope">
                <span>
                  <el-input v-model="scope.row[v.field]" placeholder="请输入内容"></el-input>
                </span>
              </template>
            </el-table-column>
            <!--操作按钮模块-->
            <el-table-column width="180" label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>

              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24">
          <div class="el-table-add-row" style="width: 99.8%;" @click="addRow('work')"><span>+ 添加</span></div>
        </el-col>
      </el-row>

      <!--本周总结计划-->
      <el-row class="bottom20" v-show="btnBox.summary">
        <el-col :span="24">
          <el-table
            :data="weekly.summaryData"
            style="width: 100%" border>

            <el-table-column v-for="(v,i) in weekly.summarycolumns" :label="v.title" :width="v.width" align="center">
              <template slot-scope="scope">
                <span>
                  <!--<el-input v-model="scope.row[v.field]" placeholder="请输入内容"></el-input>-->

                  <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="scope.row[v.field]"></el-input>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <!--下周计划区-->
      <el-row class="bottom20" v-show="btnBox.plan">
        <el-col :span="24">
          <el-table
            :data="weekly.planData"
            style="width: 100%" border>
            <el-table-column type="index" align="center"></el-table-column>

            <el-table-column v-for="(v,i) in weekly.plancolumns" :label="v.title" :width="v.width" align="center">
              <template slot-scope="scope">
                <span>
                  <el-input v-model="scope.row[v.field]" placeholder="请输入内容"></el-input>
                </span>
              </template>
            </el-table-column>

            <!--操作按钮模块-->
            <el-table-column width="180" label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>

              </template>
            </el-table-column>

          </el-table>
        </el-col>
        <el-col :span="24">
          <div class="el-table-add-row" style="width: 99.8%;" @click="addRow('plan')"><span>+ 添加</span></div>
        </el-col>
      </el-row>

    </el-main>
    <el-footer>
      <el-row>
        <el-col :span="24" align="left">
          <el-button @click="send('sendOut')" type="primary">发送</el-button>
          <el-button @click="send('hold')" type="info" plain>存草稿</el-button>
          <el-button @click="preview()" type="success" >预览</el-button>
        </el-col>
      </el-row>
    </el-footer>

    <el-dialog title="预览" :visible.sync="dialogFormpreview"  width="80%">
      <preview :previewDta="previewDta"></preview>
    </el-dialog>

  </el-container>
</template>

<script>
  import preview from '../components/preview'

  export default {
    created (){
      this.papperId = this.$route.query.id;
      if(this.papperId){
        this.initWorklist({id:this.papperId});
      }
    },
    mounted(){
      this.previewDta = {
        weekly:this.weekly,
        btnBox:this.btnBox
      };
    },
    data() {
      return {
        stateType:{
          sendOut:1,
          hold:2
        },
        previewDta:{},
        weekly:{
          workcolumns:[
            {field:'type',width:180,title:'事项/模块'},
            {field:'content',title:'本周工作内容'},
          ],
          summarycolumns:[
            {field:'content',title:'本周问题及总结'},
          ],
          plancolumns:[
            {field:'type',width:180,title:'事项/模块'},
            {field:'content',title:'下周工作计划'},
          ],
          workData: [],
          summaryData:[{content:''}],
          planData:[],
        },
        papperId:'',
        sendinfo:{
          colums:[
            {field:'addressee', title:'收信人',span:2},
            {field:'notice', title:'抄送人',span:2},
            {field:'theme', title:'主题',span:2}
          ],
          addressee:"",
          notice:"",
          theme:''
        },
        btnBox:{
          colums:[
            {type:'work',label:'添加本周工作模块',unlabel:'取消本周工作模块'},
            {type:'summary',label:'添加本周问题及总结模块',unlabel:'取消本周问题及总结模块'},
            {type:'plan',label:'添加下周计划模块',unlabel:'取消下周计划模块'}
          ],
          work:true,
          summary:false,
          plan:false
        },
        dialogFormpreview:false
      }
    },
    methods: {
      initWorklist(obj) {
        this.axios.post('/zb/detail',obj)
          .then(res=>{
            if(res.success == true){
              this.sendinfo.addressee = res.data.addressee;
              this.sendinfo.notice = res.data.notice;
              this.sendinfo.theme = res.data.theme;
              this.weekly.workData = JSON.parse(res.data.work);
              if(res.data.summary){
                this.btnBox.summary = true;
                this.weekly.summaryData[0].content =res.data.summary;
              }
              if(res.data.plan){
                this.btnBox.plan = true;
                this.weekly.planData = JSON.parse(res.data.plan);
              }
            }
          });
      },
      handleDelete(index, row,type) {
        if(type == 'work'){
          this.weekly.workData.splice(index,1);
        }else if(type == 'plan'){
          this.weekly.planData.splice(index,1);
        }
      },
      showTemplate(type){
        this.btnBox[type] = !this.btnBox[type];
      },
      addRow(type){
        let newRow = {type:'',content:'',Seting:true};
        if(type == 'work'){
          this.weekly.workData.push(newRow);
        }else if(type=='plan'){
          this.weekly.planData.push(newRow);
        }
      },
      preview(){
        this.dialogFormpreview = true;
      },
      send(type){
        let obj={
          addressee:this.sendinfo.addressee,
          notice:this.sendinfo.notice,
          theme:this.sendinfo.theme,
          state:this.stateType[type],
          work:JSON.stringify(this.weekly.workData)
        };
        if(this.btnBox.summary){
          obj.summary= JSON.stringify(this.weekly.summaryData[0].content);
        }
        if(this.btnBox.plan){
          obj.plan = JSON.stringify(this.weekly.planData)
        }

        if(this.papperId){
          obj.papperId = this.papperId;
        }
        console.log(obj);
        this.axios.post('/zb/send',obj)
          .then(res=>{
            console.log(res);
          })
      }
    },
    components:{
      preview
    }
  }
</script>

<style scoped>
  .el-container{
    max-width: 1140px;
    margin: 0 auto;
  }
  .table-header{
    margin-bottom: 10px;
    text-align: left;
  }
  .el-table-add-row {
    margin-top: 2px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
  }
  .bottom20{
     margin-bottom: 20px;
  }
</style>
