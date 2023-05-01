function queryURLParams(url) {
    let pattern = /(\w+)=(\w+)/ig; //定义正则表达式
    let params = {}; // 定义参数对象
    url.replace(pattern, ($, $1, $2) => {
        params[$1] = $2;
    });
    return params;
}
