
(function () {
    let sidebarExpanded = true;
    let toggleButton = null;
    let second_sidebar = null;
    let header = null;
    let subHeder = null;
    let isBlurred = false;
    let blurrButton = null;
    


    function toggleSidebar() {
        sidebarExpanded = !sidebarExpanded;
        if (second_sidebar) {
            //get parent of second sidebar
            let parent = second_sidebar.parentElement;
            const overlay = document.querySelector('.two ._aigw');


            if (parent) {
                parent.style.maxWidth = sidebarExpanded ? '30%' : '0%';
                parent.style.minWidth = sidebarExpanded ? '30%' : '0%';
                parent.style.width = sidebarExpanded ? '30%' : '0%';
                //handle file container width when users upload image/files in chat
                overlay.style.flexBasis = sidebarExpanded ? '30%' : '0%';
                overlay.style.maxWidth = sidebarExpanded ? '30%' : '0%';
                overlay.style.minWidth = sidebarExpanded ? '30%' : '0%';
            }

            //chang text of toggle button
            if (toggleButton) {
                toggleButton.innerHTML = sidebarExpanded ? 'T' : 'E';
                //change font weight and color
                toggleButton.style.fontWeight = sidebarExpanded ? 'normal' : 'bold';
                toggleButton.style.color = sidebarExpanded ? 'white' : 'red';
            }

            //hide the chat sidebar header
            if(header){
                header.style.display = sidebarExpanded ? 'block' : 'none';
                subHeder.style.display = sidebarExpanded ? 'block' : 'none';
            }
                   
        }
       
    }

    function createToggleButton({title,innertext,id,topPosition}) {
 
        let button = document.createElement('button');
        button.id = id || 'wa-sidebar-toggle';
        button.innerHTML = innertext || 'T';
        button.title = title || 'Toggle Sidebar';

        // Position the button on right end of sidebar
        button.style.position = 'absolute';
        button.style.top = topPosition;
        button.style.left = '0';
        button.style.width = '30px';
        button.style.height = '30px';
        return button;
    }


    //function to add blur effect to second_sidebar
    function addBlurEffect(){
        isBlurred = !isBlurred;
        if(isBlurred){
            second_sidebar.style.filter = 'blur(5px)';
            //bold the text and change color
            blurrButton.style.fontWeight = 'bold';
            blurrButton.style.color = 'red';
             
        }
        else{
            second_sidebar.style.filter = 'none';
            //bold the text and change color
            blurrButton.style.fontWeight = 'normal';
            blurrButton.style.color = 'white';
        }
    }


  

    function injectToggleButton() {
        // Check if the button already exists
        if (document.getElementById('wa-sidebar-toggle')) {
            return; // Button already exists, do nothing
        }
        if (document.getElementById('wa-sidebar-blur')) {
            return; // Button already exists, do nothing
        }

        second_sidebar = document.getElementById('side');
        let elements = document.getElementsByClassName('x1okw0bk')
        //get the span element
        for (let element of elements) {
            if (element.tagName === 'SPAN') {
                header = element;
                break;
            }
        }

        //find element that has x150wa6m in className
        elements = document.getElementsByClassName('x150wa6m');
        //find header tag in the elements
        for (let element of elements) {
            if (element.tagName === 'HEADER') {
                console.log('Sub header found');
                subHeder = element;
                break;
            }
        }

        if(!header) console.log('header not found'); else console.log('header found');
        if (!second_sidebar) {
            console.log('second_sidebar not found');
            return;
        }

        toggleButton = createToggleButton({title:'Toggle Sidebar',innertext:'T',id:'wa-sidebar-toggle',topPosition:'50'});
        blurrButton = createToggleButton({ title: 'Blur Sidebar', innertext: 'B', id: 'wa-sidebar-blur', topPosition:'60'});
    
        document.body.appendChild(toggleButton);
        document.body.appendChild(blurrButton);
        toggleButton.addEventListener('click', toggleSidebar);
        blurrButton.addEventListener('click', addBlurEffect);
    }

    function onMutation(mutations) {
        for (let mutation of mutations) {
            if (mutation.type === 'childList') {
                injectToggleButton();
            }
        }
    }

    // Initial attempt to inject the button
    injectToggleButton();

    // Set up the MutationObserver
    const observer = new MutationObserver(onMutation);
    observer.observe(document.body, { childList: true, subtree: true });

    // Log to confirm the script is running
    console.log('WhatsApp Sidebar Toggle Extension loaded');
})();