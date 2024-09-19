let btn_menu      = document.querySelector(".btn-menu");
let header        = document.querySelector("header");
let links         = document.querySelector(".links ul");
let list          = document.querySelector(".links ul li");
let cards         = document.querySelectorAll(".cards .card");
let container_box = document.querySelector(".container_box");
let NewCards      = document.querySelectorAll(".container_box .box_card");
let download_more = document.querySelector(".download_more .btn");


btn_menu.addEventListener('click' , function(){
    btn_menu.classList.toggle("open");
    if(btn_menu.getAttribute("class") === "btn-menu open"){
        links.style.cssText= "transform:scale(1,1)translateY(0px)";
    }
    else{
        links.style.cssText= "transform:scale(0,0)translateY(200px)";
    }
})

let countScroll = 0;
window.onscroll = function(){
    if(countScroll < window.scrollY){
        countScroll = window.scrollY;
        header.style.cssText = "transition-delay: 1s;top : -100% ";
    }else{
        countScroll = window.scrollY;
        header.style.cssText = "transition-delay: 0s;top : 0";
    }
}

/* =============================================== */
/* ================ the new files ================ */
/* =============================================== */

import { content_product , content_apple , content_screen } from "./content.js";

if(document.body.className === "default_product"){
    NewCards = document.querySelectorAll(".container_box .box_card");
    download_more.onclick = function(){
        NewCards = document.querySelectorAll(".container_box .box_card");
        OtherProduct(content_product);
        rangement();
        react(NewCards);
        this.style.cssText = "display : none";
    }
}
else if(document.body.className === "apple_product"){
    NewCards = document.querySelectorAll(".container_box .box_card");
    download_more.onclick = function(){
        OtherProduct(content_apple);
        rangement();
        react(NewCards);
        this.style.cssText = "display : none";
    }
}
else if(document.body.className === "screen_product"){
    NewCards = document.querySelectorAll(".container_box .box_card");
    download_more.onclick = function(){
        OtherProduct(content_screen);
        rangement();
        react(NewCards);
        this.style.cssText = "display : none";
    }
}
else{
    NewCards = document.querySelectorAll(".container_box .box_card");
    react(NewCards);
}

function OtherProduct(products) {
    for (const pro of products) {
        let box_card = document.createElement("div");
        box_card.className = "box_card";
        box_card.style = "transition-delay : 0s ; opacity:1";

        let head_card = document.createElement("div");
        head_card.className = "head_card";

        let icon = document.createElement("div");
        icon.className = "icon";
        let i = `<i class="fa-regular fa-heart"></i>`;
        icon.innerHTML = i;
        head_card.appendChild(icon);

        let details = document.createElement("div");
        details.className = "details";
        let pragraph = `
            <p style="--clr:blue">الاكثر مبيعا</p>
            <p style="--clr:red">${pro.discount}% خصم</p>
        `;
        details.innerHTML = pragraph;
        head_card.appendChild(details);

        let body_card = document.createElement("div");
        body_card.className = "body_card";

        let image = document.createElement("img");
        image.src = `${pro.path_image}`
        body_card.appendChild(image);

        let info = document.createElement("div");
        info.className = "info";

        let stars_div = document.createElement("div");
        stars_div.className = "stars"
        let stars_range = `
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
        `;
        stars_div.innerHTML = stars_range;
        info.appendChild(stars_div);
        let p = document.createElement("p");
        p.textContent = `${pro.name}`;
        info.appendChild(p);
        body_card.appendChild(info);

        let foot_card = document.createElement("div");
        foot_card.className = "foot_card";
        let price = document.createElement("div");
        price.className = "price";
        price.innerHTML = `<p style="--c : blue">${pro.current_price}</p>`;
        if(pro.discount != 0){
            price.innerHTML += `<del style="--c : #999">${pro.present_price}</del>`
        }
        foot_card.appendChild(price);

        box_card.appendChild(head_card)
        box_card.appendChild(body_card)
        box_card.appendChild(foot_card)
        container_box.appendChild(box_card);
    }
}
/* =================== */
/* =================== */
/* =================== */

window.onload = function(){
    NewCards.forEach(function(ele,index,array){
        ele.style.opacity = '1';
    })
}

rangement();

