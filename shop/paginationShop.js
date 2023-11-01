// Khai báo biến
let currentPage = 1;
const itemsPerPage = 3; // Số sản phẩm trên mỗi trang
const pagination = document.getElementById('pagination');
const product = document.getElementById('product-list');
let allProducts = []; // Lưu trữ tất cả sản phẩm từ API

// Gọi API và lấy tất cả sản phẩm
fetch('https://localhost:7199/Product/GetAllProduct')
    .then(response => response.json())
    .then(data => {
        // console.log('data: >>>>', data);
        allProducts = data.data;
        console.log('allProducts: >>>>', allProducts);
        // Hiển thị trang đầu tiên khi trang web được tải
        showProductsOnPage(currentPage);
    })
    .catch(error => console.error('error', error));

// Hiển thị sản phẩm trên trang
function showProductsOnPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToDisplay = allProducts.slice(startIndex, endIndex);
    product.innerHTML = ''; // Xóa dữ liệu cũ

    productsToDisplay.forEach(shop => {
        // Tạo phần tử DOM cho sản phẩm tương tự như trước
        const productElement = document.createElement('div');
        productElement.innerHTML = `
    <div class="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
    <div class="block-4 text-center border">
    <figure class="block-4-image">
    <a href="productDetail.html?productID=${shop.id}">
    <img src="${shop.image}" 
    alt="${shop.image}" class="img-fluid"></a>
    </figure>
      <div class="block-4-text p-4">
        <h3><a href="productDetail.html?productID=${shop.id}">
        ${shop.name}</a></h3>
        <p class="mb-0">${shop.description}</p>
        <p class="text-primary font-weight-bold">${shop.cost}</p>
      </div>
    </div>
</div>
    `;
        product.appendChild(productElement);
    });

    updatePagination(currentPage);
}

// Cập nhật phân trang
function updatePagination(currentPage) {
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    const ulElement = pagination.querySelector('ul');
    ulElement.innerHTML = '';

    const prevButton = document.createElement('li');
    prevButton.innerHTML = `<a href="#">&lt;</a>`;
    ulElement.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('li');
        if (i === currentPage) {
            pageButton.innerHTML = `<span>${i}</span>`;
        } else {
            pageButton.innerHTML = `<a href="#">${i}</a>`;
        }
        ulElement.appendChild(pageButton);
    }

    const nextButton = document.createElement('li');
    nextButton.innerHTML = `<a href="#">&gt;</a>`;
    ulElement.appendChild(nextButton);
}

// Xử lý sự kiện khi người dùng chọn trang trước hoặc trang sau
pagination.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
        if (event.target.textContent === '&lt;') {
            if (currentPage > 1) {
                currentPage--;
            }
        } else if (event.target.textContent === '&gt;') {
            const totalPages = Math.ceil(allProducts.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
            }
        } else {
            currentPage = parseInt(event.target.textContent);
        }

        showProductsOnPage(currentPage);
    }
});