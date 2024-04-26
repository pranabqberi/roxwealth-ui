
import crypto from 'crypto';
import fs from 'fs';



export const RSAResponseDecrypt = (encryptedData: string) => {
    const privateKey = fs.readFileSync('./src/data/docs/Request-private-Key.pem', 'utf8');
    const decryptedData = crypto.privateDecrypt(
        {
            key: privateKey.toString(),
            passphrase: '',
        },
        Buffer.from(encryptedData, 'base64')
    );
    return decryptedData.toString('utf8');
};

export const RSARequestEncrypt = (data: string) => {
    const publicKey = fs.readFileSync('./src/data/docs/Request-public-Key.pem', 'utf8');
    const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data));
    return encryptedData.toString('base64');
};