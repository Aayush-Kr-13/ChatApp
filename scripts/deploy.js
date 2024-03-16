const hre = require("hardhat");

async function main () {
    const ChatApp = await hre.ethers.getContractFactory("ChatApp");
    const chatApp = await ChatApp.deploy();

    console.log(`Contract Address: ${chatApp.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitcode = 1;
});