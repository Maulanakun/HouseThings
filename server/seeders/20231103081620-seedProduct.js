"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/product.json").map((el) => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Products", data, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("Products", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
