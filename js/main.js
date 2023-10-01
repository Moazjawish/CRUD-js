// Variables :
let bullets = document.querySelector(".bullets")
let bulletSpan = document.querySelectorAll(".bullets span")
// 
let sortName = document.querySelector(".Name")
let input = document.querySelector(".input")
let email = document.querySelector(".email")
let LastName = document.querySelector(".sName")
//
let searchInput = document.querySelector(".form-control")
let searchBtn = document.querySelector(".search")
let searchComments = document.querySelector(".form-control-comments")
//
let addBtn = document.querySelector(".SubBtn")
let updBtn = document.querySelector(".upBtn")
let employeesDiv = document.querySelector(".employees-details")
let employeeArr = [];
let index = 0;

searchInput.addEventListener("input", searchOperation)
searchComments.addEventListener("input", searchInCommetns)

function searchOperation() {
    let filter = searchInput.value.toLowerCase()
    let employeesItem = document.querySelectorAll(".employee")
    employeesItem.forEach((item) => {
        let text = item.childNodes[0].firstChild.innerHTML;
        if (text.toLowerCase().includes(filter.toLowerCase())) {
            item.style.display = '';
        }
        else {
            item.style.display = 'none';
        }
    })
}

function searchInCommetns() {
    let searchName = searchComments.value.toLowerCase();
    let employeeComments = document.querySelectorAll(".employee-comment")
    employeeComments.forEach((ele) => {
        let text = ele.childNodes[1].lastChild.innerHTML;
        console.log(text)
        if (text.toLowerCase().includes(searchName.toLowerCase())) {
            ele.style.display = ''
        }
        else {
            ele.style.display = "none"
        }
    })
}

// 1- When Add Button Clicked  :
addBtn.addEventListener("click", () => {
    if (input.value !== "" && email.value !== "" && LastName.value !== "") {
        SendToArr(input.value, email.value, LastName.value)
        input.value = "";
        email.value = "";
        LastName.value = "";
    }
})

function SendToArr(employee, Email, SNAME) {
    let Employee =
    {
        id: Date.now(),
        name: employee,
        Sname: SNAME,
        email: Email
    }
    employeeArr.push(Employee);
    ShowEmployee(employeeArr);
    SendToStorage(employeeArr)
}


function ShowEmployee(employeeArr) {
    employeesDiv.innerHTML = ""
    employeeArr.forEach((ele) => {
        let employee = document.createElement("div");
        employee.className = "employee";
        employee.setAttribute("id", ele.id)
        // Create text-id div : 
        let textId = document.createElement("div")
        textId.className = "text-id";
        // employee-id :
        // let employeeId = document.createElement("span")
        // employeeId.className = "employee-id";
        // employeeId.append(document.createTextNode(`${ele.id} -`))
        // employee-name :
        let employeeName = document.createElement("span")
        employeeName.className = "employee-name";
        employeeName.append(document.createTextNode(`${ele.name}`))
        // Create Email 
        let email = document.createElement("div")
        email.className = "email"
        email.append(document.createTextNode(`${ele.email}`))
        // 
        // Create Second name 
        let secondName = document.createElement("div")
        secondName.className = "sName"
        secondName.append(document.createTextNode(`${ele.Sname}`))
        // 

        // Create Buttons Div :
        let buttons = document.createElement("div")
        buttons.className = "buttons"
        // Create Del Btns : 
        let DelBtn = document.createElement("button")
        DelBtn.className = "btn btn-outline-danger del"
        let DelBtnContent = document.createElement("i")
        DelBtnContent.className = "fas fa-trash-alt"
        DelBtn.append(DelBtnContent)
        // Create Edit Btns : 
        let EditBtn = document.createElement("button")
        EditBtn.className = "btn btn-outline-success update"
        let EditBtnContent = document.createElement("i")
        EditBtnContent.className = "fa fa-edit"
        EditBtn.append(EditBtnContent)
        // Append : 
        buttons.append(DelBtn)
        buttons.append(EditBtn)
        // textId.append(employeeId)
        textId.append(employeeName)
        employee.append(textId)
        employee.append(secondName)
        employee.append(email)
        employee.append(buttons)
        employeesDiv.append(employee)
    })

    let delBtn = document.querySelectorAll(".del")
    for (let i = 0; i < delBtn.length; i++) {
        delBtn[i].addEventListener("click", () => {
            delBtn[i].parentElement.parentElement.remove()
            DeleteFromStorage(delBtn[i].parentElement.parentElement.id)
        })
    }


    let CheckBtn = document.querySelectorAll(".update")
    let employee = document.querySelectorAll(".employee")
    let email = document.querySelector(".email")

    for (let i = 0; i < CheckBtn.length; i++) {
        CheckBtn[i].addEventListener("click", () => {
            CheckBtn[i].innerHTML = ""
            // CheckBtn[i].innerHTML = "<i class='fa fa-address-card'></i>"
            // updBtn.addEventListener("click" , ()=>{
            SendCheckToStorage(CheckBtn[i].parentElement.parentElement.id)
            input.value = CheckBtn[i].parentElement.parentElement.childNodes[0].childNodes[0].textContent;
            LastName.value = CheckBtn[i].parentElement.parentElement.childNodes[1].textContent;
            email.value = CheckBtn[i].parentElement.parentElement.childNodes[2].textContent;
            // })
        })
    }

    //
    // console.log(index)
    index = (employeeArr.length + 1)
}
// loacl Storage : 

