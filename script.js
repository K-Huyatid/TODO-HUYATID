let selectedRow = null;
let itemNumber = 1;

function onFormSubmit() {
    if (validate()) {
        const formData = readFormData();
        if (!selectedRow) insertNewRecord(formData);
        else updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    return {
        todoItem: document.getElementById("todoItem").value
    };
}

function insertNewRecord(data) {
    const table = document.getElementById("todoList").querySelector('tbody');
    const newRow = table.insertRow();
    newRow.setAttribute('data-row-index', itemNumber);

    newRow.innerHTML = `
        <td>${itemNumber++}</td>
        <td>${data.todoItem}</td>
        <td>
            <a onClick="onEdit(this)">Edit</a>
            <a onClick="onDelete(this)">Delete</a>
        </td>
    `;
}

function resetForm() {
    document.getElementById("todoItem").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    const currentItem = selectedRow.cells[1].textContent;

    Swal.fire({
        title: 'Edit To-Do Item',
        input: 'text',
        inputValue: currentItem,
        showCancelButton: true,
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            const formData = { todoItem: result.value };
            updateRecord(formData);
        }
    });
}

function updateRecord(formData) {
    selectedRow.cells[1].textContent = formData.todoItem;
    Swal.fire(
        'Updated!',
        'Your item has been updated.',
        'success'
    );
}

function onDelete(td) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const row = td.parentElement.parentElement;
            row.remove();
            updateRowNumbers();
            Swal.fire(
                'Deleted!',
                'Your item has been deleted.',
                'success'
            );
        }
    });
    resetForm();
}

function validate() {
    const todoItem = document.getElementById("todoItem").value;
    const errorElement = document.getElementById("todoValidationError");

    if (!todoItem) {
        errorElement.classList.remove("hide");
        return false;
    } else {
        errorElement.classList.add("hide");
        return true;
    }
}

function updateRowNumbers() {
    const rows = document.querySelectorAll("#todoList tbody tr");
    itemNumber = 1;
    rows.forEach(row => {
        row.cells[0].textContent = itemNumber++;
    });
}
