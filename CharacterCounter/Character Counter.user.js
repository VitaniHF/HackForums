// ==UserScript==
// @name            Character Counter - Vitani
// @author          Vitani
// @namespace       https://github.com/VitaniHF/HackForums/
// @description     Lucky Award Character Counter
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *://hackforums.net/*
// @version         1.1
// @copyright       2017+
// @iconURL         https://avatars1.githubusercontent.com/u/27237879?v=3&s=40
// @updateURL       https://github.com/VitaniHF/HackForums/blob/master/SimpleGroupManagement/Hack%20Forums%20Simple%20Group%20Mnagement%20-%20Vitani.js
// @downloadURL     https://github.com/VitaniHF/HackForums/blob/master/SimpleGroupManagement/Hack%20Forums%20Simple%20Group%20Mnagement%20-%20Vitani.js
// ==/UserScript==
//OP of this script is Cryptic, all credits go to him, I simply removed the errors.

//starts the script
WhatPage();

//Checks which page you are on, and runs the right functions
function WhatPage(){
    if (window.location.href.includes("hackforums.net/showthread.php")){
        Main();
        return;
    }
    else{
        return;
    }
}

function Main(){
    var url = window.location.href;
    if (url.search("showthread.php") > 0) {
        regex = /here.*?>/;
        revised = "here.<br /> <div id='letscount'>0<br /><span style='color:red'>Too Low!</span></div>";
        document.getElementById('quickreply_e').innerHTML= document.getElementById('quickreply_e').innerHTML.replace(regex,revised);
    }else if (url.search("newreply") > 0) {
        $('strong:contains("Post Options:")').append("<div id='letscount'>0<br /><span style='color:red'>Too Low!</span></div>");
    }

    addButtonListener();
    function addButtonListener(){
        var url = window.location.href;
        var texts = document.getElementById("message_new");
        if (url.search("showthread.php") > 0) {
            texts = document.getElementById("message");
        }
        texts.addEventListener('keyup',doCountNow,true);
        texts.addEventListener('keydown',doCountNow,true);
    }
    doCountNow();
    function doCountNow(){
        var url = window.location.href;
        var field = 0;

        var text = document.getElementById("message_new");
        if (url.search("showthread.php") > 0) {
            text = document.getElementById("message");
        }

        text = text.value;
        text = text.replace(/\[\/?quote.*[^\]]*\]/g, '');
        text = text.replace(/\[img\].*\[\/img\]/g, '');
        text = text.replace(/:([^:][^:]*:)?/g, '');
        text = text.replace(/ /g, '');

        field = text.length;

        var minlimit = 100;
        var maxlimit = 18000;
        if (field < minlimit) {
            document.getElementById('letscount').innerHTML = field+'<br /><span style="color:red">Too Low!</span>';
        }
        else if (field > maxlimit) {
            document.getElementById('letscount').innerHTML = field+'<br /><span style="color:red">Too High!</span>';
        }
        else {
            document.getElementById('letscount').innerHTML = field+'<br /><span style="color:green">Okay To Post!</span>';
        }
    }
}