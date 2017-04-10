// ==UserScript==
// @name            Hack Forums Add to Group - Vitani
// @namespace       Vitani
// @description     Adds people to groups
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/member.php?action=profile&uid=*
// @version         1.0
// ==/UserScript==
//OP = Snorlax. Credits go to him for making the first version.

var uid = $(location).attr('href').replace(/[^0-9]/g, '');
var username = $("span[class*='group']").text();
var url = "https://hackforums.net/images/modern_bl/groupimages/english/notorious.png";
var WhatIsIt = 0;

var obj = new Image();
    obj.src = url;

if (obj.complete) {
    $("span[class*='group']").after(' - <button class="remove button">Remove from Notorious</button>');
} else {
    $("span[class*='group']").after(' - <button class="add button">Add to Notorious</button>');
}


$(".add").click(function(){
    $.post("https://hackforums.net/managegroup.php?",
    {
        "my_post_key": my_post_key,
        "action": "do_add",
        "gid": "12",
        "username": username
    },
        function(data,status){
        console.log("Data: " + data + "\nStatus: " + status);
        location.reload();
    });
});

$(".remove").click(function(){
    $.post("https://hackforums.net/managegroup.php?",
    {
        "my_post_key": my_post_key,
        "action": "do_manageusers",
        "gid": "12",
        "removeuser[0]": uid
    },
        function(data,status){
        console.log("Data: " + data + "\nStatus: " + status);
        location.reload();
    });
});