document.addEventListener("DOMContentLoaded", function() {
    var currentTimeElement = document.getElementById('current-time');
    
    if (currentTimeElement) {
        var currentDate = new Date();
        currentTimeElement.innerHTML = currentDate.toLocaleDateString('en-US', {
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric'
        });
    } else {
        console.log("Element with id 'current-time' not found!");
    }
});

// Run the function when the page loads
window.addEventListener('DOMContentLoaded', displayHeaderDate);

document.querySelectorAll('a[href^="#"').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        document.querySelectorAll(this.getAttribute('href')).
        scrollIntoView({
            behaviour: 'smooth'
        });
    });
});

const productCards = document.querySelectorAll('product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter',function(){
        this.style.transform = 'translateY(-15px)';
    });
    card.addEventListener('mouseenter',funtion(){
        this.style.transform = 'translateY(0)';
    });
});