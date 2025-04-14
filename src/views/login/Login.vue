<template>
  <div class="layout">
    <a-content class="login" style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
      <a-card style="width: 400px;" title="登陆" bordered={false}>
        <a-form layout="vertical">
          <a-form-item label="用户名">
            <a-input v-model="username" placeholder="请输入用户名" />
          </a-form-item>
          <a-form-item label="密码">
            <a-input v-model="password" type="password" placeholder="请输入密码" />
          </a-form-item>
          <a-form-item>
            <a-button class="bottom" type="primary"  @click="Login">登录</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-content>
  </div>
</template>


<script setup lang="ts">
import {ref,onMounted,watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const username = ref('')
const password = ref('')
const Login = () => {
    console.log("username:", username.value)
    console.log("password:", password.value)
    if(username.value == "mi1kyway"&&password.value =="mi1kyway"){
        router.push('/other')
    }
}
watch(username,() =>{})

onMounted(() =>{})
</script>

<style scoped>
.layout{
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-size: cover;
    background-image: url("background/1.jpg");
}
.login{
  border-radius: 20px;
}
.bottom{
    position: absolute;
    left: 20px;
    right: 20px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    padding: 10px 0;
}
</style>
