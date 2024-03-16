const { error } = require("console");
const hre = require("hardhat");

async function main (){
    const ChatApp = await hre.ethers.getContractFactory("Lock");
    const chatApp = await ChatApp.deploy();

    await chatApp.deployed();

    console.log(
        `Contract Address: ${chatApp.address}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitcode = 1;
});