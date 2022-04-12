axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

new Vue({
  el: "#delete-mat-form",
  data: {
//        material: {
//        name: this.name,
//        amount: this.amount,
//        cost: this.cost,
//        general_expenses: this.general_expenses
//      },
  },
  methods: {
  	submitForm(pk){
//        let material = {
//        name: this.name,
//        amount: this.amount,
//        cost: this.cost,
//        general_expenses: this.general_expenses
//      },
//    const agent = new https.Agent({
//        rejectUnauthorized: false
//    });      console.log(material)


//      this.$emit('onSubmit', material)
//      onSubmit(material){
      axios.delete('/api/material/<int:pk>/')
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