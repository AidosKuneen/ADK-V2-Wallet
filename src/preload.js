"use strict";
const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("walletAPI", {
    ping: () => ipcRenderer.invoke("ping"),
    createWalletNew: (password) => ipcRenderer.invoke("createWalletNew", password),
    createWalletFromMnemonic: (seed, password) => ipcRenderer.invoke("createWalletFromMnemonic", seed, password),
    balance: (address) => ipcRenderer.invoke("balance", address),
    updateBalance: () => ipcRenderer.invoke("updatebalance"),
    send: (way, mempas, from, to, amount) => ipcRenderer.invoke("send", way, mempas, from, to, amount),
    addAddress: (password) => ipcRenderer.invoke("addAddress", password),
    checkPassword: (password) => ipcRenderer.invoke("checkPassword", password),
    listWalletAddress: (mempass, numAddr) => ipcRenderer.invoke("listwalletaddress", mempass, numAddr),
    stake: (way, mempas, from, amount) => ipcRenderer.invoke("stake", way, mempas, from, amount),
    unstake: (gas, mempas, from, amount) => ipcRenderer.invoke("unstake", gas, mempas, from, amount),
    stakedBalance: (...addrs) => ipcRenderer.invoke("stakedbalance", ...addrs),
    multisend: (way, mempas, to, amount) => ipcRenderer.invoke("multisend", way, mempas, to, amount),
    txInfo: (txId) => ipcRenderer.invoke("txInfo", txId),
    loadMetamaskMnemonics: (password) => ipcRenderer.invoke("loadMetamaskMnemonics", password),
    migrate: (old, xNew) => ipcRenderer.invoke("migrate", old, xNew),
    totalBalance: (mempas) => ipcRenderer.invoke("totalbalance", mempas),
    loadTxsHistory: () => ipcRenderer.invoke("loadTxsHistory"),
    getHistoricalDataForCoin: (ticket) => ipcRenderer.invoke("getHistoricalDataForCoin", ticket),
    getAdkPrices: () => ipcRenderer.invoke("getAdkPrices"),
    multistake: (way, mempas, amount) => ipcRenderer.invoke("multistake", way, mempas, amount),
    totalStake: (mempas) => ipcRenderer.invoke("totalStake", mempas),
    //sendEmail: (data) => ipcRenderer.invoke( "sendEmail", data ),
    existWalletJSON: () => ipcRenderer.invoke("existWalletJSON ")
});
