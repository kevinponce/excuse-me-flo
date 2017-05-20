<template>
  <div class="flow-chart">
    <AppNav />
    <div class="content">
      <div class="col-xs-12">
        <div class="btn-group pull-right">
          <button @click="setSideBySide(true);" class="btn" :class="buttonClass(sideBySide)">
            <i class="glyphicon glyphicon-th"></i>
          </button>
          <button @click="setSideBySide(false);" class="btn" :class="buttonClass(!sideBySide)">
            <i class="glyphicon glyphicon-th-large"></i>
          </button>
        </div>
      </div>
      <div :class="sideBySideDivClass">
        <div class="row">
          <label for="title" class="col-xs-12 text-left">Title</label>
          <input id="title" v-model="flowchart.title" class="form-control"/>
        </div>
        <div class="row">
          <label class="col-xs-12 text-left">Markup</label>
          <div id="markup">{{flowchart.markup}}</div>
        </div>
        <div class="row">
          <div v-for="error in errors">{{error}}</div>
        </div>
        <button class="btn btn-success" @click="create()" v-show="isNew">Create</button>
        <button class="btn btn-success" @click="save()" v-show="!isNew">Save</button>
        <button class="btn btn-info" @click="setExample()">Example</button>
      </div>
      <div :class="sideBySideDivClass">
        <div id="diagram"></div>
      </div>
    </div>
  </div>
</template>

<script>
  require('raphael')
  var flowchart = require('flowchart.js')
  var ace = require('brace')
  require('brace/mode/javascript')
  require('brace/theme/monokai')

  import AppNav from './AppNav'
  import { debounce } from 'lodash'
  import { createFlowChart, fetchFlowChart, saveFlowChart } from '../api/FlowChartApi'

  export default {
    name: 'flow-chart',
    data () {
      return {
        id: null,
        flowchart: {
          title: '',
          markup: ''
        },
        editor: null,
        diagram: null,
        errors: [],
        sideBySide: true
      }
    },

    components: {
      AppNav
    },

    methods: {
      load () {
        var vm = this

        fetchFlowChart(vm.id).then((response) => {
          var { title, markup } = response.data.flow_chart
          vm.flowchart.title = title
          vm.flowchart.markup = markup
          vm.editor.setValue(markup)
        }).catch((error) => {
          vm.errors = error.response.data['errors']
        })
      },

      setExample () {
        var example = 'st=>start: Start:>http://www.google.com[blank]\n' +
        'e=>end: End:>http://www.google.com\n' +
        'op1=>operation: My Operation|past\n' +
        'op2=>operation: Stuff\n' +
        'sub1=>subroutine: My Subroutine\n' +
        'cond=>condition: Yes\n' +
        'or No?|approved:>http://www.google.com\n' +
        'c2=>condition: Good idea\n' +
        'io=>inputoutput: catch something...\n\n' +
        'st->op1(right)->cond\n' +
        'cond(yes, right)->c2\n' +
        'cond(no)->sub1(left)->op1\n' +
        'c2(yes)->io->e\n' +
        'c2(no)->op2->e'

        this.flowchart.markup = example
        this.editor.setValue(example)
        this.updateFlowChart()
      },

      updateFlowChartDebouced () {
        var vm = this

        return debounce(function () {
          vm.updateFlowChart()
        }, 500)
      },

      updateFlowChart () {
        var vm = this
        if (vm.diagram && vm.diagram.start) { vm.diagram.clean() }

        vm.diagram = flowchart.parse(this.flowchart.markup)

        if (!vm.diagram.start) { return }

        vm.diagram.drawSVG('diagram')
      },

      create () {
        var vm = this

        createFlowChart({ ...vm.flowchart }).then((response) => {
          vm.id = response.data.flow_chart.id
        })
        .catch((error) => {
          vm.errors = error.response.data['errors']
        })
      },

      save () {
        var vm = this

        saveFlowChart(vm.id, { ...vm.flowchart }).then((response) => {
          // nothing for now
        })
        .catch((error) => {
          vm.errors = error.response.data['errors']
        })
      },

      setSideBySide (value) {
        this.sideBySide = value
      },

      buttonClass (selected) {
        if (selected) {
          return 'btn-primary'
        } else {
          return 'btn-secondary'
        }
      }
    },

    computed: {
      isNew () {
        return !this.id
      },

      sideBySideDivClass () {
        if (this.sideBySide) {
          return 'col-xs-6'
        } else {
          return 'col-xs-12'
        }
      }
    },

    created () {
      if (!this.$route.params.id) { return }
      this.id = this.$route.params.id

      this.load()
    },

    mounted () {
      var vm = this
      const updateFlowChart = this.updateFlowChartDebouced()

      vm.editor = ace.edit('markup')
      vm.editor.getSession().setMode('ace/mode/text')
      vm.editor.setTheme('ace/theme/monokai')

      vm.editor.getSession().on('change', function (e) {
        vm.flowchart.markup = vm.editor.getValue()
        updateFlowChart()
      })
    },

    watch: {
      '$route' (to, from) {
        if (from.params.id !== to.params.id) {
          return this.load()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.flow-chart {
  #markup {
    height: 400px;
    width: 100%;
  }
  #diagram {
    overflow: auto;
  }
}
</style>
