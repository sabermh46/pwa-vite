
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetData, toggleItemSelection } from '../../features/db/categoryData';
import { saveJournalEntry } from '../../features/journal/journalSlice';
import { IoIosArrowBack } from "react-icons/io";
import moods from '../../utils/moods';
import { ImCodepen } from 'react-icons/im';
import categoryIcons from '../../utils/categoryItemsIcon';


const ActivityPage = () => {
  const { mood } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector(state => state.appData.activityCategories);
  const selectedItems = useSelector(state => state.appData.selectedItems);

  const moodInfo = moods.filter(m => m.name === mood)
  console.log(moodInfo);

  const SelectedMood = moodInfo[0]


  
  const handleSave = () => {
    dispatch(saveJournalEntry({
      mood: decodeURIComponent(mood),
      activities: Object.keys(selectedItems).filter(id => selectedItems[id]),
      timestamp: new Date().toISOString()
    }));
    dispatch(resetData())
    navigate(-1);
  };

  return (
    <div className="page">
      <header className="flex justify-between bg-background p-2 sticky top-0 z-20 boxShadow20">
        <button onClick={() => navigate(-1)} className=" flex gap-2 items-center justify-center">
          <IoIosArrowBack className='h-8 w-8'/>
          <SelectedMood.Icon style={{
            background: SelectedMood.color
          }} className='h-10 w-10 rounded-full text-white'/>
        </button>
        <button onClick={handleSave} className="bg-primary text-white px-5 rounded-lg tracking-wider text-lg font-bold flex justify-center items-center">
          Save
        </button>
      </header>

      <p className="text-center text-xl text-text py-4">
        Select Activities
      </p>


      <div className="px-4 pb-10">
        {categories.map(category => (
          <div key={category.name} className="">
            <h3 className='text-primary font-bold text-xl bg-surface w-max px-2 translate-x-4 translate-y-[50%] uppercase rounded-md'>{category.name}</h3>
            <div className="border border-primary rounded-xl p-2 pt-5 bg-background flex gap-3 flex-wrap">
              {category.items.map(item => {
                const Icon = categoryIcons[item.name]
                return (
                <button
                  key={item.id}
                  onClick={() => dispatch(toggleItemSelection({itemId: item.id}))}
                  className={`px-1 flex flex-col gap-2 items-center max-w-[70px]`}
                >
                  <Icon className={`h-11 w-11  flex items-center justify-center p-2 rounded-full border ${selectedItems[item.id] ? 'bg-primary text-white' : 'bg-transparent text-primary'}`} />
                  <span className="capitalize text-xs text-text">{item.name}</span>
                </button>
              )})}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityPage