const sendTrans = (trans) =>{
    if (window.localStorage.getItem(trans) === null){
        window.localStorage.setItem(trans,JSON.stringify([null]))
        return JSON.parse(window.localStorage.getItem(trans))
    }else {
        return JSON.parse(window.localStorage.getItem(trans))
    }
}
export default sendTrans