const isMobileDevice = /Mobi/i.test(window.navigator.userAgent)
// const BASE_URL = 'https://merchant-sandbox.ourpass.co'
const BASE_URL = 'http://localhost:8001'

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
    display: block;
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
    padding: 0px;
   width: 340px;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  `,
  dModalClose :`
  display:none;
    // color: #aaaaaa;
    // position: absolute;
    // top: 6%;
    // right: 40%;
    // float: right;
    // font-size: 18px;
    // font-weight: bold;
    // cursor: pointer;
    // color:#ffffff;
    // background: #C6C6C6;
    // border-radius: 50%;
    // height: 25px;
    // width: 25px;
    // display: grid;
    // place-items: center;
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
  console.log('HANDLE LOAD')
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

  function handleAnimation() {
    const loader = document.getElementById("loaderImg");
    if (!loader) {
      // create loader
      createAnElement('myModal2', 'div', ['loaderWrapper'], dStyle.loaderWrapper);
      createAnElement('loaderWrapper', 'img', ['loaderImg'], dStyle.loaderImg);
      document.getElementById('loaderImg').setAttribute('src', 'https://www.ourpass.co/favicon.ico')
    }
    document.getElementById('loaderImg').style.display = 'block'
    document.getElementById('loaderImg').animate([
      // keyframes
      { transform: 'scale(0.7)' },
      { transform: 'scale(0.8)' },
      { transform: 'scale(0.7)' }
    ], {
      // timing options
      duration: 1000,
      iterations: Infinity
    });
    // end animation
  }

  function openIframe(clientInfo) {
    const items = clientInfo.items ? JSON.stringify(clientInfo.items) : '';
    if (document.getElementById("myModal").childNodes.length == 0) {
      // Create Modal-Content card
      createAnElement("myModal", "div", ["myModal2"], dStyle.dModalContent)

      // Create close button
      createAnElement("myModal2", "span", ["dClose", ["onclick","g()"]], dStyle.dModalClose, "&times;")

      handleAnimation()
      if (isMobileDevice) {
        document.getElementById('myModal2').style.width = '100%'
        document.getElementById('myModal2').style.padding = '0'
      }

      document.getElementById('myModal').style.cssText = dStyle.dModal
      // Create Iframe
      var iframe = createAnElement(
        "myModal2",
        "iframe",
        ["dFrame", ["src",`${BASE_URL}/checkout/?src=${clientInfo.src}&items=${items}&amount=${clientInfo.amount}&url=${clientInfo.url}&name=${clientInfo.name}&email=${clientInfo.email}&qty=${clientInfo.qty}&description=${clientInfo.description}&api_key=${clientInfo.api_key}`]],
        dStyle.dIframe
      )

      window.OncloseData = clientInfo.onClose
      iframeData(document.getElementById("myModal"), clientInfo.onClose, clientInfo.onSuccess)
      document.getElementById("myModal").style.display = "block";
      iframe.addEventListener('load', handleIframeLoaded, true)
    } else {

      handleAnimation()

      var iframe = createAnElement(
        "myModal2",
        "iframe",
        ["dFrame", ["src",`${BASE_URL}/checkout/?src=${clientInfo.src}&items=${items}&amount=${clientInfo.amount}&url=${clientInfo.url}&name=${clientInfo.name}&email=${clientInfo.email}&qty=${clientInfo.qty}&description=${clientInfo.description}&api_key=${clientInfo.api_key}`]],
        dStyle.dIframe
      )
      window.OncloseData = clientInfo.onClose
      iframeData(document.getElementById("myModal"), clientInfo.onClose, clientInfo.onSuccess)
      document.getElementById("myModal").style.display = "block";
      iframe.addEventListener('load', handleIframeLoaded, true)
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

      console.log(event.data)
      if (event.origin == BASE_URL){
        if(event.data == 'false pass') {
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
