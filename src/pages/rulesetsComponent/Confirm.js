import React, {Component} from "react";
import {Modal,Button} from 'antd';
 

class Confirm_Tip extends Component {
	constructor(props){
		super(props);
	}
	//默认隐藏
	 state = {visible:false}

	 showModal = () =>{
	 	this.setState({
	 		visible:true,
	 	});
	 }

	 hideModal= () =>{
	 	this.setState({
	 		visible:false,
	 	});

	 }

	render(){
		return(
		<span>
		   <Button onClick={this.showModal}>删除</Button>
		   <Modal
		  	  visible={this.state.visible}
	          onOk={this.props.myClick}
	          onCancel={this.hideModal}
	          okText="确认"
	          cancelText="取消"
		   >
		   <h5>确认删除?</h5>
		   </Modal>
		  </span>
			);
	}
}

export default Confirm_Tip;