<template>
	<div>
		<el-form :inline="true" :model="queryForm" class="demo-form-inline">
			<el-form-item label="单号">
				<el-input v-model="queryForm.recordno" placeholder="单号" clearable=""></el-input>
			</el-form-item>
			<el-form-item label="商品名称">
				<el-input v-model="queryForm.goodsid" placeholder="商品名称" clearable=""></el-input>
			</el-form-item>
			<el-form-item label="日期">
				<el-date-picker v-model="times" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="initData()">查询</el-button>
			</el-form-item>
		</el-form>

		<el-row>
			<el-col :span="3">
				<el-button type="primary" @click="openInsertDialog">添加</el-button>
			</el-col>
		</el-row>


		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="编号" width="100">
			</el-table-column>
			<el-table-column prop="recordno" label="单号" width="180">
			</el-table-column>
			<el-table-column prop="recorddate" label="日期" width="180">
			</el-table-column>
			<el-table-column prop="warehourse" label="仓库" width="180">
			</el-table-column>
			<el-table-column prop="types" label="类型" width="180">
			</el-table-column>
			<el-table-column prop="goodsName" label="商品名称" width="180">
			</el-table-column>
			<el-table-column prop="amount" label="数量" width="180">
			</el-table-column>
			<el-table-column prop="totalprice" label="总金额" width="180">
			</el-table-column>
			<el-table-column prop="supplierName" label="供应商名称" width="180">
			</el-table-column>


			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="openEditDialog(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		</el-table>


		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current"
		 :page-sizes="sizes" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
		</el-pagination>


		<el-dialog title="添加" :visible.sync="insertDialog" width="50%">
			<el-form :inline="true" :model="insertForm" class="demo-form-inline">
				<el-form-item label="单号" prop="recordno">
					<el-input v-model="insertForm.recordno" placeholder="单号"></el-input>
				</el-form-item>
				<el-form-item label="日期" prop="recorddate">
					<el-date-picker v-model="insertForm.recorddate" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="仓库" prop="warehourse">
					<el-input v-model="insertForm.warehourse" placeholder="仓库"></el-input>
				</el-form-item>
				<!-- <el-form-item label="类型">
					<el-select v-model="insertForm.region" placeholder="类型">
						<el-option label="出库"></el-option>
						<el-option label="入库"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="类型">
					<el-input v-model="insertForm.types" placeholder="类型"></el-input>
				</el-form-item>
				<el-form-item label="商品名称">
					<el-select v-model="insertForm.goodsid" placeholder="商品名称">
						<el-option v-for="g in goods" :value="g.id">{{g.name}}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="数量" prop="amount">
					<el-input v-model="insertForm.amount" placeholder="数量"></el-input>
				</el-form-item>
				<el-form-item label="总金额" prop="totalprice">
					<el-input v-model="insertForm.totalprice" placeholder="总金额"></el-input>
				</el-form-item>
				<el-form-item label="供应商名称">
					<el-select v-model="insertForm.supplierid" placeholder="供应商名称">
						<el-option v-for="s in supplier" :value="s.id">{{s.name}}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="insertObject">添加</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>


		<el-dialog title="修改" :visible.sync="editDialog" width="50%">
			<el-form :inline="true" :model="editForm" class="demo-form-inline">
				<el-form-item label="单号" prop="recordno">
					<el-input v-model="editForm.recordno" placeholder="单号"></el-input>
				</el-form-item>
				<el-form-item label="日期" prop="recorddate">
					<el-date-picker v-model="editForm.recorddate" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="仓库" prop="warehourse">
					<el-input v-model="editForm.warehourse" placeholder="仓库"></el-input>
				</el-form-item>
				<!-- <el-form-item label="类型">
					<el-select v-model="editForm.region" placeholder="类型">
						<el-option label="出库"></el-option>
						<el-option label="入库"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="商品名称">
					<el-select v-model="editForm.goodsid" placeholder="商品名称">
						<el-option v-for="g in goods" :value="g.id">{{g.name}}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="数量" prop="amount">
					<el-input v-model="editForm.amount" placeholder="数量"></el-input>
				</el-form-item>
				<el-form-item label="总金额" prop="totalprice">
					<el-input v-model="editForm.totalprice" placeholder="总金额"></el-input>
				</el-form-item>
				<el-form-item label="供应商名称">
					<el-select v-model="editForm.supplierid" placeholder="供应商名称">
						<el-option v-for="s in supplier" :value="s.id">{{s.name}}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="editObject">编辑</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				editForm: {
					id: '',
					recordno: '',
					recorddate: '',
					warehourse: '',
					types: '',
					goodsid: '',
					amount: '',
					totalprice: '',
					supplierid: ''
				},
				editDialog: false,
				insertForm: {
					recordno: '',
					recorddate: '',
					warehourse: '',
					types: '',
					goodsid: '',
					amount: '',
					totalprice: '',
					supplierid: ''
				},
				supplier: [],
				goods: [],
				insertDialog: false,
				times: '',
				queryForm: {
					recordno: '',
					goodsid: '',
					recorddate1: '',
					recorddate2: ''
				},
				total: 0,
				current: 1,
				size: 3,
				sizes: [3, 5],
				tableData: []
			}
		},
		methods: {
			editObject() {
				this.axios.post("http://localhost:83/record/edit", this.editForm).then((res) => {
					if (res.data) {
						this.$message({
							type: 'success',
							message: '修改成功'
						})
						this.initData();
					} else {
						this.$message({
							type: 'info',
							message: '修改失败'
						})
					}
				})
			},
			openEditDialog(row) {
				Object.assign(this.editForm,row);
				this.editDialog = true;
			},
			insertObject() {
				this.axios.post("http://localhost:83/record/insert", this.insertForm).then((res) => {
					if (res.data) {
						this.$message({
							type: 'success',
							message: '添加成功'
						})
						this.initData();
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
			handleCurrentChange(val) {
				this.current = val;
				this.initData();
			},
			handleSizeChange(val) {
				this.size = val;
				this.initData();
			},
			initData() {
				this.axios.get("http://localhost:83/record/list", {
					params: {
						current: this.current,
						size: this.size,
						recordno: this.queryForm.recordno,
						goodsid: this.queryForm.goodsid,
						recorddate1: this.queryForm.recorddate1,
						recorddate2: this.queryForm.recorddate2
					}
				}).then((res) => {
					this.tableData = res.data.records;
					this.total = res.data.total;
					this.current = res.data.current;
				})
			},
			initGoodsData() {
				this.axios.get("http://localhost:83/goods/list").then((res) => {
					this.goods = res.data;
				})
			},
			initSupplierData() {
				this.axios.get("http://localhost:83/supplier/list").then((res) => {
					this.supplier = res.data;
				})
			}
		},
		created() {
			this.initData();
			this.initGoodsData();
			this.initSupplierData();
		}
	}
</script>

<style scoped>

</style>
