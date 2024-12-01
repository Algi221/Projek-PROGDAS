let products = [];
let productId = 1; // Inisialisasi ID produk

document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah pengiriman form secara default

    // Mengambil nilai dari form
    const newProduct = {
        id_produk: `MD-${productId.toString().padStart(3, "0")}`, // Menghasilkan ID produk
        nama_produk: document.getElementById("nama_produk").value,
        kategori_produk: document.getElementById("kategori_produk").value,
        harga_produk: parseFloat(document.getElementById("harga_produk").value).toFixed(2),
        satuan_produk: document.getElementById("satuan_produk").value,
        stock_awal: parseInt(document.getElementById("stock_awal").value, 10),
        gambar_produk: document.getElementById("gambar_produk").value,
        stock_produk: parseInt(document.getElementById("stock_produk").value, 10),
    };

    // Menambahkan produk ke dalam array
    products.push(newProduct);
    productId++; // Increment ID produk untuk produk berikutnya

    // Reset form setelah submit
    document.getElementById("productForm").reset();
    document.getElementById("id_produk").value = `MD-${productId.toString().padStart(3, "0")}`;

    renderProducts(); // Panggil fungsi untuk merender produk
});

// Fungsi untuk merender produk ke dalam tabel
function renderProducts() {
    const productListBody = document.getElementById("product-list-body");
    productListBody.innerHTML = ""; // Kosongkan tabel sebelum merender

    products.forEach((product, index) => {
        const row = document.createElement("tr");
        const stockBackgroundColor = product.stock_produk < 5 ? "red" : "white"; // Merah jika stok kurang dari 5, putih jika tidak

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.id_produk}</td>
            <td>${product.nama_produk}</td>
            <td>${product.kategori_produk}</td>
            <td>${product.harga_produk}</td>
            <td>${product.satuan_produk}</td>
            <td>${product.stock_awal}</td>
            <td><img src="${product.gambar_produk}" alt="${product.nama_produk}" style="width:50px;height:50px;"></td>
            <td style="background-color: ${stockBackgroundColor};">${product.stock_produk}</td>
            <td>
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
        productListBody.appendChild(row); // Tambahkan baris ke tabel
    });
}

// Fungsi untuk mengedit produk
function editProduct(index) {
    const product = products[index];
    document.getElementById("edit_id_produk").value = product.id_produk;
    document.getElementById("edit_nama_produk").value = product.nama_produk;
    document.getElementById("edit_kategori_produk").value = product.kategori_produk;
    document.getElementById("edit_harga_produk").value = product.harga_produk;
    document.getElementById("edit_satuan_produk").value = product.satuan_produk;
    document.getElementById("edit_stock_awal").value = product.stock_awal;
    document.getElementById("edit_gambar_produk").value = product.gambar_produk;
    document.getElementById("edit_stock_produk").value = product.stock_produk;

    // Tampilkan dialog edit
    document.getElementById("editDialog").style.display = "block";

    // Menangani penyimpanan perubahan
    document.getElementById("editForm").onsubmit = function(e) {
        e.preventDefault();
        products[index] = {
            id_produk: products[index].id_produk, // Tetap menggunakan ID produk yang sama
            nama_produk: document.getElementById("edit_nama_produk").value,
            kategori_produk: document.getElementById("edit_kategori_produk").value,
            harga_produk: parseFloat(document.getElementById("edit_harga_produk").value).toFixed(2),
            satuan_produk: document.getElementById("edit_satuan_produk").value,
            stock_awal: parseInt(document.getElementById("edit_stock_awal").value, 10),
            gambar_produk: document.getElementById("edit_gambar_produk").value,
            stock_produk: parseInt(document.getElementById("edit_stock_produk").value, 10),
        };

        renderProducts(); // Panggil fungsi untuk merender produk
        document.getElementById("editDialog").style.display = "none"; // Sembunyikan dialog
    };
}

function closeEditDialog() {
    document.getElementById("editDialog").style.display = "none";
}

// Fungsi untuk menghapus produk
function deleteProduct(index) {
    // Mengonfirmasi penghapusan produk
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus produk ini?");
    if (confirmDelete) {
        products.splice(index, 1); // Menghapus produk dari array
        renderProducts(); // Panggil fungsi untuk merender ulang produk

        // Reset ID produk jika tidak ada produk tersisa
        if (products.length === 0) {
            productId = 1; // Reset ID produk ke 1
        } else {
            // Jika masih ada produk, pastikan ID produk di form sesuai dengan produk terakhir
            productId = products.length + 1; // Mengatur ID produk berikutnya berdasarkan jumlah produk yang tersisa
        }

        // Perbarui ID produk di form untuk produk berikutnya
        document.getElementById("id_produk").value = `MD-${productId.toString().padStart(3, "0")}`;
    }
}

// Menangani pengisian ID produk pertama kali
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("id_produk").value = `MD-${productId.toString().padStart(3, "0")}`;
});

// Tambahkan event listeners untuk formatting
document.addEventListener("DOMContentLoaded", function() {
    const hargaProdukInput = document.getElementById('harga_produk');
    const stockAwalInput = document.getElementById('stock_awal');
    const stockProdukInput = document.getElementById('stock_produk');
    const editHargaProdukInput = document.getElementById('edit_harga_produk');
    const editStockAwalInput = document.getElementById('edit_stock_awal');
    const editStockProdukInput = document.getElementById('edit_stock_produk');

    function formatNumber(value) {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
    }

    function removeFormatting(value) {
        return value.replace(/\./g, '');
    }

    function handleInput(event) {
        const input = event.target;
        const value = input.value;
        input.value = formatNumber(removeFormatting(value)); // Format input dengan pemisah ribuan
    }

    function handleBlur(event) {
        const input = event.target;
        const value = input.value;
        input.value = removeFormatting(value); // Hapus pemisah saat kehilangan fokus
    }

    // Tambahkan event listeners untuk formatting
    [hargaProdukInput, stockAwalInput, stockProdukInput, editHargaProdukInput, editStockAwalInput, editStockProdukInput].forEach(input => {
        input.addEventListener('input', handleInput);
        input.addEventListener('blur', handleBlur);
    });
});