function rangement(){
    NewCards  = document.querySelectorAll(".container_box .box_card");
    let price = [];
    let name = [];
    NewCards.forEach((e,i) => {
        e.style.cssText =`--delay: ${i} ; transition-delay : calc(var(--delay)*0.1s) ; opacity : 1`;
        name.push(e.children[1].children[1].children[1].innerHTML);
        price.push(Number(e.children[2].children[0].children[0].children[0].innerHTML.split(",").join("")));
    });
    name.sort()
    price.sort(function(e,a){return e - a});
    return [name , price];
}

let selection = document.querySelector("#sorting");
if(selection != null){
    selection.addEventListener('change' , function(){
        let value = selection.value;
        type_of_selection_sort(value);
    })
}

function type_of_selection_sort(value){
    NewCards  = document.querySelectorAll(".container_box .box_card");
    let order = 0;
    if(value === "price"){
        let price = rangement()[1];
        for (let i = 0; i < price.length; i++) {
            let select = price[i];
            for (let j = 0; j < price.length; j++) {
                let currentSelect = Number(NewCards[j].children[2].children[0].children[0].children[0].innerHTML.split(",").join(""));
                if(currentSelect === select){
                    NewCards[j].style.cssText = `order : ${order}`;
                    order++;
                }
            }
        }
    }
    else if(value === "name"){
        let name = rangement()[0];
        for (let i = 0; i < name.length; i++) {
            let select = name[i];
            for (let j = 0; j < name.length; j++) {
                let currentSelect = NewCards[j].children[1].children[1].children[1].innerHTML;
                if(currentSelect === select){
                    NewCards[j].style.cssText = `order : ${order}`;
                    order++;
                }
            }
        }
    }
    NewCards.forEach(function(ele,index,array){ ele.style.opacity = '1'})
}

react(cards);
react(NewCards);
function react(element){
    element.forEach(function(ele , index , arr){
    ele.children[0].children[0].onclick =  function(){
        this.classList.toggle('active');
        if(this.getAttribute("class") === "icon active"){
            ele.children[0].children[0].children[0].style.cssText = "color : red ; animation: animation_react 0.3s linear 0s 1 forwards;";
            ele.children[0].children[0].children[0].setAttribute("class" , "fa-solid fa-heart");
        }
        else{
            ele.children[0].children[0].children[0].style.cssText = "color : #222";
            ele.children[0].children[0].children[0].setAttribute("class" , "fa-regular fa-heart");
        }
        }
    });
}
/* =============================================================== */
clickOnProduct(cards);
clickOnProduct(NewCards);

function clickOnProduct(products){
    products.forEach(function(card){
        card.children[1].addEventListener('click' , function(){
            view_product_to_buy_it(card);
            window.scrollTo({top:0 , left:0});
            components.style.cssText = "opacity : 1";
        }) 
    })
}
function view_product_to_buy_it(card_Selected){
    let card_details = {
        name : card_Selected.children[1].children[1].children[1].innerHTML,
        image : card_Selected.children[1].children[0].src, 
        discount: card_Selected.children[0].children[1].children[1].innerHTML,
        current_price : card_Selected.children[2].children[0].children[0].innerHTML,
        //present_price : card_Selected.children[2].children[0].children[1].innerHTML,
        range : card_Selected.children[1].children[1].children[0].innerHTML,
    }
    let article = document.querySelector("article")
    article.innerHTML = '';
    article.style.cssText = "background-color: #fafafa";

    let container = document.createElement("div");
    container.className = "container";
    container.style.cssText = "margin-top:150px";
    container.appendChild(create_page(card_details));
    document.querySelector("article").appendChild(container);
    create_page(card_details)
}

