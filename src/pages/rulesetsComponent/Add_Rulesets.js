import React ,{Component} from "react";
import {Form,Input,Button,Icon,Row, Col,} from 'antd';


class Add_Ruleset extends Component{
	
	
	render(){
		return(
			<div>
				<Row className="Btn">
				 <Col span={24}>
				 <Button><Icon type="user"/>Save</Button>
				 <Button>Cancel</Button>
				 </Col>
				</Row>
				<Row>
					<Col span={24}>
						<span>General</span>
					</Col>

				</Row>
			</div>

			);
	}
}

export default Add_Ruleset;