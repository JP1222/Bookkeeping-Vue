<template>
  <div class="main">
    <el-button round @click="showDialog">查看近一年数据</el-button>
    <el-button round @click="showDialog" class="searchMonth">查看近一个月数据</el-button>
    
    <el-dialog title="数据查询结果" :visible.sync="dialogVisible" width="60%">
      <div id="chart" style="width: 100%; height: 400px;"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      dialogVisible: false,
      charData:[
              ['2019-10-10', 200],
              ['2019-10-11', 560],
              ['2019-10-12', 750],
              ['2019-10-13', 580],
              ['2019-10-14', 250],
              ['2019-10-15', 300],
              ['2019-10-16', 450],
              ['2019-10-17', 300],
              ['2019-10-18', 100]
            ]
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.initChart();
      });
    },
    initChart() {
      var chartDom = document.getElementById('chart');
      var myChart = echarts.init(chartDom);
      var option = {
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '30%']
        },
        visualMap: {
          type: 'piecewise',
          show: false,
          dimension: 0,
          seriesIndex: 0,
          pieces: [
            {
              gt: 1,
              lt: 3,
              color: 'rgba(0, 0, 180, 0.4)'
            },
            {
              gt: 5,
              lt: 7,
              color: 'rgba(0, 0, 180, 0.4)'
            }
          ]
        },
        series: [
          {
            type: 'line',
            smooth: 0.6,
            symbol: 'none',
            lineStyle: {
              color: '#5470C6',
              width: 5
            },
            markLine: {
              symbol: ['none', 'none'],
              label: { show: false },
              data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
            },
            areaStyle: {},
            data: this.charData
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
.main {
  padding: 20px 0px;
}

.searchMonth {
  margin-left: 50px
}
</style>




{
  "success": true,
  "message": "查询成功",
  "data": 
  "code": 200
}