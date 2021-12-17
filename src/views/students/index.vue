<template>
  <div>
    <!-- 学员列表 -->
    <el-form
      :inline="true"
      :model="search"
      ref="searchForm"
      class="demo-form-inline"
      style="margin-top:20px;
      margin-left:15px;"
    >
      <el-form-item prop="stunum">
        <el-input v-model="search.stunum" placeholder="学号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="search.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item prop="teacher">
        <el-input
          v-model="search.teacher"
          placeholder="教师"
          readonly
          @click.native="dialogTeacherVisible = true"
        ></el-input>
      </el-form-item>
      <el-form-item prop="class">
        <el-input v-model="search.class" placeholder="所在班级"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchData">查询</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button @click="$refs['searchForm'].resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" height="520" border style="width: 100%;margin:10px">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="stunum" label="学号"> </el-table-column>
      <el-table-column prop="name" label="学生姓名"> </el-table-column>
      <el-table-column prop="admissiondate" label="入学时间"> </el-table-column>
      <el-table-column prop="phone" label="手机号码"> </el-table-column>
      <el-table-column prop="teacher" label="授课教师"> </el-table-column>
      <el-table-column prop="job" label="工作单位"> </el-table-column>
      <el-table-column prop="money" label="薪资待遇"> </el-table-column>
      <el-table-column fixed="right" label="操作">
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
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 教师管理弹窗 -->
    <el-dialog title="选择教师" :visible.sync="dialogTeacherVisible">
      <teacher :isDialog="true" @option-teacher="optionTeacher" />
    </el-dialog>
    <!-- 编辑学生弹窗  -->
    <el-dialog title="学员编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="student"
        ref="studentForm"
        :rules="rules"
        label-width="100px"
        label-position="right"
        style="width:400px"
      >
        <el-form-item label="学号" prop="stunum">
          <el-input v-model="student.stunum"></el-input>
        </el-form-item>
        <el-form-item label="学员姓名" prop="name">
          <el-input v-model="student.name"></el-input>
        </el-form-item>
        <el-form-item label="入学时间" prop="admissiondate">
          <el-date-picker
            v-model="student.admissiondate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="student.phone"></el-input>
        </el-form-item>
        <el-form-item label="授课教师" prop="teacher">
          <el-input
            v-model="student.teacher"
            readonly
            @click.native="editOptionTeacher"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在班级" prop="class">
          <el-input v-model="student.class"></el-input>
        </el-form-item>
        <el-form-item label="工作单位" prop="job">
          <el-input v-model="student.job"></el-input>
        </el-form-item>
        <el-form-item label="薪资待遇" prop="money">
          <el-input v-model="student.money"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            student._id === null
              ? addData('studentForm')
              : upData('studentForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import studentApi from "@/api/student.js";
import Teacher from "@/views/teachers";
export default {
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      search: {
        stunum: "",
        name: "",
        teacher: "",
        class: ""
      },
      dialogTeacherVisible: false,
      dialogFormVisible: false,
      student: {
        _id: null,
        stunum: "",
        name: "",
        admissiondate: "",
        phone: "",
        teacher: "",
        class: "",
        job: "",
        money: ""
      },
      rules: {
        stunum: [{ required: true, message: "请输入学号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学员姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入学员手机号码", trigger: "blur" }
        ]
      },
      isEdit: false
    };
  },
  components: {
    Teacher
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    optionTeacher(current) {
      if (this.isEdit) {
        this.student.teacher = current.name;
        this.search.id = current._id;
        this.isEdit = false;
      } else {
        this.search.teacher = current.name;
        this.search.id = current._id;
      }
      this.dialogTeacherVisible = false;
    },
    editOptionTeacher() {
      this.isEdit = true;
      this.dialogTeacherVisible = true;
    },
    fetchData() {
      studentApi
        .search(this.currentPage, this.pageSize, this.search)
        .then(res => {
          const resp = res.data;
          this.list = resp.data.rows;
          this.total = resp.data.total;
          console.log(resp);
        });
    },
    handleEdit(id) {
      this.dialogFormVisible = true;
      studentApi.getById(id).then(res => {
        const resp = res.data;
        if (resp.flag) {
          this.student = resp.data;
        }
        console.log(resp);
      });
    },
    handleDelete(id) {
      this.$confirm("确定要删除此条数据吗？", "提示", {
        confirmButtonText: "我确定",
        cancelButtonText: "再想想"
      })
        .then(() => {
          studentApi.delete(id).then(res => {
            const resp = res.data;
            console.log(resp);
            if (resp.flag) {
              this.currentPage = 1;
              this.fetchData();
            }
          });
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
      console.log(`当前页: ${val}`);
    },
    searchData() {
      this.currentPage = 1;
      this.fetchData();
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["studentForm"].resetFields();
      });
    },
    addData(formName) {
      /*   this.$nextTick(() => {
        this.$refs["studentForm"].resetFields();
      }); */
      this.$refs[formName].validate(valid => {
        if (valid) {
          studentApi
            .add(this.student)
            .then(res => {
              const resp = res.data;
              //console.log(res.data);
              //console.log("新增学生", resp);
              if (resp.flag) {
                this.dialogFormVisible = false;
                this.fetchData();
              } else {
                this.$message({
                  message: resp.msg,
                  type: "wawrning"
                });
              }
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          return false;
        }
      });
    },
    upData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          studentApi.updata(this.student).then(res => {
            const resp = res.data;
            if (resp.flag) {
              this.fetchData();
              this.dialogFormVisible = false;
              this.student._id = null;
            } else {
              this.$message({
                message: resp.msg,
                type: "wawrning"
              });
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped></style>
