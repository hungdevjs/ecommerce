const Order = require('../models/order.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');

const { OrderStatus } = require('../utils/constants');

const getOrders = async () => {
  const order = await Order.find({}).lean();

  return order || [];
};

const getById = async (_id) => {
  const order = await Order.findOne({ _id }).lean();

  return order || {};
};

const createOrder = async (data) => {
  const { address, phoneNumber, products } = data;

  if (!address.trim()) throw new Error('Invalid address');

  if (phoneNumber.length < 10) throw new Error('Invalid phone number');

  let amount = 0;

  for (const p of products) {
    const product = await Product.findOne({
      _id: p.productId,
    });

    if (!product) throw new Error('Invalid product ID');

    if (p.quantity > product.quantity || product.quantity < 1)
      throw new Error(
        `Not enough product ${product.name + ' ' + product.description}`
      );

    amount += product.price * p.quantity;

    product.quantity = product.quantity - p.quantity;
    product.sold = (product.sold || 0) + 1;

    await product.save();
  }

  const newOrder = new Order({
    address,
    phoneNumber,
    status: OrderStatus.Pending,
    products,
    amount: Number(amount),
  });

  await newOrder.save();
};

const updateOrder = async (_id, data) => {};

const deleteOrder = async (_id) => {
  const order = await Order.findOne({ _id });

  if (!order) throw new Error('Order not found');

  await order.remove();
};

module.exports = { getOrders, getById, createOrder, updateOrder, deleteOrder };
