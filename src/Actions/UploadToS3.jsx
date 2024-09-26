import aws from 'aws-sdk';
// import {v4 as uuid} from 'uuid';

const UploadToS3 = async file => {
  const accessKey = process.env.REACT_APP_AWS_ACCESS_KEY;
  const secretAccessKey = process.env.REACT_APP_AWS_SECRET_KEY;
  const bucketName = process.env.REACT_APP_AWS_BUCKET_NAME;
  const region = process.env.REACT_APP_AWS_REGION;
  // console.log('accessKey', accessKey);
  // console.log('secretAccessKey', secretAccessKey);
  // console.log('bucketName', bucketName);
  // console.log('region', region);

  aws.config.update({
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
    region: region
  });
  const s3 = new aws.S3();
  // generate a unique name for the file
  // const fileName = uuid() + '-' + file.name;
  const params = {
    Bucket: bucketName,
    Key: 'test/' + file.name,
    Body: file,
    ContentType: file.type
  };

  try {
    const res = await s3.upload(params).promise();
    console.log('res', res);
    return res.Location;
  } catch (error) {
    console.log('error', error);
    return error;
  }
};

export default UploadToS3;
