pragma solidity ^0.5.0;

contract Marketplace {
    string public name;
    uint public serviceCount = 0;
    mapping(uint => Service) public services;

    struct Service {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ServiceCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    event ServicePurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "DeFi Services Marketplace";
    }

    function createService(string memory _name, uint _price) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment service count
        serviceCount ++;
        // Create a service
        services[serviceCount] = Service(serviceCount, _name, _price, msg.sender, false);
        // Trigger an event
        emit ServiceCreated(serviceCount, _name, _price, msg.sender, false);
    }

    function purchaseService(uint _id) public payable {
        // Fetch the service
        Service memory _service = services[_id];
        // Fetch the owner
        address payable _seller = _service.owner;
        // Make sure the product has a valid id
        require(_service.id > 0 && _service.id <= serviceCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _service.price);
        // Require that the product has not been purchased already
        require(!_service.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _service.owner = msg.sender;
        // Mark as purchased
        _service.purchased = true;
        // Update the product
        services[_id] = _service;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
        emit ServicePurchased(serviceCount, _service.name, _service.price, msg.sender, true);
    }
}
