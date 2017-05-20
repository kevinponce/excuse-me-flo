<template>
  <div>
    <AppNav />
    <div class="signup-wrapper">
      <form @submit="$event.preventDefault(); handleSignup();">
      <h3>Sign up</h3>
        <div class="row">
          <label for="email">Email</label>
          <input id="email" type="text" v-model="user.email" class="form-control col-xs-12"/>
        </div>
        <div class="row">
          <label for="email">Password</label>
          <input id="email" type="password" v-model="user.password" class="form-control col-xs-12"/>
        </div>
        <div class="row">
          <div v-for="error in errors">{{error}}</div>
        </div>
        <div class="row">
          <input type="submit" value="Signup" class="btn btn-success form-control"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import AppNav from './AppNav'
  import { signup, setRefreshToken, setAuthToken, isLoggedIn } from '../api/AuthApi'

  export default {
    name: 'signup',
    data () {
      return {
        user: {
          email: '',
          password: ''
        },
        errors: []
      }
    },
    components: {
      AppNav
    },
    methods: {
      handleSignup () {
        const vm = this
        vm.errors = []

        if (isLoggedIn()) { vm.$router.push('/flowcharts') }

        signup({ ...this.user }).then(function (response) {
          const { auth_token, refresh_token } = response.data

          setRefreshToken(refresh_token)
          setAuthToken(auth_token)

          vm.$router.push('/flowcharts')
        })
        .catch(function (error) {
          vm.errors = error.response.data['errors']
        })
      }
    }
  }
</script>

<style scoped>
.signup-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align:middle;
  height: 100%;
  width: 100%;
}
</style>
