let pro_arr = [];
const add_product = async (products) => {
    console.log(products);
    // res.render('product/edit_product.ejs');
    pro_arr.push(products);
    // console.log(pro_arr);
}


const submit_order = () => {
    let tableBody = document.querySelector('#showOrderTbl tbody');
    tableBody.innerHTML = ''; // Clear existing table rows

    pro_arr.forEach((product, index) => {
        let newRow = document.createElement('tr');

        // Checkbox
        let checkboxCell = document.createElement('td');
        checkboxCell.innerHTML = '<input type="checkbox" class="row-checkbox">';
        newRow.appendChild(checkboxCell);

        // SL
        // let slCell = document.createElement('td');
        // slCell.textContent = index + 1;
        // newRow.appendChild(slCell);

        // Name
        let nameCell = document.createElement('td');

        const maxWords = 2;
        const words = product.name.split(' ');
        const truncatedName = words.slice(0, maxWords).join(' ');
        const remainingText = words.slice(maxWords).join(' ');
        if (remainingText) {
            nameCell.textContent = truncatedName + '.....';
        }
        nameCell.textContent = truncatedName; // Replace 'name' with the actual property name of the product object
        newRow.appendChild(nameCell);

        // Quantity
        let quantityCell = document.createElement('td');
        quantityCell.innerHTML = `<input  type="number" class="form-control1" placeholder="1" name="qty" style="20%!important">`;
        newRow.appendChild(quantityCell);

        // Image
        let imageCell = document.createElement('td');
        let imageElement = document.createElement('img');
        imageElement.src = product.primary_image; // Replace 'image' with the actual property name of the product object
        imageElement.alt = '';
        imageElement.height = '100';
        imageElement.width = '100';
        imageCell.appendChild(imageElement);
        newRow.appendChild(imageCell);

        // Selling Price
        let priceCell = document.createElement('td');
        priceCell.textContent = product.selling_price; // Replace 'price' with the actual property name of the product object
        newRow.appendChild(priceCell);

        tableBody.appendChild(newRow);
    });
};
