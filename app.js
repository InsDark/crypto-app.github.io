const getCrypto = () => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1')
    .then(response => response.json())
    .then(data => {
        renderCrypto(data)
        filterCrypto(data)
    })
    .catch(err => console.error(err))
}


const renderCrypto = (data) => {
    const $template = document.getElementById('table-template').content
    const $fragment = document.createDocumentFragment()
    const $table = document.querySelector('table')
    let id = 1
    data.forEach(crypto => {
        $template.querySelector('th').textContent = id++
        $template.querySelector('img').setAttribute('src', `${crypto.image}`)
        $template.querySelector('h2').textContent = `${crypto.name}`
        $template.querySelector('span').textContent = `${crypto.symbol}`
        $template.querySelector('h3').textContent = `${crypto.current_price}`
        $template.querySelector('h4').textContent = `${crypto.price_change_24h}`
        
        if(crypto.price_change_24h > 0) {
            $template.querySelector('h4').style.color = 'green'
        } else{
            $template.querySelector('h4').style.color = 'red'
        }
        let $clone = document.importNode($template, true)
        $fragment.appendChild($clone)
    })
    $table.appendChild($fragment)
}

const filterCrypto = (data) => {
    const $searcher = document.querySelector('input')
    const allCrypto = [...data]
    $searcher.addEventListener('keyup', e => {
        const $table = Array.from(document.querySelector('table').children)
        $table.forEach(item => {
            if(item.hasAttribute('class')){
                item.remove()
            }
        })
        const valueLength = $searcher.value.length
        const filterCrypto = allCrypto.filter(crypto => crypto.name.toLowerCase().substring(0, valueLength) === $searcher.value.toLowerCase());
        renderCrypto(filterCrypto)
    })
}


document.addEventListener('DOMContentLoaded', () => {
    getCrypto()
})