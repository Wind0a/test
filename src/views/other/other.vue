<template>
    <div class="container">
        <div class="logo">
            <img alt="logo" src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"/>
            <div class="logo-text">彩艺云</div>
        </div>
        
        <div class="login-content">
            <div class="login-left">
              <img src="/background/2.jpg" alt="login visual" />
            </div>
            <div class="login-right">
            <div class="login-form-wrapper">
            <div class="login-form-title">欢迎登录彩艺云</div>
            <div class="login-form-sub-title">现场娱乐全场景SaaS产品，助力实现数字化</div>
            <a-form ref="loginForm" :model="userInfo" class="login-form" layout="vertical" @submit.prevent="handleLogin">
                <a-form-item field="username" >
                    <a-input-group >
                        <a-select v-model="areaCode" :options="['+86', '+852', '+853', '+886']" :style="{width:'100px'}" />
                        <a-input v-model="userInfo.username" placeholder="请输入手机号" :style="{width:'255px'}" ></a-input>
                    </a-input-group>
                    <template #prefix>
                        <icon-user/>
                    </template>
                </a-form-item>
                <a-form-item field="password" >
                    <a-input-password  v-model="userInfo.password" placeholder="请输入密码"  >
                        <template #prefix>
                            <icon-lock/>
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-space :size="16" direction="vertical">
                    <div class="login-form-password-actions">
                        <a-checkbox class="login-form-password-actions" v-model="loginConfig.rememberPassword"> 记住密码</a-checkbox>
                        <a-link>忘记密码</a-link>
                    </div>
                    <a-button :style="{width:'355px'}" type="primary"  @click="handleLogin">登录</a-button>
                    <a-button type="text"  long class="login-form-register-btn">没有账号？去注册</a-button>
                </a-space>
            </a-form>
            </div>
        </div>
    </div>
    </div>
  </template>


<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { useStorage } from '@vueuse/core';
  import { IconUser, IconLock } from '@arco-design/web-vue/es/icon';
  import axios from 'axios';
  const areaCode = ref('+86');

  const router = useRouter();
  const errorMessage = ref('');
  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    username: '', // 演示默认值
    password: '', // demo default value
  });
  const userInfo = reactive({
    username: '',
    password: '',
  });
  const setRememberPassword = (value: boolean) => {
    loginConfig.value.rememberPassword = value;
  };
  const handleLogin = async () => {
  if (!userInfo.username || !userInfo.password) {
    Message.error('请输入手机号和密码');
    return;
  }

  try {
    const res = await axios.post('/api/login', {
      username: userInfo.username,
      password: userInfo.password,
    });

    if (res.data.code === 200) {
      Message.success('登录成功');
      if (loginConfig.value.rememberPassword) {
        loginConfig.value.username = userInfo.username;
        loginConfig.value.password = userInfo.password;
      }
      router.push('/dashboard');
    } else {
      Message.error(res.data.message || '登录失败');
    }
  } catch (error) {
    Message.error('接口异常');
    console.error(error);
  }
};

</script>

<style lang="scss" scoped>
  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      color: black;
      font-size: 20px;
    }
}
.login-form {
    &-wrapper {
      width: 320px;
      margin-right: 20vw;
      width: 100%;
      max-width: 420px;
      padding: 100px 32px;
      background-color: #d3dbdff5; // 你可以换成你想要的颜色，比如 #f7f7f7、rgba(255,255,255,0.9)
      border-radius: 12px;
      box-sizing: border-box;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); // 可选：添加一点阴影更有立体感
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 28px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
  .container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.login-content {
  flex: 1;
  display: flex;
  height: 100%;
  overflow: hidden;
}

.login-left {
  flex: 0 0 55%; 
  max-width: 60vw;
  height: 90%;
  padding-top: 40px;
  padding-left: 40px; // ✅ 增加左边距

  img {
    width: 100%;         // 控制图片宽度
    height: 100%;       // 保持图片比例
    object-fit: cover;
    display: block;
    padding-top: 200px;
    padding-left: 400px; // ✅ 增加左边距
  }
}

.login-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.login-form-wrapper {
  width: 100%;
  max-width: 420px;
  padding: 80px 32px;
  background-color: #f7f9fc;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

</style>


