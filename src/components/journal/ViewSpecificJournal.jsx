import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateJournalEntry, deleteJournalEntry } from "../../features/journal/journalSlice";
import { toggleItemSelection, resetData, setSelectedItems } from "../../features/db/categoryData";
import { IoIosArrowBack } from "react-icons/io";
import moods from "../../utils/moods";
import categoryIcons from "../../utils/categoryItemsIcon";
import { useEffect } from "react";


const ViewSpecificJournal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const journalEntries = useSelector(state => state.journal.entries);
  const categories = useSelector(state => state.appData.activityCategories);
  const selectedItems = useSelector(state => state.appData.selectedItems);

  // Find the entry
  const entry = journalEntries.find(e => e.id === Number(id));

  useEffect(()=>{
    initializer()
  }, [])

  if (!entry) {
    return <p className="text-center text-red-500">Entry not found</p>;
  } 

  const initializer = () =>{
    // Set selected items based on existing entry activities
    const preselectedItems = {};
    entry.activities.forEach((activityId) => {
      preselectedItems[activityId] = true;
    });
    dispatch(setSelectedItems(preselectedItems));
  }


  const moodInfo = moods.find(m => m.name === entry.mood) || { color: "#ccc", Icon: () => <div>❓</div> };
  const { Icon: MoodIcon, color: moodColor } = moodInfo;

  const handleSave = () => {
    dispatch(updateJournalEntry({
      id: entry.id,
      updatedData: { activities: Object.keys(selectedItems).filter(id => selectedItems[id]) }
    }));
    dispatch(resetData());
    navigate(-1);
  };

  const handleDelete = () => {
    dispatch(deleteJournalEntry(entry.id));
    dispatch(resetData());
    navigate(-1);
  };

  return (
    <div className="page">
      <header className="flex justify-between bg-background p-2 sticky top-0 z-20 boxShadow20">
        <button onClick={handleSave} className="flex gap-2 items-center justify-center">
          <IoIosArrowBack className='h-8 w-8' />
          <MoodIcon style={{ background: moodColor }} className='h-10 w-10 rounded-full text-white' />
        </button>
        <div className="flex gap-2">
          <button onClick={handleDelete} className="bg-red-500 text-white px-5 rounded-lg font-bold">Delete</button>
          <button onClick={handleSave} className="bg-primary text-white px-5 rounded-lg font-bold">Save</button>
        </div>
      </header>

      <p className="text-center text-xl text-text py-4">Edit Activities</p>

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
                  <Icon className={`h-11 w-11  flex items-center justify-center p-2 rounded-full border border-secondary ${selectedItems[item.id] ? 'bg-primary text-white' : 'bg-transparent text-primary'}`} />
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

export default ViewSpecificJournal;
