import Web3 from "web3"
import { useState } from "react"

const VendingMachine =() => {
    const[error,setError]=useState('');
    const[acc,setAcc]=useState('');

    const connectWalletHandler = async() => {
        try{

            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
            } else {
                console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
            }
        }catch(err){
            setError(err.message)
        }
    }

    const AccountHandler = async() => {
        const account = await web3.eth.getAccounts()
        setAcc(account[0])
        console.log(account[0])
    }

    return(
        <div>
            <h1>Vending Machine</h1>
            <button onClick={connectWalletHandler} >Connect Wallet</button>
            <label>{error}</label>
            <button onClick={AccountHandler} >Get Account</button>
            <p>{acc}</p>
        </div>
        
    )
}

export default VendingMachine