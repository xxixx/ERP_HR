import type {H3Event} from'h3'
import CryptoJS from 'crypto-js';
export function getUserFormEvent(event: H3Event){
  const encryptedUserJsonString: any = getCookie(event, '__user');
// 암호화 키를 환경 변수에서 가져옵니다.
const encryptionKey: any = process.env.ENCRYPTION_KEY;
  if (!encryptedUserJsonString) {
    // return { user: null };
    return null;
  }

   // 암호화된 데이터를 복호화합니다.
   const bytes = CryptoJS.AES.decrypt(encryptedUserJsonString, encryptionKey);
   const decrypteduserJsonString = bytes.toString(CryptoJS.enc.Utf8);
  const user = JSON.parse(decrypteduserJsonString);
  return user;

}