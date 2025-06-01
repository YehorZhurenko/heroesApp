import { useState } from 'react';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { createHero } from '../redux/slices/heroSlice';

import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    real_name: '',
    origin_description: '',
    superpowers: [''],
    catch_phrase: '',
    images: [null, null, null, null], // 4 local files
  });

  const [previewUrls, setPreviewUrls] = useState([null, null, null, null]);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.real_name.trim()) newErrors.real_name = 'Real name is required';
    if (!formData.origin_description.trim())
      newErrors.origin_description = 'Origin description is required';
    if (!formData.catch_phrase.trim()) newErrors.catch_phrase = 'Catch phrase is required';
    if (formData.superpowers.length === 0 || formData.superpowers.some((p) => !p.trim())) {
      newErrors.superpowers = 'At least one superpower is required';
    }
    if (formData.images.length !== 4 || formData.images.some((img) => !img)) {
      newErrors.images = 'Exactly 4 image files are required';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, index, key) => {
    const updated = [...formData[key]];
    updated[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [key]: updated }));
  };

  const addSuperpower = () => {
    setFormData((prev) => ({
      ...prev,
      superpowers: [...prev.superpowers, ''],
    }));
  };

  const removeSuperpower = (index) => {
    setFormData((prev) => ({
      ...prev,
      superpowers: prev.superpowers.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0] || null;
    const updatedImages = [...formData.images];
    const updatedPreviews = [...previewUrls];

    updatedImages[index] = file;
    updatedPreviews[index] = file ? URL.createObjectURL(file) : null;

    setFormData((prev) => ({ ...prev, images: updatedImages }));
    setPreviewUrls(updatedPreviews);
  };

  const generateImageUrls = (nickname) => {
    const baseUrl = 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/';
    return [1, 2, 3, 4].map((i) => `${baseUrl}${nickname}_${i}.jpg`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const nickname = formData.name.trim().toLowerCase().replace(/\s+/g, '_');
    const cloudinaryUrls = generateImageUrls(nickname);

    const payload = {
      name: formData.name,
      real_name: formData.real_name,
      origin_description: formData.origin_description,
      catch_phrase: formData.catch_phrase,
      superpowers: formData.superpowers,
      images: cloudinaryUrls, // only URLs, no file content
    };

    try {
      dispatch(createHero(payload));
      alert('Hero created successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to create hero.');
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <h2>Create New Hero</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <br />
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </div>

        {/* Real Name */}
        <div style={{ marginBottom: '10px' }}>
          <label>Real Name:</label>
          <br />
          <input
            name="real_name"
            value={formData.real_name}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
          {errors.real_name && <div style={{ color: 'red' }}>{errors.real_name}</div>}
        </div>

        {/* Origin Description */}
        <div style={{ marginBottom: '10px' }}>
          <label>Origin Description:</label>
          <br />
          <textarea
            name="origin_description"
            value={formData.origin_description}
            onChange={handleChange}
            rows={3}
            style={{ width: '100%' }}
          />
          {errors.origin_description && (
            <div style={{ color: 'red' }}>{errors.origin_description}</div>
          )}
        </div>

        {/* Catch Phrase */}
        <div style={{ marginBottom: '10px' }}>
          <label>Catch Phrase:</label>
          <br />
          <textarea
            name="catch_phrase"
            value={formData.catch_phrase}
            onChange={handleChange}
            rows={2}
            style={{ width: '100%' }}
          />
          {errors.catch_phrase && <div style={{ color: 'red' }}>{errors.catch_phrase}</div>}
        </div>

        {/* Superpowers */}
        <div style={{ marginBottom: '10px' }}>
          <label>Superpowers:</label>
          {formData.superpowers.map((power, index) => (
            <div key={index} style={{ display: 'flex', marginTop: '5px' }}>
              <input
                type="text"
                value={power}
                onChange={(e) => handleArrayChange(e, index, 'superpowers')}
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => removeSuperpower(index)}
                style={{ marginLeft: '5px' }}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addSuperpower} style={{ marginTop: '5px' }}>
            + Add Superpower
          </button>
          {errors.superpowers && <div style={{ color: 'red' }}>{errors.superpowers}</div>}
        </div>

        {/* File Uploads */}
        <div style={{ marginBottom: '10px' }}>
          <label>Upload 4 Images:</label>
          {formData.images.map((file, index) => (
            <div key={index} style={{ marginTop: '5px' }}>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, index)} />
              {previewUrls[index] && (
                <img
                  src={previewUrls[index]}
                  alt={`Preview ${index + 1}`}
                  style={{
                    width: '100px',
                    height: 'auto',
                    marginTop: '5px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                  }}
                />
              )}
            </div>
          ))}
          <div style={{ fontSize: '12px', color: '#555', marginTop: '5px' }}>
            You must upload exactly 4 images. The URLs will be generated from hero name.
          </div>
          {errors.images && <div style={{ color: 'red' }}>{errors.images}</div>}
        </div>

        <button style={{ padding: '10px 20px', marginRight: '20px' }} onLick={() => navigate(-1)}>
          Back
        </button>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Create Hero
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
