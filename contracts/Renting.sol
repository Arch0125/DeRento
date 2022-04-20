pragma solidity ^0.5.0;

contract Renting {
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string name;
        string description;
        uint duration;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        string description,
        uint duration,
        uint price,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        string description,
        uint duration,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "DeRento Renting";
    }

    function createProduct(string memory _name, string memory _description,uint _duration, uint _price) public {
        require(bytes(_name).length > 0);
        require(bytes(_description).length > 0);
        require(_price > 0);
        productCount ++;
        products[productCount] = Product(productCount, _name, _description,_duration, _price, msg.sender, false);
        emit ProductCreated(productCount, _name, _description, _duration, _price, msg.sender, false);
    }

    function arraylength() public view returns(uint256){
        return productCount;
    }

    function getProducts(uint _id) public view returns(uint, string memory, string memory ,uint, uint, address, bool){
        return(products[_id].id, products[_id].name, products[_id].description,products[_id].duration, products[_id].price, products[_id].owner, products[_id].purchased);
    }

    function purchaseProduct(uint _id) public payable {
        Product memory _product = products[_id];
        address payable _seller = _product.owner;
        require(_product.id > 0 && _product.id <= productCount);
        require(msg.value >= _product.price);
        require(!_product.purchased);
        require(_seller != msg.sender);
        _product.owner = msg.sender;
        _product.purchased = true;
        products[_id] = _product;
        address(_seller).transfer(msg.value);
        emit ProductPurchased(productCount, _product.name, _product.description,_product.duration, _product.price, msg.sender, true);
    }
}