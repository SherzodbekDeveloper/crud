
        let form = document.getElementById('form')
        let inputData = document.getElementById('input')
        let inputData2 = document.getElementById('input2')
        let inputData3 = document.getElementById('input3')
        let inputError = document.getElementById('inputError')
        let inputSuccess = document.getElementById('inputSuccess')
        let ul = document.getElementById('ul')
        let btn = document.getElementById('btns')

        let data = [];



        btn.addEventListener("blur", () => {
            inputError.innerHTML = "inputga malumot kiriting"
        })


        form.addEventListener('submit', (event) => {
            event.preventDefault()

            if (inputData.value === '' || inputData2.value === '' ||  inputData3.value === '') {
                console.log('input malumot kiriting')
                inputError.style.display = 'block'
                inputError.innerHTML = 'Malumot kiriting '
                inputSuccess.style.display = 'none'
                return;
            }
            else {
                inputSuccess.style.display = 'block'
                inputSuccess.innerHTML = 'Malumot kiritildi'
                inputError.style.display = 'none'
            }
            createObjectAndAddToArray();
            deleteMessage()

        });


        const makeId = (data2) => {
            if(!data2.length) {
                return 1;
            } else {
                return data2[data2.length - 1].id + 1
            }
         }
         ( function ()  {
            data = JSON.parse(localStorage.getItem('data')) || [];
            readDataAndShowInHTML()
         })();

        function createObjectAndAddToArray() {
            data.push({
                name: inputData.value,
                surname: inputData2.value,
                password: inputData3.value,
                id: makeId(data),
            })

            localStorage.setItem('data', JSON.stringify(data));
            readDataAndShowInHTML()
            console.log(data);


        }
        function deleteData(id) {
        const idx = data.findIndex((obj) => obj.id === id)
        
        if(idx !== -1){
            data.splice(idx, 1)
            localStorage.setItem("data", JSON.stringify(data));
            readDataAndShowInHTML()

        }
        }

        function readDataAndShowInHTML() {
            ul.innerHTML = "";
            data.map((obj, index) => {
                return ul.innerHTML += `
        <tr>
                    <td>${index + 1} </td>
                    <td>${obj.name}</td>
                    <td> ${obj.surname}</td>
                    <td>${obj.password}</td>
                    <td> <button class="btn btn-success"> Update </button>
                    <button onclick="deleteData(${obj.id})" class="btn btn-danger"> Delete </button>  </td>
        </tr>
        `
            })
          

        }

        function deleteMessage(){
            inputData.value = '';
            inputData2.value = '';
            inputData3.value = '';
        }

   