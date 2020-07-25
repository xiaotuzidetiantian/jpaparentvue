<template>
	<div>

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
		</el-table>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				tableData:[]
			}
		},
		methods:{
			initData(){
				this.axios.post("http://localhost:8200/user/list",{page:1,pageSize:5}).then((res)=>{
					this.tableData=res.data.content;
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
