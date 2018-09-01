// Init new camera instance on the player node
const camera = new Camera($('#player')[0]);

const _init = () => {
  // Switch on camera in viewfinder
  $('#viewfinder').on('show.bs.modal', () => {
    camera.switch_on();
  });

  // Switch off camera in viewfinder
  $('#viewfinder').on('hidden.bs.modal', () => {
    camera.switch_off();
  });

  // Take photo
  $('#shutter').on('click', () => {
    let photo = camera.take_photo();

    // Show photo preview in camera button
    $('#camera')
      .css('background-image', `url(${photo})`)
      .addClass('withphoto');
  });

  // Submit message
  $('#send').on('click', () => {
    // Get caption text
    const caption = $('#caption').val();

    // Check message is ok
    if (!camera.photo || !caption) {
      toastr.warning('Photo & Caption Required', 'Incomplete Message');
      return;
    }

    // Render new message in feed
    renderMessage({ photo: camera.photo, caption });

    // Reset caption field on success
    $('#caption').val('');
    $('#camera')
      .css('background-image', '')
      .removeClass('withphoto');
    camera.photo = null;
  });
};

const renderMessage = message => {
  let msgHTML = `
        <div style="display: none;" class="row message bg-light mb-2 rounded shadow">
            <div class="col-2 p-1">
                <img src="${message.photo}" class="photo w-100 rounded">
            </div>
            <div class="col-10 p-1">${message.caption}</div>
        </div>
    `;

  $(msgHTML)
    .prependTo('#messages')
    .show(500)
    // Bind a click handler on img to show modal
    .find('img')
    .on('click', showPhoto);
};

const showPhoto = e => {
  let photoSrc = $(e.currentTarget).attr('src');

  $('#photoframe img').attr('src', photoSrc);
  $('#photoframe').modal('show');
};
