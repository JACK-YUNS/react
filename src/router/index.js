import  React from 'react'
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import HomeIndex from '../pages/index/index';
import LableTable from '../pages/lableComponent/index';
import RegistrationForm from '../pages/lableComponent/Add_Lable';
import Add_Ruleset from '../pages/Add_Rulesets';
import Rulesets from '../pages/home/Rulesets';
export default class RouterComponent extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Router>
                    <React.Fragment>
                        <Switch>
                            <Route path='/home' component={HomeIndex}></Route>
                            <Redirect to='/home/Rulesets'></Redirect>
                        </Switch>
                    </React.Fragment>
                </Router>
            </React.Fragment>
        )
    }
}
