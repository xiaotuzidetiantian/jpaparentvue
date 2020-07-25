<template>
	<div>
		<div>
			<el-form :inline="true" :model="formData" class="demo-form-inline">
				<el-form-item label="登录名">
					<el-input v-model="formData.username" placeholder="登录名"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="formData.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-select v-model="formData.sex" placeholder="性别">
						<el-option label="全部" value="0"></el-option>
						<el-option label="男" value="1"></el-option>
						<el-option label="女" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="queryData">查询</el-button>
					<el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
				</el-form-item>
			</el-form>
		</div>

		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="uid" label="编号" width="100">
			</el-table-column>
			<el-table-column prop="username" label="登录名" width="200">
			</el-table-column>
			<el-table-column prop="password" show-password label="密码" width="200">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="100">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="100">
			</el-table-column>
			<el-table-column prop="telephone" label="电话" width="100">
			</el-table-column>
			<el-table-column prop="birthday" label="生日" width="100">
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100">
				<template slot-scope="scope">
					{{scope.row.sex==1?'男':'女'}}
				</template>
			</el-table-column>
			<el-table-column prop="state" label="状态" width="100">
				<template slot-scope="scope">
					{{scope.row.sex==1?'是':'否'}}
				</template>
			</el-table-column>
			<el-table-column prop="code" label="描述" width="100">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
					<el-button type="text" size="small" @click="del(scope.row.uid)">删除</el-button>
				</template>
			</el-table-column>

		</el-table>

		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
			 :page-sizes="[1, 5, 9, 13]" :page-size="3" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
			</el-pagination>
		</div>


		<!-- Form -->
		<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
			<el-form :model="userModel">
				<el-form-item label="用户名" :label-width="formLabelWidth">
					<el-input v-model="userModel.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名" :label-width="formLabelWidth">
					<el-input v-model="userModel.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
					<el-input v-model="userModel.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="生日" :label-width="formLabelWidth">
					<el-date-picker v-model="userModel.birthday" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>

				<el-form-item label="性别" :label-width="formLabelWidth">
					<el-select v-model="userModel.sex" placeholder="性别">
						<el-option label="男" value="1"></el-option>
						<el-option label="女" value="2"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="驾驶证类型" :label-width="formLabelWidth">
					<el-input v-model="userModel.driverCard.cardtype" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="过期时间" :label-width="formLabelWidth">
					<el-date-picker v-model="userModel.driverCard.expiredate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="commitData">确 定</el-button>
			</div>
		</el-dialog>


	</div>
</template>

<script>
	export default {

		data() {
			return {
				formLabelWidth: '120px',
				dialogFormVisible: false,
				userModel: {
					uid: '',
					username: '',
					password: '',
					name: '',
					email: '',
					telephone: '',
					birthday: '',
					sex: 0,
					state: 0,
					code: '',
					driverCard: {
						//驾驶证类型
						cardtype: '',
						// 过期时间
						expiredate: ''
					}
				},
				currentPage: 1,
				tableData: [],
				pageTotal: 1,
				formData: {
					username: '',
					name: '',
					sex: 0
				},
			}
		},
		created() {
			this.initData(1, 5);
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`)
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`)
				this.initData(val, 5)
			},
			commitData() {
				this.axios.post("http://localhost:8200/user/add", this.userModel).then((resp) => {
					if (resp.data == true) {
						this.$message({
							type: 'success',
							message: '添加成功'
						});
						this.dialogFormVisible = false

						this.userModel = {
							uid: '',
							username: '',
							password: '',
							name: '',
							email: '',
							telephone: '',
							birthday: '',
							sex: 0,
							state: 0,
							code: '',
							driverCard: {
								//驾驶证类型
								cardtype: '',
								// 过期时间
								expiredate: ''
							}
						}
						// 刷新列表
						this.initData(this.currentPage, 5)
					} else {
						this.$message({
							type: 'error',
							message: '添加失败'
						});
					}
				})
			},
			queryData() {
				this.initData(1, 5)
			},
			del(id) {
				//确认是否删除？
				this.$confirm('此操作将永久删除该数据[' + id + '], 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// 用户点击确定的时候执行
					this.axios.get('http://localhost:8200/user/del', {
							params: {
								id: id
							}
						})
						.then((response) => {
							if (response.data == true) {
								this.$message({
									type: 'success',
									message: '删除成功'
								});
								// 刷新列表
								this.initData(this.currentPage, 5)
							} else {
								this.$message({
									type: 'error',
									message: '删除失败'
								});
							}
						})

				}).catch(() => {
					// 用户点击取消的时候执行	
					this.$message({
						type: 'info',
						message: '已取消删除'
					});

				});

			},
			initData(page, pageSize) {
				this.axios.get('http://localhost:8200/user/list', {
					params: {
						username: this.formData.username,
						name: this.formData.name,
						sex: this.formData.sex,
						page: page,
						pageSize: pageSize
					}
				}).
				then((res) => {
					console.log(res.data);
					this.tableData = res.data.content;
					this.currentPage = res.data.number;
					this.pageTotal = res.data.totalPages;
				})
			}
		}
	}
</script>
