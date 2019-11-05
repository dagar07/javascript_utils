# javascript_utils
Add Javascript(JS) utils


### Provide nested query param Object from url
  * this function provide nested query Object from the url
  * like url = http://abc.com?x=1&deep_link_url=http://xyz.com?a=1&b=1
    -  getQueryParams(url);
    - return object {
        x:1,
        deep_link_url: {
          a: 1,
          b: 1
        }
      }
