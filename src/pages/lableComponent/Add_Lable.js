/*eslint-disable*/
import React from 'react';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import {connect} from 'react-redux';
import Axios from "axios";

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        currency:'',
        textValue:'',
        types:0,
        name:'',
        workloads: false,
        nameVal:true

    };
    componentWillMount() {
        let Mock = require('mockjs')
        let template = {
            'name|3': 'a'
        }
        let data = Mock.mock(template);
        this.setState({name:data.name,workloads:data.workloads})
    }
    goPage(path){
        this.props.history.push(path);
    }

    handleSubmit = (path) => {
        // const nameInput = document.getElementById('name');
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({textValue:values.name,type:values.type});
                let labelType = parseInt(values.type)
                Axios.post("/api/v0/label/?action=createLabel&tenantId=4",
                    {
                        name:values.name,
                        labelType:labelType
                }).then(res => {
                    if(res.status == 200){
                        if(res.data == ''){
                            // const name = document.getElementById('name').parentNode.parentNode;
                            // name.classList.remove('has-success');
                            // name.classList.add('has-error')
                            // console.log(name,'parentNode')
                            return false;
                        }
                        else {
                            this.setState({nameVal:false})
                            this.props.history.push(path);
                        }
                    }
                });


            }
        });


    }

    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }
    handleCurrencyChange = (currency) => {

        if (!('value' in this.props)) {
            this.setState({ currency });
        }
        this.triggerChange({ currency });
    }
    sele = (currency)=>{
        const typeDes = document.getElementsByClassName('typeDes')
        console.log(typeDes[currency])
        typeDes[currency].classList.add('displayNone')
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 8 },
            },
        };


        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Button type="Submit" onClick={this.handleSubmit.bind(this,'/home/lableComponent/index')}>Save</Button>&nbsp;&nbsp;
                        <Button type="button" onClick={this.goPage.bind(this,'/home/lableComponent/index')} >Cancel</Button>
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit} className='marginT20px'>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                Name&nbsp;
                                <Tooltip title="Name cannot be repeated unless type is different">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        )}
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your name!', whitespace: true },{
                                validator: this.state.nameVal,
                            }],
                        })(
                            <Input id='nameVali' />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                Type&nbsp;
                            </span>
                        )}
                    >
                        {getFieldDecorator('type', {
                            rules: [{ required: true}],
                        })(
                            <Select
                                value={this.state.currency}
                                onChange={this.handleCurrencyChange}
                                onSelect={this.sele.bind(this)}
                            >
                                <Option value="0">Application<br/><span className='typeDes'>The name of the application that the Workloads supports.E.g.,eCommerce or ERP.</span></Option>
                                <Option value="1">Environment<br/><span className='typeDes'>Stage of application development.E.g.,QA.Staging,Production.</span></Option>
                                <Option value="2">Location<br/><span className='typeDes'></span>Physical or geographic location of the Workload</Option>
                            </Select>
                        )}


                    </FormItem>

                </Form>

            </div>

        );
    }
}
 const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default connect((state) =>{
    return {
        state: state
    }

})(WrappedRegistrationForm);