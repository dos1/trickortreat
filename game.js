var x = 100,y = 100;

var bitmaps = ['bg','boo','candy','ground','guy','guytrick','person','rad','ramp','sick','title','wow','sugar'];
var sprites = {};
var samples = {};
var frame;

var ramps = [];

var candies = [];

var counter = 0;

var leftpress = false;
var uppress = false;
var rightpress = false;
var downpress = false;

var power = 80;

function install_keys() {

                document.addEventListener('keydown', function(e) {
                    var key = e.which || e.keyCode || event.which;
                                        if (e.repeat) return;
                    if (key === 37) {
                        leftpress = true;
                    }
                    if (key === 38) {
                        uppress = true;

                    }
                    if (key === 39) {
                        rightpress = true;

                    }
                    if (key === 40) {
                        downpress = true;

                    }

                });
                
            
                document.addEventListener('keyup', function(e) {
                    var key = e.which || e.keyCode;
                    if (key === 37) {
                        leftpress = false;
                    }
                    if (key === 38) {
                        uppress = false;

                    }
                    if (key === 39) {
                        rightpress = false;

                    }
                    if (key === 40) {
                        downpress = false;

                    }
                });    
                
}

       var groudpos = 0;
     
       var guypos = 0;
       
       var radcounter = 0;
            
function main()
{
	//enable_debug('debug');
	allegro_init_all("game_canvas", 320, 180);
        	canvas.mozImageSmoothingEnabled = false;
	canvas.webkitImageSmoothingEnabled = false;
	canvas.msImageSmoothingEnabled = false;
	canvas.imageSmoothingEnabled = false;
        
        font = load_font('DejaVuSansMono.ttf');
                
        bitmaps = bitmaps.forEach(function(name) {
            sprites[name] = load_bmp(name+'.png');
        });
        samples.dosowisko = load_sample('dosowisko.ogg');
        install_keys();
	ready(function(){
                
		loop(function(){
                   // LOGIC
                    counter++;
                        groudpos-=5;
                        radcounter--;
                        power-=0.1;
                        if (power<0) { power=0; alert('YOU LOST BOOO'); power = 10; window.location.reload(); }
                        if (radcounter==0) {
                            candies.push({x:320, y: 120});
                        }
                        if (radcounter<0) radcounter=0;
                        if (groudpos < -320) groudpos = 0;
                     
                     if (uppress) guypos-=2;
                     if (downpress) guypos+=2;
                     
                     if (counter%60==0) {
                      ramps.push({x: 320, y: rand() % 101});   
                     }
                     
                        ramps.forEach(function(ramp) {
                           ramp.x -= 5;
                        });
                        candies.forEach(function(candy) {
                           candy.x -= 5;
                        });
                     
                    if (!frame) frame = requestAnimationFrame(draw);

                },BPS_TO_TIMER(60));
                
                var draw = function() {
                        frame = 0;
                        clear_to_color(canvas,makecol(255,255,255));
                       // DRAW
                        draw_sprite(canvas, sprites.bg, 320/2, 180/2);
                        draw_sprite(canvas, sprites.ground, 320/2 + groudpos, 180/2 + 10);
                        draw_sprite(canvas, sprites.ground, 320/2 + groudpos + 320, 180/2 + 10);
                        
                        for (var i=0; i<50; i++) {
                          draw_sprite(canvas, sprites.person, 320/2 + groudpos + i*20, 180/2 + i%5 + 10);
                        }
                        
                        ramps.forEach(function(ramp) {
                           
                           if (ramp.x > 20) {
                           draw_sprite(canvas, sprites.ramp,  ramp.x + 25, ramp.y + 12);
                           } else {
                               if (ramp.x > 0) {
                                   
                                   
                                   if (((guypos + 40) < ramp.y) && ((guypos + 60) > ramp.y)) {
                                    console.log(ramp.y, guypos);
                                    radcounter = 10;
                        } else {
                         console.log ("NOPE", guypos + 40, ramp.y, guypos + 60);   
                        }
                               }
                           }
                        });
                        
                        candies.forEach(function(candy) {
                            draw_sprite(canvas, sprites.candy, candy.x, candy.y);
                            
                            if (guypos > 50) {
                                if (candy.x < 25) {
                                    if (candy.x > 0) {
                               candy.x = -100;
                               console.log('candy');
                               power+=10;
                                    }
                                }
                            }
                            
                        });

if (radcounter) {
                        draw_sprite(canvas, sprites.guytrick, 320/2 - 60, 180/2 + guypos);
} else {
                        draw_sprite(canvas, sprites.guy, 320/2 - 10, 180/2 + guypos);
    
}

                        draw_sprite(canvas, sprites.sugar, 320/2 - 15, 180/2);
                        rectfill(canvas, 210, 2, power, 10, 0xFFFFFFFF);
                        
                };
	});
	return 0;
}
END_OF_MAIN();

 
