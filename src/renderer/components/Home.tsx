import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import {Theme, changeTheme} from '../../service/ThemeService';

export default function Home(): JSX.Element {
  let [theme, setTheme] = useState('light-theme' as Theme);
  let onChangeTheme = () => {
    let nextTheme = theme.match('light-theme') ? 'dark-theme' : 'light-theme';
    changeTheme(nextTheme as Theme);
    setTheme(nextTheme as Theme);
  }
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <Link to={routes.COUNTER}>to Counter</Link>
      <div onClick={()=>onChangeTheme()}>Theme</div>
    </div>
  );
}
