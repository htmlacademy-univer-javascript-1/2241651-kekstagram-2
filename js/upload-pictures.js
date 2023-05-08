const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const pictureChooser = document.querySelector('#upload-file');
const picturePreview = document.querySelector('.img-upload__preview img');

pictureChooser.addEventListener('change', () => {
  const picture = pictureChooser.files[0];
  const pictureName = picture.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => pictureName.endsWith(it));

  if (matches) {
    picturePreview.src = URL.createObjectURL(picture);
  }
});
