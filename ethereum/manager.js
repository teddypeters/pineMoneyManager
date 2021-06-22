import web3 from './web3';
import Manager from './build/MoneyManager.json';

const shower = (address) => {
    return new web3.eth.Contract(
        JSON.parse(Manager.interface),
        address
    );
}
export default shower;