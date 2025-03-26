import { useSelector } from "react-redux";
import { format } from "date-fns";
import moods from "../../utils/moods";
import categoryIcons from "../../utils/categoryItemsIcon";
import { useNavigate } from "react-router-dom";

const JournalCard = ({ date, entries }) => {
  // Get activity categories
  const categories = useSelector(state => state.appData.activityCategories);
  console.log(categories);
  const navigate = useNavigate()
  

  return (
    <div className="bg-background rounded-[clamp(16px,4vw,56px)] p-2 shadow-md flex flex-col gap-2 mb-4">
      {entries.map((entry) => {
        console.log(entry);
        // Get Mood Info
        const moodInfo = moods.find((m) => m.name === entry.mood) || { color: "#ccc", Icon: () => <div>❓</div> };
        const { Icon: MoodIcon, color: moodColor } = moodInfo;

        // Get Activity Names & Icons
        
        
        const activityDetails = entry.activities.map((activityId) => {
            let activity = null;
          
            // Iterate through categories and find the activity within the 'items' array
            for (const category of categories) {
              activity = category.items.find((item) => item.id === Number(activityId));
              if (activity) break; // Stop searching once found
            }
          
            return activity
              ? { name: activity.name, Icon: categoryIcons[activity.name] || (() => <div>❓</div>) }
              : { name: "Unknown", Icon: () => <div>❓</div> };
          });

        return (
          <div key={entry.id} className="flex py-2 gap-2" onClick={()=>navigate("/"+entry.id)}>
            {/* Mood Icon & Color */}
            <div className="flex flex-col items-center w-[50px]" style={{ color: moodColor }}>
              <MoodIcon className="h-10 w-10 rounded-full" />
            </div>

            {/* Journal Info */}
            <div>
              {/* Date & Time */}
              <p className="text-sm text-secondary uppercase">
                {format(new Date(date), "EEEE, MMM dd")}
              </p>
              <p className="text-lg uppercase font-semibold" style={{ color: moodColor }}>
                {entry.mood}
                <span className="text-text text-sm ml-2">
                  {format(new Date(entry.timestamp), "hh:mm a")}
                </span>
              </p>

              <div className="flex flex-wrap gap-2 mt-1">
                {/* eslint-disable-next-line no-unused-vars */}
                {activityDetails.map(({ name, Icon }) => (
                  <div key={name} className="flex items-center gap-1 px-2 py-1 rounded-md" style={{
                    color: moodColor
                  }}>
                    <Icon className="w-4 h-4" />
                    <span className="text-xs text-text">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JournalCard;
