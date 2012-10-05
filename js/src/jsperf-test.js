// Test written for http://jsperf.com/findelementbytext-algorithm

var env = document.getElementById('test-table');

function testElement(queryResult) {
  if (typeof queryResult != 'object'            || 
      typeof queryResult.length == 'undefined'  ||
      queryResult.length < 1)
    return false;

  if (queryResult.length > 1)
    throw "More than one element found!";

    return queryResult[0];
}

function findElementWithRegEx(text) {
  var 
    // RegEx to get the element that holds <i>text</i> as a child TextNode
    getHoldingElementInnerHTML  = new RegExp('<[A-z0-9]+[^<]*>[^A-z0-9]*' + text + '[^A-z0-9]*<\/[A-z0-9]+>', 'g'),
    getElementTag               = new RegExp('<[A-z0-9]+', 'g');

  // Tries to find the text surrounded by a tag
  var elementOuterHTML = testElement(env.innerHTML.match(getHoldingElementInnerHTML));

  if (elementOuterHTML === false) 
    return false;

  var
    // Gets the position of the elements first char at the body's innerHTML
    elementPosition = env.innerHTML.search(getHoldingElementInnerHTML),

    // Gets the element tag
    elementTag = elementOuterHTML.match(getElementTag)[0].substr(1),

    // Counts how many times tag has occurred in the body's innerHTML, from beggining to the element's position
    getElementTagCount = new RegExp('<'+elementTag+'[^<]*>[.\W]*(<\/'+elementTag+'>)?', 'g'),
    elementIndex       = (matches = env.innerHTML.substring(0, elementPosition).match(getElementTagCount)) ? matches.length : 0;

  // Returns the element at position
  return env.getElementsByTagName(elementTag).item(elementIndex);
}

var querySelectorAllResult = document.querySelectorAll('#test-table *');

function trim(s) {
	var l=0; var r=s.length -1;
	while(l < s.length && s[l] == ' ') {	l++; }
	while(r > l && s[r] == ' ') {	r-=1;	}
	return s.substring(l, r+1);
}

function findElementWithQuerySelector(text) {
  var elementText = '';
  for (var i = 0; i < querySelectorAllResult.length; i++) {
    elementText = querySelectorAllResult[i].innerText || querySelectorAllResult[i].textContent;
    if (trim(elementText) == text && 
        elementText       == querySelectorAllResult[i].innerHTML)
      return querySelectorAllResult[i];
  }
  return false;
}