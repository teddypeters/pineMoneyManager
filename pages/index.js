import react, { Component } from 'react';
import { Card, Button} from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/layout';
import {Link} from '../routes';


class managerIndex extends Component{

    static async getInitialProps(){
        const managers = await factory.methods.getDeployedManagers().call();
        return {managers};
    }

    renderManagers(){
        const items = this.props.managers.map(address => {
            return{
            header: address,
            description: (<Link route={`/managers/${address}`}>
            <a> View Manager </a>
            </Link>),
            fluid: true,
            style: {overflowWrap:'break-word'}
            };
        });
        return <Card.Group items={items} />;
    }
    render(){
        
        return (
        <Layout>
        <div>
            

            <h3> Open Managers </h3>
            <Link route="/managers/new">
                <a>
                    <Button floated="right" content="Create Manager" icon="add" primary/>
                </a>
            </Link>

            {this.renderManagers()}
            </div>
            </Layout>);
    }
}

export default managerIndex;