let noRegisterFound = document.getElementById('noRegister')
let filterIndex = []

function noValueMsg(category) {
    if (insertedValuesfiltered = [] && filterIndex != 1 && filterIndex != 2) {
        noRegisterFound.innerHTML = ''
        noRegisterFound.insertAdjacentHTML("afterbegin",`
        <div class="open-register-form-bttn" id="noRegister-msg-wrapper">
            <h3 class="title2-bold">Nenhuma entrada cadastrada</h3>
            <p class="text1-medium">Registrar novo valor</p>
        </div> 
        `)
    }else if (insertedValuesfiltered = []) {
        noRegisterFound.innerHTML = ''
        noRegisterFound.insertAdjacentHTML("afterbegin",`
        <div class="open-register-form-bttn" id="noRegister-msg-wrapper">
            <h3 class="title2-bold">Nenhum valor cadastrado como ${valuesCategory[filterIndex-1]}</h3>
            <p class="text1-medium">Registrar novo valor</p>
        </div> 
        `)        
    }
    trackNewBttns()
}

let valueList = document.getElementById('value-list')

function populateValues(params) {
    valueList.innerHTML = ''
    noRegisterFound.innerHTML = ''
    if (insertedValuesfiltered.length > 0) {
      insertedValuesfiltered.map((elemento, index) => {
        valueList.insertAdjacentHTML("beforeend",`
          <li class="registered-value" id="value-${elemento.id}">
            <p class="value text1-medium">R$ ${elemento.value.toFixed(2)}</p>
            <span>
              <p class="valueType text2-regular">${valuesCategory[elemento.categoryID-1]}</p>
              <button class="deleteRegister" id='delete-${elemento.id}'>
                <svg width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect id='delete-color1' x="0.75" y="0.75" width="26.75" height="24.5" rx="3.25" fill="white" />
                  <path id='delete-color2' d="M19.8125 6.875H16.5312L16.2578 6.38281C16.1484 6.16406 15.9297 6 15.6836 6H12.5391C12.293 6 12.0742 6.16406 11.9648 6.38281L11.7188 6.875H8.4375C8.19141 6.875 8 7.09375 8 7.3125V8.1875C8 8.43359 8.19141 8.625 8.4375 8.625H19.8125C20.0312 8.625 20.25 8.43359 20.25 8.1875V7.3125C20.25 7.09375 20.0312 6.875 19.8125 6.875ZM9.44922 18.7695C9.47656 19.4805 10.0508 20 10.7617 20H17.4609C18.1719 20 18.7461 19.4805 18.7734 18.7695L19.375 9.5H8.875L9.44922 18.7695Z" fill="#ADB5BD" />
                  <rect id='delete-color3' x="0.75" y="0.75" width="26.75" height="24.5" rx="3.25" stroke="#F1F3F5" stroke-width="1.5" />
                </svg>
              </button>
            </span>
          </li> 
          `)
        }
        )
    }else{
        noValueMsg()
    }

    deleteButtonsTrack()
    SumValues()
    showValuesSum.innerText = `R$ ${SumValues()}`
}

let showValuesSum = document.getElementById('showValuesSum')
function SumValues() {
    if (insertedValuesfiltered.length == 0 || insertedValuesfiltered.length == undefined) {
        return 00,00
    }else{
        return insertedValuesfiltered.reduce((curr, atual) => {return curr + atual.value}, 0).toFixed(2)
    }
}

function filterBy(filterID){
    insertedValuesfiltered = []
    if (filterID == 0) {
        return insertedValuesfiltered = [...insertedValues]
    }else{
        let correspondValues = insertedValues.filter(elemento => elemento.categoryID == filterID)
        correspondValues.map(elemento => insertedValuesfiltered.push(elemento))  
        return insertedValuesfiltered     
    }

}

let filterButtons = [...document.getElementsByClassName('filterBttn')]

filterButtons.map((elemento,index) =>{
    filterButtons[index].addEventListener('click', ()=>{
        filterIndex = index
        filterBy(index)
        populateValues()
    })
})

let deleteButtons = [...document.getElementsByClassName('deleteRegister')]

function deleteButtonsTrack() {
    deleteButtons = [...document.getElementsByClassName('deleteRegister')]
    deleteButtons.map((elemento,index) =>{
        deleteButtons[index].addEventListener('click', ()=>{
            let valueID = deleteButtons[index].id.slice(7)
            deleteById(valueID)
            populateValues()
        })
    })    
}

function deleteById(valueID) {
    let indexToRemove1 = insertedValues.findIndex((value) => value.id == valueID)
    insertedValues.splice(indexToRemove1,1)
    let indexToRemove2 = insertedValuesfiltered.findIndex((value) => value.id == valueID)
    insertedValuesfiltered.splice(indexToRemove2,1)
}

filterBy(0)
populateValues()
trackNewBttns()