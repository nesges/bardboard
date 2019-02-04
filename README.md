# bardboard

bardboard provides some simple measures to create a browser based soundboard for sound effects and music. And you don't need to have an online connection or even a running webserver to use bardboard.

![screenshot](screenshots/screenshot_fx.png?raw=true)

## Video-Demo

[![demovideo](https://img.youtube.com/vi/04VKqXPdKuw/maxresdefault.jpg)](https://youtu.be/04VKqXPdKuw)

## Live-Demo

http://nesges.eu/bardboard/bardboard/bardboard.html

## Installation

Download bardboard ("Clone or download" -&gt; "Download Zip" or checkout) and follow the instructions in "bardboard/bardboard.html".  Non-tech savvy people might be scared of editing html but it's really not that hard. try it! :-) Instructions are provided as html comments (```<!-- this is such a comment -->```), see "bardboard/demo2.html" if you prefer a cleaner base to start of.

You can edit and test bardboard on your desktop PC. When you're done and ready, just copy the "bardboard" folder to your mobile device, point your browser to bardboard.html and you're good to go. 

It doesn't work in Internet Explorer, latest Firefox has some issues, but **Chrome and Chromium based browsers** should be fine. I recommend [Fully](https://play.google.com/store/apps/details?id=de.ozerov.fully) on Android.

### Howto add an effect button

* copy your soundfile to "bardboard/fx" (e.g. "thunder.mp3")
* copy a jpg image to "bardboard/img". The image needs to have the same name as the soundfile + '.jpg' (e.g. "thunder.mp3.jpg")
* add ```<audio id="soundfilename"></audio>``` under the tab div (e.g. ```<div id="pageFX" class="tab">```), replace "soundfilename" with the actual filename (e.g. ```<audio id="thunder.mp3"></audio>```)
* if you want it to loop add ```loop="true"``` to the audio tag (e.g. ```<audio id="thunder.mp3" loop="true"></audio>```)
* if you want to lower it's volume add ```data-volume="X"```, with X between 0 and 100 to the audio tag (e.g. ```<audio id="thunder.mp3" loop="true" data-volume="50"></audio>```)

#### advanced options for effect buttons
* ```data-path="path/to/soundfile"```the soundeffect is loaded from the specified path and not from fx/ID. The image must still be img/ID.jpg. You still have to provide the ```id='ID'``` attribute, but you can name "ID" whatever you want
* ```data-startat="X.Y"``` starts playback at X.Y (e.g. ```data-startat=23.5``` starts playback at 23s 5ms)
* ```data-stopat="X.Y"``` stops playback at or after X.Y (e.g. ```data-startat=32.8``` stops playback at 32s 9ms). the exact stopping point may vary a few ms

### Howto add a music track

* copy your soundfile to "bardboard/music" or any other folder (relative folders outside of your bardboard installation are fine)
* add ```<li onclick="play(this, 'path/soundfilename')">title</li>``` under a ```<ul class="tracklist">``` element. Replace "ath/soundfilename" with the actual path to your soundfile and "title" with some title that should be displayed. (e.g. ```<li onclick="play(this, 'music/Marcos_H_Bolanos_-_06_-_The_Dream.mp3')">The Dream</li>``` or ```<li onclick="play(this, '../../music/Marcos H Bolanos/Unchained Melodies/Marcos_H_Bolanos_-_06_-_The_Dream.mp3')">The Dream</li>```)

#### advanced options for music tracks
The play() function takes five parameters: ```play(this, 'FILENAME', 'TITLE', 'STARTAT', 'STOPAT')```
* this: mandatory, don't change it
* FILENAME: the path to your music file (mandatory, see above)
* TITLE: a title to display instead of the filename (optional, default: null)
* STARTAT: starts playback at X.Y (e.g. ```23.5``` starts playback at 23s 5ms) (optional, default: 0)
* STOPAT: stops playback at or after X.Y (e.g. ```32.8``` stops playback at 32s 9ms). the exact stopping point may vary a few ms (optional, default: end of track)

### Howto add a new tab

* add a ```<button onClick="tab(this, 'PAGEID')">TITLE</button>``` element to ```<div class="tabs">``` and replace PAGEID with some unique term to identify the tab and TITLE with sine title that should be displayed (e.g. ```<button onClick="tab(this, 'pageFX')">FX</button>```)
* if you want to add a new tab with effectbuttons add
```
        <div id="PAGEID" class="tab">
            <img class="mutebutton nofloat"></img>
            <audio ... ></audio> 
        </div>
```
* if you want to add a new tab with music add
```
        <div id="PAGEID" class="tab">
            <img class="mutebutton"></img>
            <div class="volume"></div>
            <div class="audioplayer"><audio loop="true" controls class="nofx"/></div>
            <ul class="tracklist">
                <li ... > ... </li>
            </ul>
        </div>
```
## Troubleshooting

### It doesn't work at all

Bring up the browsers developer console by hitting F12. It should give you a hint what went wrong.

### Volume sliders aren't displayed correctly

![screenshot](screenshots/ff_vertical_slider.png?raw=true)

If the volume sliders look like this, you're most likely using firefox to display bardboard. You have two options: ignore the issue, since you won't be using firefox on your actual bardboard-device. Or use Chrome/Chromium instead.

### It takes forever to load

Firefox seems to have some issues with loading the mp3 content. You have the same options as for the volume sliders. Which is: ignore the isser or use Chrome/Chromium.

## Screenshots

Here are some screenshots of my own installation (which is not included for obvious copyright reasons):

![screenshot](screenshots/screenshot_main.png?raw=true)
![screenshot](screenshots/screenshot_celaeon.png?raw=true)
![screenshot](screenshots/screenshot_kampf.png?raw=true)
