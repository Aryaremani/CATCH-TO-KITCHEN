document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { name: 'Fresh Fish', price: '$10', description: 'High-quality fresh fish.', image: 'images/fish.png' },
        { name: 'Organic Meat', price: '$15', description: 'Organic and hygienic meat.', image: 'images/meat.png' },
        { name: 'Fresh Vegetables', price: '$5', description: 'Fresh and healthy vegetables.', image: 'images/vegetables.png' },
        { name: 'Dairy Products', price: '$8', description: 'Fresh and organic dairy products.', image: 'images/dairy.png' },
        { name: 'Cashews', price: '', description: 'Freshly baked bread and pastries.', image: 'images/cashews.png' },
        { name: 'Fruits', price: '$7', description: 'Seasonal and exotic fruits.', image: 'images/fruits.png' }
        // Add more products as needed
    ];

    const productList = document.querySelector('.product-list');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.price}</p>
            <p>${product.description}</p>
        `;
        productList.appendChild(productDiv);
    });

    // Add logo animation
    const logo = document.querySelector('.logo img');
    logo.classList.add('logo-animation');

    // Add share button
    const shareButton = document.createElement('button');
    shareButton.textContent = 'Share this website';
    shareButton.addEventListener('click', copyWebsiteLink);
    document.body.appendChild(shareButton);

    // Removed 3D card flip for stories
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function placeOrder(productId) {
    const quantity = prompt("Enter quantity:");
    const customerName = prompt("Enter your name:");
    const customerEmail = prompt("Enter your email:");
    const customerPhone = prompt("Enter your phone number:");
    const deliveryAddress = prompt("Enter your delivery address:");

    fetch('/place_order/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            product_id: productId,
            quantity: quantity,
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone,
            delivery_address: deliveryAddress
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || data.error);
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function shareWebsite() {
    const websiteUrl = window.location.href;
    const shareText = `Check out this website: ${websiteUrl}`;
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: shareText,
            url: websiteUrl
        }).then(() => {
            console.log('Thanks for sharing!');
        }).catch(console.error);
    } else {
        prompt('Copy this link to share:', websiteUrl);
    }
}

function copyWebsiteLink() {
    const websiteUrl = window.location.href;
    navigator.clipboard.writeText(websiteUrl).then(() => {
        alert('Website link copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
