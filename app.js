 const form = document.querySelector("#form")
 const input = document.querySelector("#search-cities")
 const msg = document.querySelector(".msg")
 const list = document.querySelector(".cities")

 const apiKey = '76382fea85d82017486d5daf760d804d'

 form.addEventListener("submit", e =>{
    e.preventDefault()

    msg.textContent=''
    msg.classList.remove("visible")

    let inputVal= input.value 

    const ListItemsArray= Array.from(list.querySelectorAll('.cities li'))

    if (ListItemsArray.length > 0) {
        const filteredArray = ListItemsArray.filter(el => {
            let content = ''
            let cityName = el.querySelector('.city-name').textContent.toLowerCase()
            let cityCountry = el.querySelector('.country').textContent.toLowerCase()

            if(inputVal.includes(',')) {
                if(inputVal.split(',')[1].length > 2){
                    inputVal = input.split(',')[0]

                    content = cityName
                } else{
                    content = `${cityName},${cityCountry}`
                }
            } else {
                content = cityName
            }

            return content== inputVal.toLowerCase()
        })

        console.log(filteredArray)
    }
 })