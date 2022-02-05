async function main(){
    const countContainer = document.querySelector('#count-container');
    const incrementButton = document.querySelector('#increment-button');
    const decrementButton = document.querySelector('#decrement-button');

    let myURLJSON = await fetch('http://localhost:9001/counter')
    let newJSON = await myURLJSON.json()
    console.log(newJSON)

    let countValue = newJSON.value;

    function serverUpdate(countValue) {
        fetch('http://127.0.0.1:9001/counter', {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                "value": countValue,
            })
        })
    }

    function increment(){
        countValue++;
        countContainer.textContent = countValue;
        serverUpdate(countValue)
    }

    function decrement(){
        countValue--;
        countContainer.textContent = countValue;
        serverUpdate(countValue)
    }

    incrementButton.addEventListener('click', increment);
    decrementButton.addEventListener('click', decrement);
    countContainer.textContent = countValue;
}
main()