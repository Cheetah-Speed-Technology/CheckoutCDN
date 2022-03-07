

function runIframe() {
  const clientInfo  = {
    link:'https://staging-pass.ourpass.co/view',
    src: 'https://raw.githubusercontent.com/Cheetah-Speed-Technology/website_dstore/master/Cap-front1.png',
    amount: '10',
    url: 'https://oministore.com',
    name:'Cap',
    email: '',
    qty:'1',
    description:'Great Pass Cap',
    items: [
      {
        src: 'https://raw.githubusercontent.com/Cheetah-Speed-Technology/website_dstore/master/Cap-front1.png',
        amount: '10',
        url: 'jumia.com.ng',
        name:'Cap',
        email: 'bayoopesanya@gmail.com',
        qty:'1',
        description:'Great Pass Cap',
      },
      {
        src: 'https://raw.githubusercontent.com/Cheetah-Speed-Technology/website_dstore/master/Cap-front1.png',
        amount: '10',
        url: 'jumia.com.ng',
        name:'Cap',
        email: 'bayoopesanya@gmail.com',
        qty:'1',
        description:'Great Pass Cap',
      },
    ],
    api_key: 'pass_sec_live_lcFn6CrCkLDHd9Z0LHa5V1nj9QvDSNAz',
    // api_key:'pass_sec_test_someTestAPIKEY',
    
    onClose: function(){
      alert('Widget Closed')
    },
    onSuccess: function(){
      alert('Payment Successful')
    }
  }
  openIframe(clientInfo)

}

// https://beta-api.ourpass.co/checkout/v3
