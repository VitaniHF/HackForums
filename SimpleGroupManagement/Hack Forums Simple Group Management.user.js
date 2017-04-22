// ==UserScript==
// @name            Hack Forums Simple Group Management - Vitani
// @author          Vitani
// @namespace       https://github.com/VitaniHF/HackForums/
// @description     Group management script for Hack Forums leaders and group owners.
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *://hackforums.net/*
// @version         1.1
// @copyright       2017+
// @iconURL         https://avatars1.githubusercontent.com/u/27237879?v=3&s=40
// @updateURL       https://github.com/VitaniHF/HackForums/blob/master/SimpleGroupManagement/Hack%20Forums%20Simple%20Group%20Mnagement%20-%20Vitani.js
// @downloadURL     https://github.com/VitaniHF/HackForums/blob/master/SimpleGroupManagement/Hack%20Forums%20Simple%20Group%20Mnagement%20-%20Vitani.js
// ==/UserScript==
//OP of the addtogroup Button and highlight user is Snorlax. Credits go to him for making the first version.
//Credits also go to xadamxk, he inspired me to make this script.

//Static Variables, DO NOT change these!
var uid = $(location).attr('href').replace(/[^0-9]/g, '');
var username = $("span[class*='group']").text();

//Dynamic Variables, Change these to the right group!

//URL to the group userbar you are moderating.
var GroupUBurl = "https://hackforums.net/images/modern_bl/groupimages/english/mygroupUB.png";

//Group ID of the group you are moderating. You can find it in the URL when managing users.
var GroupID = xxx;

//Group Name of the group you are moderating, this speaks for itself.
var GroupName = "MyGroup";



//starts the script
WhatPage();

//Checks which page you are on, and runs the right functions
function WhatPage(){
    if (window.location.href.includes("hackforums.net/member.php?action=profile&uid=")){
        RunOnEveryPage();
        RunOnProfile();
        return;
    }
    if (window.location.href.includes("hackforums.net/managegroup.php?gid=")){
        RunOnEveryPage();
        HighlightUser();
        return;
    }
    else{
        RunOnEveryPage();
        return;
    }
}

//Generates the add/remove button on the profile
function RunOnProfile(){
    var obj = new Image();
    obj.src = GroupUBurl;

    if (obj.complete) {
        $("span[class*='group']").after(' - <button class="remove button">Remove from '+GroupName+'</button>');
    } else {
        $("span[class*='group']").after(' - <button class="add button">Add to '+GroupName+'</button>');
    }


    $(".add").click(function(){
        $.post("https://hackforums.net/managegroup.php?",
               {
            "my_post_key": my_post_key,
            "action": "do_add",
            "gid": GroupID,
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
            "gid": GroupID,
            "removeuser[0]": uid
        },
               function(data,status){
            console.log("Data: " + data + "\nStatus: " + status);
            location.reload();
        });
    });
}

//Adds the group members and requests buttons on every page after UserCP
function RunOnEveryPage(){
    var regex = "User CP</strong></a>";
    var revised = "User CP</strong></a>";
    revised =   "User CP</strong></a>"+
                " &mdash; <a href='http://www.hackforums.net/managegroup.php?gid="+GroupID+"'><strong>"+GroupName+" Members</strong>"+
                "</a> &mdash; <a href='http://www.hackforums.net/managegroup.php?action=joinrequests&gid="+GroupID+"'><strong>"+GroupName+" Requests</strong></a>";
    // Set string
    $("#panel").html($("#panel").html().replace(regex,revised));
}

//Highlights a user when box is checked on group management page
function HighlightUser(){
    $('.tborder input:checkbox').live('change', function(){
    if($(this).is(':checked')){
        $(this).parent().siblings().andSelf().css("background","#242424");
    } else {
        $(this).parent().siblings().andSelf().css("background","");
    }
});

$('.tborder input:checkbox').each(function() {
    username = $(this).parent().siblings().first().find("span").text();
    $(this).attr("title", username);
});
}