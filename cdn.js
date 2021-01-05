  const dbutton2 = `
    background-color: #1dbc86;
    border: none;
    border-radius: 3px;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-flex;
    font-size: 14px;
    transition-duration: 0.4s;
    cursor: pointer;
  `

  const dModal =`
    display: none;
    position: fixed;
    z-index: 1;
    padding-top: 20px;
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
    position: absolute;
    top: 5%;
    right: 8%;
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
    width: 100%;
    z-index: 99999;
  `


function mover(){ document.getElementById('button').style.cssText = `${dbutton2}; ${document.getElementById('button').attributes.style.value}; opacity:0.8` }
function moout(){ document.getElementById('button').style.cssText = `${dbutton2}; ${document.getElementById('button').attributes.style.value}; opacity:1` }

window.onload = document.addEventListener('DOMContentLoaded', function() {

  var bodyDocument = document.getElementsByTagName("body")[0]
  bodyDocument.setAttribute("onclick", "closeOnModal()");
  // console.log(document.getElementById('button').attributes.style.value)
  document.getElementById('button').style.cssText = `${dbutton2}; ${document.getElementById('button').attributes.style.value}`
  document.getElementById('button').setAttribute("onclick", "runIframe()")
  document.getElementById('button').setAttribute("onmouseover", "mover()")
  document.getElementById('button').setAttribute("onmouseout", "moout()")

  // Create Modal
  createAnElement("pass", "div", ["myModal"], `display: none`)

}, false);

  function openIframe(clientInfo) {
    // console.log(clientInfo.src)
    if (document.getElementById("myModal").childNodes.length == 0) {
      // Create Modal-Content card
      createAnElement("myModal", "div", ["myModal2"], dModalContent)

      // Create close button
      createAnElement("myModal2", "span", ["dClose", ["onclick","g()"]], dModalClose, "&times;")

      document.getElementById('myModal').style.cssText = dModal
      // Create Iframe
      createAnElement(
        "myModal2",
        "iframe",
        ["dFrame", ["src",`${clientInfo.link}/?src=${clientInfo.src}&amount=${clientInfo.amount}&url=${clientInfo.url}&name=${clientInfo.name}&email=${clientInfo.email}&qty=${clientInfo.qty}&description=${clientInfo.description}&key=${clientInfo.key}`]],
        dIframe
      )

      window.OncloseData = clientInfo.onClose
      iframeData(document.getElementById("myModal"), clientInfo.onClose)
      document.getElementById("myModal").style.display = "block";
    }else {
      createAnElement(
        "myModal2",
        "iframe",
        ["dFrame", ["src",`${clientInfo.link}/?src=${clientInfo.src}&amount=${clientInfo.amount}&url=${clientInfo.url}&name=${clientInfo.name}&email=${clientInfo.email}&qty=${clientInfo.qty}&description=${clientInfo.description}&key=${clientInfo.key}`]],
        dIframe
      )
      window.OncloseData = clientInfo.onClose
      iframeData(document.getElementById("myModal"), clientInfo.onClose)
      document.getElementById("myModal").style.display = "block";
    }
  }

  // Close Functions
    // Close Button
  function g(){
    document.getElementById("myModal").style.display = "none";
    removeElement("dFrame")
    OncloseData()
  }

  // click Modal
  function closeOnModal() {
    if (event.target == document.getElementById("myModal")) {
      g()
    }
  }


  // Element Creation
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

  // Element Removal
  function removeElement(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
  }


  window.iframeData = function(dataFunc, onclose){
    window.addEventListener('message', function(event) {
      if (event.origin == 'http://localhost:8080'){
        if(event.data == 'false pass'){
          dataFunc.style.display = "none"
          var element = dataFunc.lastChild.children.dFrame;
          element.parentNode.removeChild(element);
          onclose()
        }
        if(event.data == 'false pass1'){
          dataFunc.style.display = "none"
          var element = dataFunc.lastChild.children.dFrame;
          element.parentNode.removeChild(element);
          window.location = `https://www.ourpass.co/shop`
        }
      }
    })

  }

  // function createModal() {
  //   var modal = document.createElement("myModal");
  //   modal.setAttribute( "id", `myModal` );
  //   modal.style.cssText = dModal
  //   document.body.appendChild(modal)
  // }
