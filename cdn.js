  const dbutton2 = `
    background-color: #4CAF50;
    border: none;
    border-radius: 8px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    transition-duration: 0.4s;
    cursor: pointer;
  `

  const dModal =`
    display: none;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  `

  const dModalContent =`
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const dModalClose =`
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  `

  const dModalCloseFocus =`
    color: #000;
    text-decoration: none;
    cursor: pointer;
  `
  const dIframe =`
    display: block;
    border: none;
    height: 100%;
    width: 90%;
    z-index: 99999;
  `

// function setStylesOnElement(styles, element){
//   document.getElementById(element).style.cssText = styles
// }



window.onload = document.addEventListener('DOMContentLoaded', function() {

  var bodyDocument = document.getElementsByTagName("body")[0]
  bodyDocument.setAttribute("onclick", "closeOnModal()");
  document.getElementById('button').style.cssText = dbutton2

  createAnElement("pass", "div", ["myModal"], `display: none`)

}, false);

function openIframe(clientInfo) {
  if (document.getElementById("myModal").childNodes.length == 0) {
    // Create modal card
    createAnElement("myModal", "div", ["myModal2"], dModalContent)

    // Create close button
    createAnElement("myModal2", "span", ["dClose", ["onclick","g()"]], dModalClose, "&times;")

    document.getElementById('myModal').style.cssText = dModal
    // Create Iframe
    createAnElement(
      "myModal2",
      "iframe",
      ["dFrame", ["src",`${clientInfo.link}/?src${clientInfo.src}&amount=${clientInfo.amount}&url=${clientInfo.url}&name=${clientInfo.name}&email=${clientInfo.email}&qty=${clientInfo.qty}&description=${clientInfo.description}&key=${clientInfo.key}`]],
      dIframe
    )
    document.getElementById("myModal").style.display = "block";
  }else {
    createAnElement(
      "myModal2",
      "iframe",
      ["dFrame", ["src",`${clientInfo.link}/?src${clientInfo.src}&amount=${clientInfo.amount}&url=${clientInfo.url}&name=${clientInfo.name}&email=${clientInfo.email}&qty=${clientInfo.qty}&description=${clientInfo.description}&key=${clientInfo.key}`]],
      dIframe
    )
    document.getElementById("myModal").style.display = "block";
  }


}

var buttonToBinary = document.querySelector("#dClose");
function g(){
  document.getElementById("myModal").style.display = "none";
  removeElement("dFrame")
  // document.getElementById('button').style.cssText = dbutton2
}




  // document.getElementsByClassName("close")[0].onclick = function() {
  //   document.getElementById("myModal").style.display = "none";
  // }
  // document.getElementById("dClose").addEventListener('click', function() {
  //   console.log('eeee reach')
  //   document.getElementById("myModal").style.display = "none";
  // });
  // document.getElementById("dClose").addEventListener("click", function() {
  //   alert("Hello World!");
  // });

  // checkoutButton.onclick = function() {
  //   modal.style.display = "block";
  // }

  

  function closeOnModal() {
    if (event.target == document.getElementById("myModal")) {
      document.getElementById("myModal").style.display = "none";
    }
  }

  function createAnElement(parentId, elementTag, elementId, style, html = null) {
    var modalDiv = document.createElement(elementTag)
    modalDiv.style.cssText = style
    if(html) modalDiv.innerHTML = html;
    modalDiv.setAttribute("id", elementId[0]);
    if(elementId.length > 1)modalDiv.setAttribute(`${elementId[1][0]}`, `${elementId[1][1]}`);
    if (parentId == "pass") {
      var dParentElement = document.getElementById("button").parentNode
      dParentElement.appendChild(modalDiv);
    } else document.getElementById(parentId).appendChild(modalDiv);

  }

  function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
  }




  // function createModal() {
  //   var modal = document.createElement("myModal");
  //   modal.setAttribute( "id", `myModal` );
  //   modal.style.cssText = dModal
  //   document.body.appendChild(modal)
  // }
