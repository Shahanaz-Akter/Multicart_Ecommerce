
let subT = 0;
let deliver_charge = 0;
//storing items using post axios 
let cartArr = [];

let cartbadge = document.querySelector('.cart-badge');
let count = parseInt(cartbadge.innerHTML);
let cartCount = document.querySelector('.cartCount');
if (count == 0) {
    cartCount.innerHTML = "0 items to the cart";
}
const add_cart_product = async (product_id) => {
    try {

        // Send a POST request to the server
        const response = await axios.post('/product/post_cart_product', { product_id });
        // console.log('Response data: ', response.data.add_on_html);
        // console.log('Response cart: ', response.data.cart);

        // Check if the request was successful
        if (await response.status === 200) {
            console.log('Data sent successfully');
            const cartList = document.getElementById('cartList');
            // console.log('gggg: ', response.data.record);

            console.log('Sessions Products:', response.data.cart);

            const isRecordIncluded = cartArr.some((item) => {
                if (JSON.stringify(item) === JSON.stringify(response.data.record)) {
                    return item;
                }
                // return Object.keys(response.data.record).every((key) => {
                //   console.log(key);
                //   return item[key] === response.data.record[key];
                // });
            });

            if (!isRecordIncluded && response.data.add_on_html == true) {
                let cartbadgeggg = document.querySelector('.cart-badge');
                let cartCountggg = document.querySelector('.cartCount');

                let countggg = parseInt(cartbadgeggg.innerHTML);
                //increment cartlist
                let c = ++countggg;
                cartbadgeggg.innerHTML = c;

                cartCountggg.innerHTML = c + " items to the cart";

                cartArr.push(response.data.record);

                // console.log('Cart Items:', cartArr);

                //main parent
                let mainCart = document.querySelector('.cart-list');

                const mainParent = document.createElement('div');
                mainParent.setAttribute('id', `productcartContainer_${response.data.record.id}`);
                // <div class="d-flex align-items-center gap-3 mt-3 d-flex align-items-center justify-content-around " id="productcartContainer_<%=product.id%>">

                mainParent.classList.add('d-flex', 'align-items-center', 'gap-3', 'justify-content-around', 'mt-3', 'cart-item-session');

                // parent 1
                const p1 = document.createElement('div');
                p1.classList.add('bottom-product-img', 'ms-4', 'mb-3');
                const aTag = document.createElement('a');
                aTag.setAttribute('href', '/product_details');
                const img = document.createElement('img');
                img.src = response.data.record.primary_image;
                img.width = '60';
                // img.classList.add('text', 'center');
                img.alt = `${response.data.record.name}`;
                aTag.appendChild(img);
                p1.appendChild(aTag);
                // console.log(p1);

                const p2 = document.createElement('div');
                p2.classList.add('ms-4', 'mb-3');
                const h6Tag = document.createElement('h6');
                h6Tag.classList.add('mb-0', 'fw-light', 'mb-1');

                let maxWords = 2;
                let words = response.data.record.name.split(' ');
                let numWords = words.length;
                let truncatedName = words.slice(0, maxWords).join(' ');
                let remainingText = words.slice(maxWords).join(' ');
                if (remainingText) {
                    h6Tag.innerHTML = `<span>${truncatedName}..</span>`
                }
                else {
                    h6Tag.innerHTML = `<span>${truncatedName}</span>`
                }

                p2.appendChild(h6Tag);

                // parent 3
                const p3 = document.createElement('div');
                p3.classList.add('flex', 'justify-center', 'md:w-1/5', 'mr-2', 'mb-3', 'ms-3');
                p3.innerHTML = ` 
        <span onclick="change_quantity_value('plus',${response.data.record.id} , this)" class="px-3 py-2 font-bold border hover:border-gray-800">+</span>
      <span class="quantity-counter p-2">1</span>
      <span onclick="change_quantity_value('minus',${response.data.record.id}, this )" class="px-3 py-2 font-bold border hover:border-gray-800">-</span>
        `;

                // parent 4
                const p4 = document.createElement('div');
                p4.classList.add('ms-3', 'mb-3');
                p4.innerHTML = `<span>${response.data.record.selling_price}</span>`;

                // parent 5
                const p5 = document.createElement('div');
                p5.classList.add('ms-3', 'mb-3');
                p5.innerHTML = `<span id="total_${response.data.record.id}">${response.data.record.selling_price} TK</span>`;

                // parent 6
                const p6 = document.createElement('div');
                p6.classList.add('me-2', 'fs-5', "mb-3");
                p6.innerHTML = `<span onclick="deleteSessionProduct(${response.data.record.id})" class="link-dark"> <i class="bi bi-trash"></i></ span> `;

                const hrTag = document.createElement('hr');
                hrTag.id = `hr_for_${response.data.record.id}`;
                hrTag.classList.add('cart-item-session');
                mainParent.appendChild(p1);
                mainParent.appendChild(p2);
                mainParent.appendChild(p3);
                mainParent.appendChild(p4);
                mainParent.appendChild(p5);
                mainParent.appendChild(p6);

                mainCart.appendChild(mainParent);
                mainCart.appendChild(hrTag);
                // console.log(mainCart);
            }
            else {
                console.log('Failed to send data:', response.statusText);
            }

        }
    }

    catch (error) {
        console.error('Error sending data:', error.message);
    }

}

