import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

aws.config.update({
  region: "ap-northeast-2",
  credentials: new aws.CognitoIdentityCredentials({
    IdentityPoolId: process.env.AWS_COGNITO_CREDENTIAL,
  }),
});

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "bucket-images-for-gongu",
    key: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

exports.upload = multer(upload);
