var x = 100, y = 100;

var bitmaps = ['bg','boo','candy','ground','guy','guy2','guylost', 'guytrick','person','rad','ramp','sick','title','wow','sugar'];
var sprites = {};
var sounds = ['music','trick','omnom','trickortreat', 'sick', 'boo', 'rad', 'wow','bg','crash'];
var samples = {};
var frame;

var ramps = [];

var candies = [];

var counter = 1;

var leftpress = false;
var uppress = false;
var rightpress = false;
var downpress = false;

var power = 75;

var lost = false;

var started = false;

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
                    
                    if (key === 32) {
                        if (lost) {
                      started = true;
                      play_sample(samples.bg, 1.0, 1.0, true);
                      elapsed = 0;
                      speed = 5; basespeed = 5;
                      power = 75;
                      counter = 0;
                      lost = false;
                        }
                    
                    
                    if (!started) {
                      started = true;
                      play_sample(samples.bg, 1.0, 1.0, true);
                      elapsed = 0;
                      speed = 5; basespeed = 5;
                      power = 75;
                      counter = 0;
                    }
                    
                    }
                });    
                
}

       var groudpos = 0;
     
       var guypos = 0;
       
       var radcounter = 0;
       
       var animcount = 0;
       
       var screen = null; var screenpos = 0;
       
       var screens = ['rad','wow','sick'];
       var speed = 5;
       var basespeed = 5;
       
       var elapsed = 0;
       
            var activeramp = null;
function main()
{
	//enable_debug('debug');
	allegro_init_all("game_canvas", 320, 180);
        	canvas.mozImageSmoothingEnabled = false;
	canvas.webkitImageSmoothingEnabled = false;
	canvas.msImageSmoothingEnabled = false;
	canvas.imageSmoothingEnabled = false;
        
        font = load_font('DejaVuSansMono.ttf');
                
        bitmaps.forEach(function(name) {
            sprites[name] = load_bmp(name+'.png');
        });
        sounds.forEach(function(name) {
            samples[name] = load_sample(name+'.ogg');
        });
        install_keys();
	ready(function(){
                play_sample(samples.music, 1.0, 1.0, true);
                        play_sample(samples.trickortreat);

		loop(function(){
                   // LOGIC
                    
                    
                    if (!lost) {
                        if (power > 80) { speed = basespeed + 3; } else { speed = basespeed; }
                    speed += ~~(elapsed/30);
                    elapsed+=1.0/60.0;
                    } else {
                        speed-=0.05;
                      if (speed < 0) speed = 0;
                    }
                    animcount+=0.1;
                    if (started) counter++;
if (!lost) {
                    if (screen) screenpos++;
                     if (screenpos > 40) screen = null;
                        radcounter--;
                     if (started)  power-=0.06;
}
                        groudpos-=speed;
                     
                    
                     if (power > 80) power-=0.02;
                        if (power<0) {
                            if (!lost) {
                            power=0; 
                            screen = 'boo';
                            lost = true;
                         play_sample(samples.boo);
                         play_sample(samples.crash);
                         stop_sample(samples.bg);
                         screenpos = 20;
                            }
//                            alert('YOU LOST BOOO'); power = 10; window.location.reload(); }
                        }
                        if (!lost) {
                        if (radcounter==0) {
                            candies.push({x:320, y: 120, dest: 120-Math.random()*30});
                        }
                        }
                        if (radcounter<0) radcounter=0;
                        if (groudpos < -320) groudpos = 0;
                     
                     if (!lost) {
                     if (!radcounter) {
                     if (uppress) guypos-=2;
                     if (downpress) guypos+=2;
                     
                     if (guypos < -60) guypos = -60;
                     if (guypos > 60) guypos = 60;
                     
                     }
                     
                     if (counter%60==0) {
                      ramps.push({x: 320, y: rand() % 101});   
                     }
                     
                     if (activeramp) {
                         if (radcounter == 25) {
                             screen = screens[~~(Math.random()*screens.length)];
                             screenpos = 0;
                             play_sample(samples[screen]);
                         }
                         guypos = activeramp.y - (10-Math.max(activeramp.x,0)) - 56;
                         if (!radcounter) activeramp = null;
   
                     }
                     }
                        ramps.forEach(function(ramp) {
                           ramp.x -= speed;
                           
                            if (ramp.x <= 20) {
                               if (ramp.x > 5) {
                                   
                                   
                                   if (((guypos + 40) < ramp.y) && ((guypos + 60) > ramp.y)) {
                                    //console.log(ramp.y, guypos);
                                    radcounter = 30;
                                    if (!activeramp) {
                                        play_sample(samples.trick);
                                    }
                                    activeramp = ramp;
                        } else {
                         //console.log ("NOPE", guypos + 40, ramp.y, guypos + 60);   
                        }
                               }
                           }
                           
                        });
                        candies.forEach(function(candy) {
                           candy.x -= speed;
                           if (candy.y > candy.dest) candy.y--;
                                        
                        if (((guypos + 50) < candy.y) && ((guypos + 80) > candy.y)) {
                                if (candy.x < 35) {
                                    if (candy.x > 0) {
                            console.log(guypos, candy.y);
                               candy.x = -100;
                               play_sample(samples.omnom);
                               console.log('candy');
                               power+=10;
                                    }
                                }
                            }                                        
                                        
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
                           
                           draw_sprite(canvas, sprites.ramp,  ramp.x + 25, ramp.y + 12);
                          
                        });
                        
                        candies.forEach(function(candy) {
                            draw_sprite(canvas, sprites.candy, candy.x, candy.y);
                            
                          //  rectfill(canvas, 0, guypos+50, 30, 30, 0xFFFFFFFF);
                            
                        });
                        
                        
if (started) {
                        
if (radcounter && (radcounter <= 20)) {
                        draw_sprite(canvas, sprites.guytrick, 320/2 - 60, 180/2 + guypos);
} else {
    if (lost) {
                        draw_sprite(canvas, sprites.guylost, 320/2 - 10, 180/2 + guypos);
        
    } else {
                        draw_sprite(canvas, (~~animcount % 2) ? sprites.guy : sprites.guy2, 320/2 - 10, 180/2 + guypos);
    }
    
}

if (screen && (screenpos > 15)) draw_sprite(canvas, sprites[screen], 320/2, 180/2);

                        draw_sprite(canvas, sprites.sugar, 320/2 - 15, 180/2 + 164 - 16);
                        rectfill(canvas, 210, 168, power, 10, 0xFFFFFFFF);
	textout (canvas, font, ~~elapsed+" sec", 210, 168-8, 14, 0x00000000, 0xFFFFFFFF, 3)
	textout (canvas, font, ~~elapsed+" sec", 210, 168-8, 14, 0xFF000000, 0x00FFFFFF, 0)
}        

if (lost) {
    	textout (canvas, font, "Press SPACE", 120, 20, 12, 0x00000000, 0xFFFFFFFF, 3)
	textout (canvas, font, "Press SPACE", 120, 20, 12, 0xFF000000, 0x00FFFFFF, 0)
        
}

if (!started) {
   draw_sprite(canvas, sprites.title, 320/2, 180/2);   
	textout (canvas, font, "Press SPACE", 210, 168, 12, 0x00000000, 0xFFFFFFFF, 3)
	textout (canvas, font, "Press SPACE", 210, 168, 12, 0xFF000000, 0x00FFFFFF, 0)
        

    
}

                };
                
	});
	return 0;
}
END_OF_MAIN();

 
