export function bgImageCheck(){
    if (window.localStorage.getItem('bgImage') === 'gradient'){
        return 'gradient'
    }else if(window.localStorage.getItem('bgImage') === 'honeycomb'){
        return 'honeycomb'
    }else {
        window.localStorage.setItem('bgImage','lines')
        return 'lines';
    }
}