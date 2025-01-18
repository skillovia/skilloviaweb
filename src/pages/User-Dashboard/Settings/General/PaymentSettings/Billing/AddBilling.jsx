import React, { useState } from 'react';
import { CreditCard } from "lucide-react";
import UserLayout from '../../../../UserLayout/UserLayout';
import BackButton from '../../../../../../componets/Back';

const AddBillingScreen = () => {
  const [formData, setFormData] = useState({
    card_number: '',
    expiry_date: '',
    cvv: '',
    address: '',
    city: '',
    postal_code: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Card number validation (16 digits)
    if (!formData.card_number.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.card_number = 'Enter a valid 16-digit card number';
    }

    // Expiry date validation (MM/YY format)
    if (!formData.expiry_date.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiry_date = 'Enter a valid date (MM/YY)';
    }

    // CVV validation (3 or 4 digits)
    if (!formData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'Enter a valid CVV';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'card_number') {
      setFormData(prev => ({
        ...prev,
        [name]: formatCardNumber(value)
      }));
    } else if (name === 'expiry_date') {
      // Format MM/YY
      const formatted = value
        .replace(/[^\d]/g, '')
        .substring(0, 4)
        .replace(/^([2-9])/, '0$1')
        .replace(/^(1[3-9])/, '12')
        .replace(/^([0-9]{2})/, '$1/');
      
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else if (name === 'cvv') {
      const formatted = value.replace(/[^\d]/g, '').substring(0, 4);
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch(

        `${import.meta.env.VITE_BASE_URL}/settings/payment/billingmethod`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            card_number: formData.card_number.replace(/\s/g, ''),
            expiry_date: formData.expiry_date,
            cvv: formData.cvv,
            address: formData.address,
            city: formData.city,
            postal_code: formData.postal_code
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add billing method');
      }

      // Reset form after successful submission
      setFormData({
        card_number: '',
        expiry_date: '',
        cvv: '',
        address: '',
        city: '',
        postal_code: ''
      });

    } catch (err) {
      setErrors(prev => ({
        ...prev,
        submit: err.message
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>

 
    <div className="h-full">
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <BackButton label='bills' />
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Card number</label>
          <div className="relative">
            <CreditCard size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="card_number"
              value={formData.card_number}
              onChange={handleChange}
              placeholder="Enter card no."
              className={`w-full p-3 pl-10 border border-gray bg-input rounded-lg border-gray-200 focus:outline-none focus:border-green-400 ${
                errors.card_number ? 'border-red-500' : ''
              }`}
            />
          </div>
          {errors.card_number && <p className="text-red-500 text-xs mt-1">{errors.card_number}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Expires on</label>
            <input
              type="text"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleChange}
              placeholder="MM/YY"
              className={`w-full p-3 border border-gray bg-input rounded-lg border-gray-200 focus:outline-none focus:border-green-400 ${
                errors.expiry_date ? 'border-red-500' : ''
              }`}
            />
            {errors.expiry_date && <p className="text-red-500 text-xs mt-1">{errors.expiry_date}</p>}
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Security code</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="•••"
              className={`w-full p-3 border border-gray bg-input rounded-lg border-gray-200 focus:outline-none focus:border-green-400 ${
                errors.cvv ? 'border-red-500' : ''
              }`}
            />
            {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            className={`w-full p-3 border border-gray bg-input rounded-lg border-gray-200 focus:outline-none focus:border-green-400 ${
              errors.address ? 'border-red-500' : ''
            }`}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">City</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full p-3 border border-gray bg-input rounded-lg border-gray-200 focus:outline-none focus:border-green-400 ${
              errors.city ? 'border-red-500' : ''
            }`}
          >
            <option value="">Select city</option>
            <option value="lagos">Lagos</option>
            <option value="abuja">Abuja</option>
            <option value="port-harcourt">Port Harcourt</option>
          </select>
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Postal code (Optional)</label>
          <input
            type="text"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            placeholder="Enter postal code"
            className="w-full p-3 border border-gray bg-input rounded-lg border-gray-200 focus:outline-none focus:border-green-400"
          />
        </div>

        {errors.submit && (
          <p className="text-red-500 text-sm">{errors.submit}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="lg:w-[40%] text-[12px] rounded-full font-semibold py-2 px-3 w-[50%] bg-primary text-secondary mt-4 hover:bg-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
    </UserLayout>
  );
};

export default AddBillingScreen;