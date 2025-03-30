import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, Trash2, Loader, Loader2 } from 'lucide-react';
import UserLayout from '../../../../User-Dashboard/UserLayout/UserLayout';
import BackButton from '../../../../../componets/Back';

const EditSkillPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletingImageIndex, setDeletingImageIndex] = useState(null);
  
  const [formData, setFormData] = useState({
    skill_type: '',
    experience_level: '',
    hourly_rate: '',
    description: '',
    thumbnails: []
  });

  const [fileObjects, setFileObjects] = useState([null, null, null, null]);

  useEffect(() => {
    const fetchSkillDetails = async () => {
      try {
        console.log('Fetching skill details...');
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/skills/user/all`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch skill details');
        }

        const data = await response.json();
        console.log('Fetched skill data:', data);
        
        const skill = data.data.find(skill => skill.id === parseInt(id));
        
        if (!skill) {
          throw new Error('Skill not found');
        }

        console.log('Found specific skill:', skill);

        const thumbnailsArray = [
          skill.thumbnail01,
          skill.thumbnail02,
          skill.thumbnail03,
          skill.thumbnail04
        ].filter(Boolean);

        console.log('Processed thumbnails:', thumbnailsArray);

        setFormData({
          skill_type: skill.skill_type,
          experience_level: skill.experience_level,
          hourly_rate: skill.hourly_rate,
          description: skill.description,
          thumbnails: thumbnailsArray
        });

      } catch (err) {
        console.error('Error fetching skill details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const handleImageUpload = (file, index) => {
    if (!file) return;

    console.log('Handling image upload for index:', index);
    console.log('File details:', {
      name: file.name,
      size: file.size,
      type: file.type
    });

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('File read successful');
        setFormData(prev => {
          const newThumbnails = [...prev.thumbnails];
          newThumbnails[index] = e.target.result;
          return {
            ...prev,
            thumbnails: newThumbnails
          };
        });
        
        setFileObjects(prev => {
          const newFiles = [...prev];
          newFiles[index] = file;
          return newFiles;
        });
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        alert('Error processing image: ' + error.message);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error processing image:', err);
      alert('Error processing image: ' + err.message);
    }
  };

  const handleDeleteImage = async (index) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }
  
    setDeletingImageIndex(index);
    try {
      console.log('Deleting image at index:', index);
      
      const thumbnailKey = {
        0: 'thumbnail01',
        1: 'thumbnail02',
        2: 'thumbnail03',
        3: 'thumbnail04'
      }[index];
  
      const requestBody = {
        key: thumbnailKey
      };
  
      console.log('Delete request details:', {
        url: `${import.meta.env.VITE_BASE_URL}/skills/photo/${id}`,
        requestBody
      });
  
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/skills/photo/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      console.log('Server response status:', response.status);
      
      let responseData;
      try {
        responseData = await response.json();
        console.log('Server response:', responseData);
      } catch (e) {
        console.log('Could not parse response as JSON:', e);
      }
  
      if (!response.ok) {
        throw new Error(responseData?.message || 'Failed to delete image');
      }
  
      console.log('Image deleted successfully');
  
      setFormData(prev => {
        const newThumbnails = [...prev.thumbnails];
        newThumbnails[index] = null;
        return {
          ...prev,
          thumbnails: newThumbnails
        };
      });
      
      setFileObjects(prev => {
        const newFiles = [...prev];
        newFiles[index] = null;
        return newFiles;
      });
  
    } catch (err) {
      console.error('Error deleting image:', {
        error: err,
        message: err.message,
        index: index,
        skillId: id
      });
      alert(`Error deleting image: ${err.message}`);
    } finally {
      setDeletingImageIndex(null);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this skill?')) {
      return;
    }

    setDeleting(true);
    try {
      console.log('Deleting skill with ID:', id);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/skills/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete skill');
      }

      console.log('Skill deleted successfully');
      navigate('/settings/skills');
    } catch (err) {
      console.error('Error deleting skill:', err);
      alert('Error deleting skill: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    try {
      const formDataObj = new FormData();
      
      formDataObj.append('skill_type', formData.skill_type);
      formDataObj.append('experience_level', formData.experience_level);
      formDataObj.append('hourly_rate', formData.hourly_rate);
      formDataObj.append('description', formData.description);
  
      fileObjects.forEach((file, index) => {
        if (file) {
          formDataObj.append('thumbnails', file);
        }
      });
  
      console.log('Sending FormData with entries:');
      for (let pair of formDataObj.entries()) {
        console.log(pair[0], ':', pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1]);
      }
  
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/skills/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: formDataObj
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }
  
      const responseData = await response.json();
      console.log('Update successful:', responseData);
      navigate(`/settings/skills/${id}`);
  
    } catch (err) {
      console.error('Error updating skill:', err);
      alert('Error updating skill: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="max-w-4xl mx-auto px-4 flex justify-center items-center min-h-[200px]">
          <div className="animate-pulse">Loading...</div>
        </div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout>
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4">
        <header className="flex items-center justify-between mb-6">
          <BackButton label="Edit Skill" />
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete Skill'}
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="aspect-square relative group">
                <label className="block w-full h-full cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0], index)}
                  />
                  {formData.thumbnails[index] ? (
                    <>
                      <img
                        src={formData.thumbnails[index].startsWith('data:') 
                          ? formData.thumbnails[index] 
                          : `${formData.thumbnails[index]}`}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {/* Delete button positioned absolutely on top right */}
                      <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteImage(index);
                      }}
                      className="absolute z-50 top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors disabled:bg-red-400"
                      disabled={deletingImageIndex === index}
                    >
                      {deletingImageIndex === index ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                      {/* Upload overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <span className="text-sm text-gray-500">Upload</span>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="skill_type">
                Skill Type
              </label>
              <input
                id="skill_type"
                type="text"
                name="skill_type"
                value={formData.skill_type}
                onChange={handleInputChange}
                className="w-full p-2 border bg-input border-gray rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="experience_level">
                Experience Level
              </label>
              <select
                id="experience_level"
                name="experience_level"
                value={formData.experience_level}
                onChange={handleInputChange}
                className="w-full p-2 border bg-input border-gray rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                required
              >
                <option value="">Select Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="hourly_rate">
                Hourly Rate (£)
              </label>
              <input
                id="hourly_rate"
                type="number"
                name="hourly_rate"
                value={formData.hourly_rate}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full p-2 border bg-input border-gray rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border bg-input border-gray rounded-md h-32 focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
          </div>

   

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/settings/skills/${id}`)}
              className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-secondary font-semibold bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
};

export default EditSkillPage;