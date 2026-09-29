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