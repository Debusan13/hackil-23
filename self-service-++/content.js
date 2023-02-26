const onMouseOver = (event) => {
    if (event.target.classList.contains('footable-first-column')) {
        // if the footable-first-column does not have a box child, create one
        if (!event.target.querySelector('.test-box')) {
            let box = document.createElement('test-box');
            let table = document.querySelector("#tabs-classSearch");
            let rect = table.getBoundingClientRect();
    
            box.style.top = (event.clientY - rect.top) + "px";
            box.style.left = (event.clientX - rect.left) + "px";
            box.style.visibility = "visible";
    
            event.target.appendChild(box);
        } else {
            let box = event.target.querySelector('.test-box');
            let table = document.querySelector("#tabs-classSearch");
            let rect = table.getBoundingClientRect();
    
            box.style.top = (event.clientY - rect.top) + "px";
            box.style.left = (event.clientX - rect.left) + "px";
            box.style.visibility = "visible";
        }
    }
}

const onMouseOut = (event) => {
    if (event.target.classList.contains('footable-first-column')) {
        event.target.querySelector('.test-box').style.visibility = "hidden";
    }
}

window.addEventListener("load", (event) => {
    document.querySelector("#tabs-classSearch").addEventListener(
        'mouseover', onMouseOver
    );
    document.querySelector("#tabs-classSearch").addEventListener(
        'mouseout', onMouseOut
    );
});