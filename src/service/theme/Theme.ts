import {ipcRenderer} from 'electron';
import './theme.less';
import {ChannelName} from '../../common/MsgChannel';
let channelName: ChannelName = require('../../common/MsgChannel.json');

let kThemeCmd = channelName.IPCChannelName.kChangeTheme;
ipcRenderer.on(kThemeCmd, (evt, args)=>{
  let {theme} = args;
  let root = document.getElementById('root');
  if (root)
    root.className = theme ? theme : 'light-theme';
});

function changeTheme(theme: Theme) {
    ipcRenderer.send(kThemeCmd, {theme});
}

let kQueryThemeCmd = channelName.IPCChannelName.kQueryTheme;
function getTheme() {
    return ipcRenderer.sendSync(kQueryThemeCmd);
}

type Theme = 'light-theme' | 'dark-theme';

export {
    Theme,
    changeTheme,
    getTheme,
};