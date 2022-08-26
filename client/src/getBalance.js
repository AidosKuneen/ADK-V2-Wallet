export const getBalance = async () =>{
    const seed = window.localStorage.getItem('seed');
    if (!seed){
        window.localStorage.setItem('totalBalance',0)
        return 0
    }
    // console.log(seed,'seed')
    // console.log(!seed,'!seed')
    const balance = JSON.parse(await window.walletAPI.totalBalance(`"${seed}"`));
    // console.log(balance)
    // console.log(+balance.data)
    const bal = +balance.data/1000000000000000000;
    const checkBal = bal?bal:localStorage.getItem('totalBalance')
    window.localStorage.setItem('totalBalance',checkBal)
    return checkBal?checkBal:0
}