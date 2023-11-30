 const form = document.querySelector("#form")
 const input = document.querySelector("#search-cities")
 const msg = document.querySelector(".msg")
 const list = document.querySelector(".cities")

 const apiKey = 'f4846a2d6c9877fd2ad3df293fd7a994'

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

        if(filteredArray.length > 0) {
            msg.textContent = `Você está pronto para a previsão de ${filteredArray[0].querySelector(".city-name").textContent} ... especifique informando o codígo do país também` 
            msg.classList.add("visible")

            form.request()
            input.focus()

            return
        }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}`;


    fetch(url)
        .then(response => response.json())
        .then(data =>{

            if (data.cod == "404") {
                throw new Error(`${data.cod}, ${data.message}`)
            }
            const {main, name, sys, weather} = data

            const li = document.createElement("li")

            const markup = `
            <div>
            <h2>${Math.round(main.temp)}<sup>C</sup></h2>
            <p class="conditions">${weather[0]['description'].toUpperCase()}</p>
            <h3><span class="city-name">${name}</span><span class="country">${sys.country}</span></h3>
            </div>
            `

            li.innerHTML = markup

            list.appendChild(li)
        })
        .catch(() => {
            msg.textContent = "Coloce uma cidade valida"
            msg.classList.add("visible")
        })

        msg.textContent = ""
        form.reset()
        input.focus()
     })