/**
 * Created by thonatos on 15/2/6.
 */

var first = 0;

// Jqurey Object

var $qrImg = $('.qrcode-img');

init();

function init(){

    // Init Func
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){

        var currentUrl = tabs[0].url;
        if(currentUrl.length > 0){
            generate(currentUrl);
        }
    });

    $('.btn-save').click(function (e) {
        e.preventDefault();
        save();

    });

}

// Utils

function showMsg(msg){
    $('.msg').html(msg);
}

function generate(url){

    if(url.length < 1){
        showMsg('Sorry, We did not get your URL info.');
    }else{

        $qrImg.html('');
        $qrImg.qrcode({
            render: "canvas", //table format
            width: 200, //width default 200
            height:200, //height default 200
            text: utf16to8(url) //random url
        });
        first++;
    }
}

function save(){

    if(first>0){
        var canvas= document.getElementsByTagName('canvas')[0];
        var w=window.open('about:blank','image from canvas');
        w.document.write("<img src='"+canvas.toDataURL("image/png")+"' alt='from canvas'/>");

    }else{
        showMsg('Please Generate QRCode Before save it!');
    }
}

function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    return out;
}

function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}