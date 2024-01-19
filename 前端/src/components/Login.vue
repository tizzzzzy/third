<template>
  <div class="login-container">
    <div class="login-box">
      <div class="title">用户登录</div>
      <el-form :model="loginForm" label-position="top" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="login-button">
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>

      <!-- 登录失败提示 -->
      <el-alert
          v-if="loginFailed"
          title="登录失败"
          type="error"
          show-icon
          :closable="false"
      >
        {{ errorMessage }}
      </el-alert>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginFailed: false,
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:8080/login', this.loginForm);

        if (response.data.success) {
          console.log('Login successful');
          // 在这里可以进行登录成功后的操作
          this.$router.push('/iface');
        } else {
          console.error('Login failed:', response.data.message);
          // 处理登录失败的情况，显示错误提示
          this.loginFailed = true;
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        console.error('An error occurred during login:', error);

        // 处理401错误
        if (error.response && error.response.status === 401) {
          this.loginFailed = true;
          this.errorMessage = '用户名或密码不正确，请重新输入。';
        } else {
          // 其他错误处理
          this.loginFailed = true;
          this.errorMessage = '登录时发生错误，请重试。';
        }
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-box {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.login-button {
  width: 100%;
  color: #00e1ff;
  text-align: center;
  margin-top: 20px;
}
</style>
