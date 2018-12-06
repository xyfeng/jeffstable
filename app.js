// var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ,.?!'";
var PTM = 32;

var imageSize = 64;
var fontPath = 'fonts/Roboto-Black.ttf';
var emojis = [{"name":"1","width":90,"height":128},{"name":"10","width":90,"height":128},{"name":"11","width":128,"height":128},{"name":"12","width":112,"height":128},{"name":"13","width":100,"height":128},{"name":"14","width":90,"height":128},{"name":"15","width":84,"height":128},{"name":"17","width":89,"height":128},{"name":"18","width":98,"height":127},{"name":"19","width":93,"height":118},{"name":"2","width":128,"height":128},{"name":"20","width":99,"height":128},{"name":"21","width":91,"height":128},{"name":"22","width":85,"height":125},{"name":"23","width":98,"height":127},{"name":"24","width":86,"height":128},{"name":"25","width":93,"height":128},{"name":"26","width":90,"height":128},{"name":"27","width":96,"height":128},{"name":"28","width":96,"height":128},{"name":"29","width":104,"height":128},{"name":"3","width":84,"height":128},{"name":"30","width":86,"height":128},{"name":"31","width":81,"height":128},{"name":"32","width":88,"height":128},{"name":"33","width":85,"height":128},{"name":"34","width":101,"height":128},{"name":"35","width":99,"height":128},{"name":"36","width":94,"height":128},{"name":"37","width":77,"height":128},{"name":"38","width":122,"height":128},{"name":"39","width":83,"height":128},{"name":"4","width":96,"height":128},{"name":"40","width":83,"height":128},{"name":"41","width":75,"height":126},{"name":"42","width":97,"height":128},{"name":"43","width":83,"height":127},{"name":"44","width":108,"height":128},{"name":"45","width":84,"height":128},{"name":"46","width":86,"height":127},{"name":"47","width":83,"height":128},{"name":"48","width":118,"height":128},{"name":"49","width":97,"height":128},{"name":"5","width":102,"height":128},{"name":"50","width":90,"height":128},{"name":"51","width":123,"height":128},{"name":"52","width":89,"height":128},{"name":"53","width":99,"height":128},{"name":"54","width":106,"height":128},{"name":"55","width":88,"height":128},{"name":"56","width":88,"height":128},{"name":"57","width":100,"height":128},{"name":"6","width":102,"height":128},{"name":"7","width":84,"height":128},{"name":"8","width":116,"height":128},{"name":"9","width":92,"height":128}];

var words = [
  'YOU ARE MY HERO',
  'NICE HAIR VOLUME, BYE - IRISA',
  'YOUR HAIR IS SO SMOOTH',
  'WHAT PRODUCT DO YOU USE ON YOUR HAIR? CAN I HAVE SOME?',
  'BAGEL BOBS!',
  'WONDERFULLY CREATIVE SOUL',
  'WE WILL MISS YOU BUDDY. STAY IN TOUCH AND GOOD LUCK ON YOUR NEXT ADVENTURE! - EMILE',
  "YOU CAN'T LEAVE! I HAVEN'T LEARNED HOW TO BE AWESOME AND COOL LIKE JEFF YET!",
  'PROMISE TO KEEP IN TOUCH PLEASE!',
  ':( - @M',
  'WE WILL MISS YOU! NO ONE HAS THE BEST HAIR LIKE YOU!',
  'YOUR FAREWELL WEBSITE MADE ME SAD AND HAPPY FOR YOU! SUPER AWESOME AND SUPER SAD ):)',
  'BON VOYAGE, JEFF! COME BACK TO VISIT YOUR FROGGY FRIENDS!',
  "YOU'RE STILL COMING TO THE HOLIDAY PARTY?",
  "I WAS LOOKING FOR A JOB, AND THEN I FOUND A JOB / AND HEAVEN KNOWS, I'M MISERABLE NOW / IN MY LIFE, WHY DO I GIVE VALUABLE TIME TO PEOPLE WHO DON'T CARE IF I LIVE OR DIE? - HALLE",
  "FROG BAND WON'T BE THE SAME WITHOUT YOU...",
  'THANK YOU FOR ALL YOUR JEFFINESS!',
  'WHAT IS THE BEST WAY TO STAY CURRENT ON JEFFY NEWS GOING FORWARD?',
  'LOVE YOUR WEEKLY MMM HOSTING!',
  "PLZ DON'T LEAVE",
  'OH THE PAIN IN MY CHEST! NOOO! - J REUBEN',
  "I HOPE YOU'LL BE ONE OF THOSE FROG BOOMERANGS.",
  "THAT COFFEETIME OF CLASSICAL GUITAR - YOU ARE A PERSON OF CONTINUALLY UNFOLDING SKILLS AND PASSIONS. WE WILL MISS YOU! - TURI",
  'JEFFFFF YOU WERE ON MY FIRST FROG TEAM WHEN I STARTED AS A WEE INTERN...YOU ARE AN AWESOME TEAMMATE AND FRIEND. YOU WILL BE MISSED! WISHING YOU ALL THE BEST! SEE YOU AROUND! - JESS',
  'YOUR HAIR WILL BE SORELY MISSED!',
  'we’re now searching for a replacement for Best Hair at frog - Claire'
];

