import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';

const AES_SECRET_KEY = "askjghkjasdfh897698sd76jghsdjfkhgsjdfdgf";
const AES_SALT = "asjkgidsjafgujnfdbjh";
const AES_SUFFIX = "_encrypted";
const IV = CryptoJS.enc.Hex.parse('01020304050607080900010203040506');
// public static String encodeBase64(String str) {
//     // return only alphanumeric characters, no special characters
//     return Base64.getEncoder().encodeToString(str.getBytes(StandardCharsets.UTF_8)).replaceAll("[^a-zA-Z0-9]", "");
// }

// public static String decodeBase64(String str) {
//     return new String(Base64.getDecoder().decode(str));
// }
// convert these java functions to typescript

const encodeBase64 = (str: any) => {
    return Buffer.from(str).toString('base64').replace(/[^a-zA-Z0-9]/g, '');
}

const decodeBase64 = (str: any) => {
    return Buffer.from(str, 'base64').toString('utf-8');
}

const Demoencrypt = (strToEncrypt: any) => {
    try {
        const key = CryptoJS.PBKDF2(AES_SECRET_KEY, AES_SALT, { keySize: 256 / 32, iterations: 65536 });
        const encrypted = CryptoJS.AES.encrypt(strToEncrypt, key, { iv: IV }).toString();
        return encodeBase64(encrypted) + AES_SUFFIX;
    } catch (error: any) {
        console.error("Error while encrypting: ", error.toString());
        return null;
    }
}

const Demodecrypt = (strToDecrypt: any) => {
    try {
        if (!strToDecrypt || !strToDecrypt.endsWith(AES_SUFFIX)) {
            return strToDecrypt;
        }
        const decrypted = CryptoJS.AES.decrypt(decodeBase64(strToDecrypt.slice(0, -AES_SUFFIX.length)), CryptoJS.PBKDF2(AES_SECRET_KEY, AES_SALT, { keySize: 256 / 32, iterations: 65536 }), { iv: IV });
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error: any) {
        console.error("Error while decrypting: ", error.toString());
        return null;
    }
}

export const encrypt = (data: any) => {
    return Demoencrypt(data);
}

export const decrypt = (data: any) => {
    return Demodecrypt(data);
}
