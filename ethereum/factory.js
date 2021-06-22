import web3 from './web3';
import MoneyManagerFactory from './Build/MoneyManagerFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(MoneyManagerFactory.interface),
    '0x0ab06600f074480a355121d7d8b35CA6d6310252'
);

export default instance;