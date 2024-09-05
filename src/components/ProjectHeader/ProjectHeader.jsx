import { useSelectContext, useSelectDispatchContext } from '../../Context/SelectContext';
import { projects } from '../../data/data';

function ProjectHeader() {
  const dispatch = useSelectDispatchContext();
  const select = useSelectContext();
  const { status, category, sort } = select;
  const statusValue = [
    {
      label: 'همه',
      value: 'ALL',
    },
    {
      label: 'باز',
      value: 'OPEN',
    },
    {
      label: 'بسته',
      value: 'CLOSED',
    },
  ];
  const sortOptions = [
    {
      label: 'تاریخ ایجاد(جدیدترین)',
      value: 'created_desc',
    },
    {
      label: 'تاریخ ایجاد (قدیمی ترین)',
      value: 'created_asc',
    },
    {
      label: 'قیمت (صعودی)',
      value: 'budget_asc',
    },
    {
      label: 'قیمت (نزولی)',
      value: 'budget_desc',
    },
    {
      label: 'ددلاین (صعودی)',
      value: 'deadline_asc',
    },
    {
      label: 'ددلاین (نزولی)',
      value: 'deadline_desc',
    },
  ];

  const newCategories = projects.map((item) => {
    return {
      label: item.category.title,
      value: item.category.englishTitle,
    };
  });

  const filteredCategories = newCategories.filter(
    (obj1, i, arr) => arr.findIndex((obj2) => obj2.value === obj1.value) === i
  );

  console.log(filteredCategories);
  const categoryOptions = [{ label: 'دسته بندی (همه)', value: 'ALL' }, ...filteredCategories];
  return (
    <div className='flex mt-3 items-center justify-between mb-12'>
      <h2 className='font-extrabold text-lg'>لیست پروژه ها</h2>
      <div className='flex items-center'>
        <FilterStatus
          optionValue={statusValue}
          status={status}
          handleClick={(value) => dispatch({ type: 'status', payload: value })}
        />
        <FilterDropDown
          option={sortOptions}
          onChange={(e) => dispatch({ type: 'sort', payload: e.target.value })}
          selectValue={sort}
        />
        <FilterDropDown
          option={categoryOptions}
          onChange={(e) => dispatch({ type: 'category', payload: e.target.value })}
          selectValue={category}
        />
      </div>
    </div>
  );
}

export default ProjectHeader;

function FilterStatus({ optionValue, status, handleClick }) {
  return (
    <div className='flex mx-4 items-center justify-center gap-x-2 '>
      <label className='font-bold text-sm ml-2'>وضعیت</label>
      <div className='bg-white rounded-xl  flex items-center  gap-x-2 p-1 '>
        {optionValue.map((item, index) => {
          const isActive = item.value === status;

          return (
            <button
              key={index + 1}
              value={item.value}
              className={`flex justify-center items-center  min-w-14 px-3 py-1 cursor-pointer rounded-xl ${
                isActive ? 'text-white !bg-primary-900' : 'bg-secondary-0 text-secondary-800'
              }`}
              disabled={isActive}
              onClick={() => handleClick(item.value)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FilterDropDown({ option, onChange, selectValue }) {
  return (
    <div className='w-full h-full ml-4 '>
      <select value={selectValue} className='px-4 py-2 rounded-xl textField__input' onChange={onChange}>
        {option.map((item, index) => {
          return (
            <option key={index + 1} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
