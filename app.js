document.body.innerHTML = `
<section class="all-users"></section>
<section class="pagination-sec">
    <div class="pagination" id="pagination"></div>
</section>
`;

const usercontainer = document.querySelector(".all-users");

const pagination_element = document.querySelector(".pagination");
let current_page = 1;
let rows = 5;


async function getAllUserContact(wrapper, rows_per_page, page) {
    let data = await fetch("https://616d506937f997001745d992.mockapi.io/user-contact")
    let users = await data.json();
    // console.log(users)
    wrapper.innerHTML = "";
    page--;
    
    let start = rows_per_page * page;
    let end = start + rows_per_page
    let paginatedItems = users.slice(start, end);
    // console.log(paginatedItems)
    for (let i = 0; i < paginatedItems.length; i++) {
        let item = paginatedItems[i]
        // console.log(item)
        usercontainer.innerHTML += `
        <div class="user-details">
            <div class="user-image">
                <img src=${item.avatar}></img>
            </div>
            <div class="user-name">
                <p>${item.name}</p>
            </div>
            <div class="user-contact">
                <a href="${item.email}">${item.email}</a>
                <a href="tel:${item.phone}"">${item.phone}</a>
            </div>
        </div>`
    }
    SetupPagination(pagination_element, rows, users)
    
}
async function SetupPagination(wrapper, rows_per_page, users) {
    // console.log(users)
    wrapper.innerHTML = "";
   
    let page_count = await Math.ceil(users.length / rows_per_page);
    for (var i = 1; i < page_count + 1; i++) {
        let btn = PaginationButton(i,users);
        usercontainer.append(btn)
    }
}



function PaginationButton(page, users) {
    let button = document.createElement('button');
    button.innerText = page;
    if (current_page == page)  button.classList.add('active')

    button.addEventListener("click", function(){
        current_page = page;
        getAllUserContact(usercontainer, rows, current_page);

        let current_btn = document.querySelector('.pagenumbers button.active')

        current_btn.classList.remove('active');

		button.classList.add('active');
    })
    return button;
    
}

getAllUserContact(usercontainer, rows, current_page);



