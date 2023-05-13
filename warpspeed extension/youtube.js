function wait_for(selector) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer.disconnect();
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true,
      });
  });
}

function gradual_brighten(popup_container) {
  opacity = parseFloat(popup_container.style.opacity) + 0.01
  if (opacity >= 1.0) {
    gradual_brighten.opacity = 1.0;
    return;
  }
  popup_container.style.opacity = opacity
  setTimeout(() => {
    gradual_brighten(popup_container);
  }, 30);
}

async function video_ended() {
  const popup_container = document.createElement('div');
  popup_container.setAttribute('id', 'popup_container');
  popup_container.style.opacity = 0.0;
  popup_container.innerHTML = `
  <div class="wrapper">
    <header>
      <i class="bx bx-cookie"></i>
      <h2>Test Your Understanding!</h2>
    </header>

    <div class="data">
      <p>Take a quiz based on the concepts in the video?</p>
    </div>

    <div class="buttons">
      <button class="button" id="acceptBtn">Yes</button>
      <button class="button" id="declineBtn">No</button>
    </div>
  </div>
  `;
  setTimeout(() => {
    gradual_brighten(popup_container);
  }, 30);
  
  document.body.appendChild(popup_container);
  (await wait_for('#declineBtn')).addEventListener('click', () => {
    popup_container.remove();
  });
}

wait_for('.ytp-endscreen-content > .ytp-videowall-still').then(video_ended);