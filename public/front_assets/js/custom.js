let pro_arr = [];

const add_product = async (products) => {
    console.log(products);
    // res.render('product/edit_product.ejs');
    pro_arr.push(products);
    // console.log(pro_arr);
}
const submit_order = () => {
    pro_arr.forEach((product, index) => {
        // product input field creation
        let productParent = document.querySelector('.product_parent');
        let productDiv = document.createElement('div');
        productDiv.classList.add('row');

        let nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('name', `products`);
        nameInput.setAttribute('placeholder', '');
        nameInput.setAttribute('value', `${JSON.stringify(product)}`);
        nameInput.setAttribute('id', '');
        nameInput.classList.add('col-12', 'col-md-12', 'col-lg-12', 'col-xl-12', 'form-control', 'mb-2',);
        productDiv.appendChild(nameInput);
        productParent.appendChild(productDiv);

        //   showtable creation
        let tableBody = document.querySelector('#showOrderTbl tbody');
        // tableBody.innerHTML = ''; // Clear existing table rows
        let newRow = document.createElement('tr');
        let checkboxCell = document.createElement('td');

        checkboxCell.innerHTML = '<input type="checkbox" class="row-checkbox">';
        newRow.appendChild(checkboxCell);
        // SL (assuming index starts from 1)
        let slCell = document.createElement('td');
        slCell.textContent = index + 1;
        newRow.appendChild(slCell);

        // Primary Image
        let imageCell = document.createElement('td');
        let imageDiv = document.createElement('div');
        imageDiv.classList.add('image-div');
        imageDiv.style.backgroundImage = `url('${product.primary_image}')`;
        imageDiv.style.height = '110px';
        imageDiv.style.width = '110px';
        imageDiv.style.backgroundRepeat = 'no-repeat';
        imageDiv.style.backgroundPosition = 'center center';

        imageCell.appendChild(imageDiv);
        newRow.appendChild(imageCell);

        // Product Name
        let nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        newRow.appendChild(nameCell);

        // Selling Price
        let priceCell = document.createElement('td');
        priceCell.textContent = product.selling_price;
        newRow.appendChild(priceCell);

        // Qty
        let qtyCell = document.createElement('td');
        qtyCell.innerHTML = `<input type='text' class='form-control' name='qty' style='width: 60%'>`;
        newRow.appendChild(qtyCell);

        // Action (delete icon)
        let actionCell = document.createElement('td');
        let deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash-alt');
        actionCell.appendChild(deleteIcon);
        newRow.appendChild(actionCell);

        // Append the new row to the table body
        tableBody.appendChild(newRow);

    });
}

