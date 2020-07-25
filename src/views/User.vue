<template>
	<div>
		<el-form :inline="true" :model="queryForm" class="demo-form-inline">
			<el-form-item label="姓名">
				<el-input v-model="queryForm.name" placeholder="姓名" clearable=""></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="initData()">查询</el-button>
			</el-form-item>
		</el-form>

		<el-row>
			<el-col :span="3">
				<el-button type="primary" @click="openInsertDialog()">添加</el-button>
			</el-col>
			<el-col :span="3">
				<el-button type="primary" @click="handleDeletes()">批删</el-button>
			</el-col>
		</el-row>

		<el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">

			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="id" label="编号" width="100">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="100">
			</el-table-column>
			<el-table-column prop="username" label="登录名" width="200">
			</el-table-column>
			<el-table-column prop="password" show-password label="密码" width="200">
			</el-table-column>
			<el-table-column prop="created" label="注册时间" width="200">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current"
		 :page-sizes="sizes" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>

		<el-dialog title="添加" :visible.sync="insertDialog" width="30%">
			<el-form :inline="true" :model="insertForm" ref="insertForm" class="demo-form-inline">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="insertForm.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item label="登录名" prop="username">
					<el-input v-model="insertForm.username" placeholder="登录名"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="insertForm.password" placeholder="密码"></el-input>
				</el-form-item>
				<el-form-item label="注册时间" prop="created">
					<el-date-picker v-model="times" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="insertObject()">添加</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog title="修改" :visible.sync="editDialog" width="30%">
			<el-form :inline="true" :model="editForm" ref="insertForm" class="demo-form-inline">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item label="登录名" prop="username">
					<el-input v-model="editForm.username" placeholder="登录名"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="editForm.password" placeholder="密码"></el-input>
				</el-form-item>
				<el-form-item label="注册时间" prop="created">
					<el-date-picker v-model="times" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="editObject()">修改</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				rows: '',
				editForm: {
					id: '',
					name: '',
					username: '',
					password: '',
					created: ''
				},
				editDialog: false,
				times: '',
				insertForm: {
					name: '',
					username: '',
					password: '',
					created: ''
				},
				insertDialog: false,
				queryForm: {
					name: ''
				},
				current: 1,
				size: 3,
				sizes: [3, 5],
				total: 0,
				tableData: []
			}
		},
		methods: {
			insertObject() {
				this.axios.post("http://localhost:8001/user/insert", this.insertForm).then((res) => {
					if (res.data) {
						this.$refs['insertForm'].resetFields();
						this.insertDialog = false;
						this.initData();
						this.$message({
							type: 'success',
							message: '添加成功'
						})
					} else {
						this.$message({
							type: 'info',
							message: '添加失败'
						})
					}
				})
			},
			openInsertDialog() {
				this.insertDialog = true;
			},
			handleDeletes() {
				this.$confirm('确认删除这些数据吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消'
					})
					.then(() => {
						this.axios.post("http://localhost:8001/user/delete", null, {
							params: {
								ids: this.rows.map((row) => row.id).join(",")
							}
						}).then((res) => {
							if (res.data) {
								this.$message({
									type: 'success',
									message: '删除成功'
								});
								//初始化数据
								this.initData();
							} else {
								this.$message.error("删除失败");
							}
						})
					})
					.catch(action => {
						this.$message({
							type: 'info',
							message: '取消删除'
						})
					});
			},
			handleDelete(ids) {
				this.$confirm('确认删除这条数据吗？', '提示信息', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(() => {
						this.axios.post("http://localhost:8001/user/delete", null, {
							params: {
								ids: ids
							}
						}).then((res) => {
							if (res.data) {
								this.$message({
									type: 'success',
									message: '删除成功'
								});
								//初始化数据
								this.initData();
							} else {
								this.$message.error("删除失败");
							}
						})
					})
					.catch(action => {
						this.$message({
							type: 'info',
							message: '取消删除'
						})
					});
				/* this.$confirm('确认删除这条数据吗？', '提示', {
						confirmButtonText: '确认',
						cancelButtonText: '取消'
					})
					.then(() => {
						this.post("http://localhost:8001/user/delete",null,{params:{
							ids:ids
						}}).then((res)=>{
							if(res.data){
								this.$message({
									type: 'success',
									message: '删除成功'
								});
								this.initData();
							} else{
								this.$message({
									type: 'info',
									message: '删除失败'
								});
							}
						})
					})
					.catch(action => {
						this.$message({
							type: 'info',
							message: '取消删除'
						})
					}); */
			},
			handleSelectionChange(val) {
				this.rows = val;
			},
			editObject() {
				this.axios.post("http://localhost:8001/user/update", this.editForm).then((res) => {
					if (res.data) {
						this.$refs['editForm'].resetFields();
						this.editDialog = false;
						this.initData();
						this.$message({
							type: 'success',
							message: '修改成功'
						})
					} else {
						this.$message({
							type: 'info',
							message: '修改失败'
						})
					}
				})
			},
			handleEdit(row) {
				Object.assign(this.editForm, row);
				this.editDialog = true;
			},
			handleCurrentChange(val) {
				this.current = val;
				this.initData();
			},
			handleSizeChange(val) {
				this.size = val;
				this.initData();
			},
			initData() {
				this.axios.get("http://localhost:8001/user/list", {
					params: {
						current: this.current,
						size: this.size,
						name: this.queryForm.name
					}
				}).then((response) => {
					this.tableData = response.data.records;
					this.total = response.data.total;
					this.current = response.data.current;
					this.size = response.data.size;
				})
			}
		},
		created() {
			this.initData();
		}
	}
</script>

<style scoped>

</style>
