

//SPDX-Licence-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0

contract ChatApp{
    //USER STRUCT
    struct user{
        string name;
        friend[] friendList;
    }

    struct friend{
        address pubKey;
        string name;
    }

    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    //CHECK USER EXIST
    function checkUserExists(address pubKey) public view returns(bool){
        
    }
}