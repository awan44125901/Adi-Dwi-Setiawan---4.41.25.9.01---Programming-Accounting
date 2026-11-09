document.addEventListener('DOMContentLoaded', function() {
   
    const transDateInput = document.getElementById('transDate');
    const refNoInput = document.getElementById('refNo');
    const descriptionInput = document.getElementById('description');
    const accountSelect = document.getElementById('accountSelect');
    const debitInput = document.getElementById('debitAmount');
    const creditInput = document.getElementById('creditAmount');

    const addRowBtn = document.getElementById('addRowBtn');
    const saveJournalBtn = document.getElementById('saveJournalBtn');
    const transactionBody = document.getElementById('transactionBody');

    function formatCurrency(amount) {
        if (!amount || amount === 0) return "-";
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    }

    debitInput.addEventListener('input', function() {
        if (this.value !== "") {
            creditInput.value = "";
        }
    });

    creditInput.addEventListener('input', function() {
        if (this.value !== "") {
            debitInput.value = "";
        }
    });

    function addTransactionRow() {
        const dateVal = transDateInput.value;
        const refNoVal = refNoInput.value.trim();
        const descVal = descriptionInput.value.trim();
        const accountVal = accountSelect.value;
        const debitVal = parseFloat(debitInput.value) || 0;
        const creditVal = parseFloat(creditInput.value) || 0;

        if (!dateVal || !refNoVal || !descVal || !accountVal) {
            alert("Harap lengkapi Tanggal, Ref. No., Deskripsi, dan Pilihan Akun!");
            return;
        }

        const isDebitFilled = debitVal > 0;
        const isCreditFilled = creditVal > 0;

        if ((!isDebitFilled && !isCreditFilled) || (isDebitFilled && isCreditFilled)) {
            alert("Harap masukkan nilai pada kolom Debit ATAU Kredit saja!");
            return;
        }

        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${dateVal}</td>
            <td>${refNoVal}</td>
            <td>${descVal}</td>
            <td>${accountVal}</td>
            <td>${formatCurrency(debitVal)}</td>
            <td>${formatCurrency(creditVal)}</td>
            <td><button type="button" class="btn btn-danger delete-btn">Delete</button></td>
        `;

        const deleteBtn = tr.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            tr.remove();
        });

        transactionBody.appendChild(tr);

        transDateInput.value = "";
        refNoInput.value = "";
        descriptionInput.value = "";
        accountSelect.value = "";
        debitInput.value = "";
        creditInput.value = "";
    }

    addRowBtn.addEventListener('click', addTransactionRow);

    saveJournalBtn.addEventListener('click', function() {
        if (transactionBody.children.length === 0) {
            alert("Tabel transaksi masih kosong! Tambahkan transaksi terlebih dahulu.");
            return;
        }

        alert("Journal successfully saved! (Data is not persistent)");
        transactionBody.innerHTML = ""; // Kosongkan tabel transaksi setelah disimpan
    });
});