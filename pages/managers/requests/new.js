import React, {Component} from 'react';
import {Form, Button, Label, Input, Message} from 'semantic-ui-react';
import Layout from "../../../components/layout";
import Manager from "../../../ethereum/manager";
import web3 from "../../../ethereum/web3";
import {Link} from '../../../routes';

class RequestNew extends Component{
    
    state = {
        description: '',
        requestAmount: '',
        recipient: '',
        errorMessage: '',
        loading: false
    };

    static async getInitialProps(props){
        const {address} = props.query;

        return {address};
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const manager = Manager(this.props.address);
        const {description, requestAmount, recipient} = this.state;

        this.setState({loading: true, errorMessage: ''});
        try{
        const accounts = await web3.eth.getAccounts();

        await manager.methods.createRequest(
            description, 
            web3.utils.toWei(requestAmount, 'ether'), 
            recipient
            ).send({
            from: accounts[0]
        });
        Router.pushRoute(`/managers/${this.props.address}/requests`);
    } catch(err){
        this.setState({errorMessage: err.message});
    }
    this.setState({loading: false});

    }

    render(){
        return(
            <Layout> 
                <Link route={`/managers/${this.props.address}/requests`}>
                <a>
                   Back
                </a>
                </Link>
            <h3> Create a new Request </h3>
            <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}> 
                <Form.Field> 
                    <label> Request Description </label>
                    <Input 
                    placeholder="What is the nature of your request?" 
                    value={this.state.description}
                    onChange={event => this.setState({description: event.target.value})}/>

                    
                </Form.Field>
                <Form.Field> 
                    <label> Desired Amount (ether) </label>
                    <Input 
                    labelPosition="right" 
                    label="ether" 
                    placeholder="Request amount" 
                    value={this.state.requestAmount}
                    onChange={event => this.setState({requestAmount: event.target.value})}/>

                    
                </Form.Field>

                <Form.Field> 
                    <label> Recipient address </label>
                    <Input 
                    placeholder="address" 
                    value={this.state.recipient}
                    onChange={event => this.setState({recipient: event.target.value})}/>    
                </Form.Field>
                
            <Message error header="Oops!" content={this.state.errorMessage}/>
            <Button loading={this.state.loading} primary> Create Request! </Button>
            </Form>
            </Layout>
        );
    }
}

export default RequestNew;
