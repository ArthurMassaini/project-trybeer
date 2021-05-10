const connection = require('../config/connection');

const getAllSales = async () => {
  const [allSales] = await connection.execute('SELECT * FROM sales');

  return allSales;
};

const getSaleById = async (id) => {
  const [[sale]] = await connection.execute(
    'SELECT * FROM sales WHERE id = ?',
    [id],
  );

  return sale;
};

const createSale = async (userId, totalPrice, deliveryAddress, deliveryNumber) => {
  const pendente = 'pendente';
  const query = 'INSERT INTO sales (user_id, total_price, delivery_address, ';
  const queryTwo = 'delivery_number, sale_date, status) VALUES (?, ?, ?, ?, NOW(), ?)';
  const sale = await connection.execute(
    `${query}${queryTwo}`,
    [userId, totalPrice, deliveryAddress, deliveryNumber, pendente],
  );
  return {
    saleId: sale.insertedId,
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
  };
};

module.exports = { getAllSales, createSale, getSaleById };