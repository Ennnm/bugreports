module.exports = {
  up: async (queryInterface) => {
    const features = ['users', 'post', 'login', 'signup'];
    const featureObjs = [];
    features.forEach((f) => {
      const featureObj = {
        name: f,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      featureObjs.push(featureObj);
    });

    await queryInterface.bulkInsert('features', featureObjs);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('features');
  },
};
