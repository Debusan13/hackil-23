// when hovering on <td class="footable-first-column">
// add hovering red box on the mouse

// use MutationObserver to observe #tabs-classSearch
// then add event listener for all <td class="footable-first-column">
// when mouseover, add a red box
// when mouseout, remove the red box

let observer = new MutationObserver(function() {
    let td = document.querySelectorAll("td.footable-first-column");
    td.forEach(function(td) {
        td.addEventListener("mouseover", function() {
            let div = document.createElement("div-test");
            // create a 100px * 100px red box
            div.style.width = "100px";
            div.style.height = "100px";
            div.style.backgroundColor = "red";
            div.style.position = "absolute";
            div.style.top = "0px";
            div.style.left = "0px";
            td.appendChild(div);
        });
        td.addEventListener("mouseout", function() {
            let div = td.querySelector("div-test");
            td.removeChild(div);
        });
    });
});

// observe the table inside the <div id="tabs-classSearch">
// whenever the table is loaded, the observer will be triggered
observer.observe(document.querySelector("div#tabs-classSearch"), {
    childList: true,
    subtree: true
});



