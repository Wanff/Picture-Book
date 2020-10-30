//listen for when content.js sends the captions over
// add event listeners to all the words, which will trigger the background js definition api thing

// chrome.runtime.onConnect.addListener(function(port) {
//     console.log("connected to: " + port.name)
// });
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

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("makeFlashcards").addEventListener("click", makeFlashcards);

    
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

});