function SendToStorage(employeeArr) {
    localStorage.setItem("Employees", JSON.stringify(employeeArr))
}

function GetFromStorage() {
    let data = localStorage.getItem("Employees");
    data = JSON.parse(data);
    if (data) {
        employeeArr = data
        ShowEmployee(employeeArr)
    }
}

GetFromStorage()

// Create Delete Function : 
function DeleteFromStorage(taskid) {
    employeeArr.map((ele) => {
        employeeArr = employeeArr.filter(function (ele) {
            return ele.id != taskid
        })
    })
    SendToStorage(employeeArr)
}

function SendCheckToStorage(EmployeeId) {

    for (let i = 0; i < employeeArr.length; i++) {
        if (employeeArr[i].id == EmployeeId) {
            employeeArr[i].name = input.value
            employeeArr[i].email = email.value
            employeeArr[i].Sname = LastName.value
        }
    }
    SendToStorage(employeeArr)
    ShowEmployee(employeeArr)
    input.value = "";
    email.value = "";
    LastName.value = "";
}

sortName.addEventListener("click", () => {

    employeeArr.sort((fname, sname) => {
        fname = fname['name'].toLowerCase();
        sname = sname['name'].toLowerCase();

        if (fname < sname) {
            return -1
        }
        if (fname > sname) {
            return 1
        }
        else {
            return 0
        }
    })
    SendToStorage(employeeArr)
    ShowEmployee(employeeArr)
})


//  Image Slider

let slider =
    [
        {
            id: 1,
            img: '../images/florian-klauer-mk7D-4UCfmg-unsplash.jpg',
            name: "Samer",
            details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Vel placeat quidem distinctio ullam tempora maiores facilis molestiae"
        },

        {
            id: 2,
            img: '../images/format-arw-PXjQaGxi4JA-unsplash.jpg',
            name: "Amer",
            details: "Vel placeat quidem distinctio ullam tempora maiores facilis molestiaeLorem ipsum dolor, sit amet consectetur adipisicing elit"
        },

        {
            id: 3,
            img: '../images/hamish-weir-SUi9mYSVTyc-unsplash.jpg',
            name: "Adeeb",
            details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Vel placeat quidem distinctio ullam tempora maiores facilis molestiae"
        },

        {
            id: 4,
            img: '../images/james-yu-l6CXds-HmSE-unsplash.jpg',
            name: "Tahseen",
            details: "Vel placeat quidem distinctio ullam tempora maiores facilis molestiaeLorem ipsum dolor, sit amet consectetur adipisicing elit"
        },

        {
            id: 5,
            img: '../images/marcin-lukasik-uYpOYyJdhRE-unsplash.jpg',
            name: "Moaz",
            details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel placeat quidem distinctio ullam tempora maiores facilis molestiae"
        }
    ]

let imageSlider = document.querySelector(".image-slider")
let swiperWrapper = document.querySelector(".swiper-wrapper");


function EmployeeSlider() {
    slider.forEach((ele) => {
        let Slider = document.createElement("div");
        Slider.className = "slider swiper-slide";
        // Create image : 
        let image = document.createElement("img")
        image.setAttribute("src", ele.img)
        // Create Name
        let employeeNameSlider = document.createElement("h3");
        employeeNameSlider.className = "employee-name-slider"
        employeeNameSlider.append(document.createTextNode(ele.name))
        // Create Details:
        let employeeDetailsSlider = document.createElement("p")
        employeeDetailsSlider.append(document.createTextNode(ele.details))
        Slider.append(image)
        Slider.append(employeeNameSlider)
        Slider.append(employeeDetailsSlider)
        swiperWrapper.append(Slider)
    })
}


EmployeeSlider()

var swiper = new Swiper(".slide-content", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centerSlide: 'true',
    autoplay:
    {
        delay: 2500,
        disableOnInteraction: false,
    },
    fade: 'true',
    grabCursor: 'true',
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// Employee
let EmployeeComment = [

    {
        id: 1,
        image: '../images/format-arw-PXjQaGxi4JA-unsplash.jpg',
        name: "Tahseen",
        CommentText: "This is a beatiful website , please Accebt my invite",
        date: "2/2/2012"
    },
    {
        id: 2,
        image: '../images/florian-klauer-mk7D-4UCfmg-unsplash.jpg',
        name: "Yasser",
        CommentText: "This is a beatiful website , please Accebt my invite",
        date: "1/1/2011"
    },
    {
        id: 3,
        image: '../images/hamish-weir-SUi9mYSVTyc-unsplash.jpg',
        name: "Yamen",
        CommentText: "This is a beatiful website , please Accebt my invite",
        date: "3/3/2010"
    },
    {
        id: 4,
        image: '../images/marcin-lukasik-uYpOYyJdhRE-unsplash.jpg',
        name: "Hallah",
        CommentText: "This is a beatiful website , please Accebt my invite",
        date: "4/4/2009"
    }
]
let AllComments = document.querySelector(".Allcomment")
function DisplayComments() {
    EmployeeComment.forEach((ele) => {
        AllComments.innerHTML +=
            `
    <div class="employee-comment">
        <div class="name">
                <img src=${ele.image} alt="" width="20px">
                <span>${ele.name}</span></div>
            <div class="comment-text">${ele.CommentText}</div>
            <span class="date">${ele.date}</span>
        </div>
    `
    })
}
DisplayComments()
