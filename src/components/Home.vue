<template>
  <div class="home">
    <section class="hero">
      <div class="content-wrapper">
        <div class="col-xs-12 col-md-6">
          <h1 class="pull-right col-xs-12">Easily create flowcharts</h1>
          <p class="pull-right col-xs-12"></p>
          <div class="pull-right col-xs-12">
            <router-link to="/flowcharts" v-show="isLoggedIn()" class="btn btn-success">View Flowcharts</router-link>
            <a href="#" @click="$event.preventDefault(); clearTokens();" v-show="isLoggedIn()" class="btn btn-danger">Signout</a>
            <router-link to="/signup" v-show="!isLoggedIn()" class="btn btn-success">Signup</router-link>
            <router-link to="/signin" v-show="!isLoggedIn()" class="btn btn-danger">Signin</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { isLoggedIn, clearTokens } from '../api/AuthApi'

  export default {
    name: 'home',
    methods: {
      isLoggedIn,
      clearTokens () {
        clearTokens()
        this.$router.push('/signin')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hero {
  background: url('../assets/hero.png') no-repeat center center;
  background-size: cover;
  height: 100vh;
}
.hero:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(to bottom right,#002f4b,#dc4225);
  opacity: .8;
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align:middle;
  height: 100%;
  width: 100%;
}

h1 {
  color: #fff;
  font-size: 1.5rem;
  line-height: 1.5em;
  letter-spacing: -0.025em;
  font-weight: 300;
  text-align: center;
}

p {
  color: #fff;
  line-height: 1.75em;
  font-weight: 200;
  text-align: center;
  margin-bottom: 2rem;
}

.btn-wrapper {
  a {
    margin: 5px;
  }
}
</style>
