<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="work.tableData"
            style="width: 100%" border>
            <el-table-column type="index" align="center"></el-table-column>

            <el-table-column v-for="(v,i) in work.columns" :label="v.title" :width="v.width" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.Seting">
                  <el-input v-model="work.sel[v.field]" placeholder="请输入内容"></el-input>
                </span>
                <span v-else style="margin-left: 10px">{{scope.row[v.field]}}</span>
              </template>
            </el-table-column>

            <!--操作按钮模块-->
            <el-table-column width="180" label="操作" align="center">
              <template slot-scope="scope">

                <el-button size="mini" v-if="scope.row.Seting"  @click="handleHold(scope.$index, scope.row)">保存</el-button>
                <el-button size="mini" v-else @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

                <el-button v-if="scope.row.Seting" size="mini" type="danger" @click="handleCancel(scope.$index, scope.row)">取消</el-button>
                <el-button v-else size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>

              </template>
            </el-table-column>

          </el-table>
        </el-col>
        <el-col :span="24">
          <div class="el-table-add-row" style="width: 99.2%;" @click="addRow()"><span>+ 添加</span></div>
        </el-col>
      </el-row>


    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
  export default {
    created (){
      this.papperId = this.$route.query.id;
      if(this.papperId){
        this.initWorklist({id:this.papperId});
      }

    },
    data() {
      return {
        work:{
          sel:null,//选中行
          columns:[
            {field:'type',width:180,title:'事项/模块'},
            {field:'content',title:'本周工作内容'},
          ],
          tableData: []
        },
        papperId:''
      }
    },
    methods: {
      initWorklist(obj) {
        this.axios.post('/work/list',obj)
          .then(res=>{
            this.work.tableData = res.data;
            // console.log(res);
          });
      },

      handleEdit(index, row) {
        let isSet = this.work.tableData.some((item)=>{
          return item.Seting;
        });
        if(isSet){
          return this.$message.warning("请先保存当前编辑项");
        }
        this.work.sel = JSON.parse(JSON.stringify(row));
        row.Seting = true;
      },
      handleHold(index, row) {
        //判断当时 是新建还是修改
        let data= JSON.parse(JSON.stringify(this.work.sel));
        if(row.id){

        }else{
          this.axios.post('/work/add',data)
            .then(res=>{
              if(res.success){
                row.Seting = false;
              }
            });
        }

      },
      handleCancel(index, row) {
        console.log(index);

      },
      handleDelete(index, row) {
        this.work.tableData.splice(index,1);

      },
      addRow(){
        let isSet = this.work.tableData.some((item)=>{
          return item.Seting;
        });
        if(isSet){
          return this.$message.warning("请先保存当前编辑项");
        }
        let newRow = {type:'',content:'',Seting:true};
        this.work.tableData.push(newRow);
        this.work.sel = JSON.parse(JSON.stringify(newRow));

      }
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
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
  }
</style>
