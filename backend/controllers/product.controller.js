const service = require("../services/product.service");

const getProducts = async (req, res) => {
  try {
    const { productName, page, limit, categoryId, gt, lt, price, cpuId } =
      req.query;
    const products = await service.getProducts({
      productName,
      page,
      limit,
      categoryId,
      gt,
      lt,
      price,
      cpuId,
    });

    res.status(200).send(products);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await service.getById(id);

    res.status(200).send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      images,
      price,
      quantity,
      status,
      categoryId,
      cpuId,
      sold,
    } = req.body;

    await service.createProduct({
      name,
      description,
      images,
      price,
      quantity,
      status,
      categoryId,
      cpuId,
      sold,
    });

    res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      images,
      price,
      quantity,
      sold,
      status,
      categoryId,
      cpuId,
    } = req.body;

    await service.updateProduct(id, {
      name,
      description,
      images,
      price,
      quantity,
      sold,
      status,
      categoryId,
      cpuId,
    });

    res.status(200).send("Updated");
  } catch (err) {
    err.message === "Product not found"
      ? res.status(404).send(err.message)
      : res.status(400).send(err.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await service.deleteProduct(id);

    res.status(200).send("Deleted");
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const ratingProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    await service.ratingProduct(id, rating);

    res.status(200).send("Rated " + rating + "*");
  } catch (err) {
    err.message === "Product not found"
      ? res.status(404).send(err.message)
      : res.status(400).send(err.message);
  }
};

module.exports = {
  getProducts,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
  ratingProduct,
};
