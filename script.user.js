// ==UserScript==
// @name         HBO NOW page strip.
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Strips almost everything off the HBO NOW page except the player upon pressing the (Ctrl+Alt+S) hotkey.
// @author       Andrew Gutekanst
// @match        *://play.hbonow.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    var stripModeActive = false;

    var resizeTimer;
    $(window).on('resize', function(e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if(stripModeActive){
                reset_styles();
            }
        }, 50);
    });

    document.addEventListener("keydown", function (e) {
        if (e.ctrlKey && e.altKey && e.key === "s"){
            stripModeActive = !stripModeActive;
            if(stripModeActive){
                strip_page();
            }
        }
    });

    function strip_page() {
        try{
            var body = document.body;
            var vid = document.querySelector("video");
            vid.setAttribute('controls', true);
            body.insertBefore(vid, body.firstChild);
            reset_styles();

            $("video").nextAll().remove()
        }catch(e){
            alert("Video must be playing first");
            stripModeActive = false;
        }
    }

    function reset_styles() {
        document.querySelector("video").style = "width: 100%; height: 100%;";
        document.body.style = "align-items: center; display: flex; justify-content: center; height: 100%; width: 100%;";

    }

})();
