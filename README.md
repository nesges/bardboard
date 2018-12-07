# bardboard

bardboard provides some simpler measures to create a browser based soundboard for sound effects and music without the need to have an online connection or even a running webserver. 

![screenshot](screenshots/screenshot_fx.png?raw=true)

## Installation

Download bardboard ("Clone or download" -&gt; "Download Zip" or checkout) and follow the instructions in "bardboard/bardboard.html". non-tech savvy people might be scared by editing html but it's really not that hard. try it! :-) 

You can edit and test bardboard on your desktop PC. When you're done and ready, just copy the "bardboard" folder to your mobile device, point your browser to bardboard.html and you're good to go. 

It doesn't work in Internet Explorer, but Chrome, Firefox and their derivates should be fine. I recommend [Fully](https://play.google.com/store/apps/details?id=de.ozerov.fully) on Android.

## Howto add an effect button

* copy your soundfile to "bardboard/fx" (e.g. "thunder.mp3")
* copy a jpg image to "bardboard/img". The image needs to have the same name as the soundfile + '.jpg' (e.g. "thunder.mp3.jpg")
* add ```<audio id="soundfilename"></audio>``` under the tab div (e.g. ```<div id="pageFX" class="tab">```), replace "soundfilename" with the actual filename (e.g. ```<audio id="thunder.mp3"></audio>```)
* if you want it to loop add ```loop="true"``` to the audio tag (e.g. ```<audio id="thunder.mp3" loop="true"></audio>```)
* if you want to lower it's volume add ```data-volume="X"```, with X between 0 and 100 to the audio tag (e.g. ```<audio id="thunder.mp3" loop="true" data-volume="50"></audio>```)

## Howto add a music track

* copy your soundfile to "bardboard/music" or any other folder (relative folders outside of your bardboard installation are fine)
* add ```<li onclick="play(this, 'path/soundfilename')">title</li>``` under a ```<ul class="tracklist">``` element. Replace "ath/soundfilename" with the actual path to your soundfile and "title" with some title that should be displayed. (e.g. ```<li onclick="play(this, 'music/Marcos_H_Bolanos_-_06_-_The_Dream.mp3')">The Dream</li>``` or ```<li onclick="play(this, '../../music/Marcos H Bolanos/Unchained Melodies/Marcos_H_Bolanos_-_06_-_The_Dream.mp3')">The Dream</li>```)

## Howto add a new tab

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

## Screenshots

Here are some screenshots of my own installation (which is not included for obvious copyright reasons):

![screenshot](screenshots/screenshot_main.png?raw=true)
![screenshot](screenshots/screenshot_celaeon.png?raw=true)
![screenshot](screenshots/screenshot_kampf.png?raw=true)
