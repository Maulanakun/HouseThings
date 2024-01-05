"use strict";
const { hash } = require("../helpers/bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataAdmin = require("../data/admin.json");
    // console.log(dataAdmin);
    const data = dataAdmin.map((el) => {
      el.password = hash(el.password);
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Users", data, {});
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
    await queryInterface.bulkDelete("Users", null, {
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
