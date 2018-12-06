import  React from 'react'
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import App from '../App';
import LableTable from '../lableComponent/index';
import RegistrationForm from '../lableComponent/Add_Lable';
export default class RouterComponent extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Router>
                    <React.Fragment>
                        <Switch>
                            <Route exact path='/' component={App}></Route>
                            <Route path='/lableComponent/index' component={LableTable}></Route>
                            <Route path='/lableComponent/Add_Lable' component={RegistrationForm}></Route>
                        </Switch>
                    </React.Fragment>
                </Router>
            </React.Fragment>
        )
    }
}
