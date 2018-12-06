import React from 'react';
import { Table,Button } from 'antd';
import {connect} from 'react-redux';


class LableTable extends React.Component{
    constructor(){
        super();
        this.state ={
            workloads:true,
            rulesets:true,
            policy:'',
            columns:[],
            dataList:[],
            rowSelection:{},
            changeCheck:''

        }
    }
    componentWillMount() {
        let Mock = require('mockjs')
        let template = {
            'workloads|1': [0,1],
            'rulesets|1': [0,1],
            'policy':''
        }
        let data = Mock.mock(template);
        let workloadsString = data.workloads;
        let rulesetsString = data.rulesets;
        this.setState({workloads:workloadsString,rulesets:rulesetsString,policy:data.policy});

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
            workloads: this.state.workloads,
            rulesets: this.state.rulesets,
            policy: this.state.policy
        }];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({changeCheck:selectedRows})
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows,'onchange');
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows,'onselect');
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
            getCheckboxProps: record => ({

                // disabled: this.state.workloads == true || this.state.rulesets  == true,    // Column configuration not to be checked
            }),
        };
        this.setState({columns:columns,dataList:dataList,rowSelection:rowSelection})
    }

    goPage(path){
        this.props.history.push(path);
    }
    deleteBtn(){
        console.log(this.state.changeCheck)
        const inputs = document.getElementsByTagName("input");
        const checkAll = document.getElementById('checkAll');
        // for(let i=0;i<inputs.length;i++){
        //     let obj = inputs[i];
        //     if(obj.type=='checkbox' && obj.checked == true && obj != checkAll){
        //         obj.parentElement.parentElement.remove();
        //         checkAll.checked = false;
        //     }
        // }
    }
    render() {
        return(
            <div id="lableTable">
                <Button type="primary" onClick={this.goPage.bind(this,'/lableComponent/Add_Lable')}>Add</Button>&nbsp;&nbsp;
                <Button type="danger" onClick={this.deleteBtn.bind(this)}>Delete</Button>
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

