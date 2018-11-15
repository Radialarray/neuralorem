import sketch from 'sketch'
var userInput;

export function windowAlert(context) {
  const document = sketch.fromNative(context.document)

  var selection = context.selection;
  let notAText = 0;
  if (selection.count() === 0 || selection.count() === null) {
    sketch.UI.message("Select something!")
  } else {
    document.selectedLayers.forEach(layer => {
      if (layer.type === String(sketch.Types.Text)) {

      } else {
        // Increase if not a textfield
        notAText++;
        sketch.UI.message("Select a text field!")
      }
    })

    // Check if everything selected are textfields
    if (notAText === 0) {
      // Create the LSTM Generator passing it the model directory
      // lstm = ml5.LSTMGenerator('models/woolf/', modelReady);

      var window = createWindow(context);
      var alert = window[0];
      var response = alert.runModal() // This part shows the dialog windows and stores the 'response' in a variable
      // sketch.UI.message(response)
      // log(response)
      // sketch.UI.message("Window Created 🙌")

      if (response == "1000") {
        // This code only runs when the user clicks 'Ok';

        var inputData = userInput.stringValue();
        log(inputData)

        fetch('http://localhost:3000/?seed=' + inputData)
          .then(res => res.json())
          .then(data => {
            // log(data);
            exchangeText(document, data);
          })
          .catch(function (err) {
            return log(err);
          })
      }
    }
  }
}

// Iterate over each text layer in the selection, calling our addLineFragments function
function exchangeText(document, data) {
  document.selectedLayers.forEach(layer => {
    layer.text = data;
  })
  sketch.UI.message("Text replaced 🙌")
}

function createWindow() {
  var alert = COSAlertWindow.new();
  alert.setMessageText("Type in your seed word.")
  alert.addButtonWithTitle("Ok");
  alert.addButtonWithTitle("Cancel");

  // Create the main view
  var viewWidth = 400;
  var viewHeight = 100;
  var viewSpacer = 10;
  var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
  alert.addAccessoryView(view);

  // Create labels
  var infoLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 33, (viewWidth - 100), 35));

  // Configure labels
  infoLabel.setStringValue("Type in a seed word and then the textgenerator creates output based on your seed.");
  infoLabel.setSelectable(false);
  infoLabel.setEditable(false);
  infoLabel.setBezeled(false);
  infoLabel.setDrawsBackground(false);

  // Add labels
  view.addSubview(infoLabel);

  // Creating the inputs
  userInput = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 85, 130, 20));

  // Adding the textfield
  view.addSubview(userInput);

  // Default values for textfield
  userInput.setStringValue('Input seed word');

  // Show the dialog
  return [alert]
}