const salesModel = require('../models/salesModel');

const INVALID_ENTRIES_MESSAGE = 'No entry can be undefined';

const verifyEntries = (id, price, address, number) => {
  const entries = [id, price, address, number];
  const bool = entries.some((element) => element === undefined);

  if (bool) {
    throw new Error(INVALID_ENTRIES_MESSAGE);
  }
};

// ------------------------------------------------------

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  return allSales;
};

const createSale = async (
  userId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
) => {
  try {
    verifyEntries(userId, totalPrice, deliveryAddress, deliveryNumber);

    const newSale = await salesModel.createSale(userId, totalPrice, deliveryAddress, deliveryNumber);
    return newSale;
  } catch (error) {
    return error.message;
  }
};

module.exports = { getAllSales, createSale };
