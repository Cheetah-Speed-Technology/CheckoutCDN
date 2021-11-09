

function runIframe() {
  const clientInfo  = {
    link:'https://staging-pass.ourpass.co/view',
    src: 'https://raw.githubusercontent.com/Cheetah-Speed-Technology/website_dstore/master/Cap-front1.png',
    amount: '10',
    url: 'https://jumia.com.ng',
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
    api_key: 'pass_sec_test_2WEzJfgg4mpbY4XkBaibd9ZnERo6bHBP',
    
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
