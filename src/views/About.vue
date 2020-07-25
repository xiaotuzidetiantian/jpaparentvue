<template>
	<el-main>
		<el-row>
			<el-col :span="5">
				<el-button type="success" @click="saveMenuDialogFormVisible = true" icon="el-icon-circle-plus">添加菜品</el-button>
			</el-col>
			<el-col :span="19">
				<el-form :inline="true" :model="searchMenuForm" class="demo-form-inline">
					<el-form-item label="菜品名称:">
						<el-input v-model="searchMenuForm.name" placeholder="菜品"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="searchMenuFormSubmit">查询</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="name" label="名称">
			</el-table-column>
			<el-table-column prop="oldprice" label="原价">
			</el-table-column>
			<el-table-column prop="discount" label="折扣">
			</el-table-column>
			<el-table-column prop="discountprice" label="打折价">
			</el-table-column>
			<el-table-column prop="操作">
				<template slot-scope="scope">
					<el-button type="info" icon="el-icon-edit" @click="menuFormEdit(scope.row)">修改</el-button>
					<el-button type="danger" icon="el-icon-delete" @click="delMenuForm(scope.row.id)">删除</el-button>
					<el-button type="warning" icon="el-icon-s-order" @click="OrderFoodSave(scope.row)">点餐</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current"
		 :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>

		<!-- //////////////////////////////添加菜品////////////////////////////////// -->
		<el-dialog title="添加菜品" :visible.sync="saveMenuDialogFormVisible">
			<el-form :model="saveMenuForm">
				<el-form-item label="名称:" :label-width="formLabelWidth">
					<el-input v-model="saveMenuForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="折扣:" :label-width="formLabelWidth">
					<el-input v-model="saveMenuForm.discount" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="原价:" :label-width="formLabelWidth">
					<el-input v-model="saveMenuForm.oldprice" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="saveMenuDialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveMenuFormDialogSubmit">确 定</el-button>
			</div>
		</el-dialog>

		<!-- //////////////////////////////添加菜品////////////////////////////////// -->
		<el-dialog title="修改菜品" :visible.sync="editMenuDialogFormVisible">
			<el-form :model="editMenuForm">
				<el-form-item label="名称:" :label-width="formLabelWidth">
					<el-input v-model="editMenuForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="折扣:" :label-width="formLabelWidth">
					<el-input v-model="editMenuForm.discount" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="原价:" :label-width="formLabelWidth">
					<el-input v-model="editMenuForm.oldprice" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editMenuDialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="editMenuFormDialogSubmit">确 定</el-button>
			</div>
		</el-dialog>

		<!-- //////////////////////////////点餐////////////////////////////////// -->
		<el-dialog title="点餐" :visible.sync="saveOrderFoodDialogFormVisible">
			<el-form :model="saveOrderFoodForm">
				<el-form-item label="用户名:" :label-width="formLabelWidth">
					<el-input v-model="saveOrderFoodForm.oname" autocomplete="on"></el-input>
				</el-form-item>
				<el-form-item label="名称:" :label-width="formLabelWidth">
					<el-input v-model="saveOrderFoodForm.name" autocomplete="on" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="折扣价格:" :label-width="formLabelWidth">
					<el-input v-model="saveOrderFoodForm.discountprice" autocomplete="on" :disabled="true"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="saveOrderFoodDialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveOrderFoodFormDialogSubmit">确 定</el-button>
			</div>
		</el-dialog>
	</el-main>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				current: 1,
				pageSize: 3,
				pageSizes: [3, 4, 5],
				total: 0,
				searchMenuForm: {
					name: ''
				},
				saveMenuDialogFormVisible: false,
				formLabelWidth: '120px',
				saveMenuForm: {
					name: '',
					oldprice: '',
					discount: ''
				},
				editMenuDialogFormVisible: false,
				editMenuForm: {
					name: '',
					oldprice: '',
					discount: ''
				},
				saveOrderFoodDialogFormVisible: false,
				saveOrderFoodForm: {
					oname: '',
					name: '',
					discountprice: ''
				}
			}
		},
		created() {
			this.initData();
		},
		methods: {
			initData() {
				this.axios.get("http://localhost:8100/api/food-service/menu/list", {
					params: {
						current: this.current,
						size: this.pageSize,
						name: this.searchMenuForm.name
					}
				}).then(res => {
					this.tableData = res.data.result.records;
					this.total = res.data.result.total;
				})
			},
			handleCurrentChange(val) {
				this.current = val;
				this.initData();
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.initData();
			},
			searchMenuFormSubmit() {
				this.initData();
			},
			saveMenuFormDialogSubmit() {
				this.axios.post("http://localhost:8100/api/food-service/menu/insert", this.saveMenuForm).then(res => {
					if (res.data) {
						this.$message({
							message: '恭喜你，菜品添加成功!',
							type: 'success'
						});
						this.saveMenuDialogFormVisible = false;
						this.initData();
					} else {
						this.$message.error('错了哦，菜品添加失败，请重新添加!');
					}
				})
			},
			menuFormEdit(row) {
				this.editMenuDialogFormVisible = true;
				Object.assign(this.editMenuForm, row);
			},
			editMenuFormDialogSubmit() {
				this.axios.post("http://localhost:8100/api/food-service/menu/update", this.editMenuForm).then(res => {
					if (res.data) {
						this.$message({
							message: '恭喜你，菜品修改成功!',
							type: 'success'
						});
						this.editMenuDialogFormVisible = false;
						this.initData();
					} else {
						this.$message.error('错了哦，菜品修改失败，请重新添加!');
					}
				})
			},
			delMenuForm(id) {
				this.axios.get("http://localhost:8100/api/food-service/menu/del", {
					params: {
						ids: id
					}
				}).then(res => {
					if (res.data) {
						this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.current = 1;
							this.initData();
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消删除'
							});
						});
					}
				})
			},
			OrderFoodSave(row) {
				this.saveOrderFoodDialogFormVisible = true;
				Object.assign(this.saveOrderFoodForm, row);
				this.initData();
			},
			saveOrderFoodFormDialogSubmit() {
				this.axios.post("http://localhost:8100/api/food-service/orderfood/saveFood", this.saveOrderFoodForm).then(res => {
					if (res.data) {
						this.$message({
							message: '恭喜你，点餐成功!',
							type: 'success'
						});
						this.saveOrderFoodDialogFormVisible = false;
						this.initData();
					} else {
						this.$message.error('错了哦，点餐失败，请重新点餐!');
					}
				})
			}
		}
	}
</script>
