import { ArrowLeft, Star } from 'lucide-react';
import UserLayout from '../../UserLayout/UserLayout';
import { Link } from 'react-router-dom';
import BackButton from '../../../../componets/Back';


const BookProfile = () => {
    const skills = [
        { name: 'Dog walking', level: 'Expert', rating: 4 },
        { name: 'Baby sitting', level: 'Expert', rating: 5 },
        { name: 'Electrical fixing', level: 'Expert', rating: 4 }
      ];
    
 

  return (

    <UserLayout>

 
    <div className="max-w-4xl mx-auto px-4 rounded-lg">
      <div className="flex items-center gap-4 mb-6">
       <BackButton label='Profile'/>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <img 
          src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1732127824/ba7f483bdba74da74c4b90318ac19403_cjqfe2.jpg" 
          alt="Profile"
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">Darnell Mertz</h2>
          <p className="text-gray-600">@samrutopie123</p>
          <div className="flex gap-4 mt-1 text-sm text-gray-600">
            <span><strong>1.2k</strong> followers</span>
            <span><strong>604</strong>following</span>
          </div>
        </div>
        <button className="ml-auto px-4 py-1 border rounded-full hover:bg-gray-50">
          Follow
        </button>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold mb-2">Bio</h3>
        <p className="text-gray-600">
          Passionate about creativity and innovation, this individual thrives on exploring
          new ideas and pushing boundaries. With a love for nature and travel, they find
          inspiration in the world around them. A dedicated lifelong learner, they are always...
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Skills</h3>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="bg-input p-4  border border-gray rounded-lg flex items-center justify-between">
              <div>
                <h4 className="font-medium">{skill.name}</h4>
                <p className="text-sm text-gray-600">Experience level: {skill.level}</p>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < skill.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <Link to="/book-service" className="px-4 py-2 bg-yellow-100 rounded-full text-sm hover:bg-yellow-200">
                Book
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
    </UserLayout>

  )
}

export default BookProfile