const delivery_cal = (num) => {

}

const calculate_subtotal = async () => {
    const response = await axios.post('/product/calculate_subtotal');
    subT = response.data.subtotal;

    document.querySelector('.addCardText').children[0].innerHTML = `Subtotal: ${subT} TK`;
    console.log(subT);
}

const setDeliveryCharge = (price) => {
    deliver_charge = price;
    document.querySelector('.addCardText').children[1].innerHTML = `Delivery: ${price} TK`;
    let t = subT + deliver_charge;
    document.querySelector('.totalPrice').children[1].innerHTML = `${t} ৳`;
}

// Orderlist JS

const orderList = async () => {
    let none_modal = document.querySelector('.none_modal');
    var modal = bootstrap.Offcanvas.getInstance(none_modal)

    let phone = document.querySelector('#mobile').value;

    // console.log('bbb: ', phone);
    if (phone.length !== 11) {
        alert('Required 11 Digits Phone Number');
        return
    }

    let email = document.querySelector('#email').value;
    // Validate email format
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email) {
        if (!emailRegex.test(email)) {
            alert('Enter a Valid Email Address');
            return;
        }
    }

    let fullName = document.querySelector('#fullName').value;
    let delivery_charge = document.querySelector('#delivery_charge').value;
    console.log(delivery_charge);
    // 01836549237
    if (!(delivery_charge)) {
        alert('Enter Delivery Charge');
        return
    }
    // console.log('delivery charge ', deliver_charge);
    let areaSector = document.querySelector('#areaSector').value;
    let addressCheck = document.querySelector('#addressCheck').value;
    // console.log(delivery_charge, areaSector, addressCheck, subT);
    let orderResponse = await axios.post('/post_checkout', { phone, email, fullName, deliver_charge, areaSector, addressCheck, subT });

    if (orderResponse) {
        // console.log('hello');
        let prevCartItems = document.querySelectorAll('.cart-item-session');
        let cartbadge = document.querySelector('.cart-badge');
        cartbadge.innerHTML = '0';
        Array.from(prevCartItems).forEach(ele => {
            ele.remove()
        })
        modal.hide();

    }

}

// delete session js
const deleteSessionProduct = async (id) => {
    console.log(id);
    let container = document.querySelector(`#productcartContainer_${id}`);
    let cart_bbbb = document.querySelector(`.cart-badge`);
    let cartCount_bbb = document.querySelector('.cartCount');
    let cbvvv = parseInt(cart_bbbb.innerHTML);
    let hr = document.querySelector(`#hr_for_${id}`);
    let response = await axios.post('/delete_session_product', { id });
    if (response.data.success == true) {

        cart_bbbb.innerHTML = JSON.stringify(--cbvvv);
        cartCount_bbb.innerHTML = `${JSON.stringify(cbvvv)} items to the cart`;

        cartArr = cartArr.filter(element => element.id !== id);
        console.log(cartArr)
        container.remove();
        hr.remove();
        // container.parentNode.
    }
}

// for quantiy incremnet decrement
const change_quantity_value = async (reason, id, tag) => {

    const response = await axios.post('/product/product_increment', { product_id: id, reason: reason });
    // console.log(tag.parentNode);

    tag.parentNode.children[1].innerHTML = await response.data.qty;
    let total_holder = document.querySelector(`#total_${id}`);
    total_holder.innerHTML = "T- " + await response.data.total + 'TK';
    console.log(response);
}

