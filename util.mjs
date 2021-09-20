/* eslint-disable import/prefer-default-export */
import jssha from 'jssha';

const { SALT } = process.env;

export const getHash = (input) => {
  // eslint-disable-next-line new-cap
  const shaObj = new jssha('SHA-512', 'TEXT', { encoding: 'UTF8' });
  const unhasedString = `${input}-${SALT}`;
  shaObj.update(unhasedString);

  return shaObj.getHash('HEX');
};
