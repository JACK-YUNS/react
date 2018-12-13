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
    //过滤
    filterData(res){
        for(let i = 0; i < res.data.length; i++){
            res.data[i].key = res.data[i].id;
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
            if(res.data[i].labelType == 0){
                res.data[i].labelType = 'Application'
            }
            else if(res.data[i].labelType == 1){
                res.data[i].labelType = 'Environment'
            }
            else if(res.data[i].labelType == 2){
                res.data[i].labelType = 'Location'
            }
        }
        this.setState({ dataList: res.data });
    }


    componentDidMount() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ changeCheck: selectedRows})
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows,'onchange');
            },
            onSelect: (record, selected, selectedRows) => {
                // console.log(record, selected, selectedRows,'onselect');
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                //console.log(selected, selectedRows, changeRows,'onSelectAll');
            },
            getCheckboxProps: record => ({
                disabled: record.workloads == 'In use' || record.rulesets  == 'In use',    // Column configuration not to be checked
            }),
        };
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key:'name'
        }, {
            title: 'Type',
            dataIndex: 'labelType'
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
        this.setState({columns:columns,dataList:dataList,rowSelection:rowSelection})
    }

    getData() {
        Axios.get("/api/v0/label/?action=getAllLabel&tenantId=4").then(res => {
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
        let changeCheck = this.state.changeCheck;
        let arr = [];
        for(let i = 0 ; i < changeCheck.length; i++){
            arr.push(changeCheck[i].id)
        }
        Axios.post("/api/label/delete",{
             id: arr
        }).then(res => {
            this.getData()
        });
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
                            value={this.state.selectVal}
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

