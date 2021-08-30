
const navMenu = document.querySelector('.nav-list')
const header = document.querySelector('.header');
const btnClose = document.querySelector('.nav-close')
const btnOpen = document.querySelector('.nav-toggle')
const btnToTop = document.querySelector('.btn-to-top')

btnOpen.addEventListener('click', () => {
    navMenu.classList.add('open')
    header.classList.add('open')
})
btnClose.addEventListener('click', () => {
    navMenu.classList.remove('open')
    header.classList.remove('open')
})

window.addEventListener('scroll',() =>{
    header.classList.toggle('sticky',window.scrollY > 50);
    btnToTop.classList.toggle('active',window.scrollY > 200);
})

btnToTop.addEventListener('click',() =>{
    document.documentElement.scrollTop = 0
})

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav-link')

navLink.forEach(n => n.addEventListener('click', ()=>{
    navMenu.classList.remove('open')
    header.classList.remove('open')
}))

const sections = document.querySelectorAll('section[id]')

function scrollActiveLink() {
    const scrollY = window.pageYOffset
    sections.forEach( s => {
        //height of section
        const sectionHeight = s.offsetHeight
        //sum height from top to section 0 620 1230 2000 ....
        //90 is height header
        const sectionTop = s.offsetTop - 90;
        sectionId = s.getAttribute('id')
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-list a[href*='+ sectionId+']').classList.add('active')
        }else {
            document.querySelector('.nav-list a[href*='+ sectionId+']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActiveLink)
/*=============== CART ===============*/

const btnAddToCart = document.querySelectorAll('.btn-add')
const inputCount = document.querySelectorAll('.cart-number')
btnAddToCart.forEach(btn => btn.addEventListener('click',addToCart ) )

const countHeader = document.querySelector('.cart-count-container')

const cartList = document.querySelector('.cart-list')

const cartNull = "<span class='cart-no-data'> No product here! </span>"

//active cart list
const cartHeader = document.querySelector('.cart-header')
cartHeader.addEventListener('click', () => {
    cartList.classList.toggle('active')
})


cart = []; 

function addToCart() {
    var nameItem = this.getAttribute('data-title')
    var imgItem = this.getAttribute('data-img');
    var priceItem = this.getAttribute('data-price')
    updateCart(imgItem, nameItem, priceItem);
}

function updateCart(img,name,price) {
    var objItem = {img,name,price,count:1};
    // check objItem in cart
    for(var item in cart) {
        if (cart[item].name == objItem.name) {
            cart[item].count ++;
            saveCart()
            //exit function
            return;
        }
    }
    cart.push(objItem);
    saveCart()

}

function saveCart() {
    sessionStorage.setItem('lp_headphone-cart', JSON.stringify(cart));
    loadCart()
}

function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('lp_headphone-cart'));

    var cartItem = ""
    var cartTotal = ""
    for(var item in cart) {
        cartItem += `<li class="cart-item">
                            <div class="cart-container">
                                <div class="cart-media">
                                    <img src="${cart[item].img}" alt="" class="cart-img">
                                </div>
                                <div class="cart-detail">
                                    <div class="cart-name">${cart[item].name}</div>
                                    <div class="cart-price">$${cart[item].price}</div>
                                </div>
                            </div>
                            <div class="cart-container">
                                <div class="cart-quantity">
                                    <input type="text" value=${cart[item].count} class="cart-number">
                                    <div class="quantitys">
                                        <span class="quantitys-add">+</span>
                                        <span class="quantitys-minus">-</span>
                                    </div>
                                </div>
                                <span class="btn-animated animated-zoom cart-remove">
                                    <i class="ri-close-line"></i>
                                    <i class="ri-close-line"></i>
                                </span>
                            </div>
                        </li>`
    }
    
    cartTotal = `<div class="cart-total">
                    <div class="cart-total-header">
                        <h3 class="cart-total-title">
                            total:
                        </h3>
                        <div class="cart-total-text">
                            299$
                        </div>
                    </div>
                    <div class="cart-total-footer">
                        <div class="btn cart-checkout animated-tf-y">
                            <span class="btn-flex btn-animated">
                                <i class="ri-bank-card-line btn-icon"></i>
                                <i class="ri-bank-card-line btn-icon"></i>
                            </span>
                            <span class="cart-checkout-text">checkout</span>
                        </div>
                        <div class="btn cart-clear animated-tf-y">
                            <span class="btn-flex btn-animated">
                                <i class="ri-delete-bin-2-line btn-icon"></i>
                                <i class="ri-delete-bin-2-line btn-icon"></i>
                            </span>
                            <span class="cart-clear-text">clear cart</span>
                        </div>
                    </div>
                </div>`
    cartContent = cartItem + cartTotal
    cartList.innerHTML = cartContent
    
    // khoi tao thi phai add event
    const btnClearCart = document.querySelector('.cart-clear')
    btnClearCart.addEventListener('click', clearCart)

    //count item in cart
    cartLength = JSON.parse(sessionStorage.getItem('lp_headphone-cart')).length;
    var span = `<span class='cart-count'> ${cartLength} </span>`
    countHeader.innerHTML = span;

    //chage quantity
    const quantityItem = document.querySelectorAll('.cart-number')
    quantityItem.forEach((item,index) => item.addEventListener('input', changeQuantity))

    showTotal();

    //remove item 
    const itemRemove = document.querySelectorAll('.cart-remove')
    itemRemove.forEach((item,index) => item.addEventListener('click', removeCartItem))

    // changeQuantity with Add and Minus
    const btnAddQuantity = document.querySelectorAll('.quantitys-add')
    btnAddQuantity.forEach(btnAdd => btnAdd.addEventListener('click', addQuantity))
    const btnMinusQuantity = document.querySelectorAll('.quantitys-minus')
    btnMinusQuantity.forEach(btnMinus => btnMinus.addEventListener('click', minusQuantity))

}

function changeQuantity() {
    const itemChange = this.parentNode.parentNode.parentNode;
    var nameItem = itemChange.getElementsByClassName('cart-name')[0].innerText.toLowerCase()
    var valueItem = parseInt(this.value)
    for(var item in cart) {
        if(!isNaN(valueItem) && valueItem > 0 && valueItem !== null) {
            if(nameItem == cart[item].name){
                cart[item].count = valueItem
                //save in session
                sessionStorage.setItem('lp_headphone-cart', JSON.stringify(cart));
                showTotal()
            }
        } else {
            itemChange.getElementsByClassName('cart-number')[0].value = 1
            cart[item].count = 1
            showTotal()
        }
    }
}

function showTotal(){
    //total 
    const cartTotalText = document.querySelector('.cart-total-text')
    var total = 0
    for(var item in cart) {
        total += cart[item].price * cart[item].count
    }
    cartTotalText.innerHTML = total+"$"
}

function removeCartItem() {
    var listCart = this.parentNode.parentNode;
    var nameItem = listCart.getElementsByClassName('cart-name')[0].innerText.toLowerCase()
    for(var item in cart) {
        if(cart[item].name === nameItem) {
            cart.splice(item, 1);
            saveCart()
            if(JSON.parse(sessionStorage.getItem('lp_headphone-cart')).length === 0) {
                clearCart()
            }
            return;
        }
    }
    
}

function addQuantity() {
    var itemAdded = this.parentNode.parentNode.parentNode.parentNode
    nameAdded = itemAdded.getElementsByClassName('cart-name')[0].innerText.toLowerCase()
    for(var item in cart){
        if(cart[item].name == nameAdded){
            cart[item].count ++
            saveCart()
            return
        }
    }
}

function minusQuantity() {
    var itemMinus = this.parentNode.parentNode.parentNode.parentNode
    nameMinus = itemMinus.getElementsByClassName('cart-name')[0].innerText.toLowerCase()
    for(var item in cart){
        if(cart[item].name == nameMinus){
            if(cart[item].count - 1 < 1) {
                cart[item].count = 1
                saveCart()
                return
            }else {
                cart[item].count --
                saveCart()
                return
            }
        }
    }
}

function clearCart() {
    cart = []
    sessionStorage.clear()
    countHeader.innerHTML = ''
    cartList.innerHTML = cartNull;
    cartList.classList.remove('active')
}

if(sessionStorage.getItem('lp_headphone-cart') != null ){
    loadCart()
} else {
    cartList.innerHTML = cartNull;
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal(`.nav-logo, .nav-list, .section-title`,{origin: 'top'})
sr.reveal(`.home-content`,{ origin: 'bottom'})
sr.reveal(`.home-img`,{ origin: 'bottom'})
sr.reveal(`.brand-img, .product-item, .footer-logo, .footer-column, .footer-copyright`,{origin: 'top', interval: 100})
sr.reveal(`.case-img`,{origin: 'top'})
sr.reveal(`.case-content`)
sr.reveal(`.specs-item`,{origin: 'left', interval: 100})
sr.reveal(`.specs-img, .discount-img`,{origin: 'right'})
sr.reveal(`.discount-content`,{origin: 'left'})
