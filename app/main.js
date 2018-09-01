const _init = () => {
  // Switch on camera in viewfinder
  $('#viewfinder').on('show.bs.modal', () => {
    console.log('camera on');
  });

  // Switch off camera in viewfinder
  $('#viewfinder').on('hidden.bs.modal', () => {
    console.log('camera off');
  });

  // Take photo
  $('#shutter').on('click', () => {
    console.log('Take photo');
  });

  // Submit message
  $('#send').on('click', () => {
    // Get caption text
    const caption = $('#caption').val();

    // Check message is ok
    if (!caption) {
      toastr.warning('Photo & Caption Required', 'Incomplete Message');
      return;
    }

    console.log('adding message');
    console.log(caption);

    // Reset caption field on success
    $('#caption').val('');
  });
};
