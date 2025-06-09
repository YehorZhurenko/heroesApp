import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateHero } from '../redux/slices/heroSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchHero } from '../redux/slices/heroSlice';

const EditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadToCloudinary = async (file, fileIndex, heroName) => {
    const url = `https://api.cloudinary.com/v1_1/dxtxfqhqw/image/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'heroPres');

    const safeName = heroName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^\w\-]/g, '');
    const publicId = `${safeName}_${fileIndex + 1}`;

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed for image ${fileIndex + 1}`);
    }

    const data = await response.json();
    return data.secure_url;
  };

  const [formData, setFormData] = useState({
    name: '',
    real_name: '',
    origin_description: '',
    superpowers: [''],
    catch_phrase: '',
    images: [], // Existing image URLs
  });

  const [previewUrls, setPreviewUrls] = useState([null, null, null, null]);
  const [newFiles, setNewFiles] = useState([null, null, null, null]); // Optional replacements
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchNEdit = async () => {
      try {
        const data = await dispatch(fetchHero(id)).unwrap();

        const filledImages = [...(data.images || [])];
        while (filledImages.length < 4) filledImages.push(null);

        setFormData({
          name: data.name,
          real_name: data.real_name,
          origin_description: data.origin_description,
          superpowers: data.superpowers || [''],
          catch_phrase: data.catch_phrase,
          images: filledImages,
        });

        setPreviewUrls(filledImages);
        setNewFiles([null, null, null, null]); // reset new files
      } catch (error) {
        console.error('Failed to fetch hero:', error);
      }
    };
    fetchNEdit();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, index) => {
    const updated = [...formData.superpowers];
    updated[index] = e.target.value;
    setFormData((prev) => ({ ...prev, superpowers: updated }));
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
    const updatedFiles = [...newFiles];
    const updatedPreviews = [...previewUrls];

    updatedFiles[index] = file;
    updatedPreviews[index] = file ? URL.createObjectURL(file) : formData.images[index];

    setNewFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
  };

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
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const nickname = formData.name.trim().toLowerCase().replace(/\s+/g, '_');

    try {
      const uploadedImages = await Promise.all(
        newFiles.map(async (file, index) => {
          if (file) {
            return await uploadToCloudinary(file, index, formData.name);
          } else {
            return formData.images[index]; // оставить старое изображение
          }
        }),
      );
      const payload = {
        name: formData.name,
        real_name: formData.real_name,
        origin_description: formData.origin_description,
        catch_phrase: formData.catch_phrase,
        superpowers: formData.superpowers,
        images: uploadedImages,
      };

      await dispatch(updateHero({ id, updatedHero: payload }));
      navigate(-1);
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update hero.');
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <h2>Edit Hero</h2>
      <form onSubmit={handleSubmit}>
        {/* Reuse same inputs as CreatePage */}
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
                onChange={(e) => handleArrayChange(e, index)}
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

        {/* Images */}
        <div style={{ marginBottom: '10px' }}>
          <label>Replace Images (optional):</label>
          {previewUrls.map((url, index) => (
            <div key={index} style={{ marginTop: '10px' }}>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, index)} />
              {url && (
                <img
                  src={url}
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
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{ padding: '10px 20px', marginRight: '20px' }}>
          Back
        </button>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPage;
