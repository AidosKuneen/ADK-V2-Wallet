export function checkLightTheme(){
    if (window.localStorage.getItem('lightTheme') === 'true'){
        return 'light'
    }else {
        return ''
    }
}