import React, {Component} from 'react';
import Layout from '../../components/layout';
import Manager from '../../ethereum/manager';

class managerShow extends Component{

    static async getInitialProps(props){

        
        const manager = Manager(props.query.address);
        const creator = await manager.methods.manager().call();
        const numOfRequests = await manager.methods.getRequestsCount().call();

        return {creator, numOfRequests};
    }
    render(){
        return(
            <Layout>
            <h1> HIIII</h1>

            </Layout>
        )
    }
}

export default managerShow;