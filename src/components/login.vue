<template>
  <div class="login-box">
    <div>
      <h3>登录</h3>
    </div>
    <el-form>
      <el-form-item>
        <el-input v-model="user.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('msm')" class="btn">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        labelPosition: 'left',
        user: {
          name: '',
          password: ''
        }
      };
    },
    methods:{
      submitForm(msg) {
        this.axios.post('user/login',this.user)
          .then(res=>{
            console.log(res);
            if(res.success == true){


              this.$router.push('/list');
            }else{
              this.$message.warning("登录失败");
            }
          })
      }
    }
  }
</script>

<style scoped>
  .login-box{
    width: 320px;
    position: absolute;
    top: 50%;
    left: 70%;
    transform: translate(-50%,-50%);
    padding: 40px;
    border: 1px solid #ccc;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .btn{
    width: 100%;
  }
</style>
