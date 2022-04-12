const baseEndpoint = "http://127.0.0.1:8000/api/"

new Vue({
    el: '#feedstock_list',
    data: {
    feedstock: []
    },
    created: function () {
        const vm = this;
        axios.get('/api/feedstock/')
        .then(function (response){
        vm.feedstock = response.data
        })
    }
})