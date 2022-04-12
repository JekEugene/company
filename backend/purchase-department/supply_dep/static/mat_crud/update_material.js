axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

new Vue({
  el: "#update-mat-form",
  data: {
        material: {
        name: this.name,
        amount: this.amount,
        cost: this.cost,
        general_expenses: this.general_expenses
      },
  },
  methods: {
  	submitForm(pk){
//        let material = {
//        name: this.name,
//        amount: this.amount,
//        cost: this.cost,
//        general_expenses: this.general_expenses
//      },
    console.log(material)

//      this.$emit('onSubmit', material)
//      onSubmit(material){
      axios.put('/api/material/<int:pk>/', material)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
//      }
    	//materials.push(mat)
    }
  }
})