<template>
  <div class="main">
    <el-button round @click="showDialog('year')">查看近一年数据</el-button>
    <el-button round @click="showDialog('week')" class="searchMonth">查看近一周数据</el-button>
    <el-button round @click="showDialog('month')" class="searchMonth">查看近一个月数据</el-button>
    
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
import { getChart } from "@/api/index"; // 确保这是命名导出
import { monthData } from './monthData'

export default {
  data() {
    return {
      dialogVisible: false,
      charData: []
    };
  },
  methods: {
    fetch_chartData(period) {
      if (period === 'year') {
        getChart().then((result) => {
          console.log(result)
          this.charData = result.data.data;
          this.$notify({
            title: "成功",
            message: "查询成功",
            type: "success",
          });
          this.initChart();
        });
      } else if (period === 'month') {
        // 使用导入的月数据
        this.charData = monthData;
        this.$notify({
          title: "成功",
          message: "查询成功",
          type: "success",
        });
        this.initChart();
      } else if (period === 'week') {
        // 使用模拟的一周数据
        this.charData = [
          ['2024-05-08', 150],
          ['2024-05-09', 220],
          ['2024-05-10', 340],
          ['2024-05-11', 400],
          ['2024-05-12', 290],
          ['2024-05-13', 310],
          ['2024-05-14', 470]
        ];
        this.$notify({
          title: "成功",
          message: "查询成功",
          type: "success",
        });
        this.initChart();
      }
    },

    showDialog(period) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.fetch_chartData(period);
      });
    },

    initChart() {
      var chartDom = document.getElementById('chart');
      var myChart = echarts.init(chartDom);
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.charData.map(item => item[0]) // X轴数据
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
            data: this.charData.map(item => item[1]) // Y轴数据
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
  margin-left: 50px;
}
</style>
