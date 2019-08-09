function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    let exportFileDefaultName = 'data.json';
    
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}



function getParams() {

    var params = {},
        pairs = document.URL.split('?')
               .pop()
               .split('&');

    for (var i = 0, p; i < pairs.length; i++) {
           p = pairs[i].split('=');
           params[ p[0] ] =  p[1];
    }     

    return params;
}

function myFunction() {
    var elements = document.getElementById("myForm").elements;
    console.log(elements)
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
    }

    document.getElementById("name").innerHTML = JSON.stringify(obj);


    

}


function generateQRcode() {
    firstUrl="http://api.qrserver.com/v1/create-qr-code/?data="
    secondUrl="&size=100x100"
    url=document.getElementById("url").innerHTML 
    document.getElementById('qr').setAttribute("src",firstUrl+url+secondUrl)


    

}