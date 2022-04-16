import Web3 from "web3"
import { useState } from "react"
import { useEffect } from "react";
import SimpleStorageContract from '../client/src/contracts/SimpleStorage.json'

const VendingMachine =() => {
    const[error,setError]=useState('');
    const[acc,setAcc]=useState('');
    const[name,setName]=useState('');
    const[desc,setDesc]=useState('');
    const [price,setPrice]=useState('');
    const[contract,setContract]=useState('');
    const[result,setResult]=useState('');

    useEffect(()=>{
        connectWalletHandler()
        loadContract()
    },[])

    //Connect Wallet
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

    //Load contract
    const loadContract = async() =>{
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        const instance = new web3.eth.Contract(
            SimpleStorageContract.abi,
            deployedNetwork && deployedNetwork.address,
          );
        setContract(instance)
        console.log(networkId)
    }

    //Call contract
    const CallContract = async() =>{
        await contract.methods.set(5).send({ from: acc });
        const response = await contract.methods.get().call();
        setResult(response)

    }    

    //Get account details
    const AccountHandler = async() => {
        const account = await web3.eth.getAccounts()
        setAcc(account[0])
        console.log(account[0])
    }

    return(
        <div>
            <h1>Vending Machine</h1>
            <button onClick={AccountHandler} >Get Account</button>
            <p>{acc}</p>
            <p>Enter Product name : <input type='text' onChange={(e)=>setName(e.target.value)} /></p>
            <p>Enter Product Description : <input type='text' onChange={(e)=>setDesc(e.target.value)} /></p>
            <p>Enter Rent : <input type='number' onChange={(e)=>setPrice(e.target.value)} /></p>
            <button onClick={CallContract} >Put on Rent</button>
            <p>Current Value : {result}</p>
        </div>
        
    )
}

export default VendingMachine