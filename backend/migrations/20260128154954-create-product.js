"use strict";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("products", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING(30),
    },
    price: {
      type: Sequelize.FLOAT,
    },
    type: {
      type: Sequelize.STRING(30),
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: "created_at",
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: "updated_at",
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("products");
}
