const extractData = (rowElem) => {
  const result = {};
  for (const td of rowElem.children) {
      switch (td.dataset.property) {
          case 'subject':
          case 'courseTitle':
          case 'sequenceNumber':
          case 'creditHours':
          case 'courseReferenceNumber':
              result[td.dataset.property] = td.innerText;
              break;
          case 'courseTitle':
          case 'instructor':
              result[td.dataset.property] = td.firstChild.innerText;
              break;
      }
  }
  const fullname = result['instructor'].split(',');
  result['instructorFirst'] = fullname[1].trim();
  result['instructorLast'] = fullname[0].trim();
  return result;
};

const callback = (mutations) => {
  const rows = [];
  for (const mutation of mutations) {
      if (mutation.target.nodeName === 'TR' && mutation.target.classList.length > 0) {
          rows.push(mutation.target);
      }
  }
  for (const row of rows) {
      const courseInfo = extractData(row);

      // Create button
      const button = document.createElement('div');
      button.classList.add('button');
      button.textContent = ' ⚡';
      button.style.display = "inline-block";
      button.style.marginLeft = "2px";
      button.style.cursor = "pointer";
      row.children[2].children[0].style.display = "inline-block";
      row.children[2].appendChild(button);

      button.addEventListener('click', () => {
        let modal = document.getElementById('modal');
        let modalTitle = document.getElementById('modal-title');
        modalTitle.textContent = courseInfo['courseTitle'] + ' ⚡';

        let subject = document.getElementById('subject');
        subject.textContent = '✏️ Subject: ' + courseInfo['subject'];

        let rmp = document.getElementById('rmp');
        rmp.setAttribute("href", "https://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+illinois+at+urbana+-+champaign&queryoption=HEADER&query=" + courseInfo.instructorFirst + "%20" + courseInfo.instructorLast + "&facetSearch=true");
        rmp.textContent = '🧑‍🏫 Instructor: ' + courseInfo['instructorFirst'] + ' ' + courseInfo['instructorLast'];

        let creditHours = document.getElementById('creditHours');
        creditHours.textContent = '🕒 Credit Hours: ' + courseInfo['creditHours'];

        let sequenceNumber = document.getElementById('sequenceNumber');
        sequenceNumber.textContent = '#️ CRN: ' + courseInfo['sequenceNumber'];

        let courseReferenceNumber = document.getElementById('courseReferenceNumber');
        courseReferenceNumber.textContent = '🏷️ Section: ' + courseInfo['courseReferenceNumber'];

        $(modal).modal('show');
    });
  }
};

const observer = new MutationObserver(callback);

window.addEventListener('load', (event) => {
    const searchTable = document.getElementById('tabs-classSearch');
    if (searchTable !== undefined) {
        observer.observe(document.getElementById('tabs-classSearch'), { childList: true, subtree: true });
    }
});

// let courses = document.querySelectorAll(".odd");
// courses = [...courses, ...document.querySelectorAll(".even")];
// courses.forEach((courseElement) => {
//     const button = document.createElement('div');
//     button.classList.add('button');
//     button.textContent = ' ⚡';
//     button.style.display = "inline-block";
//     button.style.marginLeft = "2px";
//     button.style.cursor = "pointer";

//     button.addEventListener('click', () => {
//         let modal = document.getElementById('modal');
//         let modalTitle = document.getElementById('modal-title');
//         modalTitle.textContent = courseElement.children[0].innerText;

//         let rmpLink = document.getElementById('rmp');
//         rmpLink.setAttribute("href", "https://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+illinois+at+urbana+-+champaign&queryoption=HEADER&query=" + courseInfo.instructorFirst + "%20" + courseInfo.instructorLast + "&facetSearch=true");

//         $(modal).modal('show');
//     });

//     courseElement.children[0].children[0].style.display = "inline-block";
//     courseElement.children[0].appendChild(button);
// });


function buildModal() {
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

  var modal = document.createElement('div');
  modal.setAttribute('id', 'modal');
  modal.classList.add('modal');
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('role', 'dialog');

  var modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog');
  modalDialog.setAttribute('role', 'document');

  var modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  var modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header');

  var modalTitle = document.createElement('h5');
  modalTitle.classList.add('modal-title');
  modalTitle.setAttribute('id', 'modal-title');

  var modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');

  var subject = document.createElement('p');
  subject.setAttribute('id', 'subject');

  var creditHours = document.createElement('p');
  creditHours.setAttribute('id', 'creditHours');

  var sequenceNumber = document.createElement('p');
  sequenceNumber.setAttribute('id', 'sequenceNumber');

  var courseReferenceNumber = document.createElement('p');
  courseReferenceNumber.setAttribute('id', 'courseReferenceNumber');

  var rateMyProfessors = document.createElement('a');
  rateMyProfessors.setAttribute("id", "rmp");
  rateMyProfessors.setAttribute("target", "_blank");
  rateMyProfessors.setAttribute("rel", "noopener noreferrer");
  // https://icons8.com/icon/38HJBFwphJ3I/teacher

  const modalFooter = document.createElement('div');
  modalFooter.classList.add('modal-footer');

  const modalFooterCloseButton = document.createElement('button');
  modalFooterCloseButton.classList.add('btn');
  modalFooterCloseButton.classList.add('btn-secondary');
  modalFooterCloseButton.setAttribute('data-dismiss', 'modal');
  modalFooterCloseButton.textContent = 'Close';

  modalBody.appendChild(subject);
  modalBody.appendChild(creditHours);
  modalBody.appendChild(sequenceNumber);
  modalBody.appendChild(courseReferenceNumber);
  modalBody.appendChild(rateMyProfessors);
  modalHeader.appendChild(modalTitle);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);
  modalFooter.appendChild(modalFooterCloseButton);

  document.body.appendChild(modal);
}

buildModal();