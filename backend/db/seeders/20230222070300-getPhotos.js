'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Photos',
      [
        {
          name: 'Landscape',
          url: 'https://w.wallhaven.cc/full/ex/wallhaven-ex9gwo.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Red forest',
          url: 'https://wallpaperaccess.com/full/1132043.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Night city',
          url: 'https://wallpaperaccess.com/full/1132049.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Photos');
  },
};
