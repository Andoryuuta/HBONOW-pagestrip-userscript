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

    document.addEventListener("keydown", function (e) {
        if (e.ctrlKey && e.altKey && e.key === "s"){
            strip_page();
        }
    });

    function strip_page() {
        try {
            var body = document.body;
            body.style = "align-items: center; display: flex; justify-content: center; height: 100%; width: 100%;";

            var vid = document.querySelector("video");
            vid.setAttribute('controls', true);
            body.insertBefore(vid, body.firstChild);
            vid.style = "width: 100%; height: 100%;"


            $("video").nextAll().remove()
        }
        catch(err) {
            console.log(err.message);
        }
    }
})();
