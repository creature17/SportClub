let customerMembership;
let customerTrainings;

async function readCurrentCustomer(){
    const data = {
        email: localStorage.getItem('customerEmail')
    };
    let res = await fetch("/customerInfo", {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
    }).then(response => response.json()).then((responseJSON)=>{return responseJSON;})
    customerMembership = res.membership;
    // console.log(customerMembership);
    customerTrainings = res.trainings;
    // console.log(customerTrainings);
}