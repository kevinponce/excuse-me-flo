import Vue from 'vue'
import Router from 'vue-router'
import component from '@/components/Signin'

Vue.use(Router)

const Constructor = Vue.extend(component)
const vm = new Constructor().$mount()

describe('Signin', () => {
  it('render correct h3', () => {
    expect(vm.$el.querySelector('.signin h3').textContent).to.equal('Sign in')
  })

  it('test', () => {
    expect(1).to.equal(1)
  })
})
