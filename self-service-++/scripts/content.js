let courses = document.querySelectorAll(".odd");
courses = [...courses, ...document.querySelectorAll(".even")];

courses.forEach((courseElement) => {
    const button = document.createElement('div');
    button.classList.add('button');
    button.textContent = '⚡';
    button.style.display = "inline-block";
    button.style.marginLeft = "2px";
    button.style.cursor = "pointer";

    button.addEventListener('click', () => {
      //   <div id="modal" class="modal" tabindex="-1" role="dialog">
      //   <div class="modal-dialog" role="document">
      //     <div class="modal-content">
      //       <div class="modal-header">
      //         <h5 class="modal-title">Modal title</h5>
      //         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      //           <span aria-hidden="true">&times;</span>
      //         </button>
      //       </div>
      //       <div class="modal-body">
      //         <p>Modal body text goes here.</p>
      //       </div>
      //       <div class="modal-footer">
      //         <button type="button" class="btn btn-primary">Save changes</button>
      //         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      //       </div>
      //     </div>
      //   </div>
      // </div>

        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('role', 'dialog');

        const modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog');
        modalDialog.setAttribute('role', 'document');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');

        const modalTitle = document.createElement('h5');
        modalTitle.classList.add('modal-title');
        modalTitle.textContent = "yooo";

        const modalCloseButton = document.createElement('button');
        modalCloseButton.classList.add('close');
        modalCloseButton.setAttribute('data-dismiss', 'modal');
        modalCloseButton.setAttribute('aria-label', 'Close');

        const modalCloseButtonSpan = document.createElement('span');
        modalCloseButtonSpan.setAttribute('aria-hidden', 'true');
        modalCloseButtonSpan.textContent = '&times;';

        const modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');

        const modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');

        const modalFooterCloseButton = document.createElement('button');
        modalFooterCloseButton.classList.add('btn');
        modalFooterCloseButton.classList.add('btn-secondary');
        modalFooterCloseButton.setAttribute('data-dismiss', 'modal');
        modalFooterCloseButton.textContent = 'Close';

        modalCloseButton.appendChild(modalCloseButtonSpan);
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(modalCloseButton);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);
        modalFooter.appendChild(modalFooterCloseButton);

        document.body.appendChild(modal);
        $(modal).modal('show');
    });

    courseElement.children[0].children[0].style.display = "inline-block";
    courseElement.children[0].appendChild(button);
});

// courseElement.addEventListener('mouseover', () => {});
