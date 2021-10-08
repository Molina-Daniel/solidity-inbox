pragma solidity ^0.4.17;

contract Inbox {
    // When we create a storage public variable, solidity automatically creates a function with the same name
    // which returns the variable value
    string public message;
    
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public returns(string) {
        message = newMessage;
    }
    
    // Since we declared the above message variable,
    // we don't need the getMessage function, it's repetitive
    // function getMessage() public view returns(string) {
    //     return message;
    // }
}
