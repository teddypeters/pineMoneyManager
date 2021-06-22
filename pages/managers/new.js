const { Component } = require("react");
import {Form, Button, Label, Input, Message} from 'semantic-ui-react';
import Layout from "../../components/layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from '../../routes';

class managerNew extends Component{

    state = {
        initialContribution: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true, errorMessage: ''});
        try{
        const accounts = await web3.eth.getAccounts();

        await factory.methods.createManager().send({
            from: accounts[0],
            value: this.state.initialContribution
        });
        Router.pushRoute('/');
    } catch(err){
        this.setState({errorMessage: err.message});
    }
    this.setState({loading: false});
    }

    render(){
        return(
            <Layout> 
            <h3> Create a new manager! </h3>
            <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}> 
                <Form.Field> 
                    <label> Starting Deposit </label>
                    <Input 
                    labelPosition="right" 
                    label="wei" 
                    placeholder="Initial contribution" 
                    value={this.state.initialContribution}
                    onChange={event => this.setState({initialContribution: event.target.value})}/>

                    
                </Form.Field>
                
            <Message error header="Oops!" content={this.state.errorMessage}/>
            <Button loading={this.state.loading} primary> Create! </Button>
            </Form>
            </Layout>
        );
    }
}

export default managerNew;