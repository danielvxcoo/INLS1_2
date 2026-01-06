const buttons = document.querySelectorAll(".accordion_button");
const arrows = document.querySelectorAll(".fa-chevron-down");

function openItem() {
    if (this.nextElementSibling.classList.contains('active_accordion_box')) {
        this.nextElementSibling.classList.remove('active_accordion_box');
        this.lastElementChild.classList.remove('active_accordion_btn')
    } else {
        closeItem();
        this.nextElementSibling.classList.toggle('active_accordion_box');
        this.lastElementChild.classList.toggle('active_accordion_btn');
    }

}




const closeItem = () => {
    const allActiveItems = document.querySelectorAll('.info');
    allActiveItems.forEach(item => {
        item.classList.remove('active_accordion_box')
    })
    arrows.forEach(arrow => {
        arrow.classList.remove('active_accordion_btn');
    })
}


buttons.forEach(btn => {
    btn.addEventListener('click', openItem)
})