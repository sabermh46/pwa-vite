// ThemeSwitcher.jsx
import { useDispatch, useSelector } from 'react-redux';
import { selectAvailableThemes, selectCurrentTheme, setTheme } from '../../features/theme/themeSlices';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const themes = useSelector(selectAvailableThemes);
  const currentTheme = useSelector(selectCurrentTheme);  
  

  return (
    <div className="theme-switcher">
      {themes.map(theme => (
        <div
          key={theme.name}
          onClick={() => dispatch(setTheme(theme.name))}
          className={`px-2 py-1 rounded-2xl my-2 cursor-pointer ${theme.name === currentTheme.name ? 'border-[5px] border-white' : ''}`}
          style={{ backgroundColor: theme.config.surface, color: theme.config.text, border: '5px solid',
            borderColor: theme.name === currentTheme.name ? theme.config.primary : 'transparent'
           }}
        >
            <p className='pb-2 capitalize' style={{
                color: theme.config.text
            }}>
                {theme.name.replace('-', ' ')}
            </p>
            <div className="flex gap-2">
                <p className="rounded-full aspect-square h-10" style={{ backgroundColor: theme.config.primary }}></p>
                <p className="rounded-full aspect-square h-10" style={{ backgroundColor: theme.config.secondary }}></p>
                <p className="rounded-full aspect-square h-10" style={{ backgroundColor: theme.config.text }}></p>
                <p className="rounded-full aspect-square h-10" style={{ backgroundColor: theme.config.icon }}></p>
                <p className="rounded-full aspect-square h-10" style={{ backgroundColor: theme.config.background }}></p>
            </div>
        </div>
      ))}
    </div>
  );
};

export default ThemeSwitcher