/// this function provide nested query Object from the url
/// like http://abc.com?x=1&deep_link_url=http://xyz.com?a=1&b=1
/// return object {
///   x:1,
///   deep_link_url: {
///     a: 1,
///     b: 1
///   }
/// }

function getQueryParams(url = '') {
  /// check, is url contains the '?'
  /// if not returns the -1, to handle invalid string
  if (url.indexOf('?') < 1) {
    return -1;
  }
  let obj = {};

  let strArr = '';
  /// check is url contains single '?' or more than one '?' in the url
  if( (0 < url.indexOf('?')) && (url.indexOf('?') <  url.lastIndexOf('?'))) {
    /// get substring from the string, via first index of '?' and
    /// and then split the string via '&'
    strArr = url.substr(url.indexOf('?') + 1, url.length).split('&');
  } else {
    /// if url string contains single string then split the string via '?'
    /// and also split the first index of the array string via '&'
    strArr = url.split('?')[1].split('&');
  }
  
  /// iterate through the str array and get strings
  strArr.forEach((item, index) => {
    /// if item contains '?', then 
    if (item && item.indexOf('?') > 0) {
      /// get the key from string, from 0 to index of first '=' 
      let key = item.substr(0, item.indexOf('='))
      /// join the all index below the cureent index in subArr to assume
      /// that these are the params of the deep_link_urls and should be nested
      const query = strArr.splice(index + 1, strArr.length).join('&')
      /// get the other url with provided query params 
      /// and recursively call the function on this string now
      const otherQueryStr = `${item.substr(item.indexOf('=') + 1, item.length)}${query.length ? '&': ''}${query}`;
      /// return the object with query params and merge the returnd object on the above key
      let valObj = getQueryParams(otherQueryStr);
      obj[key] = {
        ...valObj
      }
      return obj;
    } else {
      /// if item doesn't contains '?'
      /// then split the string from '=' and insert the object 
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
