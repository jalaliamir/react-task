import { useState } from 'react';
import './App.css';

import ProjectTable from './components/ProjectTable/ProjectTable';
import ProjectHeader from './components/ProjectHeader/ProjectHeader';
import { projects } from './data/data';
import { useSelectContext } from './Context/SelectContext';

function App() {
  const { category, status, sort } = useSelectContext();
  const [isOpen, setIsOpen] = useState(false);

  const sortCallBack = (a, b) => {
    switch (sort) {
      case 'created_desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'created_asc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'deadline_desc':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case 'deadline_asc':
        return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
      case 'budget_asc':
        return b.budget - a.budget;
      case 'budget_desc':
        return a.budget - b.budget;
    }
  };

  const filteredProjects = projects
    .filter((p) => (status === 'ALL' ? true : p.status === status))
    .filter((p) => (category === 'ALL' ? true : p.category.englishTitle === category))
    .sort(sortCallBack);

  return isOpen ? (
    <div className='flex flex-col h-screen w-full rounded-xl border-solid'>
      <ProjectHeader />
      <ProjectTable projects={filteredProjects} />
    </div>
  ) : (
    <div className=' flex  w-full justify-center items-center '>
      <div className='  h-72 w-1/2  flex flex-col'>
        <h1 className='text-right text-gray-500 mb-10 mt-4 text-bold'>لیست پروژه ها</h1>
        <div className='flex-1 justify-center items-center flex '>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='px-10 py-3 bg-blue-500 text-white rounded-xl text-bold '
          >
            نشان دادن پروژه ها
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
