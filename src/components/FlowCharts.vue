<template>
  <div class="flow-charts">
    <AppNav />
    <div class="content">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th></th>
            <th>
              <router-link to="/flowcharts/new" class="pull-right btn btn-info">+</router-link>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="flowChart in flowCharts">
            <td>{{flowChart.id}}</td>
            <td>{{flowChart.title}}</td>
            <td>
              <router-link :to="`/flowcharts/${flowChart.id}`" class="btn btn-success">Edit</router-link>
            </td>
            <td><a href="#" class="btn btn-danger" @click="$event.preventDefault(); deleteFlowChart(flowChart);">Delete</a></td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div v-for="error in errors">{{error}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { fetchFlowCharts, deleteFlowChart } from '../api/FlowChartApi'
  import AppNav from './AppNav'

  export default {
    name: 'FlowCharts',
    data () {
      return {
        flowCharts: [],
        errors: []
      }
    },

    components: {
      AppNav
    },

    methods: {
      deleteFlowChart (flowChart) {
        var vm = this
        var id = flowChart.id
        deleteFlowChart(id).then((response) => {
          vm.flowCharts = response.data.flow_charts
        })
        .catch((error) => {
          vm.errors = error.response.data['errors']
        })
      }
    },

    mounted () {
      const vm = this

      console.log('mounted')

      fetchFlowCharts().then((response) => {
        vm.flowCharts = response.data.flow_charts
      })
      .catch((error) => {
        vm.errors = error.response.data['errors']
      })
    }
  }
</script>

<style scoped>
td, th {
  text-align: left;
}
</style>
