

function runIframe() {
  const clientInfo  = {
    link:'http://localhost:8080/view',
    src: 'https://raw.githubusercontent.com/Cheetah-Speed-Technology/website_dstore/master/Cap-front1.png',
    amount: '1',
    url: 'jumia.com.ng',
    name:'Cap',
    email: 'danyadegoke@gmail.com',
    qty:'1',
    description:'Great Pass Cap',
    key:'pass_sec_test_APJn8wy3ggvBVqiI63TxCBSjqaOypT4l',
    onClose: function(){
      window.location = `https://www.ourpass.co/shop`
    },
    onSuccess: function(){
      alert('It Succeeded oo')
    }
  }
  openIframe(clientInfo)

}
