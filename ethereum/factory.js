import web3 from './web3';
import MoneyManagerFactory from './Build/MoneyManagerFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(MoneyManagerFactory.interface),
    '0x80C8229AEF64d38452312be181a89Fc602102A28'
);

export default instance;