function create_page(content){
    let page = document.createElement("div");
    page.className = "page";

    let head_content = document.createElement("div");
    head_content.className = "head_content";
    let disc = document.createElement("p");
    disc.innerHTML = content.discount;
    head_content.appendChild(disc);

    let option = document.createElement("div");
    option.className = "option";

    let icon = document.createElement("div");
    icon.className = "icon";
    let i = `<i class="fa-regular fa-heart"></i>`;
    icon.innerHTML = i;

    icon.addEventListener('click' , function(){
        this.classList.toggle("active");
        if(this.className === "icon active"){
            icon.children[0].setAttribute("class" , "fa-solid fa-heart");
            icon.children[0].style.cssText = "color : red ; animation: animation_react 0.3s linear 0s 1 forwards;"
        }
        else{
            icon.children[0].setAttribute("class" , "fa-regular fa-heart");
            icon.children[0].style.cssText = "color : #999";
        }
    })
    let share = document.createElement("div");
    share.className = "share";
    share.innerHTML = `<i class="fa-regular fa-share-from-square"></i>`;
    
    option.appendChild(icon);
    option.appendChild(share);

    head_content.appendChild(option);
    page.appendChild(head_content)

    /* ===================>>> body <<<=================== */
    let body = document.createElement("div");
    body.className = "body";

    let info_content = document.createElement("div");
    info_content.className = "info_content";
    let product_name = document.createElement("p");
    product_name.innerHTML = content.name;
    info_content.appendChild(product_name);

    let stars_div = document.createElement("div");
    stars_div.className = "stars";
    stars_div.innerHTML = content.range;
    info_content.appendChild(stars_div);

    let product_price = document.createElement("div");
    product_price.className = "product_price";

    let current = document.createElement("p");
    current.className = "current";
    current.innerHTML = content.current_price;

    /* let last = document.createElement("del");
    last.className = "last";
    last.innerHTML = "5"; */

    product_price.appendChild(current);
    //product_price.appendChild(last);

    info_content.appendChild(product_price);
    let btn_configuration = document.createElement("div");
    btn_configuration.className = "btn_config";
    btn_configuration.innerHTML = `
        <p>اضف الي العربه</p>
        <img src = "https://raw.githubusercontent.com/AhmedOrgline/raya2/399ce12838666ee161a6adc229a8e10761218d34/img/New%20folder/shopping-cart.png">
    `

    info_content.appendChild(btn_configuration);
    let info = document.createElement("div");
    info.className = "info_text";
    info.innerHTML = `
        <div class = component>
            <div class = "icon_text"><i class="fa-solid fa-clock"></i></div>
            <div class = "text"> 
                <p style = "--clr_text : #000">موعد التسلسم داخل القاهره والجيزه</p>
                <p style = "--clr_text : #999">1 - 5 <bdi>ايام</bdi></p>
            </div>
        </div>
        <div class = component>
            <div class = "icon_text"><i class="fa-solid fa-clock"></i></div>
            <div class = "text"> 
                <p style = "--clr_text : #000">موعد التسلسم خارج القاهره والجيزه</p>
                <p style = "--clr_text : #999">1 - 10 <bdi>ايام</bdi></p>
            </div>
        </div>
        <div class = component>
            <div class = "icon_text"><i class="fa-solid fa-shield"></i></div>
            <div class = "text"> 
                <p style = "--clr_text : #000">الضمان</p>
                <p style = "--clr_text : #999">سنتان</p>
            </div>
        </div>
        <div class = component>
            <div class = "icon_text"><i class="fa-solid fa-lock"></i></div>
            <div class = "text"> 
                <p style = "--clr_text : #000">الدفع الامن</p>
                <p style = "--clr_text : #999">الدفع عند التوصيل</p>
            </div>
        </div>
        <div class = component>
            <div class = "icon_text"><i class="fa-solid fa-rotate-left"></i></div>
            <div class = "text"> 
                <p style = "--clr_text : #000">ارجاع</p>
                <p style = "--clr_text : #999">خلال 14 يوم</p>
            </div>
        </div>
        <div class = component>
            <div class = "icon_text"><i class="fa-solid fa-hotel"></i></div>
            <div class = "text"> 
                <p style = "--clr_text : #000">بيع بواسطه</p>
                <p style = "--clr_text : #00f"><a href = "#">Raya Shop</a></p>
            </div>
        </div>
    `
    info_content.appendChild(info);

    body.appendChild(info_content)
    //page.appendChild(body);
    /* ===================>>> end  <<<=================== */

    let image_content = document.createElement("div");
    image_content.className = "image_content";

    let bigImge = document.createElement("div");
    bigImge.className = "bigImg";
    let imgB = document.createElement("img");
    imgB.src = content.image;
    bigImge.appendChild(imgB);

    let minImg = document.createElement("div");
    minImg.className = "minImg";
    let imgM = document.createElement("img");
    imgM.src = content.image;
    minImg.appendChild(imgM);

    image_content.appendChild(bigImge);
    image_content.appendChild(minImg);
    body.appendChild(image_content);

    page.appendChild(body);
    return page;
}

let components = document.querySelector(".article");

window.onload = function(){
    components.style.opacity = '1';
}