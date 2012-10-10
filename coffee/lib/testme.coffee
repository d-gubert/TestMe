class TestMe
  runTests: ->

  @util: {
    findElementByText: (text) ->
      testElement = (queryResult) ->
        if queryResult is null or  typeof queryResult.length is 'undefined' or queryResult > 1
          throw 'Unexpected value';

        if queryResult.length > 1
          throw 'More than one element found';

        queryResult[0];

      operations = [
        ->
          testElement document.querySelectorAll '[value="' + text + '"]'

        ->
          testElement document.querySelectorAll '[title="' + text + '"]'

        ->
          testElement document.querySelectorAll '[alt="' + text + '"]'

        ->
          # RegEx to get the element that holds text as inner text
          getHoldingElementInnerHTML  = new RegExp '<[A-z0-9]+[^<]*>[^A-z0-9]*' + text + '[^A-z0-9]*</[A-z0-9]+>', 'g'
          getElementTag               = new RegExp '<[A-z0-9]+', 'g'
          # Tries to find the text surrounded by a tag
          elementOuterHTML            = testElement document.body.innerHTML.match getHoldingElementInnerHTML
          # Gets the position of the elements first char at the body's innerHTML
          elementPosition             = document.body.innerHTML.search getHoldingElementInnerHTML
          elementTag                  = elementOuterHTML.match( getElementTag )[0].substr 1
          # Counts how many times tag has occurred in the body's innerHTML, from beggining to the element's position
          getElementTagCount          = new RegExp '<'+elementTag+'[^<]*>[.\W]*(<\/'+elementTag+'>)?', 'g'
          elementIndex                = document.body.innerHTML.substring( 0, elementPosition ).match(getElementTagCount)?.length

          document.getElementsByTagName( elementTag ).item elementIndex
      ]
  }


class TestCase extends TestMe
  constructor: (@caseName) ->
    @instructions = []

  addInstruction: (instructionObject) ->
    if instructionObject is null or typeof instructionObject isnt 'object' or instructionObject.description is null or instructionObject.function is null
      throw "Unrecognized object can't be used as instruction"

    @instructions.push(instructionObject)

  setInstructions: (@instructions) ->