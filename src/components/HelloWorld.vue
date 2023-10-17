<template>
  <div>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-light">
          自动识别记账工具
        </div></el-col
      >
    </el-row>
    <el-upload
      class="upload-demo"
      action="https://mock.apifox.cn/m1/3407344-0-default/consumptionrecord/ocr"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :on-error="handleImageError"
      :on-success="handleImageSuccess"
      list-type="picture"
    >
      <el-button
        size="midium"
        type="primary"
        class="el-icon-upload el-icon--right"
        >点击上传图片</el-button
      >
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>

    <el-row class="inputs">
      <el-col :span="7">
        <el-select v-model="consumptionType" filterable placeholder="消费类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
      ></el-col>

      <el-col :span="6">
        <el-input v-model="consumptionAmount" placeholder="消费金额"></el-input>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="dateTime"
          align="right"
          type="datetime"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="5"
        ><el-button type="success" plain size="large"
          >上传记录</el-button
        ></el-col
      >
    </el-row>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column label="类型">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.type }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="金额">
        <template slot-scope="scope">
          <i class="el-icon-money"></i>
          <span style="margin-left: 10px">{{ scope.row.amount }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { options } from "./options.js";
// import axios from "./axiosConfig.js";

export default {
  data() {
    return {
      options,
      dateTime: "",
      consumptionType: "",
      consumptionAmount: "",
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
      //表格配置
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          type: "出行",
          amount: "20",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          type: "停车费发票",
          amount: "15",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          type: "办公",
          amount: "240",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          type: "医疗",
          amount: "700",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],

      //日历配置
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  methods: {
    //表格方法：
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    //上传图片方法
    handleImageError() {
      this.$message({
        message: "上传失败",
        type: "warning",
      });
    },
    handleImageSuccess(res, file) {
      console.log(res);
      console.log(file);
      this.dateTime = res.data.date;
      (this.consumptionType = res.data.type),
        (this.consumptionAmount = res.data.amount),
        this.$message({
          message: "记录已自动输入，请手动点击上传",
          type: "success",
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style lang="scss">
// .myButton {

// }
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  line-height: 40px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.inputs {
  margin-top: 20px;
}
</style>
