import { HiClipboardList } from 'react-icons/hi';
import truncateText from '../../utils/truncateText';
import { toPersianNumbersWithComma } from '../../utils/toPersianNumbers';

function ProjectTable({ projects }) {
  return (
    <div className=' w-full m-10'>
      <table className='w-full'>
        <thead className=' bg-gray-300'>
          <tr className='text-right '>
            <th className=' py-2 px-1 w-20'>#</th>
            <th className=' py-2 px-1'>عنوان پروژه</th>
            <th className=' py-2 px-1'>دسته بندی</th>
            <th className=' py-2 px-1'>بودجه</th>
            <th className=' py-2 px-1'>تاریخ ایجاد</th>
            <th className=' py-2 px-1'>ددلاین</th>
            <th className=' py-2 px-1'>تگ ها</th>
            <th className=' py-2 px-1'>وضعیت</th>
            <th className=' py-2 px-1'>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((item, index) => (
            <tr key={index + 1} className='text-right bg-white border-b'>
              <td className='py-2 px-1'>{item._id}</td>
              <td className='px-1'>{item.title}</td>
              <td className='py-2 px-1'>{truncateText(item.category.title, 25)}</td>
              <td className='py-2 px-1'>{toPersianNumbersWithComma(item.budget)}</td>
              <td className='py-2 px-1'>
                {new Date(item.createdAt).toLocaleDateString('fa-IR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </td>
              <td className='py-2 px-1'>
                {new Date(item.deadline).toLocaleDateString('fa-IR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </td>
              <td>
                <div className='flex flex-wrap items-center gap-2 max-w-[300px]'>
                  {item.tags.map((t) => (
                    <span className='badge badge--secondary ' key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </td>
              <td className='py-2 px-1'>
                <div
                  className={`px-3 rounded-xl w-10 flex justify-center   ${
                    item.status === 'OPEN' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}
                >
                  {item.status === 'OPEN' ? 'باز' : 'بسته'}
                </div>
              </td>
              <td className='py-2 px-1 w-6 h-6 text-blue-500'>
                <HiClipboardList />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTable;
