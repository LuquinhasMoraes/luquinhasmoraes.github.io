let btn = document.getElementById("nao")

btn.addEventListener('click', () => {
    console.log('clicou');
})

btn.addEventListener('mouseover', () => {
    
    let top = Math.floor(Math.random() * 500)
    let left = Math.floor(Math.random() * 500)
    
    btn.style.position = "absolute"
    btn.style.marginTop = top + "px"
    btn.style.marginLeft = left + "px"
})