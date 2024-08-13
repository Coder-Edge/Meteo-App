


document.querySelector('button').addEventListener('click',function(){
    const city = document.querySelector('input').value;
    lien = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid=56aad21df110a70cd45fff6163a62c75'
    window.fetch(lien)
    .then(response => response.json())
    .then(responseJson => console.log(responseJson));
})

function meteo() {

    
}

