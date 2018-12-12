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
        workloads: false

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
                Axios.post("/api/v0/label/?action=createLabel&tenantId=4",{
                    name:values.name,
                    labelType:values.type
                }).then(res => {
                    if(res.status == 200){
                        console.log(res)
                        this.props.history.push(path);
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
                            rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
                        })(
                            <Input />
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
                            >
                                <Option value="0">Application</Option>
                                <Option value="1">Environment</Option>
                                <Option value="2">Location</Option>
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