var images = [];
var textStrings = [];
var wordPaths = [];

var world = null;
var canvas;
var context;
var myDebugDraw;
var canvasOffset = {
  x: 0,
  y: 0
};
var fontSize = 0.8;
var worldWidth;
var worldHeight;

function generateWordPaths(font) {
  // mimic this function: font.getPath(words[0], 0, 0, fontSize);
  // get font scale
  var fontScale = 1 / font.unitsPerEm;

  // let kerningLookups;
  const script = font.position.getDefaultScriptName();
  var kerningLookups = font.position.getKerningTables(script, 'dflt');

  for (var str of words) {
    // get glyphs
    var glyphs = font.stringToGlyphs(str, font.defaultRenderOptions);

    // loop through glyphs
    var paths = [];
    for (var i = 0; i < glyphs.length; i++) {
      var g = glyphs[i];
      var p = g.getPath(0, 0, fontSize);
      p.fill = 'white';
      var kerningValue = 0;
      if (i < glyphs.length - 1) {
        var nextG = glyphs[i + 1];
        kerningValue = font.getKerningValue(g, nextG);
        // console.log(g.advanceWidth, g.unicode, g.index, nextG.index, kerningValue);
      }
      // save to paths obj
      paths[i] = {
        path: p,
        width: (g.advanceWidth + kerningValue) * fontScale * fontSize,
        offset: g.unicode === 73 ? -0.22 * fontSize : 0 //correct I character
      };
    }
    wordPaths.push(paths);
  }
  // console.log(wordPaths);
}

//load custom font from local directory
opentype.load(fontPath, function(err, font) {
  if (err) {
    alert('Font could not be loaded: ' + err);
  } else {
    generateWordPaths(font);
    // start world sim
    using(Box2D, "b2.+")
    init();
    animate();
  }
});

function getRandomImagePos(){
  // random pos on screen
  var x = Math.random() * worldWidth - worldWidth/2 - 5; // minus words length
  // 1 to 3 times of screen height;
  var y = Math.random() * worldHeight * 2 + worldHeight;
  return new b2Vec2(x, y);
}

function getRandomWordPos(){
  var x = Math.random() * worldWidth - worldWidth/2;
  var y = Math.random() * worldHeight/2 + worldHeight/2;
  return {
    x: x,
    y: y
  };
}

function addEmojis(){
  // add images
  for(var i=0; i<emojis.length; i++ ){
    var img = emojis[i];
    var shape = new b2PolygonShape();
    shape.SetAsBox(img.width*imageSize/PTM/256, img.height*imageSize/PTM/256);
    var bd = new b2BodyDef();
    bd.set_type(Module.b2_dynamicBody);
    bd.set_position(getRandomImagePos());
    var body = world.CreateBody(bd);
    body.CreateFixture(shape, Math.random()*10);
    images.push({
      i: document.getElementById(img.name),
      w: img.width*imageSize/PTM/128,
      h: img.height*imageSize/PTM/128,
      s: 0, // for detect motion stop
      bd: body
    });
  }
}

function addWords() {
  // add words
  for (var i = 0; i < wordPaths.length; i++) {
    var wp = wordPaths[i];
    var pos = getRandomWordPos();
    var velocity = new b2Vec2(0, -Math.random()*worldHeight);
    textStrings[i] = [];
    for (var j = 0; j < wp.length; j++) {
      var p = wp[j].path;
      // not space key
      if (p.commands.length) {
        // get bunding box
        var bbox = p.getBoundingBox();
        var w = bbox.x2 - bbox.x1;
        var h = bbox.y2 - bbox.y1;
        // console.log(p, bbox);
        var shape = new b2PolygonShape();
        shape.SetAsBox(w / 2, h / 2);
        var bd = new b2BodyDef();
        bd.set_type(Module.b2_dynamicBody);
        bd.set_position(new b2Vec2(pos.x + wp[j].offset, pos.y));
        // console.log(j, x + 8, y - 0.75);
        var body = world.CreateBody(bd);
        body.CreateFixture(shape, 1.0);
        body.SetLinearVelocity(velocity);
        if(i != 0) body.SetActive(false);
        // save path, width, height, body
        textStrings[i].push({
          p: p,
          w: w,
          h: h,
          bd: body,
          f: 0, // frames
          d: i * 60, //delays
          i: i //words index
        });
        // console.log(p, wp[j].width, w, h, bd);
        // add char offset
        pos.x += wp[j].width;
      } else {
        pos.x += 0.55 * fontSize;
      }
    }
  }
}

