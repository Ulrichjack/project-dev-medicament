import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import medicamentService from "../../services/medicamentService";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      const data = await medicamentService.getCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchTerm) navigate(`/search?q=${searchTerm}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-br from-primary to-[#1E4870] pt-24 pb-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">PharmApp</h1>
          <p className="text-blue-100 mb-10 text-lg opacity-90">Trouvez vos médicaments et comparez les prix dans les pharmacies proches.</p>
          
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
              <i className="fas fa-magnifying-glass text-xl"></i>
            </div>
            <input 
              type="text" 
              placeholder="Nom du médicament (ex: Paracétamol...)"
              className="w-full h-16 pl-16 pr-36 rounded-2xl border-none shadow-2xl text-lg focus:outline-none text-gray-800"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-[#1E4870] transition-all"
            >
              Trouver
            </button>
          </form>
        </div>
      </section>

      {/* 2. CATÉGORIES */}
      <section className="max-w-6xl mx-auto -mt-12 px-4 w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8ECF0] p-8">
          <h2 className="text-gray-800 font-bold text-xl mb-6 flex items-center">
            <span className="w-2 h-6 bg-primary rounded-full mr-3"></span>
            Parcourir par catégorie
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/search?category_id=${cat.id}`} className="flex-none flex items-center bg-white border border-[#E8ECF0] px-6 py-4 rounded-xl hover:border-primary hover:text-primary transition-all">
                <i className={`fas ${cat.icon} mr-3 text-gray-400`}></i>
                <span className="font-semibold whitespace-nowrap">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}