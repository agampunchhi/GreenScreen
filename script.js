var fgImg = null;
var bgImg = null;
var LeftC;
var RightC;
var output;
var greenThreshold = 240;
function loadFg()
{
var fileinput = document.getElementById("fg");
LeftC = document.getElementById("c1");
fgImg = new SimpleImage(fileinput);
  fgImg.drawTo(LeftC);
}
function loadBg()
{
var fileinput2 = document.getElementById("bg");
RightC = document.getElementById("c2");
bgImg = new SimpleImage(fileinput2);
  bgImg.drawTo(RightC);
}
function composite()
{
for(var pixel of fgImg.values())
  {
    var x=pixel.getX();
    var y=pixel.getY();
    if(pixel.getGreen()>greenThreshold)
      {
        var bgPixel = bgImg.getPixel(x, y);
        output.setPixel(x, y, bgPixel);
      }
    else
      {
        output.setPixel(x, y, pixel);
      }
  }
}
function doGS()
{
  if(fgImg == null || !fgImg.complete())
    {
      alert("Foreground image not loaded.");
      return;
    }
  if(bgImg == null || !bgImg.complete())
    {
       alert("Background image not loaded.");
      return;
    }
  clearCan();
  var final = composite();
  final.drawTo(LeftC);
}
function clearCan()
{
  clear(LeftC);
  clear(RightC);
}
function clear(canvas)
{
var context = canvas.getContext("2d");
 context.clearRect(0,0,canvas.width,canvas.height);
}
