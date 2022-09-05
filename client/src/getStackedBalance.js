export const getStackedBalance = async () =>{
    const adress = window.localStorage.getItem('adress')
    const data = JSON.parse(await window.walletAPI.stakedBalance(adress))
    console.log(data)
    return data
}