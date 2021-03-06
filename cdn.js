const isMobileDevice = /Mobi/i.test(window.navigator.userAgent)
const dStyle = {
  loaderWrapper: `
    height: 100vh;
    display: grid;
    place-items: center;
  `,
  loaderImg: `
    height: 100px;
    width: 100px;
    animation: loader 1s 1s infinite;
  `,
  dbutton2: `
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
  `,
  dModal:`
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
  `,
 dModalContent :`
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    width: 80%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  dModalClose :`
    color: #aaaaaa;
    position: absolute;
    top: 5%;
    right: 8%;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  `,
  dModalCloseFocus :`
    color: #000;
    text-decoration: none;
    cursor: pointer;
  `,
  dIframe :`
    display: none;
    border: none;
    height: 100%;
    width: 100%;
    z-index: 99999;
  `
}

function mover(){ document.getElementById('button').style.cssText = `${dStyle.dbutton2}; ${document.getElementById('button').attributes.style.value}; opacity:0.8` }
function moout(){ document.getElementById('button').style.cssText = `${dStyle.dbutton2}; ${document.getElementById('button').attributes.style.value}; opacity:1` }
function handleIframeLoaded() {
  this.removeEventListener('load', handleIframeLoaded, true)
  document.getElementById("loaderImg").style.display = "none";
  document.getElementById("dFrame").style.display = "block";
}
window.onload = document.addEventListener('DOMContentLoaded', function() {

  var bodyDocument = document.getElementsByTagName("body")[0]
  bodyDocument.setAttribute("onclick", "closeOnModal()");
  // console.log(document.getElementById('button').attributes.style.value)
  document.getElementById('button').style.cssText = `${dStyle.dbutton2}; ${document.getElementById('button').attributes.style.value}`
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
      createAnElement("myModal", "div", ["myModal2"], dStyle.dModalContent)

      // Create close button
      createAnElement("myModal2", "span", ["dClose", ["onclick","g()"]], dStyle.dModalClose, "&times;")
      // create loader
      createAnElement('myModal2', 'div', ['loaderWrapper'], dStyle.loaderWrapper);
      createAnElement('loaderWrapper', 'img', ['loaderImg'], dStyle.loaderImg);
      document.getElementById('loaderImg').setAttribute('src', 'https://www.ourpass.co/favicon.ico')
      document.getElementById("loaderImg").animate([
        // keyframes
        { transform: 'scale(0.7)' },
        { transform: 'scale(0.8)' },
        { transform: 'scale(0.7)' }
      ], {
        // timing options
        duration: 1000,
        iterations: Infinity
      });

      if (isMobileDevice) {
        document.getElementById('myModal2').style.width = '100%'
        document.getElementById('myModal2').style.padding = '0'
      }

      document.getElementById('myModal').style.cssText = dStyle.dModal
      // Create Iframe
      var iframe = createAnElement(
        "myModal2",
        "iframe",
        ["dFrame", ["src",`https://merchant-sandbox.ourpass.co/checkout/?src=${clientInfo.src}&amount=${clientInfo.amount}&url=${clientInfo.url}&name=${clientInfo.name}&email=${clientInfo.email}&qty=${clientInfo.qty}&description=${clientInfo.description}&key=${clientInfo.key}`]],
        dStyle.dIframe
      )

      window.OncloseData = clientInfo.onClose
      iframeData(document.getElementById("myModal"), clientInfo.onClose, clientInfo.onSuccess)
      document.getElementById("myModal").style.display = "block";
      iframe.addEventListener('load', handleIframeLoaded, true)
    }else {
      createAnElement(
        "myModal2",
        "iframe",
        ["dFrame", ["src",`https://merchant-sandbox.ourpass.co/checkout/?src=${clientInfo.src}&amount=${clientInfo.amount}&url=${clientInfo.url}&name=${clientInfo.name}&email=${clientInfo.email}&qty=${clientInfo.qty}&description=${clientInfo.description}&key=${clientInfo.key}`]],
        dStyle.dIframe
      )
      window.OncloseData = clientInfo.onClose
      iframeData(document.getElementById("myModal"), clientInfo.onClose, clientInfo.onSuccess)
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
    return modalDiv
  }

  // Element Removal
  function removeElement(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
  }


  window.iframeData = function(dataFunc, onclose, onSuccess){
    window.addEventListener('message', function(event) {
      if (event.origin == 'https://merchant-sandbox.ourpass.co'){
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
          // window.location = `https://www.ourpass.co/shop`
          onSuccess()
        }
      }
    })

  }
