<template>
  <div class="main">
    <el-row>
      <el-col :span="6" offset="1">
    
        <div class="record">
          <el-header>Bookkeeping Tool</el-header>
          <el-upload
            class="upload"
            :action="apiUrl + '/consumptionrecord/ocr'"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :on-error="handleImageError"
            :on-success="handleImageSuccess"
            list-type="picture"
          >
            <el-button
              size="large"
              type="primary"
              class="el-icon-upload el-icon--right"
              >点击上传图片</el-button
            >
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>

          <!-- 识别，以及手工输入栏 -->
          <el-row class="inputs">
            <el-col :span="24">
              <el-select
                v-model="consumptionType"
                filterable
                placeholder="消费类型"
                style="width: 60%;"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row class="inputs">
            <el-col :span="24">
              <el-input
                v-model="consumptionAmount"
                placeholder="消费金额"
                style="width: 60%;"
              ></el-input>
            </el-col>
          </el-row>

          <el-row class="inputs">
            <el-col :span="24">
              <el-date-picker
                v-model="dateTime"
                type="datetime"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                style="width: 60%;"
              >
              </el-date-picker>
            </el-col>
          </el-row>

          <el-row class="inputs">
            <el-col :span="24">
              <el-button type="primary" plain size="large" @click="insert"
                >上传记录
              </el-button>
            </el-col>
          </el-row>

        </div>
      </el-col>

      <el-col span="2">
        <el-divider direction="vertical"></el-divider>
      </el-col>

      <!-- ***表格栏*** -->
      <el-col :span="12" :offset="1">
        <el-row :justify="center" class="icon">
            <a href="https://github.com/JP1222/Bookkeeping-Vue" target="_blank" style="float: right;">
              <img src="@/assets/github.svg" alt="GitHub" />
            </a>
        </el-row>

        <el-table :data="tableData" style="width: 100%">
          <!-- 在表格里绑定tableData这个数据 -->
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
              <span>{{ scope.row.amount }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
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

        <!-- 分页 -->
        <el-row>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </el-row>
      </el-col>
    </el-row>

    <!-- 抽屉 -->
    <el-drawer
      title="修改当前数据"
      :visible.sync="drawer"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form>
          <el-form-item label="消费类型" :label-width="formLabelWidth">
            <el-select
              v-model="consumptionType"
              class="input-short"
              filterable
              placeholder="消费类型"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="消费金额" :label-width="formLabelWidth">
            <el-input
              v-model="consumptionAmount"
              class="input-short"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="消费日期" :label-width="formLabelWidth">
            <el-date-picker
              v-model="dateTime"
              align="right"
              type="datetime"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>

        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="update">确 定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { options } from "./options.js";
import { fetchData, deleteData, insertData, updateData } from "../api";

export default {
  data() {
    return {
      options, // 消费类型选择
      dateTime: "",
      consumptionType: "",
      consumptionAmount: "",
      formLabelWidth: "80px",
      drawer: false,

      apiUrl: process.env.VUE_APP_API_URL,
      currentPage: 1,
      pageSize: 10,
      total: 10,
      tableData: [],
      fileList: [
        {
          name: "华润超市.jpeg",
          url: "https://sichuan.scol.com.cn/items/201908/1908010802220000000C8587.png",
        },
        {
          name: "麦当劳.jpeg",
          url: "https://img.zcool.cn/community/022120587490b6a8012060c8e0f957.JPG@800w_1l_2o_100sh.jpg",
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

  mounted() {
    this.getTableData(this.currentPage, this.pageSize);
  },
  methods: {
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
      this.consumptionType = res.data.type;
      this.consumptionAmount = res.data.amount;
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

    // 上传表单
    insert() {
      insertData(
        this.dateTime,
        this.consumptionAmount,
        this.consumptionType
      ).then(() => {
        this.getTableData(this.currentPage, this.pageSize);
        this.$notify({
          title: "成功",
          message: "添加成功",
          type: "success",
        });
      });
    },
    // 更新数据
    update() {
      this.cancelForm();
      updateData(
        this.dateTime,
        this.consumptionAmount,
        this.consumptionType
      ).then(() => {
        this.getTableData(this.currentPage, this.pageSize);
        this.$notify({
          title: "成功",
          message: "更新成功",
          type: "success",
        });
      });
    },

    // 表格方法
    getTableData(currentPage, pageSize) {
      fetchData(currentPage, pageSize).then((data) => {
        // 处理获取到的数据
        this.total = data.data.data.total;
        this.tableData = data.data.data.list.map((item) => ({
          type: item.typeName,
          amount: item.amount,
          date: item.time,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          id: item.id,
        }));
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.drawer = true;
    },
    handleDelete(index, row) {
      deleteData(row.id).then((response) => {
        if (response.status == 200) {
          this.getTableData(this.currentPage, this.pageSize);
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
          });
        } else {
          this.$notify({
            title: "警告",
            message: "这是一条警告的提示消息",
            type: "warning",
          });
        }
      });
    },

    // 抽屉关闭按钮
    cancelForm() {
      this.drawer = false;
    },

    // 处理分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData(this.currentPage, this.pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData(this.currentPage, this.pageSize);
    },
  },
};
</script>

<style lang="scss">
.el-header {
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 130px;
}

.inputs {
  margin-top: 20px;
  // weight
}

.el-divider--vertical {
    height: 80vh;
}

.input-short {
  width: 220px;
}

.pagination {
  margin-top: 50px;
}

.icon {
  margin-right: 30px;
  margin-bottom: 30px;
}
</style>
