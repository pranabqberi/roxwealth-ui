import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const deleteBattery = async (id: string) => {
  const URL = 'https://engine.qberi.com/api/deleteBattery/' + id;

  const session = JSON.parse(localStorage.getItem('session') || '{}');
  const sessionToken = session.sessionToken;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionToken}`
  };

  axios
    .delete(URL, { headers: headers })
    .then(response => {
      console.log('Response:', response.data);
      window.location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const onClickDelete = (id: string) => {
  console.log('Delete', id);
  // Give Prompt to confirm the delete
  if (window.confirm('Are you sure you want to delete this battery?')) {
    deleteBattery(id);
  }
};

// const navigate = useNavigate();

const onClickView = (id: string) => {
  window.location.href = '/hospitalmerch/product-details/' + id;
};

const ProductDropDownItems = ({ itemId }: { itemId: string }) => {
  return (
    <>
      <Dropdown.Item
        eventKey="1"
        className="text-dark"
        onClick={() => onClickView(itemId)}
      >
        View
      </Dropdown.Item>
      <Dropdown.Item
        eventKey="2"
        className="text-dark"
        onClick={() => onClickView(itemId)}
      >
        Edit
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        eventKey="4"
        className="text-danger"
        onClick={() => onClickDelete(itemId)}
      >
        Remove
      </Dropdown.Item>
    </>
  );
};

export default ProductDropDownItems;
