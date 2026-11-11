import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  console.log(req.file.path);

  try {
    await sharp(req.file.path)
      .resize(160, 160)
      .png()
      .toFile(`uploads/${req.file.filename}_thumb.png`);

    next();
  } catch (error) {
    next(error);
  }
};

export {createThumbnail};
