import { BiDonateHeart, BiHappyBeaming, BiTired } from "react-icons/bi";
import { BsCloudRainHeavy, BsEmojiAngry, BsEmojiDizzy, BsEmojiGrimace, BsEmojiHeartEyes, BsEmojiSunglasses } from "react-icons/bs";
import { FaListOl, FaRegClock, FaRegGrinStars, FaRegSadCry, FaWalking } from "react-icons/fa";
import { FaGlassWater } from "react-icons/fa6";
import { FiShoppingBag } from "react-icons/fi";
import { GiFingernail, GiHeatHaze, GiNightSleep, GiSleepingBag, GiTeacher } from "react-icons/gi";
import { GrAssistListening, GrStatusGood } from "react-icons/gr";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { IoIosSnow } from "react-icons/io";
import { IoThunderstormOutline } from "react-icons/io5";
import { LuBookOpenCheck, LuCloudy, LuCookingPot, LuFocus, LuVegan } from "react-icons/lu";
import { MdOutlineAddHomeWork, MdOutlineCleaningServices, MdOutlineEmojiObjects, MdOutlineFreeBreakfast, MdOutlineGppGood, MdOutlineGrass, MdOutlineLocalLaundryService, MdOutlineSportsCricket, MdSportsGymnastics, MdSunnySnowing } from "react-icons/md";
import { PiExam } from "react-icons/pi";
import { TbClockHour9, TbMassage, TbMoodSadSquint, TbUsersGroup, TbWind } from "react-icons/tb";

const categoryIcons = {
  "good sleep": MdOutlineGppGood,
  "medium sleep": GiNightSleep,
  "bad sleep": GiSleepingBag,
  "sleep early": TbClockHour9,
  "exercise": MdSportsGymnastics,
  "eat healthy": LuVegan,
  "drink water": FaGlassWater,
  "walk": FaWalking,
  "sport": MdOutlineSportsCricket,
  "haircut": MdOutlineGrass,
  "wellness": GrStatusGood,
  "massage": TbMassage,
  "manicure": GiFingernail,
  "happy": BiHappyBeaming,
  "excited": FaRegGrinStars,
  "grateful": BsEmojiHeartEyes,
  "relaxed": BsEmojiSunglasses,
  "content": MdOutlineEmojiObjects,
  "tired": BiTired,
  "unsure": BsEmojiGrimace,
  "bored": HiOutlineEmojiSad,
  "anxious": BsEmojiGrimace,
  "angry": BsEmojiAngry,
  "stressed": TbMoodSadSquint,
  "sad": FaRegSadCry,
  "desperate": BsEmojiDizzy,
  "class": GiTeacher,
  "study": LuBookOpenCheck,
  "homework": MdOutlineAddHomeWork,
  "exam": PiExam,
  "group project": TbUsersGroup,
  "sunny": MdSunnySnowing,
  "clouds": LuCloudy,
  "rain": BsCloudRainHeavy,
  "snow": IoIosSnow,
  "heat": GiHeatHaze,
  "storm": IoThunderstormOutline,
  "wind": TbWind,
  "shopping": FiShoppingBag,
  "cleaning": MdOutlineCleaningServices,
  "cooking": LuCookingPot,
  "laundry": MdOutlineLocalLaundryService,
  "start early": FaRegClock,
  "make list": FaListOl,
  "focus": LuFocus,
  "take a break": MdOutlineFreeBreakfast,
  "meditation": MdOutlineGppGood,
  "kindness": MdOutlineGppGood,
  "listen": GrAssistListening,
  "donate": BiDonateHeart,
  "fast food": MdOutlineGppGood,
  "homemade": MdOutlineGppGood,
  "restaurant": MdOutlineGppGood,
  "delivery": MdOutlineGppGood,
  "no meat": MdOutlineGppGood,
  "no sweets": MdOutlineGppGood,
  "no soda": MdOutlineGppGood,
  "movies": MdOutlineGppGood,
  "read": MdOutlineGppGood,
  "gaming": MdOutlineGppGood,
  "relax": MdOutlineGppGood
};

export default categoryIcons;