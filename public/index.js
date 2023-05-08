const INPUT = document.getElementById("input");
let that = this;

INPUT.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        console.log(INPUT.value);
        duplicate(INPUT.value);
        INPUT.value = '';
    }
});

duplicate = (value) => {
    let i = 0;
    let original = document.getElementById('badge');
    let clone = original.cloneNode(true);
    clone.id = "duplicater" + i++;
    clone.style.display = 'block';
    clone.innerHTML = value;
    original.parentNode.appendChild(clone);
}

createPlaylist = () => {
    // lazy timeout
    setTimeout(() => {
        let createdDiv = document.getElementById('bkgCreated');
        createdDiv.style.setProperty('display', 'block')
    }, "1500");
}

invisible = () => {
    location.reload();
    /*let createdDiv = document.getElementById('bkgCreated');
    createdDiv.style.setProperty('display', 'none')*/
}