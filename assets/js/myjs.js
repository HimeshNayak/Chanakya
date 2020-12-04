const help = document.getElementById('chat'),
  chatbox = document.getElementById('chatbox'),
  chatBody = document.getElementById('chatBody'),
  send = document.getElementById('userChat-button'),
  userChat = document.getElementById('userChat');

let chatMessages = [
  
]

help.addEventListener('click', () => {
  chatbox.classList.remove('hidden')
  help.classList.add('hidden')
})

send.addEventListener('click', ()=>{
  if(userChat.value){
  chatMessages.push(userChat.value);
  userChat.value=""
  chatBody.innerHTML = '<span class="text-right"><p class="my-message">Hello! How may I help you?</p></span>'
  chatMessages.forEach(message => {
    chatBody.innerHTML += ('<p class="user-message">'+message+'</p>')
  })
}
console.log(chatMessages)

})

chatBody.innerHTML = '<span class="text-right"><p class="my-message">Hello! How may I help you?</p></span>'

