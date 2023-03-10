import { useState } from 'react';
import { Row, Col, Input, Label, FormGroup, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Information = ({ cart, onConfirm }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    note: '',
  });

  const changeData = (field, value) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  const { name, phoneNumber, address, note } = data;

  const submit = async () => {
    try {
      if (!name || !name.trim()) throw new Error('Name is empty');
      if (!phoneNumber || !phoneNumber.trim())
        throw new Error('Phone number is empty');
      if (!address || !address.trim()) throw new Error('Address is empty');

      await onConfirm({
        note,
        name,
        address,
        phoneNumber,
        products: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <Row>
        <h5>Thông tin</h5>

        <Col xs={12} sm={12} md={6}>
          <FormGroup>
            <Label>Tên</Label>
            <Input
              placeholder="Tên"
              value={name}
              onChange={(e) => changeData('name', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Số điện thoại</Label>
            <Input
              placeholder="Số điện thoại"
              type="number"
              value={phoneNumber}
              onChange={(e) => changeData('phoneNumber', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Địa chỉ</Label>
            <Input
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => changeData('address', e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <FormGroup>
            <Label>Ghi chú</Label>
            <Input
              type="textarea"
              rows={5}
              placeholder="Ghi chú"
              value={note}
              onChange={(e) => changeData('note', e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col xs={6}>
          <Button
            color="success"
            className="w-100"
            disabled={!cart.length}
            onClick={submit}
          >
            Xác nhận
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Information;
