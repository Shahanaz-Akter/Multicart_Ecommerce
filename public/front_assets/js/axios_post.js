// increment or decrement code
let counter = 0;
function increment() {
    counter++;
}
function decrement() {
    counter--;
}
function get() {
    return counter;
}
const inc = document.getElementById("increment");
const input = document.getElementById("input");
const dec = document.getElementById("decrement");
if (inc) {
    inc.addEventListener("click", () => {
        increment();
        input.value = get();
    });
}
if (dec) {
    dec.addEventListener("click", () => {
        if (input.value > 0) {
            decrement();
        }
        input.value = get();
    });
}

//storing items using post axios 
let cartArr = [];
let count = 0;
let cartbadge = document.querySelector('.cart-badge');
let cartCount = document.querySelector('.cartCount');
if (count == 0) {
    cartCount.innerHTML = "0 items to the cart";
}
const add_cart_product = async (product_id) => {
    try {
        // Send a POST request to the server
        const response = await axios.post('/product/post_cart_product', { product_id });
        // console.log('Response data: ', response);

        // Check if the request was successful
        if (response.status === 200) {
            console.log('Data sent successfully');
            const cartList = document.getElementById('cartList');
            // console.log(response.data.record); 
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

            if (!isRecordIncluded) {
                //increment cartlist
                let c = ++count;
                cartbadge.innerHTML = c;

                cartCount.innerHTML = c + " items to the cart";

                cartArr.push(response.data.record);
                // console.log('Cart Items:', cartArr);

                //main parent
                let mainCart = document.querySelector('.cart-list');
                const mainParent = document.createElement('div');
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
        <a href="" class="px-3 py-2 font-bold border hover:border-gray-800">+</a>
      <span class="quantity-counter p-2">1</span>
      <a href="" class="px-3 py-2 font-bold border hover:border-gray-800">-</a>
        `;
                p3.classList.add('text', 'center');


                // parent 4
                const p4 = document.createElement('div');
                p4.innerHTML = `<strong>${response.data.record.selling_price}</strong>`;

                // parent 5
                const p5 = document.createElement('div');
                p5.innerHTML = `<strong>${response.data.record.total}</strong>`;

                // parent 6
                const p6 = document.createElement('div');
                p6.classList.add('ms-auto', 'fs-5');
                p6.innerHTML = `<a a href = "/logout" class="link-dark" > <i class="bi bi-trash"></i></a > `;

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

