// IE7 support for querySelectorAll in 274 bytes. Supports multiple / grouped selectors and the attribute selector with a "for" attribute. http://www.codecouch.com/
if (typeof document.querySelectorAll == 'undefined')
  (function(d,s){d.querySelectorAll=function(r,c,i,j,a){a=d.all,c=[],r=r.replace(/\[for\b/gi,'[htmlFor').split(',');for(i=r.length;i--;){s.addRule(r[i],'k:v');for(j=a.length;j--;)a[j].currentStyle.k&&c.push(a[j]);s.removeRule(0)}return c}})(document, document.createStyleSheet())

TestMe = {
  util: {
    findElementByText: function(text) {
      var testElement = function(queryResult) {
        if (typeof queryResult != 'object'            || 
            typeof queryResult.length == 'undefined'  ||
            queryResult.length < 1)
          return false;

        if (queryResult.length > 1)
          throw "More than one element found!";

          return queryResult[0];
      }
      
      var operations = [
        function() {
          return testElement(document.querySelectorAll('[value="'+text+'"]'));
        },
        
        function() {
          return testElement(document.querySelectorAll('[title="'+text+'"]'));
        },
        
        function() {
          // @TODO Test if the regex algorithm is better than traversing document.all

          var 
            // RegEx to get the element that holds <i>text</i> as a child TextNode
            getHoldingElementInnerHTML  = new RegExp('<[A-z]+[^<]*>[^A-z0-9]*' + text + '[^A-z0-9]*<\/[A-z]+>', 'g'),
            getElementTag               = new RegExp('<[A-z]+', 'g');
            
          // Tries to find the text surrounded by a tag
          var elementOuterHTML = testElement(document.body.innerHTML.match(getHoldingElementInnerHTML));

          if (elementOuterHTML === false) 
            return false;

          var
            // Gets the position of the elements first char at the body's innerHTML
            elementPosition = document.body.innerHTML.search(getHoldingElementInnerHTML),

            // Gets the element tag
            elementTag = elementOuterHTML.match(getElementTag)[0].substr(1),

            // Counts how many times tag has occurred in the body's innerHTML, from beggining to the element's position
            getElementTagCount = new RegExp('<'+elementTag+'[^<]*>[.\W]*(<\/'+elementTag+'>)?', 'g'),
            elementIndex       = (matches = document.body.innerHTML.substring(0, elementPosition).match(getElementTagCount)) ? matches.length : 0;

          // Returns the element at position
          return document.getElementsByTagName(elementTag).item(elementIndex);
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