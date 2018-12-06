var fs = require('fs');
var sizeOf = require('image-size');

// var folderPath = 'emojis/';
var folderPath = 'profiles/';

fs.readdir(folderPath, function(err, filenames) {
  if (err)
    console.log(err.red);
  // filter no .png files
  filenames = filenames.filter(function(filename) {
    return filename.indexOf('.png') > 0;
  });
  // loop through all .png files
  var images = [];
  var result = '<div style="display:none;">\n';
  var index = 0;
  filenames.map(filename => {
    if (index < 60) {
      var one = {};
      var dim = sizeOf(folderPath + filename);
      var id = filename.replace('.png', '');
      one.name = id;
      one.width = dim.width;
      one.height = dim.height;
      images.push(one);
      result += '<img id="' + id + '" src="' + folderPath + filename + '" width="' + one.width + '" height="' + one.height + '">\n';
      index++;
    }
  });
  result += '</div>\n';

  console.log(JSON.stringify(images));
  console.log(result);
});
