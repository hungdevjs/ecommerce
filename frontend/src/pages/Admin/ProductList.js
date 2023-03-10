import { Container, Table, Button } from "reactstrap";
import { getProducts } from "../../services/products.service";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";
import formatFileUrl from "../../utils/formatFileUrl";
import Currency from "../../utils/formatCurrency";
import Paginations from "../Paginations";
import { deleteProduct } from "../../services/products.service";

const limit = 10;
const gt = 0;

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState("");

  const getListProducts = async () => {
    try {
      const res = await getProducts({ page, limit, categoryId, gt });
      setProducts(res.data.items);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeProduct = async (id) => {
    // eslint-disable-next-line
    if (!confirm("Do you want to remove this products?")) return;
    try {
      await deleteProduct(id);
      getListProducts();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getListProducts();
  }, [page]);

  return (
    <AdminLayout>
      <div className="p-2">
        <div className="d-flex p-2 justify-content-between">
          <h5>Danh sách sản phẩm</h5>
          <Button
            color="primary"
            size="sm"
            onClick={() => navigate("/admin/products/create")}
          >
            Tạo sản phẩm
          </Button>
        </div>
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Mô tả sản phẩm</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Đã bán</th>
              <th>Phân loại</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr>
                  <td>{index + 1 + (page - 1) * 10}</td>
                  <td>
                    <img
                      src={formatFileUrl(product.images[0])}
                      style={{ width: 70, height: 70, objectFit: "cover" }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{Currency(product.price)}</td>
                  <td>{product.quantity}</td>
                  <td>{product.sold}</td>
                  <td>{product.categoryName}</td>
                  <td>
                    <div className="d-flex" style={{ gap: 5 }}>
                      <Button
                        color="success"
                        size="sm"
                        onClick={() =>
                          navigate("/admin/products/" + product._id)
                        }
                      >
                        Chỉnh sửa
                      </Button>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => removeProduct(product._id)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div
        className="d-flex justify-content-end mb-2"
        style={{ width: "100%" }}
      >
        <Paginations
          setPage={setPage}
          page={page}
          totalPages={totalPages}
          style={{ width: 80 }}
        />
      </div>
    </AdminLayout>
  );
};

export default ProductList;
