// IE7 support for querySelectorAll in 274 bytes. Supports multiple / grouped selectors and the attribute selector with a "for" attribute. http://www.codecouch.com/
if (typeof document.querySelectorAll == 'undefined')
  (function(d,s){d.querySelectorAll=function(r,c,i,j,a){a=d.all,c=[],r=r.replace(/\[for\b/gi,'[htmlFor').split(',');for(i=r.length;i--;){s.addRule(r[i],'k:v');for(j=a.length;j--;)a[j].currentStyle.k&&c.push(a[j]);s.removeRule(0)}return c}})(document, document.createStyleSheet())

TestMe = {
  util: {
    findElementByText: function(text) {
      var testElement = function(queryResult) {
        if (queryResult.length > 1)
          throw "More than one element found!";
        else if (queryResult.length == 1) 
          return queryResult.item(0);
        
        return false;
      }
      
      var operations = [
        function() {
          return testElement(document.querySelectorAll('[value="'+text+'"]'));
        },
        
        function() {
          return testElement(document.querySelectorAll('[title="'+text+'"]'));
        },
        
        function() {
          var 
            // RegEx to get the element that holds <i>text</i> as a child TextNode
            getHoldingElementInnerHTML  = new RegExp('<[A-z]+.[^<]*>\W*' + text + '\W*<\/[A-z]+>', 'g'),
            getElementTag               = new RegExp('<([A-z])(\s|>)', 'g'),
            matches;
            
          matches = document.body.innerHTML.match(getHoldingElementInnerHTML);
        }
      ];
    
      try {
        var 
          i = 0,
          element;
        while(!(element instanceof HTMLElement) || i < operations.length) {
          element = operations[i]();
        }
      } catch (e) {
        // @TODO do something clever
      }        
    }
  }
}