<template>
  <nav class="navbar navbar-default">
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand">Exuse Me Flow</router-link>
    </div>
    <ul class="nav navbar-nav navbar-right">
      <li>
        <router-link to="/flowcharts" class="navbar-brand" v-show="isLoggedIn()">FlowCharts</router-link>
        <a class="navbar-brand" href="#" @click="$event.preventDefault(); signout();" v-show="isLoggedIn()">Sign out</a>
        <router-link to="/signin" class="navbar-brand" v-show="!isLoggedIn()">Sign in</router-link>
        <router-link to="/signup" class="navbar-brand" v-show="!isLoggedIn()">Sign up</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { isLoggedIn, clearTokens } from '../api/AuthApi'

export default {
  name: 'app-nav',
  methods: {
    isLoggedIn,
    signout () {
      clearTokens()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.navbar-right { margin-right: 0px !important}
</style>
