

function runIframe() {
  const clientInfo  = {
    link:'https://app.ourpass.co/view',
    src: 'https://raw.githubusercontent.com/Cheetah-Speed-Technology/website_dstore/master/Cap-front1.png',
    amount: '1',
    url: 'jumia.com.ng',
    name:'Cap',
    email: 'danyadegoke@gmail.com',
    qty:'1',
    description:'Great Pass Cap',
    key:'pass_sec_test_APJn8wy3ggvBVqiI63TxCBSjqaOypT4l',
    onClose: function(){
      alert('It Closed oo')
    },
    onSuccess: function(){
      alert('It Succeeded oo')
    }
  }
  openIframe(clientInfo)

}

// https://beta-api.ourpass.co/checkout/v3