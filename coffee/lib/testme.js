(function() {
  var TestCase, TestMe,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TestMe = (function() {

    function TestMe() {}

    TestMe.prototype.runTests = function() {};

    TestMe.util = {
      findElementByText: function(text) {
        var operations, testElement;
        testElement = function(queryResult) {
          if (queryResult === null || typeof queryResult.length === 'undefined' || queryResult > 1) {
            throw 'Unexpected value';
          }
          if (queryResult.length > 1) {
            throw 'More than one element found';
          }
          return queryResult[0];
        };
        return operations = [
          function() {
            return testElement(document.querySelectorAll('[value="' + text + '"]'));
          }, function() {
            return testElement(document.querySelectorAll('[title="' + text + '"]'));
          }, function() {
            return testElement(document.querySelectorAll('[alt="' + text + '"]'));
          }, function() {
            var elementIndex, elementOuterHTML, elementPosition, elementTag, getElementTag, getElementTagCount, getHoldingElementInnerHTML, _ref;
            getHoldingElementInnerHTML = new RegExp('<[A-z0-9]+[^<]*>[^A-z0-9]*' + text + '[^A-z0-9]*</[A-z0-9]+>', 'g');
            getElementTag = new RegExp('<[A-z0-9]+', 'g');
            elementOuterHTML = testElement(document.body.innerHTML.match(getHoldingElementInnerHTML));
            elementPosition = document.body.innerHTML.search(getHoldingElementInnerHTML);
            elementTag = elementOuterHTML.match(getElementTag)[0].substr(1);
            getElementTagCount = new RegExp('<' + elementTag + '[^<]*>[.\W]*(<\/' + elementTag + '>)?', 'g');
            elementIndex = (_ref = document.body.innerHTML.substring(0, elementPosition).match(getElementTagCount)) != null ? _ref.length : void 0;
            return document.getElementsByTagName(elementTag).item(elementIndex);
          }
        ];
      }
    };

    return TestMe;

  })();

  TestCase = (function(_super) {

    __extends(TestCase, _super);

    function TestCase(caseName) {
      this.caseName = caseName;
      this.instructions = [];
    }

    TestCase.prototype.addInstruction = function(instructionObject) {
      if (instructionObject === null || typeof instructionObject !== 'object' || instructionObject.description === null || instructionObject["function"] === null) {
        throw "Unrecognized instruction";
      }
      return this.instructions.push(instructionObject);
    };

    TestCase.prototype.setInstructions = function(instructions) {
      this.instructions = instructions;
    };

    return TestCase;

  })(TestMe);

}).call(this);
