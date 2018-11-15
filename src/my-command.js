import sketch from 'sketch'
var inputData;

export function windowAlert(context) {
  const document = sketch.fromNative(context.document)

  var selection = context.selection;
  let notAText = 0;
  if (selection !== null) {
    if (selection.count() === 0) {
      sketch.UI.message("Select something! 😑")
    } else {
      document.selectedLayers.forEach(layer => {
        if (layer.type === String(sketch.Types.Text)) {
          log(layer.text);
          inputData = layer.text;
          // inputData = inputData.split(' ');
          inputData = encodeURI(inputData)

        } else {
          // Increase if not a textfield
          notAText++;
          sketch.UI.message("Select a text field! 🙄")
        }
      })

      // Check if everything selected are textfields
      if (notAText === 0) {
        sketch.UI.message("Sending data to neural network 😎");
        fetch('http://localhost:3000/?seed=' + inputData)
          .then(res => res.json())
          .then(data => {
            // log(data);
            sketch.UI.message("Replacing text")
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