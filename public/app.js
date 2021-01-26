document.querySelectorAll('.price').forEach(node => {
    node.textContent = new Intl.NumberFormat('ru-Ru', {
        currency: 'rub',
        style: 'currency'
    }).format(node.textContent)
});


const $cart = document.querySelector('#cart')

if ($cart) {
    $cart.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id

            fetch('/cart/remove/' + id, {
                    method: 'delete'
                }).then(res => res.json())
                .then(cart => {
                    if (cart.books.length) {
                        const html = cart.books.map(c => {
                            return `
                                <tr>
                                    <td>${c.title}</td>
                                    <td>${c.price}</td>
                                    <td>${c.count}</td>
                                    <td>
                                    <i class="material-icons red-text js-remove" data-id='${c.id}'>delete</i>
                                    </td>
                                </tr>
                            `
                        }).join('')
                        $cart.querySelector('tbody').innerHTML = html
                        $cart.querySelector('.amount').textContent = cart.price
                    } else {
                        $cart.innerHTML = '<p>The Cart is empty</p>'
                    }
                })
        }
    })
}