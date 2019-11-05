// abc.com?x=1&deep_link_url=xyz.com?a=1&b=1
// {
//   x: 1,
//   deep_link_url: {
//     a:1,
//     b:1
//   }
// }

function getQueryParams(url = '') {
  if (url.indexOf('?') < 1) {
    return -1;
  }
  let obj = {};

  let strArr = '';
  if( (0 < url.indexOf('?')) && (url.indexOf('?') <  url.lastIndexOf('?'))) {
    strArr = url.substr(url.indexOf('?') + 1, url.length).split('&');
  } else {
    strArr = url.split('?')[1].split('&');
  }

  strArr.forEach((item, index) => {
    if (item && item.indexOf('?') > 0) {
      let key = item.substr(0, item.indexOf('='))
      const query = strArr.splice(index + 1, strArr.length).join('&')
      const otherQueryStr = `${item.substr(item.indexOf('=') + 1, item.length)}${query.length ? '&': ''}${query}`;
      let valObj = getQueryParams(otherQueryStr);
      obj[key] = {
        ...valObj
      }
      return obj;
    } else {
      let key = item.split('=')[0];
      let val = item.split('=')[1];
      if (key) {

        obj[key] = val;
      }
    }
  });

  return obj;
}

console.log(getQueryParams('abc.com?a=1&deep_link=xyz.com?x=1&b=2')
