// when hovering on <td class="footable-first-column">
// add hovering red box on the mouse

// wait for the page to load then get the <td> element

window.addEventListener("load", function() {
    let td = document.querySelector("td.footable-first-column");
    
    td.addEventListener("mouseover", function(event) {
        let div = document.createElement("div-test");
        div.style.position = "absolute";
        div.style.top = event.clientY + "px";
        div.style.left = event.clientX + "px";
        div.style.width = "100px";
        div.style.height = "100px";
        div.style.backgroundColor = "red";
        document.body.appendChild(div);
    });

    td.addEventListener("mouseout", function(event) {
        let div = document.querySelector("div-test");
        document.body.removeChild(div);
    });
});


