# pineMoneyManager

This is a decentralized application that interacts with the public Ethereum Rinkeby test network. The app allows managers to create an ether pool. Individuals can send 
requests into this pool indicating what they need money for and designate a recipient. The manager of the pool can then see this request and either approve or reject. If approved 
the money is automatically sent to the listed recipient.

The project was made using node.js and npm. The smart contract was developed using RemixIDE. Within the ethereum folder is a script to both compile and deploy the MoneyManager smart contract.
The frontend application was developed using react.js, next.js, and semanticUI. The project can hosted locally and will succesfully interact with the network.

The project was written by myself however it was made in conjunction with Steven Grider's Udemy course called "Ethereum and Solidity: The Complete Developer's Guide".

If plugging in your own smart contract. You will need to re compile, re deploy, and plug the address of the deployed MoneyManagerFactory into the factory file. 
Additionally, you will need to plug in your own account Pneumonic into the deploy file in order to give Web3 a provider and account to cover the cost of deployment.

ALL INTERACTION IS DONE ON THE RINKEBY TEST NETWORK, NO REAL ETHER IS USED.

teddypeters@me.com
Ted Peters



