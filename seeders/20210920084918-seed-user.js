// cannot! why!
// import getHash from '../util.mjs';

module.exports = {
  up: async (queryInterface) => {
    const users = ['kai', 'jimmy', 'cx', 'tin-chan', 'nan'];
    const passwords = [
      '1a3bc370e034448a9479d5f812bdebc432dd51af12fa882612b1dc10503b326a560adbf77a2d0f8dde062493a1e02c7f2a9b25181257509703a938cb412c935f',
      '1a3bc370e034448a9479d5f812bdebc432dd51af12fa882612b1dc10503b326a560adbf77a2d0f8dde062493a1e02c7f2a9b25181257509703a938cb412c935f',
      '1a3bc370e034448a9479d5f812bdebc432dd51af12fa882612b1dc10503b326a560adbf77a2d0f8dde062493a1e02c7f2a9b25181257509703a938cb412c935f',
      '1a3bc370e034448a9479d5f812bdebc432dd51af12fa882612b1dc10503b326a560adbf77a2d0f8dde062493a1e02c7f2a9b25181257509703a938cb412c935f',
      '1a3bc370e034448a9479d5f812bdebc432dd51af12fa882612b1dc10503b326a560adbf77a2d0f8dde062493a1e02c7f2a9b25181257509703a938cb412c935f',
    ];

    const userObj = [];
    users.forEach((user, i) => userObj.push({
      name: user,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: passwords[i],
      // password: getHash(passwords[i]),
    }));

    await queryInterface.bulkInsert('users', userObj);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users');
  },
};
