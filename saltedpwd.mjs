// import faker from 'faker';
import { getHash } from './util.mjs';

const passwords = ['123456', '123456', '123456', '123456', '123456'];
const saltedPwd = passwords.map((pwd) => getHash(pwd));
console.log('saltedPwd :>> ', saltedPwd);
