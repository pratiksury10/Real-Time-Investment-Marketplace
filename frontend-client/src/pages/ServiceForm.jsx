// src/pages/ServiceForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addService } from '../redux/serviceSlice';
import { useNavigate } from 'react-router-dom';

const availableServices = [
  { id: 'consulting', name: 'Startup Consulting' },
  { id: 'legal', name: 'Legal Advisory' },
  { id: 'funding', name: 'Investment & Funding' },
  { id: 'marketing', name: 'Marketing Support' },
];

const ServiceForm = () => {
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedData = availableServices.filter((s) =>
      selected.includes(s.id)
    );

    selectedData.forEach((service) => {
      dispatch(addService(service));
    });

    navigate('/cart'); // go to cart
  };

  return (
    <div>
      <h2>Select Services</h2>
      <form onSubmit={handleSubmit}>
        {availableServices.map((service) => (
          <div key={service.id}>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(service.id)}
                onChange={() => handleToggle(service.id)}
              />
              {service.name}
            </label>
          </div>
        ))}
        <button type="submit">Submit & View Cart</button>
      </form>
    </div>
  );
};

export default ServiceForm;