function initialize() {   
    // add click event to tab buttons
    var elems = document.getElementsByClassName('tabbutton');
    for(e = 0; e<elems.length; e++) {
        elems[e].addEventListener('click', function() { tab(this) });
    }
    
    // create mute buttons
    var elems = document.getElementsByClassName('mutebutton');
    for(e = 0; e<elems.length; e++) {
        elems[e].addEventListener('click', function() { mute(this) });
        elems[e].src = 'img/mute.jpg';
    }
    
    // select all audio tags
    var elems = document.getElementsByTagName('audio');
    for(e = 0; e<elems.length; e++) {
        
        // exclude all audio elements with the nofx class
        var nofx=0;
        var classes = elems[e].getAttribute('class');
        if(classes && classes.match(/\bnofx\b/)) {
            nofx=1;
        }
        var id = elems[e].getAttribute('id');
        
        if(id && !nofx) {
            // create a button image
            var img = document.createElement('img');
            img.id='img_' + id;
            if(elems[e].getAttribute('data-img')) {
                img.src=elems[e].getAttribute('data-img');
            } else {
                img.src='img/'+ id +'.jpg';
            }
            img.setAttribute('alt', id);
            img.setAttribute('onclick', 'toggleAudio(\''+ id +'\')');
            img.classList.add('fx');
            if(elems[e].getAttribute('loop') == 'true') {
                img.classList.add('paused_looping');
            } else {
                img.classList.add('paused');
            }
            if(elems[e].className) {
                img.classList.add(elems[e].className);
            }
            
            // add event listeners to show playstatus on the image
            elems[e].addEventListener('play', function() { 
                button = document.getElementById('img_'+ this.getAttribute('id'));
                if(this.getAttribute('loop') == 'true') {
                    button.classList.remove('paused_looping');
                    button.classList.add('looping');
                } else {
                    button.classList.remove('paused');
                    button.classList.add('playing');
                }
            });
            elems[e].addEventListener('pause', function() { 
                button = document.getElementById('img_'+ this.getAttribute('id'));
                if(this.getAttribute('loop') == 'true') {
                    button.classList.add('paused_looping');
                    button.classList.remove('looping');
                } else {
                    button.classList.add('paused');
                    button.classList.remove('playing');
                }
                if(this.getAttribute('data-startat')) {
                    this.currentTime= this.getAttribute('data-startat');
                } else {
                    this.currentTime=0;
                }
            });
            
            // set volume
            if(elems[e].getAttribute('data-volume')) {
                elems[e].volume = elems[e].getAttribute('data-volume')/100;
            }
            
            // add the sourcefile
            var source = document.createElement('source');
            if(elems[e].getAttribute('data-path')) {
                source.setAttribute('src', elems[e].getAttribute('data-path'));
            } else {
                source.setAttribute('src', 'fx/'+id);
            }
            // append souce to audio
            elems[e].appendChild(source);
            
            // start time?
            if(elems[e].getAttribute('data-startat')) {
                elems[e].currentTime= elems[e].getAttribute('data-startat');
            }
            // stop time?
            if(elems[e].getAttribute('data-stopat')) {
                elems[e].ontimeupdate  = function(event) {
                    audio = event.target;
                    var stopat = audio.getAttribute('data-stopat')*1;
                    if(audio.currentTime >= stopat) {
                        audio.pause();
                        if(audio.getAttribute('data-startat')) {
                            audio.currentTime= audio.getAttribute('data-startat');
                        } else {
                            audio.currentTime = 0;
                        }
                    }
                };
            }
            
            // append audio to tab
            elems[e].closest('.tab').appendChild(img);
        } else {
            // audio elements on track pages
            elems[e].addEventListener('play', function() { 
                var tab = this.parentElement.parentElement;
                var tabId = tab.getAttribute('id');
                var buttons = document.getElementsByName(tabId);
                for(b = 0; b<buttons.length; b++) {
                    buttons[b].classList.add('trackplaying');
                }
            });
            elems[e].addEventListener('pause', function() { 
                var tab = this.parentElement.parentElement;
                var tabId = tab.getAttribute('id');
                var buttons = document.getElementsByName(tabId);
                for(b = 0; b<buttons.length; b++) {
                    buttons[b].classList.remove('trackplaying');
                }
            });
        }
    }

    // create volume sliders
    var elems = document.getElementsByClassName('volume');
    for(e = 0; e<elems.length; e++) {
        elems[e].insertAdjacentHTML('afterbegin', '<input oninput="volume(this)" type="range" min="1" max="100" value="100" class="slider" orient="vertical" /><div class="noevents"></div>');
    }
    
    // prevent background scrolling behind sliders
    var elems = document.getElementsByClassName('noevents');
    for(e = 0; e<elems.length; e++) {
        elems[e].addEventListener ('touchmove', function (event) {
            event.preventDefault();
            return false;
        });
        elems[e].addEventListener ('mousewheel', function (event) {
            event.preventDefault();
            return false;
        });
        elems[e].addEventListener ('keydown', function (event) {
            event.preventDefault();
            return false;
        });
    }
    var elems = document.getElementsByClassName('slider');
    for(e = 0; e<elems.length; e++) {
        elems[e].addEventListener ('mousewheel', function (event) {
            event.preventDefault();
            return false;
        });
        elems[e].addEventListener ('keydown', function (event) {
            event.preventDefault();
            return false;
        });
    }
    
    // click on first tab
    var elems = document.getElementsByTagName('button');
    var event = document.createEvent('Events');
    event.initEvent('click', true, false);
    elems[0].dispatchEvent(event);
}

