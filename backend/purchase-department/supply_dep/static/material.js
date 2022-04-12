//const createForm = document.getElementById('create-mat-form')
//const baseEndpoint = "http://127.0.0.1:8000/api/"

//if (createForm) {
//    createForm.addEventListener('submit', handleCreate)
//}

//function handleCreate(event){
//    console.log(event)
//    event.PreventDefault()
//    const createEndpoint = `${baseEndpoints}/material/`
//    let createFormData = new FormData(createForm)
//    let createObjectData = Object.fromEntries(createFormData)
//    let bodyStr = JSON.stringify(createObjectData)
//    const options = {
//        method: "POST",
//        headers: {
//            "ContentType": "application/json"
//        },
//        body: bodyStr
//    }
//    fetch(createEndpoint, options)
//    .then(response=>{
//        console.log(response)
//        return response.json()
//    })
//    .then(x=>{
//        console.log(x)
//    })
//    .catch(err=> {
//        console.log('err', err)
//    })
//}

new Vue({
    el: '#mat_list',
    data: {
    materials: []
    },
    created: function () {
        const vm = this;
        axios.get('/api/material/')
        .then(function (response){
        vm.materials = response.data
        })
    }
})