import React, { Component } from 'react';
import {Form, Button, Label, Input, Message} from 'semantic-ui-react';
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";
import Manager from "../ethereum/manager";
import {Router} from '../routes';
import Routes from 'next-routes';

class contributeForm extends Component{

    state={
       value: '',
       errorMessage: '',
       loading: false 
    };

    onSubmit = async (event) => {
        event.preventDefault();
        const manager = Manager(this.props.address);

        this.setState({loading: true, errorMessage: ''});
        try{
            const accounts = await web3.eth.getAccounts();
            await manager.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')

            });
            Router.replaceRoute(`/managers/${this.props.address}`);
        }
        catch(err){
            this.setState({errorMessage: err.message});
        }

        this.setState({loading:false, value: ''});
    }

    render(){
        return(
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field> 
                    <label>Amount to Contribute</label>
                    <Input 
                    value={this.state.value} 
                    onChange={(event)=> this.setState({value: event.target.value})}
                    label="ether"  
                    labelPosition="right"/>
                </Form.Field>

                <Message error header="Oops!" content={this.state.errorMessage}/>
                <Button loading={this.state.loading} primary> 
                    Contribute to Fund
                    </Button>
            </Form>
        )
    }

}

export default contributeForm;