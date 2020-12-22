

function runIframe() {
  const clientInfo  = {
    link:'http://app.ourpass.co/view',
    src: 'https://raw.githubusercontent.com/Cheetah-Speed-Technology/website_dstore/master/Cap-front1.png',
    amount: '1000',
    url: 'jumia.com.ng',
    name:'Cap',
    email: 'danyadegoke@gmail.com',
    qty:'1',
    description:'Great Pass Cap',
    key:'pass_sec_test_APJn8wy3ggvBVqiI63TxCBSjqaOypT4l',
  }
  openIframe(clientInfo)
}

function iframeData (dataFunc){
  window.addEventListener('message', function(event) {
    console.log(event.data);
    console.log('origin',event.origin);

    if (event.origin == 'http://localhost:8080'){
      console.log('event.data');
      if(event.data == 'false pass'){
        console.log('event');
        dataFunc.nr()
      }
      if(event.data == 'false pass1'){
        console.log('event');
        dataFunc.nrShop()
      }
    }
  })
}
  window.addEventListener('message', function(event) {
    console.log('dE vent', event)
    // if (event.origin == 'http://localhost:8080'){
    //   if(event.data == 'false pass'){
    //     dataFunc.nr()
    //   }
    //   if(event.data == 'false pass1'){
    //     dataFunc.callback()
    //   }
    // }
  })

// function iframeData (dataFunc){
//   window.addEventListener('message', function(event) {
//     if (event.origin == 'http://localhost:8080'){
//       if(event.data == 'false pass'){
//         dataFunc.nr()
//       }
//       if(event.data == 'false pass1'){
//         dataFunc.callback()
//       }
//     }
//   })
// }

// function nr(){
//   this.transact = false
// }

// function callback(){
//   this.$router.push({name: 'shop'})
// }


// callback: function(response){
//   alert('success. transaction ref is ' + response.reference);
// },
// onClose: function(){
//   alert('window closed');
// }
