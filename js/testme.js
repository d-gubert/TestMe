// IE7 support for querySelectorAll in 274 bytes. Supports multiple / grouped selectors and the attribute selector with a "for" attribute. http://www.codecouch.com/
if (typeof document.querySelectorAll == 'undefined')
  (function(d,s){d.querySelectorAll=function(r,c,i,j,a){a=d.all,c=[],r=r.replace(/\[for\b/gi,'[htmlFor').split(',');for(i=r.length;i--;){s.addRule(r[i],'k:v');for(j=a.length;j--;)a[j].currentStyle.k&&c.push(a[j]);s.removeRule(0)}return c}})(document, document.createStyleSheet())

TestMe = {
  util: {
    findElementByText: function(text) {
      var testElement = function(element) {
        if (element.length > 1)
          throw "More than one element found!";
        else if (element.length == 1) 
          return element.item(0);        
      }
    
      try {
        var element = testElement(document.querySelectorAll('[title="'+text+'"]'));
      } catch (e) {
        // @TODO do something clever
      }        
    }
  }
}