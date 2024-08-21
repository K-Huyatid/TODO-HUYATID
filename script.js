// Add this to your script.js file

let selectedRow = null;
let itemNumber = 1;

function onFormSubmit() {
    if (validate()) {
        const formData = readFormData();
        if (!selectedRow) {
            insertNewRecord(formData); // Add new item
        } else {
            updateRecord(formData); // Update existing item
            selectedRow = null; // Reset selectedRow after update
        }
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
        <td class="todo-item">${data.todoItem}</td>
        <td>
            <a onClick="onEdit(this)">Edit</a>
            <a onClick="onDelete(this)">Delete</a>
        </td>
        <td>
            <input type="checkbox" onclick="onMark(this)">
        </td>
    `;
}

function onMark(checkbox) {
    const row = checkbox.parentElement.parentElement;
    const itemCell = row.querySelector('.todo-item'); // Get the cell with the item text

    if (checkbox.checked) {
        itemCell.classList.add('checked');
        Swal.fire(
            'Marked!',
            'Your item has been marked.',
            'success'
        );
    } else {
        itemCell.classList.remove('checked');
        Swal.fire(
            'Unmarked!',
            'Your item has been unmarked.',
            'info'
        );
    }
}

function resetForm() {
    document.getElementById("todoItem").value = "";
    selectedRow = null;
}

function onEdit(td) {
    const currentItem = td.parentElement.parentElement.cells[1].textContent;

    Swal.fire({
        title: 'Edit To-Do Item',
        input: 'text',
        inputValue: currentItem,
        showCancelButton: true,
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            selectedRow = td.parentElement.parentElement; // Set selectedRow only if edit is confirmed
            const formData = { todoItem: result.value };
            updateRecord(formData);
        } else {
            selectedRow = null; // Reset selectedRow if the edit is canceled
        }
    });
}

function updateRecord(formData) {
    if (selectedRow) {
        selectedRow.cells[1].textContent = formData.todoItem;
        Swal.fire(
            'Updated!',
            'Your item has been updated.',
            'success'
        );
        selectedRow = null; // Reset selectedRow after updating
    }
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

function onMark(checkbox) {
    const row = checkbox.parentElement.parentElement;
    const itemCell = row.cells[1];

    if (checkbox.checked) {
        itemCell.classList.add('checked');
        Swal.fire(
            'Marked!',
            'Your item has been marked.',
            'success'
        );
    } else {
        itemCell.classList.remove('checked');
        Swal.fire(
            'Unmarked!',
            'Your item has been unmarked.',
            'info'
        );
    }
}

// Ensure that the logo moves to random positions on mouseover
document.addEventListener("DOMContentLoaded", function() {
    const logo = document.querySelector(".banner-logo");
    const banner = document.querySelector(".banner");

    logo.addEventListener("mouseover", function() {
        const maxX = banner.clientWidth - logo.clientWidth;
        const maxY = banner.clientHeight - logo.clientHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        logo.style.position = "absolute";
        logo.style.left = `${randomX}px`;
        logo.style.top = `${randomY}px`;
    });
});
