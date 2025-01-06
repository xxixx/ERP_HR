// export const verifyPassword = (userPassword: string, password: string) => { //userPassword 는 입력한값 password는 데이터베이스의 값
export const verifyPassword = (plainPassword: string, hash: string) => {
  return plainPassword === hash;
};