<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <el-row align="right">
        <el-col :span="24" style="text-align: right">
          <el-button @click="createOredit" type="primary">新增周报</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="zblist.tableData"
            style="width: 100%" border>
            <el-table-column type="index" align="center"></el-table-column>

            <el-table-column v-for="(v,i) in zblist.columns" :label="v.theme" :width="v.width" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.Seting">
                  <el-input v-model="zblist.sel[v.field]" placeholder="请输入内容"></el-input>
                </span>
                <span v-else style="margin-left: 10px">{{scope.row[v.field]}}</span>
              </template>
            </el-table-column>

            <!--操作按钮模块-->
            <el-table-column width="180" label="操作" align="center">
              <template slot-scope="scope">

                <el-button size="mini" @click="createOredit(scope.$index, scope.row)">编辑</el-button>

                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>

              </template>
            </el-table-column>

          </el-table>
        </el-col>
      </el-row>


    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
  export default {
    created(){
      this.initlist();
    },
    data() {
      return {
        zblist:{
          columns:[
            {field:'theme',theme:'周报标题'}
          ],
          tableData: []
        },

      }
    },
    methods: {
      //初始化页面
      initlist() {
        this.axios.get('/zb/list')
          .then(res=>{
            this.zblist.tableData = res.data;
          });
      },
      createOredit(index, row){
        if(row){
          this.$router.push({name:'send',query:{id:row.id}});
        }else{
          this.$router.push({name:'send'});
        }

      },

      handleDelete(index, row) {
        this.$confirm('确认要删除此条周报?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          let obj = {
            id:row.id
          };
          this.axios.post('zb/list/del',obj)
            .then(res=>{
              if(res.success == true){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.initlist();
              }else{
                this.$message.error(res.data.message);
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
</style>
