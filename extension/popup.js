//listen for when content.js sends the captions over
// add event listeners to all the words, which will trigger the background js definition api thing

// chrome.runtime.onConnect.addListener(function(port) {
//     console.log("connected to: " + port.name)
// });
$(document).ready(function () {

    var cardState;
    var currentQuestion=0;
    var qbank=new Array;
    var qbank_img=new Array;
    var language=0;
    var currentLang=0;
    
    function clickHandler(){
      console.log("chinese");
      language = 2;
      $('#card1').css({
          background: "-webkit-gradient(linear, left top, right top, from(#ECF1FF), to(#FFFFFF))"
      });
      document.getElementById("title").innerHTML = "让我们一起回顾";
    }
    function clickHandler1(){
      console.log("spanish");
      language = 1;
      document.getElementById("title").innerHTML = "Repasemos juntos";
    }
    var element = document.getElementById('lang2');
    element.addEventListener('click', clickHandler);
    var element = document.getElementById('lang1');
    element.addEventListener('click', clickHandler1);
    
      loadDB();
    
    
    function loadDB(){
     $.getJSON("activity.json", function(data) {
       currentLang=language;
       if(language==2){
    
         for(i=0;i<data.questionlist_chi.length;i++){
    
          qbank[i]=[];
          qbank_img[i]=[];
          qbank[i][0]=data.questionlist_chi[i].cardfront;
          qbank_img[i][0]=data.questionlist_chi_img[i].word;
          qbank[i][1]=data.questionlist_chi[i].cardback;
          qbank_img[i][1]=data.questionlist_chi_img[i].img;
         }
       }
       else if(language==1){
    
         for(i=0;i<data.questionlist_esp.length;i++){
          qbank[i]=[];
          qbank_img[i]=[];
          qbank[i][0]=data.questionlist_esp[i].cardfront;
          qbank_img[i][0]=data.questionlist_esp_img[i].word;
          qbank[i][1]=data.questionlist_esp[i].cardback;
          qbank_img[i][1]=data.questionlist_esp_img[i].img;
         }
       }
       else{
    
         setTimeout(loadDB, 300);
       }
      //for
      beginActivity();
     })//gtjson
    }//loadDB
    
    function beginActivity(){
      if(language!=currentLang){
        loadDB();
      }
     cardState=0;
     var color1="#FCFCF4";
     $("#flip-card-inner").empty();
     $("#flip-card-inner").append('<div id="card1" class="card">' + qbank[currentQuestion][0] + '</div>');
     $("#flip-card-inner").append('<div id="card2" class="card_flipped" style="position; absolute;">' + qbank[currentQuestion][1] + '<img src="' + qbank_img[currentQuestion][1]+'" alt="img" style="z-score: 30; height:90px; position:absolute; left:85px; top:10px;">'+'</div>');
     $('#card1').css({
         background: "-webkit-gradient(linear, left top, right top, from(#ECF1FF), to(#FFFFFF))"
     });
     $('#card2').css({
         background: "-webkit-gradient(linear, left top, right top, from(#ECF1FF), to(#FFFFFF))"
     });
    
     /*
     $("#card2").css("top","200px");
    
     $("#flip-card-inner").on("click",function(){
      if(cardState!=1){
       cardState=1;
       //togglePosition();
       $("#card1").animate({top: "-=200"}, 150, function() {cardState=0;togglePosition();});
       $("#card2").animate({top: "-=200"}, 150, function() {togglePosition2();});
      }//if
     });//click function
    */
    currentQuestion++;
    
    document.getElementById("countArea").innerHTML = currentQuestion+"/"+qbank.length;
    
     $("#leftButtonArea").empty();
     $("#rightButtonArea").empty();
     $("#leftButtonArea").append('<div class="arrow-left" id="backButton"></div>');
     $("#rightButtonArea").append('<div class="arrow-right" id="nextButton"></div>');
     $("#nextButton").on("click",function(){
      if(currentQuestion<qbank.length){
    
        beginActivity();
      }
      else{
        //displayFinalMessage();
      }
     });//click function
     $("#backButton").on("click",function(){
       if(currentQuestion>=2){
         currentQuestion-=2;
         beginActivity();
       }
     });
    
    
    }//beginactivity
    
    function togglePosition(){
     if($("#card1").position().top==-200){$("#card1").css("top","200px");};
    }//toggle
    
    function togglePosition2(){
     if($("#card2").position().top==-200){$("#card2").css("top","200px");};
    }//toggle2
    
    function displayFinalMessage(){
    
     $("#flip-card-inner").empty();
     $("#flip-card-inner").append('<div id="finalMessage">You finished the activity!</div>');
    }//final message
    
    });
    
function makeFlashcards(){
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "makeFlashcards"}, function(response){
            console.log(response)
            console.log(response.response)
            if (response.response == "added data to storage"){
                chrome.storage.local.get(["wordList", "imgURLs"], data =>{
                    console.log("got the data")
                    console.log(data)
                });
            }
        });
       });
}

// document.addEventListener('DOMContentLoaded', function(){
//     document.getElementById("makeFlashcards").addEventListener("click", makeFlashcards);

    
    // var transcriptContainer = document.querySelector("transcriptContainer")

    // port.onMessage.addListener(function(message) {
    //     console.log("MESSAGE RECEIVED: " + message.data)
    //     var splitMessage = message.split(" ");
    //     for (word in splitMessage){
    //         var textSpan = document.createElement("span")
    //         textSpan.textContent = word
    //         transcriptContainer.appendChild(textSpan)
    // }
    // });

    // chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
    //     console.log("MESSAGE RECEIVED: " + message.data)
    //     var splitMessage = message.split(" ");
    //     for (word in splitMessage){
    //         var textSpan = document.createElement("span")
    //         textSpan.textContent = word
    //         transcriptContainer.appendChild(textSpan)
    //     }
    //     sendResponse({confirmation: "received"})
    // });

// });