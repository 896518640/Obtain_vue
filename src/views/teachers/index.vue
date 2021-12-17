<template>
  <div>
    <!-- 教师信息操作表 -->
    <el-form
      :inline="true"
      :model="searchMap"
      class="demo-form-inline"
      style="margin-top:20px;
      margin-left:15px;"
      ref="searchForm"
    >
      <el-form-item prop="jobnumber">
        <el-input
          v-model="searchMap.jobnumber"
          placeholder="工号"
          v-if="!isDialog"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="教师姓名"></el-input>
      </el-form-item>
      <el-form-item prop="role">
        <el-select
          v-model="searchMap.role"
          placeholder="教师职务"
          v-if="!isDialog"
        >
          <el-option
            v-for="option in roleOption"
            :key="option.id"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="entrydate">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="searchMap.entrydate"
          type="date"
          placeholder="入职时间"
          v-if="!isDialog"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchData">查询</el-button>
        <el-button type="primary" @click="handleAdd" v-if="!isDialog"
          >新增</el-button
        >
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 教师数据表 -->
    <el-table
      :data="list"
      height="520"
      border
      style="width: 100%;margin:10px"
      hightlight-current-row
      @current-change="clickCurrentChange"
    >
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="jobnumber" label="工号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="role" label="职务" v-if="!isDialog">
        <!-- 想要插入内容 就必须要加入template 标签  -->
        <template slot-scope="scope">
          <!-- 此处竖线左侧为第一个参数 竖线右侧为过滤器名称 若想要传第二个第三个参数 可以在竖线右侧括号内进行传递 -->
          <span>{{ scope.row.role | roleFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="entrydate" label="入职时间" v-if="!isDialog">
      </el-table-column>
      <el-table-column prop="phone" label="电话"> </el-table-column>
      <el-table-column fixed="right" label="操作" v-if="!isDialog">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row._id)" type="text" size="small"
            >编辑</el-button
          >
          <el-button
            @click="handleDelete(scope.row._id)"
            type="text"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      :layout="
        isDialog == true
          ? 'total,pager,next'
          : 'total, sizes, prev, pager, next, jumper'
      "
      :total="total"
    >
    </el-pagination>

    <!-- 编辑教师弹窗 -->
    <el-dialog title="教师编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="teacher"
        ref="teacherForm"
        :rules="rules"
        label-width="100px"
        label-position="right"
        style="width:75%"
      >
        <el-form-item prop="jobnumber" label="工号">
          <el-input v-model="teacher.jobnumber" placeholder="工号"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="教师姓名">
          <el-input v-model="teacher.name" placeholder="教师姓名"></el-input>
        </el-form-item>
        <el-form-item prop="role" label="教师职务">
          <el-select v-model="teacher.role" placeholder="教师职务">
            <el-option
              v-for="option in roleOption"
              :key="option.id"
              :label="option.name"
              :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="entrydate" label="入职时间">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="teacher.entrydate"
            type="date"
            placeholder="入职时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="phone" label="手机">
          <el-input v-model="teacher.phone" placeholder="手机"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            teacher._id === null
              ? addData('teacherForm')
              : upData('teacherForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import teacherApi from "@/api/teacher";
//职位
const roleOption = [
  { type: 0, name: "校长" },
  { type: 1, name: "院长" },
  { type: 2, name: "辅导员" },
  { type: 3, name: "班主任" },
  { type: 4, name: "助理" },
  { type: 5, name: "普通老师" }
];
export default {
  props: {
    isDialog: Boolean
  },
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchMap: {
        _id: "",
        jobnumber: "",
        name: "",
        role: "",
        entrydate: ""
      },
      roleOption: roleOption,
      dialogFormVisible: false,
      rules: {
        jobnumber: [{ required: true, message: "请输入工号", trigger: "blur" }],
        name: [{ required: true, message: "请输入教师姓名", trigger: "blur" }],
        role: [{ required: true, message: "请选择教师职务", trigger: "blur" }]
      },
      teacher: {
        _id: null,
        jobnumber: "",
        name: "",
        role: "",
        entrydate: "",
        phone: ""
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    clickCurrentChange(current) {
      console.log(current);
      //子组件调用父组件的方法 第一个参数是父组件方法名 第二个参数是传递的参数
      this.$emit("option-teacher", current);
    },
    fetchData() {
      /*  teacherApi.getList().then(res => {
        const resp = res.data;
        this.list = resp.data.rows;
        console.log("resp", resp);
        console.log("list", this.list);
      }); */
      //console.log(this.total);
      //console.log(teacherApi);
      teacherApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then(res => {
          console.log(res);
          const resp = res.data;
          this.list = resp.data.rows;
          this.total = resp.data.total;
          console.log(this.list);
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleEdit(id) {
      //alert("编辑", id);
      this.handleAdd();
      teacherApi.getById(id).then(res => {
        const { data } = res;
        //console.log(data);
        //this.handleAdd();
        if (data.flag) {
          this.teacher = data.data;
        }
        console.log(this.teacher);
        //this.teacher
      });
      //console.log(id);
    },
    handleDelete(id) {
      console.log(id);
      this.$confirm("确定要删除此条数据吗？", "提示", {
        confirmButtonText: "我确定",
        cancelButtonText: "再想想"
      })
        .then(() => {
          teacherApi.delete(id).then(res => {
            const resp = res.data;
            console.log(resp);
            if (resp.flag) {
              this.fetchData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    searchData() {
      console.log(this.searchMap);
      this.currentPage = 1;
      this.fetchData();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAdd() {
      console.log(this.teacher);
      this.dialogFormVisible = true;
      //DOM元素加载完成之后执行该回调函数
      this.$nextTick(() => {
        //表单重置
        this.$refs["teacherForm"].resetFields();
      });
    },
    addData(formName) {
      console.log(123);
      this.$refs[formName].validate(valid => {
        if (valid) {
          teacherApi.add(this.teacher).then(res => {
            const resp = res.data;
            console.log(resp);
            if (resp.flag) {
              this.fetchData();
              this.dialogFormVisible = false;
              //this.teacher.id = null;
            } else {
              this.$message({
                message: resp.msg,
                type: "error"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    upData(formName) {
      //console.log(teacherApi);
      //console.log(this.teacher);
      //console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          teacherApi.updata(this.teacher).then(res => {
            const resp = res.data;
            console.log(resp);
            if (resp.flag) {
              this.fetchData();
              this.dialogFormVisible = false;
              //重置 teacher数据
              this.teacher._id = null;
              this.teacher.jobnumber = "";
              this.teacher.name = "";
              this.teacher.role = "";
              this.teacher.entrydate = "";
              this.teacher.phone = "";
            } else {
              this.$message({
                message: resp.msg,
                type: "error"
              });
            }
          });
        } else {
          return false;
        }
      });
    }
  },
  // 过滤器 可以将服务器给到的数据进行一次过滤 得到我们想要的数据 使用的时候
  filters: {
    //过滤器名称
    roleFilter(type) {
      const obj = roleOption.find(item => item.type === type);
      return obj.name;
    }
  }
};
</script>

<style scoped></style>
