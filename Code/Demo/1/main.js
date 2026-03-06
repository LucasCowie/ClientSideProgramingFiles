async function getBusData(){
    try{
        const url = "https://prog2700.onrender.com/hrmbuses";
        const response = await fetch(url);
        responseCheck(response); //response error handing
        const data = await response.json();

        return data;
    }catch(error){
        console.log(error);
    }
}
function responseCheck(res){
    if(!res.ok){
        throw new Error("Response Error: "+res.status);
    }
}

