pragma solidity ^0.4.17;

contract MoneyManagerFactory {
    address[] public deployedManagers;
    
    function createManager() public payable {
       
        MoneyManager newManager = new MoneyManager(msg.sender);
        
        newManager.send((this).balance);
      
        deployedManagers.push(address(newManager));
    }
    
    function getDeployedManagers() public view returns (address[]){
        return deployedManagers;
    }
    
    
}
contract MoneyManager {
    
    struct FundRequest {
        string description;
        uint value;
        address requester;
        address recipient;
        bool complete;
    }
    
    FundRequest[] public requests;
    address public manager;
    
     modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    
    function MoneyManager(address creator) public{
        manager = creator;
    }
    
    function () public payable {}  
    
    function contribute() public payable{
    }

    function getRequestsCount() public view returns(uint){
        return requests.length;
    }
    
    
    function createRequest(string description, uint value, address recipient) public{
       
        FundRequest memory newRequest = FundRequest({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            requester: msg.sender
        });
        requests.push(newRequest);
    }
    
    function finalizeRequest(uint index) public restricted{
        FundRequest storage request = requests[index] ;
        require(!request.complete);
        
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }
    
    function liquidate() public restricted{
       manager.transfer(this.balance);
    }
    
}