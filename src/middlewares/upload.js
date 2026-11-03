import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  console.log(
    'Tässä välissä äkä tee muuuta kuin tallenna thumbnail ja sitten next (async / await)'
  );
  console.log(req.file.path);
  // TODO: use file path to create 160x160 png thumbnail with sharp
  //käytä sharp ja generoikaa sharpin avulla teee sharp(input) .resize(200,300, {})...
};

export {createThumbnail};
