var input = document.getElementById('textInput');
var input$ = Rx.Observable
    .fromEvent(input, 'keyup')
    .map((input) => input.currentTarget.value)
    .debounceTime(5000)
    .flatMap((searchTerm) => {
        var response = Rx.Observable
            .ajax({ url: 'https://www.googleapis.com/customsearch/v1?key=AIzaSyDeGa1PuDXjgYgcTYNlOMfpwa6q_OgHcwg&cx=017576662512468239146:omuauf_lfve&q=' + searchTerm, 
            method: 'GET', responseType: 'json' }
        )
        return response
    })
    
input$.subscribe(x => sendValues(x));

function sendValues(x) {
    var results = x.response.items
    results.forEach(result => {
        var $result = document.createElement('p')
        $result.innerHTML = result.title
        document.getElementById('results').appendChild($result)
    });

}
