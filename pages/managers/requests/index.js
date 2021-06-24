import React,{Component} from 'react';
import Layout from '../../../components/layout';
import {Link} from '../../../routes';
import {Button, Table} from 'semantic-ui-react';
import Manager from "../../../ethereum/manager";
import RequestRow from "../../../components/requestRow";

class RequestIndex extends Component{

    static async getInitialProps(props){
        const {address} = props.query;

        const manager = Manager(address);
        const requestCount = await manager.methods.getRequestsCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return manager.methods.requests(index).call();
            })
        );
       
        return {address, requests, requestCount};
    }

    renderRows(){
        return this.props.requests.map((request, index) => {
            return <RequestRow 
            key={index}
            id={index}
            request={request}
            address={this.props.address}
            />;
        });
    }
    render(){
        const {Header, Row, HeaderCell, Body} = Table;
        return(
            <Layout>
            <h3> Request List </h3>

            <Link route={`/managers/${this.props.address}/requests/new`}>
            <a>
                <Button floated='right' style={{marginBottom: 10}} primary> Add Request </Button>
            </a>
            </Link>

            <Table>
                <Header>
                    <Row>
                        <HeaderCell> ID </HeaderCell>
                        <HeaderCell> Description </HeaderCell>
                        <HeaderCell> Requested Amount </HeaderCell>
                        <HeaderCell> Recipient </HeaderCell>
                        <HeaderCell> Approve </HeaderCell>
                    </Row>
                </Header>

                <Body>
                    {this.renderRows()}
                </Body>
            </Table>
            <div> Found {this.props.requestCount} request(s)</div>
            </Layout>
        );
    }
}

export default RequestIndex;