// play or pause (with 1s fadeout)
function toggleAudio(audioName) {
    var audio = document.getElementById(audioName)
    if(!audio.paused) {
        // fadeout
        clearInterval(audio.fade);
        button = document.getElementById('img_'+ audio.getAttribute('id'));
        button.classList.add('fadeout');
        audio.fade = setInterval(function(elem) {
            if(elem.volume <= 0.05) {
                elem.pause();
                clearInterval(elem.fade);
                if(elem.getAttribute('data-volume')) {
                    elem.volume = elem.getAttribute('data-volume')/100;
                } else {
                    elem.volume = 1;
                }
                button = document.getElementById('img_'+ audio.getAttribute('id'));
                button.classList.remove('fadeout');
            } else {
                elem.volume = elem.volume - 0.05;
            }
        }, 100, audio);
    } else {
        audio.play();
    }
}

// check if ancestor is an ancestor of descendend
// used to check if to elements are under the same tab
function isAncestor(descendent, ancestor) {
   while ((descendent = descendent.parentNode) != null)
      if (descendent == ancestor)
         return true;

   return false;
}

function mute(elem, stop) {
    var tab = elem.closest(".tab");
    
    var elems = document.getElementsByTagName('audio');
    for(e = 0; e<elems.length; e++) {
        var audio = elems[e];
        if(isAncestor(audio, tab)) {
            audio.pause();
            if(stop != 'undefined' || stop==1) {
                if(audio.getAttribute('data-startat')) {
                    audio.currentTime= audio.getAttribute('data-startat');
                } else {
                    audio.currentTime=0;
                }
            }
        }
    }
}

function volume(slider) {
    var tab = slider.closest(".tab");
    var elems = document.getElementsByTagName('audio');
    for(e = 0; e<elems.length; e++) {
        var audio = elems[e];
        if(isAncestor(audio, tab)) {
            audio.volume = slider.value/100;
        }
    }
}
function tab(button, id='') {
    if(!id) {
        id = button.getAttribute('name');
    }
    var elems = document.getElementsByClassName('tab');
    for(e = 0; e<elems.length; e++) {
        elems[e].style.display = 'none';
    }
    document.getElementById(id).style.display = 'block';
    
    var buttons = document.getElementsByTagName('button');
    for(b = 0; b<buttons.length; b++) {
        buttons[b].style.zIndex = '1';
    }
    button.style.zIndex = '11';
}
function play(elem, file, title, startat, stopat) {
    if(!title || title == 'undefined' || title == 'null') {
        title = file;
        title = title.replace(/.*\//, '');      // path
        title = title.replace(/_/g, ' ');       // underscores
        title = title.replace(/\.mp3|flac|ogg|wav$/, '');    // extension
    }
    if(!startat || startat == 'undefined') {
        startat = 0;
    }

    var audio;
    var audiofound=0;
    var titlefound=0;
    var tab = elem.closest(".tab");
    var player = tab.querySelector(".audioplayer");
    var children = player.children;
    for(c=0; c<children.length; c++) {
        if(children[c].nodeName == 'AUDIO') {
            audio = children[c];
            audioplayerSource(audio, file);
            audio.load();
            audio.currentTime = startat;
            audio.setAttribute('data-startat', startat);
            audio.play();
            audiofound++;
        } else if(children[c].nodeName == 'DIV') {
            children[c].innerHTML = title;
            titlefound++;
        }
    }   
    if(titlefound==0) {
        var titlediv = document.createElement('div');
        titlediv.innerHTML = title;
        player.insertBefore(titlediv, children[0]);
    }
    if(audiofound==0) {
        audio = document.createElement('audio');
        audio.setAttribute('loop', true);
        audio.setAttribute('controls', true); // TODO: Controls don't show in chrome
        audio.className = 'nofx';
        player.appendChild(audio);
        audioplayerSource(audio, file);
        audio.load();
        audio.currentTime = startat;
        audio.setAttribute('data-startat', startat);
        audio.play();
    }
    
    // stop at a given time
    if(stopat && stopat != 'undefined') {
        audio.setAttribute('stopat', stopat);
        audio.ontimeupdate  = function(event) {
            audio = event.target;
            var stopat = audio.getAttribute('stopat')*1;
            if(audio.currentTime >= stopat) {
                audio.pause();
                if(audio.getAttribute('data-startat')) {
                    audio.currentTime= audio.getAttribute('data-startat');
                } else {
                    audio.currentTime=0;
                }
            }
        };
    }

    mtt(elem);
}

function audioplayerSource(audio, file) {
    var audiochildren = audio.children;
    var sourcefound=0;
    for(ac=0; ac<audiochildren.length; ac++) {
        if(audiochildren[ac] && audiochildren[ac].nodeName == 'SOURCE') {
            audiochildren[ac].setAttribute('src', file);
            sourcefound++;
        }
    }
    if(sourcefound==0) {
        var source = document.createElement('source');
        source.setAttribute('src', file)
        audio.appendChild(source);
    }
}

// move to top
// moves li elements to the top of their ul/ol
function mtt(elem) {
    elem.style.color = 'orange';
    var list = elem.parentElement;
    list.removeChild(elem);
    list.insertBefore(elem, list.childNodes[0]);
}