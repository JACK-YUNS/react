import React,{Component} from "react";
import {Redirect} from 'react-router-dom'
import {Row, Col,Button,Select,Table,Input} from 'antd';
import Confirm_Tip from '../Confirm';
import {Link} from 'react-router-dom';
import '../../css/Rulesets/Rulesets.css';
const Option = Select.Option;
const columns = [{
  title:"Name",
  dataIndex: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
},{
  title: 'Age',
  dataIndex: 'age',
},{
  title: 'Age',
  dataIndex: 'age',
},{
  title: 'Age',
  dataIndex: 'age',
}];

const data = [
	{
	  key: '1',
	  name: 'John Brown',
	  age: 32,
	  address: 'New York No. 1 Lake Park',
	},
	{
	  key: '2',
	  name: 'Jim Green',
	  age: 42,
	  address: 'London No. 1 Lake Park',
	},
	{
	  key: '3',
	  name: 'Joe Black',
	  age: 1,
	  address: 'Sidney No. 1 Lake Park',
	},
	{
	  key: '4',
	  name: 'Disabled User',
	  age: 99,
	  address: 'Sidney No. 1 Lake Park',
	}
];

 
const rowSelection = {

	getCheckboxPros:record=>({
		disabled:record.name==='Disabled User',
		name:record.name,
	})
};

class Rulesets extends Component{
	 
   AddRuleset = (url) =>{
   	this.props.history.push(url);
}
	state = {visible:false}
   DelRuleset = (arg) =>{
   	console.log(arg);
   	this.setState({
   		visible:arg,
   	})
   }

	render(){

		return(
			<div>
			{/* 功能按钮 */}
				<Row className="Btn">
				 <Col span={16}>
				 <Button>+ Add</Button>
				 <Button>发布</Button>
				 <Button>回退</Button>
				{/*删除按钮*/}
				 <Confirm_Tip 
				 myClick={this.DelRuleset.bind(this,false)}
				 />
				 <Button>启用</Button>
				 <Button>禁用</Button>
				 </Col>
				 <Col span={8}>第二列显示内容</Col>
				</Row>
				<Select
				   className="Selec" 
				   placeholder="Select properties to filter view"
				   style={{width:1400}}
				>
				   	 <Option value="1">内容1</Option>
				   	 <Option value="2">内容2</Option>
				   	 <Option value="3">内容3</Option>
				</Select>
				 <Table 
				 rowSelection={rowSelection}
				 columns={columns} 
				 dataSource={data}
				 />
                <Input type="textarea" placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 2, maxRows: 6 }} />
			</div>
			);
	}
}

export default Rulesets;
