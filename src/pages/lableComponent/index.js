import React from 'react';
import { Table,Button,Input,Select } from 'antd';
import {connect} from 'react-redux';
const Option = Select.Option;



class LableTable extends React.Component{
    constructor(){
        super();
        this.state ={
            workloads:false,
            rulesets:false,
            policy:'',
            columns:[],
            dataList:[],
            rowSelection:{},
            changeCheck:'',

        }
    }

    handleChange (value) {
        console.log(`selected ${value}`);
    }
    componentDidMount() {
        let Mock = require('mockjs')
        let template = {
            'workloads|1-2': true,
            'rulesets|1': false,
            'policy':''
        }
        let data = Mock.mock(template);
        this.setState({workloads: data.workloads,rulesets:data.rulesets,policy:data.policy});
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            // render: text => <a href="#">{text}</a>,
        }, {
            title: 'Type',
            dataIndex: 'type',
        }, {
            title: 'Workloads',
            dataIndex: 'workloads',
        }, {
            title: 'Rulesets',
            dataIndex: 'rulesets',
        }, {
            title: 'Policy',
            dataIndex: 'policy',
        }];

        const dataList = [{
            name: this.props.state.addLable.name,
            type:this.props.state.addLable.types,
            workloads: this.state.workloads.toString(),
            rulesets: this.state.rulesets.toString(),
            policy: this.state.policy,
            key:11
        }];
        console.log( this.state,'workloads')
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ changeCheck: selectedRowKeys})
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows,'onchange');
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows,'onselect');
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
            getCheckboxProps: record => ({

                disabled: this.state.workloads == true || this.state.rulesets  == true,    // Column configuration not to be checked
            }),
        };
        this.setState({columns:columns,dataList:dataList,rowSelection:rowSelection})
    }
    goPage(path){
        this.props.history.push(path);
    }
    deleteBtn(){
        let arr1 = this.state.dataList;
        let arr2 = this.state.changeCheck;
        for(let i =0;i<arr2.length;i++){
            for(let j = 0;j<arr1.length;j++){
                if(arr2[i] == arr1[j].key ){
                    arr1.splice(j, 1)
                }
            }
        }
        this.setState({ dataList: arr1 });
    }


    render() {
        return(
            <div id="lableTable">


                <Button type="primary" onClick={this.goPage.bind(this,'/home/lableComponent/Add_Lable')}>Add</Button>&nbsp;&nbsp;
                <Button type="danger" onClick={this.deleteBtn.bind(this)}>Delete</Button>
                <br/>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a type"
                    optionFilterProp="children"
                    onChange={this.handleChange.bind(this)}
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    className="marginT20px"
                >
                    <Option value=''>All</Option>
                    <Option value="0">Application</Option>
                    <Option value="1">Environment</Option>
                    <Option value="2">Location</Option>
                </Select>
                <Input type="text" style={{ width: 800 }}/>
                <Table rowSelection={this.state.rowSelection} columns={this.state.columns} dataSource={this.state.dataList} />
            </div>
        )

    }
}

export default connect((state) =>{
    return {
        state: state
    }

})(LableTable);