function drawImages(){
  images.forEach((item, index) => {
    var speed = item.bd.GetLinearVelocity().Length();
    item.s = 0.1 * speed + 0.9 * item.s;
    if(item.s < 0.1){
      item.bd.SetTransform(getRandomImagePos(), 0);
      item.s = 0;
      return;
    }
    var pos = item.bd.GetPosition();
    var angle = item.bd.GetAngle();
    var offsetX = pos.get_x();
    var offsetY = pos.get_y();
    var name = item.n;
    const image = item.i;
    context.save();
    context.translate(offsetX, offsetY);
    context.scale(1, -1);
    context.rotate(-angle);
    context.drawImage(image, -item.w/2, -item.h/2, item.w, item.h);
    context.restore();
  });
}

function drawWords(){
  for(var i=0; i<textStrings.length; i++){
    var s = textStrings[i];
    var reborn = false;
    for(var j=0;j<s.length;j++){
      var item = s[j];
      item.f = item.f + 1;
      if(item.f < item.d) {
        continue;
      }
      else if(item.f === item.d){
        item.bd.SetActive(true);
      }
      if(item.f-item.d > 600){
        reborn = true;
        item.f = item.d;
      }
      context.fillStyle = 'rgb(255,255,255)';
      var pos = item.bd.GetPosition();
      var angle = item.bd.GetAngle();
      var offsetX = pos.get_x();
      var offsetY = pos.get_y();
      var path = item.p;
      context.save();
      context.translate(offsetX, offsetY);
      context.scale(1, -1);
      context.rotate(-angle);
      context.translate(-item.w / 2, item.h / 2);
      path.draw(context);
      context.restore();
    }
    if(reborn){
      var pos = getRandomWordPos();
      var wp = wordPaths[item.i];
      var velocity = new b2Vec2(0,-Math.random()*5);
      var index = 0;
      for(var j=0; j<wp.length; j++){
        var p = wp[j].path;
        // not space key
        if (p.commands.length) {
          var item = s[index];
          item.bd.SetTransform(new b2Vec2(pos.x + wp[j].offset, pos.y), 0);
          item.bd.SetLinearVelocity(velocity);
          item.bd.SetAngularVelocity(0);
          pos.x += wp[j].width;
          index++;
        } else {
          pos.x += 0.55 * fontSize;
        }
      }
    }
  }
}


function init() {
  canvas = document.getElementById("canvas");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  context = canvas.getContext('2d');

  canvasOffset.x = canvas.width / 2;
  canvasOffset.y = canvas.height;

  // console.log(canvas.width, canvas.height);

  myDebugDraw = getCanvasDebugDraw();
  myDebugDraw.SetFlags(e_shapeBit);

  worldWidth = canvas.width / PTM;
  worldHeight = canvas.height / PTM;

  createWorld();
}

function createWorld() {
  world = new b2World(new b2Vec2(0.0, -worldHeight/2));
  world.SetDebugDraw(myDebugDraw);

  // draw ground
  var ground = world.CreateBody(new b2BodyDef());
  var shape = new b2EdgeShape();
  shape.Set(new b2Vec2(-worldWidth/2, 0.0), new b2Vec2(worldWidth/2, 0.0));
  ground.CreateFixture(shape, 0.0);

  addEmojis();

  addWords();
}

function draw() {
  //black background
  context.fillStyle = 'rgb(0,0,0)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.save();
  context.translate(canvasOffset.x, canvasOffset.y);
  context.scale(1, -1);
  context.scale(PTM, PTM);
  context.lineWidth /= PTM;

  // drawAxes(context);
  // world.DrawDebugData();

  // draw images
  drawImages();

  // draw words
  drawWords();
  context.restore();
}

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

function animate() {
  requestAnimFrame(animate);
  world.Step(1 / 60, 3, 2);
  draw();
}
