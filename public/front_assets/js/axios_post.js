
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
        console.log('Response data: ', response.data.add_on_html);
        console.log('Response cart: ', response.data.cart);

        // Check if the request was successful
        if (await response.status === 200) {
            console.log('Data sent successfully');
            const cartList = document.getElementById('cartList');
            console.log('gggg: ', response.data.record);

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
                //increment cartlist
                let c = ++count;
                cartbadge.innerHTML = c;

                cartCount.innerHTML = c + " items to the cart";

                cartArr.push(response.data.record);

                // console.log('Cart Items:', cartArr);

                //main parent
                let mainCart = document.querySelector('.cart-list');

                const mainParent = document.createElement('div');
                mainParent.setAttribute('id', `productcartContainer_${response.data.record.id}`);
                mainParent.classList.add('d-flex', 'align-items-center', 'justify-content-around', 'm-1');

                // parent 1
                const p1 = document.createElement('div');
                p1.classList.add('bottom-product-img');
                const aTag = document.createElement('a');
                aTag.setAttribute('href', '/product_details');
                const img = document.createElement('img');
                img.src = response.data.record.primary_image;
                img.width = '60';
                // img.classList.add('text', 'center');
                img.alt = 'Not Available';
                aTag.appendChild(img);
                p1.appendChild(aTag);
                // console.log(p1);

                const p2 = document.createElement('div');
                const h6Tag = document.createElement('h6');
                h6Tag.classList.add('mb-0', 'fw-light', 'mb-1');
                const pTag = document.createElement('p');
                pTag.classList.add('mb-0');

                pTag.innerHTML = `<strong>${response.data.record.name}</strong>`; //৳
                p2.appendChild(h6Tag);
                p2.appendChild(pTag);

                // parent 3
                const p3 = document.createElement('div');
                p3.classList.add('flex', 'justify-center', 'md:w-1/5', 'mr-2');
                p3.innerHTML = ` 
        <span onclick="change_quantity_value('plus',${response.data.record.id} , this)" class="px-3 py-2 font-bold border hover:border-gray-800">+</span>
      <span class="quantity-counter p-2">1</span>
      <span onclick="change_quantity_value('minus',${response.data.record.id}, this )" class="px-3 py-2 font-bold border hover:border-gray-800">-</span>
        `;
                p3.classList.add('text', 'center');


                // parent 4
                const p4 = document.createElement('div');
                p4.innerHTML = `<strong>${response.data.record.selling_price}</strong>`;

                // parent 5
                const p5 = document.createElement('div');
                p5.innerHTML = `<strong id="total_${response.data.record.id}">Total- ${response.data.record.selling_price}</strong>`;

                // parent 6
                const p6 = document.createElement('div');
                p6.classList.add('ms-auto', 'fs-5');
                p6.innerHTML = `<span onclick="deleteSessionProduct(${response.data.record.id})" class="link-dark"> <i class="bi bi-trash"></i></ span> `;

                const hrTag = document.createElement('hr');
                mainParent.appendChild(p1);
                mainParent.appendChild(p2);
                mainParent.appendChild(p3);
                mainParent.appendChild(p4);
                mainParent.appendChild(p5);
                mainParent.appendChild(p6);
                mainParent.appendChild(hrTag);

                mainCart.appendChild(mainParent);
                console.log(mainCart);
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
    deliver_charge = price
    document.querySelector('.addCardText').children[1].innerHTML = `Delivery: ${price} TK`;
    let t = subT + deliver_charge;
    document.querySelector('.totalPrice').children[1].innerHTML = `${t} ৳`;
}

// orderlist js
const orderList = () => {
    // console.log('hello');
    let phone = document.querySelector('#mobile').value;
    let email = document.querySelector('#email').value;
    let fullName = document.querySelector('#fullName').value;
    let delivery_charge = document.querySelector('#delivery_charge').value;
    let areaSector = document.querySelector('#areaSector').value;
    let addressCheck = document.querySelector('#addressCheck').value;
    console.log(phone, email, fullName, delivery_charge, areaSector, addressCheck, subT);
    let orderResponse = axios.post('/post_checkout', { phone, email, fullName, delivery_charge, areaSector, addressCheck, subT })
}

// delete session js
const deleteSessionProduct = async (id) => {
    console.log(id);
    let container = document.querySelector(`#productcartContainer_${id}`);
    let response = await axios.post('/delete_session_product', { id });
    if (response.data.success == true) {
        container.remove();
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