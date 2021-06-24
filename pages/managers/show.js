import React, {Component} from 'react';
import Layout from '../../components/layout';
import Manager from '../../ethereum/manager';
import {Card, Grid, Button} from 'semantic-ui-react';
import ContributeForm from "../../components/contributeForm";
import web3 from "../../ethereum/web3";
import {Link} from '../../routes';


class managerShow extends Component{

    static async getInitialProps(props){

        
        const manager = Manager(props.query.address);
        const creator = await manager.methods.manager().call();
        const numOfRequests = await manager.methods.getRequestsCount().call();
        const balance = await manager.methods.getBalance().call();
        return {
            address: props.query.address,
            manager: creator, 
            requestsCount: numOfRequests,
            managerBalance: balance
        };
    }


    renderCards(){

        const {
            manager,
            requestsCount,
            managerBalance
        } = this.props;

        const items = [
            {
            header: manager,
            meta: 'address of manager',
            description: "The manager created this fund and is the only person that can approve or deny funding requests.",
            style: {overflowWrap:'break-word'}
            },

            {
                header: requestsCount,
                meta: 'Number of requests',
                description: "Number of current funding requests for this manager: A request attempts to draw eth from this contract.", 
                    style: {overflowWrap:'break-word'}
                },
            {
                header: web3.utils.fromWei(managerBalance, 'ether'),
                meta: 'Contract balance (ether)',
                description: "Current balance of eth in this contract", 
                    style: {overflowWrap:'break-word'}
                }
    ];
    return <Card.Group items={items}/>;
    }
    render(){
        return(
            <Layout>
            <h1> Manage show</h1>
            <Grid>
                <Grid.Row>
                  <Grid.Column width={10}>
                    
                {this.renderCards()}
                
                </Grid.Column>
                <Grid.Column width={6}>
                <ContributeForm address={this.props.address}/>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                <Link route={`/managers/${this.props.address}/requests`}> 
                <a>
                    <Button primary> View Requests </Button>
                </a>
                </Link>
                </Grid.Column>
                </Grid.Row>
            </Grid>
                
                
            </Layout>
        )
    }
}

export default managerShow;