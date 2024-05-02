// JavaScript code for the counter
var counter = document.getElementById("counter");
if (localStorage.getItem("count")){
    count=parseInt(localStorage.getItem("count"));
}else{
    count=0;
}
function updateCounter(){
 count++;
 counter.textContent=count;
 localStorage.setItem("count",count);
}
updateCounter();

// JavaScript code for animated Text
const text=document.querySelector(".animated-text").children,
textLen=text.length;
let index=0;
const textInTimer=3000,
textOutTimer=2800;

function animateText() {
for(let i=0; i<textLen; i++){
text[i].classList.remove("text-in","text-out");  
}
text[index].classList.add("text-in");

setTimeout(function(){
text[index].classList.add("text-out");              
},textOutTimer)

setTimeout(function(){
if(index == textLen-1){
    index=0;
}
else{
 index++;
}
    animateText();
},textInTimer); 
}        
window.onload=animateText;


$(document).ready(function(){
    // Applying click event to <li> elements
    $('nav li a').click(function(){
        // Remove focus class from all <li> elements
        $('nav li a').removeClass('focused');
        // Add focus class to the clicked <li>
        $(this).addClass('focused');
    });
});


// JavaScript code for the navigationBar
$(document).ready(function(){
    const body= $('body'),
    nav= $('nav'),
    modeToggle= $('.dark-light'),
    searchToggle= $('.searchToggle');
// JavaScript code for darkLightTheme
    modeToggle.click(function(){
        modeToggle.toggleClass('active');
        body.toggleClass('dark');
    })
// JavaScript code for searchBox
    searchToggle.click(function(){
        searchToggle.toggleClass('active');
    })
})


// JavaScript code for the cart functionality
function toggleCart() {
 var cartDetails = document.getElementById("hidden");
 cartDetails.style.display = cartDetails.style.display === "none" ? "block" : "none";
}

var cartItems = [];
var totalAmount = 0;

function addToCart(product, description, price) {
 cartItems.push({ product: product, description: description, price: price });
 totalAmount += price;
 updateCart();
}
   
function removeCartItem(index) {
 totalAmount -= cartItems[index].price;
 cartItems.splice(index, 1);
 updateCart();
}
function closeCart(){
 document.getElementById("hidden").style.display="none"
}
function updateCart() {
 var cartCount = document.getElementById("cart-count");
 cartCount.innerText = cartCount.innerText = cartItems.length;
      
 var cartItemsList = document.getElementById("cart-items");
 cartItemsList.innerHTML = "";
      
for (var i = 0; i < cartItems.length; i++) {
 var item = cartItems[i];
 var listItem = document.createElement("li");
 listItem.innerHTML = item.product + " - Rs" + item.price + " <button onclick='removeCartItem(" + i + ")' style='color: #08586c; font-weight: bold; margin-left:2em;'>Remove</button>";
 cartItemsList.appendChild(listItem);
}

 var totalAmountElement = document.getElementById("total-amount");
 totalAmountElement.innerText = "Total: Rs" + totalAmount.toFixed(2);
 totalAmountElement.style.marginTop="20px";
}
// Footer JS Core

//Subscribing JS
let resultDiv=document.getElementById('subscribe-result');
    resultDiv.style.display="none"
document.getElementById("subscribe-form").addEventListener('submit', function(event){
    event.preventDefault();
    const input=document.getElementById("subscribe-input").value;
   alert(`Hi ${input}!
Car Breezy wants to send notifications.`)
    let resultDiv=document.getElementById('subscribe-result');
    resultDiv.style.display="block"

resultDiv.classList.add("subscribeResult");
    let subscribeInput =document.getElementById("subscribe-input")
    subscribeInput.style.display="none"
    let subscribeButton =document.getElementById("subscribe-button")
    subscribeButton.style.display="none"
    let subscribetext =document.getElementById("subscribe-text")
    subscribetext.style.display="none"

  });
//JS For Continuous Scrolling Ticker
function getCurrentDateTime() {
    const now = new Date();
    return `${now.toLocaleDateString()} | ${now.toLocaleTimeString()}`;
}
// Function to get current location
function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`)
            .then(response => response.json())
            .then(data => {
                const address = data.display_name || 'Unknown Location';
                document.getElementById('tickerContent').innerText = `${getCurrentDateTime()} | Location: ${address}`;
            })
            .catch(error => {
                console.error('Error fetching location:', error);
            });
    }, error => {
        console.error('Error fetching location:', error);
    });
}

// Initial call to get current date, time, and location
document.addEventListener('DOMContentLoaded', getCurrentLocation);

// Update location every minute
setInterval(getCurrentLocation, 60000);
