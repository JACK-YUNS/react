/*eslint-disable*/
import React from 'react';
import { Table,Button,Input,Select,Row,Col } from 'antd';
import {connect} from 'react-redux';
import Axios from "axios";
import '../../css/lableComponent/lableIndex.css'
const Option = Select.Option;


let searchType = 0;
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
            inputVal:'',
            selectVal:'',
            filteredInfo: null,

        }
    }


    filterData(res){
        for(let i = 0; i < res.data.length; i++){
            if(res.data[i].workloads == true){
                res.data[i].workloads = 'In use'
            }else{
                res.data[i].workloads = 'Unuse'
            }
            if(res.data[i].rulesets == true){
                res.data[i].rulesets = 'In use'
            }else{
                res.data[i].rulesets = 'Unuse'
            }
            if(res.data[i].type == 0){
                res.data[i].type = 'Application'
            }
            else if(res.data[i].type == 1){
                res.data[i].type = 'Environment'
            }
            else if(res.data[i].type == 2){
                res.data[i].type = 'Location'
            }
        }
        this.setState({ dataList: res.data });
    }
    componentDidMount() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key:'name',
            // render: text => <a href="#">{text}</a>,
        }, {
            title: 'Type',
            dataIndex: 'type',
            filters: [{
                text: 'Application',
                value: 'Application',
            }, {
                text: 'Environment',
                value: 'Environment',
            }, {
                text: 'Location',
                value:'Location',
            }],
            onFilter: (value, record) =>record.type.indexOf(value) === 0
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
        this.getData()
        const dataList =this.state.dataList;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.workloads === 'In use' || record.rulesets  === 'In use', // Column configuration not to be checked
                workloads: record.workloads,
                rulesets:record.rulesets
            }),
        };
        // const rowSelection = {
        //     onChange: (selectedRowKeys, selectedRows) => {
        //         this.setState({ changeCheck: selectedRowKeys})
        //        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows,'onchange');
        //     },
        //     onSelect: (record, selected, selectedRows) => {
        //         // console.log(record, selected, selectedRows,'onselect');
        //     },
        //     onSelectAll: (selected, selectedRows, changeRows) => {
        //         console.log(selected, selectedRows, changeRows,'onSelectAll');
        //     },
        //     getCheckboxProps: record => ({
        //         disabled: record.workloads == 'In use' || record.rulesets  == 'In use',    // Column configuration not to be checked
        //     }),
        // };
        this.setState({columns:columns,dataList:dataList,rowSelection:rowSelection})
    }
    getData() {
        Axios.post("/api/label/dataList").then(res => {
            if(res.status == 200){
                this.filterData(res)
            }
        });
    }
    handleChange (value) {
        searchType = value;
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
    inputChange(e){
        this.setState({inputVal:e.target.value})
    }
    selectChange(value){
        this.setState({selectVal:value});
    }
    searchBtn(reset){
        Axios.post("/api/label/search",{
            name:reset ? this.state.inputVal : '',
            type:reset ? this.state.selectVal : ''
        }).then(res => {

            if(res.status == 200){
                if(!reset){
                    const nameInput = document.getElementById('nameInput');
                    const typeSelect = document.getElementById('typeSelect');
                    this.setState({selectVal:''});
                    nameInput.value = '';
                }
                this.filterData(res);
                this.setState({ dataList: res.data });
            }
        });
    }

    render() {
        return(
            <div id="lableTable">
                <Button type="primary" onClick={this.goPage.bind(this,'/home/lableComponent/Add_Lable')}>Add</Button>&nbsp;&nbsp;
                <Button type="danger" onClick={this.deleteBtn.bind(this)}>Delete</Button>
                <Row className="marginT20px">
                    <Col span={6}>
                        <Select
                            id='typeSelect'
                            style={{ width: '99%' }}
                            onChange={this.selectChange.bind(this)}
                        >
                            <Option value="0">Application</Option>
                            <Option value="1">Environment</Option>
                            <Option value="2">Location</Option>
                        </Select>
                    </Col>
                    <Col span={15}>
                        <Input
                            id='nameInput'
                            type="text"
                            style={{ width: '99%' }}
                            placeholder="Enter a name"
                            onChange={this.inputChange.bind(this)}
                        />
                    </Col>
                    <Col span={2}><Button onClick={this.searchBtn.bind(this)}>search</Button></Col>
                    <Col span={1}><Button onClick={this.searchBtn.bind(this,false)}>reset</Button></Col>
                </Row>
                <Table rowSelection={this.state.rowSelection} columns={this.state.columns} dataSource={this.state.dataList} onChange={this.handleChange.bind(this)} />
            </div>
        )

    }
}

export default connect((state) =>{
    return {
        state: state
    }

})(LableTable);

