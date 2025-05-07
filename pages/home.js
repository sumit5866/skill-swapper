// pages/home.js
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";

const skillsList = [
  "Web Development", "Graphic Design", "Digital Marketing", "Data Science", "Machine Learning",
  "Photography", "Video Editing", "Public Speaking", "Content Writing", "UI/UX Design",
  "Mobile App Development", "Cybersecurity", "SEO", "Blockchain", "Animation",
  "Music Production", "Drawing", "Cooking", "Fitness Training", "Language Learning",
  "AI Tools", "Game Development", "Copywriting", "Business Strategy", "Excel Mastery",
  "Accounting", "Legal Advice", "Interior Design", "Architecture Basics", "Chemistry",
  "Physics", "Biology", "Mathematics", "History", "Geography",
  "Politics", "Stock Market", "Investing", "Resume Writing", "Job Interview Prep",
  "Time Management", "Team Leadership", "Communication Skills", "E-commerce", "Sales",
  "Customer Support", "Project Management", "Freelancing", "YouTube", "Podcasting"
];

export default function Home() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push("/");
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-200">
      <header className="flex items-center justify-between p-4 bg-gradient-to-r from-fuchsia-600 to-indigo-700 text-white shadow-lg">
        <h1 className="text-3xl font-bold tracking-wide">Skill Swapper</h1>
        <input
          type="text"
          placeholder="Search skills or teachers"
          className="px-4 py-2 rounded-md text-black shadow focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="relative">
          <button
            className="bg-white text-fuchsia-700 px-5 py-2 rounded-full font-semibold shadow hover:bg-fuchsia-100"
            onClick={() => setShowProfilePopup(true)}
          >
            Account
          </button>
          <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md z-10">
            <button
              className="block px-4 py-2 w-full hover:bg-gray-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="p-6 text-xl font-semibold text-fuchsia-800">
        {user ? `Welcome, ${user.displayName || "New User"}!` : "Loading..."}
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skillsList
          .filter(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(skill => (
            <div key={skill} className="p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <h2 className="text-indigo-800 font-semibold text-lg mb-1">{skill}</h2>
              <p className="text-sm text-gray-600 italic">Sorry, there is no teacher in this skill.</p>
            </div>
          ))}
      </div>

      {showProfilePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full">
            <h2 className="text-lg font-bold mb-4 text-fuchsia-700">Complete Your Profile</h2>
            <form>
              <label className="block mb-2 text-sm font-medium">Username:</label>
              <input type="text" className="w-full mb-4 px-3 py-2 border rounded focus:outline-none" placeholder="Enter unique username" />

              <label className="block mb-2 text-sm font-medium">Profile Image:</label>
              <input type="file" className="w-full mb-4" />

              <label className="block mb-2 text-sm font-medium">Select Skills:</label>
              <select multiple className="w-full h-32 mb-4 px-3 py-2 border rounded focus:outline-none">
                {skillsList.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>

              <div className="flex justify-end gap-2">
                <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowProfilePopup(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
