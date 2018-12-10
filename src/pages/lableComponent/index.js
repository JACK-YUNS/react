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
            filteredInfo: null,
            filterDropdownVisible: false,
            searchText: '',

        }
    }
    //name搜索过滤
    onInputChange (e) {
        this.setState({ searchText: e.target.value },()=>{
            const columns = [{
                title: 'Name',
                dataIndex: 'name',
                key:'name',
                // render: text => <a href="#">{text}</a>,
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            placeholder="Search name"
                            value={this.state.searchText}
                            onChange={this.onInputChange.bind(this)}
                            onPressEnter={this.onSearch.bind(this)}
                        />
                        <Button type="primary" onClick={this.onSearch}>Search</Button>
                    </div>
                ),
                filterDropdownVisible: true,
                onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
            }, {
                title: 'Type',
                dataIndex: 'type',
                filters: [{
                    text: 'Application',
                    value: 0,
                }, {
                    text: 'Environment',
                    value: 1,
                }, {
                    text: 'Location',
                    value: 2,
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

            return columns;
        });
    }

    componentDidMount() {
        let Mock = require('mockjs')
        let template = {
            "users|5-10": [{ // 随机生成5到10个数组元素
                'name':'',
                'type':0,
                'workloads|1-2': true, // 中文名称
                'rulesets|1': true, // 属性值自动加 1，初始值为1
                'policy|18-28': 0,// 18至28以内随机整数, 0只是用来确定类型
                'key|+1':1
            }]
        }



        this.getData()
        const dataList =this.state.dataList;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ changeCheck: selectedRowKeys})
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows,'onchange');
            },
            onSelect: (record, selected, selectedRows) => {
                // console.log(record, selected, selectedRows,'onselect');
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                // console.log(selected, selectedRows, changeRows);
            },
            getCheckboxProps: record => ({
                disabled: record.workloads == 'true' || record.rulesets  == 'true',    // Column configuration not to be checked
            }),
        };
        this.setState({columns:columns,dataList:dataList,rowSelection:rowSelection})
    }
    getData() {
        Axios.post("/api/label/dataList").then(res => {
            for(let i = 0; i < res.data.length; i++){
                res.data[i].workloads = res.data[i].workloads.toString();
            }
            this.setState({ dataList: res.data });
            console.log(res, 1);
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
    searchBtn(){
        console.log(searchType,'searchBtn',this.state.inputVal,'inputVal');
    }
    //name搜索过滤
    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            dataList: this.state.dataList.map((record) => {
                const match = record.name.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    name: (
                        <span>
              {record.name.split(reg).map((text, i) => (
                  i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    }

    render() {
        return(
            <div id="lableTable">
                <Button type="primary" onClick={this.goPage.bind(this,'/home/lableComponent/Add_Lable')}>Add</Button>&nbsp;&nbsp;
                <Button type="danger" onClick={this.deleteBtn.bind(this)}>Delete</Button>
                <br/>
                <Row className="marginT20px">
                    {/*<Col span={3}>*/}
                {/*<Select*/}
                    {/*showSearch*/}
                    {/*style={{ width: '99%' }}*/}
                    {/*placeholder="Select a type"*/}
                    {/*optionFilterProp="children"*/}
                    {/*onChange={this.handleChange.bind(this)}*/}
                    {/*filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}*/}
                {/*>*/}
                    {/*<Option value='3'>All</Option>*/}
                    {/*<Option value="0">Application</Option>*/}
                    {/*<Option value="1">Environment</Option>*/}
                    {/*<Option value="2">Location</Option>*/}
                {/*</Select>*/}
                    {/*</Col>*/}
                    <Col span={16}>
                        <Input
                            type="text"
                            style={{ width: '99%' }}
                            placeholder="Enter a name"
                            onChange={this.inputChange.bind(this)}
                        />
                    </Col>
                    <Col><Button onClick={this.searchBtn.bind(this)}>search</Button></Col>
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

