let openform = [...document.getElementsByClassName('open-register-form-bttn')]

function trackNewBttns() {
    openform = [...document.getElementsByClassName('open-register-form-bttn')]
    openform.map((elemento, index) => {
        openform[index].addEventListener('click', () => {
            document.getElementById('new-value-wrapper').classList.add('view')
        })
    })
}

let closeFormBttn = document.getElementById('new-value-close')

closeFormBttn.addEventListener('click', () => {
    document.getElementById('new-value-wrapper').classList.remove('view')
})
let closeFormBttn2 = document.getElementById('new-value-cancel-bttn')

closeFormBttn2.addEventListener('click', () => {
    document.getElementById('new-value-wrapper').classList.remove('view')
})


let NewValueInput = document.getElementById('new-value-input')
let NewValueTypeID = ''

let NewValueIN = document.getElementById('new-value-type-in')
let NewValueOUT = document.getElementById('new-value-type-out')

NewValueIN.addEventListener('click', () => {
    NewValueIN.querySelector('label').classList.add('activeBttn')
    NewValueOUT.querySelector('label').classList.remove('activeBttn')
    NewValueTypeID = 1
})
NewValueOUT.addEventListener('click', () => {
    NewValueOUT.querySelector('label').classList.add('activeBttn')
    NewValueIN.querySelector('label').classList.remove('activeBttn')
    NewValueTypeID = 2
})

let inserirValor = document.getElementById('new-value-send-bttn')
inserirValor.addEventListener('click', () => {
    if (NewValueInput.value > 0 && NewValueTypeID != '') {
        let usedID = 0
        if (insertedValues.length == 0) {
            usedID = 0
        } else {
            usedID = insertedValues.reduce(function (prev, current) {
                return prev.id > current.id ? prev : current;
            }).id
        }
        console.log(usedID + 1);
        insertedValues.push({
            id: usedID + 1,
            value: Number(NewValueInput.value),
            categoryID: NewValueTypeID,
        })
        NewValueInput.value = ''
        filterBy(0)
        populateValues()
        trackNewBttns()
        document.getElementById('new-value-wrapper').classList.remove('view')
    }
    else {
        alert('É obrigatório informar um valor positivo e o tipo de Valor')
    }
})