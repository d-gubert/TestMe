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
          return queryResult[0];
        
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
            getElementTag               = new RegExp('<[A-z]+', 'g'),
            elementTag;
            
            
          // Now we have the element's tag, we'll have to find the position of its OCORRÊNCIA and count how many elements of the same tag
          // there are in the document before the OCORRÊNCIA. This will give us the index of the element in the NodeList returned by
          // querySelectorAll("<tag>");
          elementTag = testElement(document.body.innerHTML.match(getHoldingElementInnerHTML)).match(getElementTag).substr(1);
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