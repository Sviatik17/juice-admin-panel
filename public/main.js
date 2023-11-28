

function setStorage(){
    axios.get('/api/data')
    .then(res=>{
        const data =res.data;
        for(let el of data.drinks){

            $('.orderName').append(`<option value='${el.name}'>${el.name}</option`);
           $('.storageItems').append(`<div class='storage__item'>
           <h4>${el.name}</h4>
           <span>${el.count}</span>

          </div> `)
        }
    })
    .catch(err=>{
        console.error(err)
    })
}
setStorage();

$('.confirmBtn').click(function(){
    const newData={
        type:'order',
        orderName:$('.orderName').val(),
        orderCount:parseInt($('#orderCount').val()),
        orderPrice:parseInt($('#orderPrice').val()),
        deliveryPrice:parseInt($('#deliveryPrice').val()),
        data:new Date().toLocaleString()
    }
    console.log(newData)

    axios.post('/saveOrder',newData)
    .then(res =>{
        console.log(res.data.message);
    })
    .catch(err =>{
        console.error(err);
    })
})