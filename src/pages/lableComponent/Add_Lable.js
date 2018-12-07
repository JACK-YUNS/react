import React from 'react';
import ReactDOM from 'react-dom';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import {connect} from 'react-redux';

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
        name:''

    };
    componentWillMount() {
        let Mock = require('mockjs')
        let template = {
            'name|3': 'a'
        }
        let data = Mock.mock(template);
        this.setState({name:data.name})
    }

    handleSubmit = (path) => {
        // e.preventDefault();
        const nameInput = document.getElementById('name');

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({textValue:values.name,type:values.type});
                localStorage['name'] = values.name;
                localStorage['types'] = values.type;
                this.props.dispatch({type:'addLable',name:values.name,types:values.type});
                this.props.history.push(path);
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

                <Form onSubmit={this.handleSubmit}>
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
                    <Row>
                        <Col span={24}><Button type="Submit" className='margin0auto' onClick={this.handleSubmit.bind(this,'/home/lableComponent/index')}>提交</Button></Col>
                    </Row>

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