  <template>
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <div style="text-align: center; padding: 10px; font-size: 18px; color: #333;">企业人事管理系统</div>
        <el-menu :default-openeds="['1','2', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>显示</template>
              <el-menu-item index="1-1" @click="viewEmployees">查看员工</el-menu-item>
              <el-menu-item index="1-2" @click="viewSalary">查看工资</el-menu-item>
              <el-menu-item index="1-3" @click="viewDepartment">查看部门</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>插入用户</template>
              <el-menu-item index="2-1" @click="lnsertEmployee">添加员工</el-menu-item>
              <el-menu-item index="2-2" @click="lnsertSalary">插入工资</el-menu-item>
              <el-menu-item index="2-3" @click="lnsertDepartment">添加部门</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>更新数据</template>
              <el-menu-item index="3-1" @click="lpdateStaff">更新员工</el-menu-item>
              <el-menu-item index="3-2" @click="lpdateSalary">更新工资表</el-menu-item>
              <el-menu-item index="3-3" @click="lpdateDepartment">更新部门</el-menu-item>
          </el-submenu>
          <el-menu-item index="3-3" @click="logout">退出</el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu>
              <el-dropdown-item >退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>管理员</span>
        </el-header>

        <el-main>
          <el-table v-if="showEmployeesTable":data="tableData">
            <el-table-column prop="id" label="工号" width="140"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="joinedDate" label="入职年月"></el-table-column>
            <el-table-column prop="leaveDays" label="请假天数"></el-table-column>
          </el-table>
        </el-main>
        <el-main> <!-- 表格组件 -->
          <el-table v-if="showSalaryTable":data="salaryData">
            <el-table-column prop="id" label="工号"></el-table-column>
            <el-table-column prop="departmentId" label="部门号"></el-table-column>
            <el-table-column prop="salary" label="基础薪资"></el-table-column>
            <el-table-column prop="bonus" label="奖金"></el-table-column>
            <el-table-column prop="meritSalary" label="绩效工资"></el-table-column>
            <el-table-column prop="fine" label="罚款"></el-table-column>
            <el-table-column prop="fund" label="公积金"></el-table-column>
            <el-table-column prop="insure" label="保险"></el-table-column>
            <el-table-column prop="total" label="总和"></el-table-column>
          </el-table>
        </el-main>
        <el-main>
          <el-table v-if="showDepartmentTable" :data="departmentData">
            <el-table-column prop="departmentId" label="部门ID"></el-table-column>
            <el-table-column prop="departmentName" label="部门名称"></el-table-column>
            <el-table-column prop="projectCount" label="项目完成数"></el-table-column>
          </el-table>
        </el-main>
          <!-- 添加员工表单 -->
          <el-form v-if="showAddEmployeeForm" :model="addEmployeeForm" ref="addEmployeeForm">
            <el-form-item label="工号" prop="Staff_Id">
              <el-input v-model="addEmployeeForm.id"></el-input>
              </el-form-item>
            <el-form-item label="姓名" prop="Staff_Name">
              <el-input v-model="addEmployeeForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="Staff_sex">
              <el-input v-model="addEmployeeForm.sex"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="Staff_age">
              <el-input v-model.number="addEmployeeForm.age"></el-input>
            </el-form-item>
            <el-form-item label="入职年月" prop="Staff_joinedDate">
              <el-input v-model="addEmployeeForm.joinedDate"></el-input>
            </el-form-item>
            <el-form-item label="请假天数" prop="Staff_leaveDays">
              <el-input v-model.number="addEmployeeForm.leaveDays"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="insertEmployee">添加员工</el-button>
            </el-form-item>
          </el-form>
            <!--插入工资-->
        <el-form v-if="showAddSalaryForm" :model="addSalaryForm" ref="addSalaryForm" label-width="80px">
          <el-form-item label="员工工号" prop="employeeId">
            <el-input v-model="addSalaryForm.id"></el-input>
          </el-form-item>
          <el-form-item label="部门号" prop="departmentId">
            <el-input v-model="addSalaryForm.departmentId"></el-input>
          </el-form-item>
          <el-form-item label="基础薪资" prop="salary">
            <el-input v-model="addSalaryForm.salary"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="insertSalary">插入工资</el-button>
          </el-form-item>
        </el-form>
        <!--插入部门-->
        <!-- 添加部门表单 -->
        <el-form v-if="showAddDepartmentForm" :model="addDepartmentForm" ref="addDepartmentForm">
          <el-form-item label="部门号" prop="departmentId">
            <el-input v-model="addDepartmentForm.departmentId"></el-input>
          </el-form-item>
          <el-form-item label="部门名称" prop="departmentName">
            <el-input v-model="addDepartmentForm.departmentName"></el-input>
          </el-form-item>
          <el-form-item label="项目完成数" prop="projectCount">
            <el-input v-model.number="addDepartmentForm.projectCount"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="insertDepartment">添加部门</el-button>
          </el-form-item>
        </el-form>
        <el-main>
          <!-- 更新部门表单 -->
          <el-form v-if="showUpdateDepartment" :model="updateDepartmentForm" ref="updateDepartmentForm">
            <el-form-item label="部门号" prop="departmentId">
              <el-input v-model="updateDepartmentForm.departmentId"></el-input>
            </el-form-item>
            <el-form-item label="项目完成数" prop="projectCount">
              <el-input v-model.number="updateDepartmentForm.projectCount"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateDepartment">更新部门信息</el-button>
            </el-form-item>
          </el-form>
        </el-main>
        <!-- 更新员工表单 -->
        <el-main>
        <el-form v-if="showUpdateEmployee" :model="updateEmployeeForm" ref="updateEmployeeForm">
          <el-form-item label="工号" prop="id">
            <el-input v-model="updateEmployeeForm.id"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="updateEmployeeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input v-model="updateEmployeeForm.sex"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="updateEmployeeForm.age"></el-input>
          </el-form-item>
          <el-form-item label="入职年月" prop="joinedDate">
            <el-input v-model="updateEmployeeForm.joinedDate"></el-input>
          </el-form-item>
          <el-form-item label="请假天数" prop="leaveDays">
            <el-input v-model.number="updateEmployeeForm.leaveDays"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateStaff">更新员工信息</el-button>
          </el-form-item>
        </el-form>
        </el-main>
        <!-- 更新薪资表单 -->
        <el-main>
        <el-form v-if="showUpdateSalary" :model="updateSalaryForm" ref="updateSalaryForm">
          <el-form-item label="员工工号" prop="id">
            <el-input v-model="updateSalaryForm.id"></el-input>
          </el-form-item>
          <el-form-item label="基础薪资" prop="salary">
            <el-input v-model="updateSalaryForm.salary"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateSalary">更新薪资信息</el-button>
          </el-form-item>
        </el-form>
        </el-main>
      </el-container>
    </el-container>
  </template>

  <style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  </style>

  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        tableData: [],
        salaryData: [],
        departmentData: [],
        showEmployeesTable: false,
        showSalaryTable: false,
        showDepartmentTable: false,
        showAddEmployeeForm: false,
        showAddSalaryForm:false,
        showAddDepartmentForm:false,// 添加这一行
        showUpdateDepartment:false,
        showUpdateEmployee: false,
        showUpdateSalary: false,
        updateEmployeeForm: {
          id: null,
          name: '',
          sex: '',
          age: null,
          joinedDate: '',
          leaveDays: null,
        },
        updateSalaryForm: {
          id: '',
          salary: '',
        },
        addEmployeeForm: {
          id:'',
          name: '',
          sex: '',
          age: null,
         joinedDate:'',
          leaveDays:'',
          },
        addSalaryForm:{
          id:'',
          departmentId:'',
          salary:'',
        },
        addDepartmentForm:{
          departmentId:'',
          departmentName:'',
          projectCount:'',
        },
        updateDepartmentForm: {
          departmentId: null,
          projectCount: null,
        },
      };
    },
    methods: {
      logout() {
        // 然后使用路由跳转到登录界面
        this.$router.push('/login');
      },
      fetchStaffData() {
        // 使用Axios发起HTTP GET请求从后端获取所有员工数据
        axios.get('http://localhost:8080/staff/all') // 更新URL以匹配你的后端地址
            .then(response => {
              this.tableData = response.data;
            })
            .catch(error => {
              console.error('获取员工数据时发生错误:', error);
            });

      },
      viewEmployees() {
        this.showEmployeesTable = true;
        this.showSalaryTable = false;
        this.showDepartmentTable=false;
        this.showAddEmployeeForm=false;
        this.showAddSalaryForm=false;
        this.showAddDepartmentForm=false;
        this.showUpdateDepartment=false;
        this.showUpdateEmployee=false;
        this.showUpdateSalary=false;
        this.fetchStaffData();
      },

      // 获取工资数据
      fetchSalaryData() {
        axios.get('http://localhost:8080/salary/all')
            .then(response => {
              this.salaryData = response.data;
            })
            .catch(error => {
              console.error('获取工资数据时发生错误:', error);
            });
      },
      // 查询工资按钮点击事件
      viewSalary() {
        this.showSalaryTable = true;
        this.showEmployeesTable = false;
        this.showDepartmentTable=false;
        this.showAddEmployeeForm=false;
        this.showAddSalaryForm=false;
        this.showAddDepartmentForm=false;
        this.showUpdateDepartment=false;
        this.showUpdateEmployee=false;
        this.showUpdateSalary=false;
        this.fetchSalaryData();
      },
      fetchDepartmentData() {
        axios.get('http://localhost:8080/department/all')
            .then(response => {
              this.departmentData = response.data;
            })
            .catch(error => {
              console.error('获取部门数据时发生错误:', error);
            });
      },
      viewDepartment() {
        this.showDepartmentTable = true;
        this.showEmployeesTable = false;
        this.showSalaryTable = false;
        this.showAddEmployeeForm=false;
        this.showAddSalaryForm=false;
        this.showAddDepartmentForm=false;
        this.showUpdateDepartment=false;
        this.showUpdateEmployee=false;
        this.showUpdateSalary=false;
        this.fetchDepartmentData();
      },

      //添加员工
      linsertEmployee() {
        // 发起插入员工的请求
        axios.post('http://localhost:8080/staff/InsertStaff',
         this.addEmployeeForm)
            .then(response => {
              // 插入成功后的处理
              console.log('员工插入成功:', response.data);
              // 清空表单数据
              this.$refs.addEmployeeForm.resetFields();
            })
            .catch(error => {
              // 插入失败的处理
              console.error('插入员工时发生错误:', error);
            });
      },
      insertEmployee(){
        this.showDepartmentTable = false;
        this.showEmployeesTable = false;
        this.showSalaryTable = false;
        this.showAddEmployeeForm=true;
        this.showAddSalaryForm=false;
        this.showAddDepartmentForm=false;
        this.showUpdateDepartment=false;
        this.showUpdateEmployee=false;
        this.showUpdateSalary=false;
        this.linsertEmployee();
      },
     lnsertEmployee(){
       this.showDepartmentTable = false;
       this.showEmployeesTable = false;
       this.showSalaryTable = false;
       this.showAddEmployeeForm=true;
       this.showAddSalaryForm=false;
       this.showAddDepartmentForm=false;
       this.showUpdateDepartment=false;
       this.showUpdateEmployee=false;
       this.showUpdateSalary=false;
     },

      //插入薪资
      linsertSalary() {
        // 发起插入员工的请求
        axios.post('http://localhost:8080/salary/InsertSalary',
            this.addSalaryForm)
            .then(response => {
              // 插入成功后的处理
              console.log('薪资插入成功:', response.data);
              // 清空表单数据
              this.$refs.addSalaryForm.resetFields();
            })
            .catch(error => {
              // 插入失败的处理
              console.error('薪资插入时发生错误:', error);
            });
      },
      insertSalary(){
        this.showDepartmentTable = false;
        this.showEmployeesTable = false;
        this.showSalaryTable = false;
        this.showAddEmployeeForm=false;
        this.showAddSalaryForm=true;
        this.showAddDepartmentForm=false;
        this.showUpdateDepartment=false;
        this.showUpdateEmployee=false;
        this.showUpdateSalary=false;
        this.linsertSalary();
      },
      lnsertSalary(){
        this.showDepartmentTable = false;
        this.showEmployeesTable = false;
        this.showSalaryTable = false;
        this.showAddEmployeeForm=false;
        this.showAddSalaryForm=true;
        this.showAddDepartmentForm=false;
        this.showUpdateDepartment=false;
        this.showUpdateEmployee=false;
        this.showUpdateSalary=false;
    },
      //插入部门
      linsertDepartment() {
        // 发起插入部门的请求
        axios.post('http://localhost:8080/department/InsertDepartment',
            this.addDepartmentForm)
            .then(response => {
              // 插入成功后的处理
              console.log('部门插入成功:', response.data);
              // 清空表单数据
              this.$refs.addDepartmentForm.resetFields();
            })
            .catch(error => {
              // 插入失败的处理
              console.error('插入部门时发生错误:', error);
            });
      },
      insertDepartment(){
        this.showDepartmentTable = false;
        this.showEmployeesTable = false;
        this.showSalaryTable = false;
        this.showAddEmployeeForm=false;
        this.showAddSalaryForm=false;
        this.showAddDepartmentForm=true;
        this.showUpdateDepartment=false;
        this.showUpdateEmployee=false;
        this.showUpdateSalary=false;
        this.linsertDepartment();
      },
      lnsertDepartment(){
        this.showDepartmentTable = false;
        this.showEmployeesTable = false;
        this.showSalaryTable = false;
        this.showAddEmployeeForm=false;
        this.showAddSalaryForm=false;
        this.showAddDepartmentForm=true;
        this.showUpdateDepartment=false;
        this.showUpdateEmployee=false;
        this.showUpdateSalary=false;
    },
      //更新
      // 更新部门信息
      lupdateDepartment() {
        axios.post(`http://localhost:8080/department/UpdateDepartment`, this.updateDepartmentForm)
            .then(response => {
              // 更新成功后的处理
              console.log('部门信息更新成功:', response.data);
              // 清空表单数据
              this.$refs.updateDepartmentForm.resetFields();
              this.showUpdateDepartment = false;
            })
            .catch(error => {
              // 更新失败的处理
              console.error('更新部门信息时发生错误:', error);
            });
      },
      updateDepartment(){
        this.showDepartmentTable = false;
        this.showEmployeesTable = false;
        this.showSalaryTable = false;
        this.showAddEmployeeForm=false;
        this.showAddSalaryForm=false;
        this.showAddDepartmentForm=false;
        this.showUpdateDepartment=true;
        this.showUpdateEmployee=false;
        this.showUpdateSalary=false;
        this.lupdateDepartment();
      },
      lpdateDepartment(){
        this.showDepartmentTable = false;
        this.showEmployeesTable = false;
        this.showSalaryTable = false;
        this.showAddEmployeeForm=false;
        this.showAddSalaryForm=false;
        this.showAddDepartmentForm=false;
        this.showUpdateDepartment=true;
        this.showUpdateEmployee=false;
        this.showUpdateSalary=false;
      },
      // 更新员工信息
      lupdateStaff() {
        axios.post(`http://localhost:8080/staff/UpdateStaff`, this.updateEmployeeForm)
            .then(response => {
              // 更新成功后的处理
              console.log('员工信息更新成功:', response.data);
              // 清空表单数据
              this.$refs.updateEmployeeForm.resetFields();
            })
            .catch(error => {
              // 更新失败的处理
              console.error('更新员工信息时发生错误:', error);
            });
      },
      updateStaff(){
        this.showDepartmentTable = false;
        this.showEmployeesTable = false;
        this.showSalaryTable = false;
        this.showAddEmployeeForm=false;
        this.showAddSalaryForm=false;
        this.showAddDepartmentForm=false;
        this.showUpdateDepartment=false;
        this.showUpdateEmployee=true;
        this.showUpdateSalary=false;
        this.lupdateStaff();
      },
      lpdateStaff(){
        this.showDepartmentTable = false;
        this.showEmployeesTable = false;
        this.showSalaryTable = false;
        this.showAddEmployeeForm=false;
        this.showAddSalaryForm=false;
        this.showAddDepartmentForm=false;
        this.showUpdateDepartment=false;
        this.showUpdateEmployee=true;
        this.showUpdateSalary=false;
      },
      // 更新薪资信息
      lupdateSalary() {
        axios.post(`http://localhost:8080/salary/UpdateSalary`, this.updateSalaryForm)
            .then(response => {
              // 更新成功后的处理
              console.log('薪资信息更新成功:', response.data);
              // 清空表单数据
              this.$refs.updateSalaryForm.resetFields();
              this.showUpdateSalary = false;
            })
            .catch(error => {
              // 更新失败的处理
              console.error('更新薪资信息时发生错误:', error);
            });
      },
      updateSalary(){
        this.showDepartmentTable = false;
        this.showEmployeesTable = false;
        this.showSalaryTable = false;
        this.showAddEmployeeForm=false;
        this.showAddSalaryForm=false;
        this.showAddDepartmentForm=false;
        this.showUpdateDepartment=false;
        this.showUpdateEmployee=false;
        this.showUpdateSalary=true;
        this.lupdateSalary();
      },
      lpdateSalary(){
        this.showDepartmentTable = false;
        this.showEmployeesTable = false;
        this.showSalaryTable = false;
        this.showAddEmployeeForm=false;
        this.showAddSalaryForm=false;
        this.showAddDepartmentForm=false;
        this.showUpdateDepartment=false;
        this.showUpdateEmployee=false;
        this.showUpdateSalary=true;
      },
    },
  };
  </script>
