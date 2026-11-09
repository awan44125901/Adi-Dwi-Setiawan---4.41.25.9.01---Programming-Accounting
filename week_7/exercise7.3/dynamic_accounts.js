document.addEventListener('DOMContentLoaded', function() {
    const newAccountNameInput = document.getElementById('newAccountName');
    const addAccountButton = document.getElementById('addAccountBtn');
    const accountListElement = document.getElementById('accountList');

    // Fungsi untuk membuat elemen daftar (li) akun baru
    function createAccountItem(accountName) {
        const listItem = document.createElement('li');
        listItem.textContent = accountName;

        // Membuat tombol Delete untuk elemen baru
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            // 'this' merujuk ke tombol Delete yang diklik
            // this.parentNode merujuk ke elemen <li> induknya
            this.parentNode.remove();
        });

        listItem.appendChild(deleteButton);
        accountListElement.appendChild(listItem);
    }

    // Event listener untuk tombol "Add Account"
    addAccountButton.addEventListener('click', function() {
        const accountName = newAccountNameInput.value.trim(); // .trim() menghapus spasi di awal/akhir
        
        if (accountName !== "") {
            createAccountItem(accountName);
            newAccountNameInput.value = ""; // Mengosongkan input setelah berhasil ditambahkan
        } else {
            alert("Account name cannot be empty!");
        }
    });

    // Menambahkan tombol Delete pada daftar akun statis saat halaman selesai dimuat
    const staticAccounts = accountListElement.querySelectorAll('li');
    staticAccounts.forEach(function(item) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            this.parentNode.remove();
        });
        item.appendChild(deleteButton);
    });
});