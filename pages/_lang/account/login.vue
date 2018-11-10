<template>
  <div class="account-form">
    <el-form
      ref="account"
      :model="account"
      :rules="rules"
      status-icon
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        :label="$t('login.form.name')"
        prop="name"
      >
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item
        :label="$t('login.form.pass')"
        prop="password"
      >
        <el-input
          v-model="account.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('account')"
        >
          {{ $t('login.form.button') }}
        </el-button>
      </el-form-item>
    </el-form>
    <p>{{ $t('login.form.tips') }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import { setToken } from '~/utils/auth'

export default {
  data() {
    return {
      account: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '帐号不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const res = await axios.post('/api/login', {...this.account})
            if (res.data.success) {
              const { from } = this.$route.query
              const { lang } = this.$route.params
              const redirectUrl = from || (lang ? `/${lang}/` : '/')

              setToken(res.data.token)
              this.$message.success({
                message: '登录成功',
                onClose: () => {
                  this.$router.replace(redirectUrl)
                }
              })
            } else {
              this.$message.error(res.data.message || '登录失败，请重试')
            }
          } catch (error) {
            console.log(error)
            this.$message.error('登录失败，请重试')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.account-form {
  padding: 50px 30px;

  p {
    text-align: center;
    opacity: 0.5;
  }
}
</style>
